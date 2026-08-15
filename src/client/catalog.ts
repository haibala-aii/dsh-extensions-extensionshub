/**
 * Discover installable DSH plugin repositories. GitHub is the live source;
 * a curated list is the offline fallback. Skill and MCP are not bundles.
 */

/** One catalog row the extension center can render. */
export interface CatalogItem {
  /** Stable row id (`owner/repo`). */
  id: string
  /** Repository name. */
  name: string
  /** Repository description, or empty when GitHub omitted one. */
  description: string
  /** `owner/repo` for the install spec and the GitHub URL. */
  repo: string
  /** Star count when the live search returned one. */
  stars?: number
}

/** Where the plugin list came from. */
export type CatalogSource = 'github' | 'mirror' | 'fallback'

/** Result of one catalog load. */
export interface CatalogResult {
  /** Rows to render. */
  items: CatalogItem[]
  /** Which endpoint produced the rows. */
  source: CatalogSource
}

const GITHUB_SEARCH = 'https://api.github.com/search/repositories?q=topic:dsh-plugin&sort=stars&order=desc&per_page=24'
const MIRROR_SEARCH = `https://ghfast.top/${GITHUB_SEARCH}`

/** Curated rows used when both GitHub endpoints fail. */
export const FALLBACK_ITEMS: readonly CatalogItem[] = [
  {
    id: 'whyihaveyou/dsh-suite',
    name: 'dsh-suite',
    description: 'Living plugin directory plus an in-app store and scaffolder.',
    repo: 'whyihaveyou/dsh-suite',
  },
  {
    id: 'Toukaiteio/dsh-plugin-installer',
    name: 'dsh-plugin-installer',
    description: 'Marketplace tab that discovers GitHub topic repositories.',
    repo: 'Toukaiteio/dsh-plugin-installer',
  },
  {
    id: '0xsline/awesome-deepseek-harness',
    name: 'awesome-deepseek-harness',
    description: 'Curated list of plugins, skills, and MCP servers.',
    repo: '0xsline/awesome-deepseek-harness',
  },
]

/**
 * Build the official profile-install command for a GitHub repository.
 * @param repo - `owner/repo`.
 * @returns the `dsh plugin add` command for the web profile.
 */
export function installCommand(repo: string): string {
  return `dsh plugin --profile web add github:${repo}`
}

/**
 * Map a GitHub search payload to catalog rows.
 * @param payload - parsed `search/repositories` JSON.
 * @returns rows for every complete repository item.
 */
export function parseGithubSearch(payload: unknown): CatalogItem[] {
  if (payload === null || typeof payload !== 'object' || !('items' in payload)) return []
  const items = (payload as { items: unknown }).items
  if (!Array.isArray(items)) return []
  const rows: CatalogItem[] = []
  for (const item of items) {
    if (item === null || typeof item !== 'object') continue
    const record = item as { full_name?: unknown; name?: unknown; description?: unknown; stargazers_count?: unknown }
    if (typeof record.full_name !== 'string' || record.full_name === '') continue
    rows.push({
      id: record.full_name,
      name: typeof record.name === 'string' && record.name !== '' ? record.name : record.full_name,
      description: typeof record.description === 'string' ? record.description : '',
      repo: record.full_name,
      ...typeof record.stargazers_count === 'number' ? { stars: record.stargazers_count } : {},
    })
  }
  return rows
}

/**
 * Fetch one JSON URL.
 * @param url - absolute URL.
 * @param fetchImpl - fetch implementation (tests inject a stub).
 * @returns parsed JSON, or undefined when the request fails.
 */
async function readJson(url: string, fetchImpl: typeof fetch): Promise<unknown | undefined> {
  try {
    const response = await fetchImpl(url, { headers: { Accept: 'application/vnd.github+json' } })
    if (!response.ok) return undefined
    return await response.json() as unknown
  } catch {
    // Network, CORS, or a non-JSON body — the caller tries the next source.
    return undefined
  }
}

/**
 * Load the plugin catalog: GitHub, then the ghfast mirror, then the fallback.
 * @param fetchImpl - fetch implementation; defaults to the platform `fetch`.
 * @returns rows plus the source that produced them.
 */
export async function fetchPluginCatalog(fetchImpl: typeof fetch = fetch): Promise<CatalogResult> {
  const github = parseGithubSearch(await readJson(GITHUB_SEARCH, fetchImpl))
  if (github.length > 0) return { items: github, source: 'github' }
  const mirror = parseGithubSearch(await readJson(MIRROR_SEARCH, fetchImpl))
  if (mirror.length > 0) return { items: mirror, source: 'mirror' }
  return { items: [...FALLBACK_ITEMS], source: 'fallback' }
}
