/**
 * Center-column extension catalog: GitHub topic search plus install-command copy.
 */
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { Button, writeClipboard } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type { CatalogItem, CatalogResult } from './catalog.ts'
import { installCommand } from './catalog.ts'
import css from './ExtensionCenter.module.css'

/** Injected catalog loader so tests can stub the network. */
export type ExtensionCenterInjected = {
  /**
   * Load the plugin catalog.
   * @returns rows plus the source that produced them.
   */
  loadCatalog: () => Promise<CatalogResult>
}

/** Composed center props: locale plus the catalog loader. */
export type ExtensionCenterProps =
  & PropsRuntime<'shell.surface'>
  & PropsLocale<'extensions'>
  & ExtensionCenterInjected

type Tab = 'plugin' | 'skill' | 'mcp'

/**
 * Render the extension center.
 * @param props - locale seat plus the catalog loader.
 * @returns the catalog page.
 */
export function ExtensionCenter({ t, loadCatalog }: ExtensionCenterProps) {
  const [tab, setTab] = useState<Tab>('plugin')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<CatalogResult | undefined>(undefined)
  const [copied, setCopied] = useState<string | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    void loadCatalog().then((next) => {
      if (!cancelled) setResult(next)
    })
    return () => { cancelled = true }
  }, [loadCatalog])

  const items = useMemo(() => {
    const rows = result?.items ?? []
    const needle = query.trim().toLowerCase()
    if (needle === '') return rows
    return rows.filter(row =>
      row.name.toLowerCase().includes(needle)
      || row.description.toLowerCase().includes(needle)
      || row.repo.toLowerCase().includes(needle),
    )
  }, [query, result])

  return (
    <section className={css.root}>
      <h1 className={css.title}>{t('center.title')}</h1>
      <p className={css.subtitle}>{t('center.subtitle')}</p>
      <div className={css.tabs} role="tablist">
        {(['plugin', 'skill', 'mcp'] as const).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            className={clsx(css.tab, tab === id && css.tabCurrent)}
            aria-selected={tab === id}
            onClick={() => { setTab(id) }}
          >
            {t(`center.tab.${id}`)}
          </button>
        ))}
      </div>
      {tab === 'skill' && <p className={css.note}>{t('center.skill.body')}</p>}
      {tab === 'mcp' && <p className={css.note}>{t('center.mcp.body')}</p>}
      {tab === 'plugin' && (
        <>
          <input
            className={css.search}
            value={query}
            placeholder={t('center.search')}
            onChange={(event) => { setQuery(event.target.value) }}
          />
          <p className={css.source}>
            {result === undefined ? t('center.loading') : t(`center.source.${result.source}`)}
          </p>
          {result !== undefined && items.length === 0 && <p className={css.note}>{t('center.empty')}</p>}
          <div className={css.cards}>
            {items.map(item => (
              <CatalogCard
                key={item.id}
                item={item}
                copied={copied === item.id}
                installLabel={t('center.install')}
                copiedLabel={t('center.copied')}
                openLabel={t('center.open')}
                onCopy={async () => {
                  const ok = await writeClipboard(installCommand(item.repo))
                  if (ok) setCopied(item.id)
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

function CatalogCard(props: {
  item: CatalogItem
  copied: boolean
  installLabel: string
  copiedLabel: string
  openLabel: string
  onCopy: () => void
}) {
  const { item, copied, installLabel, copiedLabel, openLabel, onCopy } = props
  return (
    <article className={css.card}>
      <h2 className={css.cardName}>{item.name}</h2>
      <p className={css.cardBody}>{item.description}</p>
      {item.stars !== undefined && <span className={css.stars}>{item.stars}</span>}
      <div className={css.actions}>
        <Button variant="primary" size="sm" onClick={onCopy}>
          {copied ? copiedLabel : installLabel}
        </Button>
        <a className={css.link} href={`https://github.com/${item.repo}`} target="_blank" rel="noreferrer">
          {openLabel}
        </a>
      </div>
    </article>
  )
}
