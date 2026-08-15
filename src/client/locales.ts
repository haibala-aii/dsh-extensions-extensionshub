/** `extensions` namespace dictionaries. */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'nav.label': '扩展',
  'nav.aria': '打开扩展中心',
  'center.title': '扩展',
  'center.subtitle': '从 GitHub 发现 DSH 插件。安装走官方 `dsh plugin add`，本页只负责发现和复制命令。',
  'center.search': '搜索仓库…',
  'center.loading': '正在拉取 GitHub…',
  'center.empty': '没有匹配的仓库。',
  'center.source.github': '来源：GitHub topic dsh-plugin',
  'center.source.mirror': '来源：GitHub 镜像',
  'center.source.fallback': 'GitHub 不可达，显示精选目录',
  'center.install': '复制安装命令',
  'center.copied': '已复制',
  'center.open': '打开仓库',
  'center.tab.plugin': '插件',
  'center.tab.skill': 'Skill',
  'center.tab.mcp': 'MCP',
  'center.skill.body': 'Skill 不是 bundle。把 SKILL.md 放到工作区或 host skill 目录后，当前会话的 skill 目录会列出它们。',
  'center.mcp.body': 'MCP 服务器通过 `@deepseek-ai/dsh-mcp-client` 的配置启用。每条服务器命令都是受信任的可执行代码，默认不开启任何服务器。',
} satisfies Record<string, string>

/** The extensions namespace key union. */
export type ExtensionsKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'nav.label': 'Extensions',
  'nav.aria': 'Open the extension center',
  'center.title': 'Extensions',
  'center.subtitle': 'Discover DSH plugins on GitHub. Install still uses official `dsh plugin add`; this page only finds packages and copies the command.',
  'center.search': 'Search repositories…',
  'center.loading': 'Loading GitHub…',
  'center.empty': 'No matching repositories.',
  'center.source.github': 'Source: GitHub topic dsh-plugin',
  'center.source.mirror': 'Source: GitHub mirror',
  'center.source.fallback': 'GitHub unreachable; showing a curated list',
  'center.install': 'Copy install command',
  'center.copied': 'Copied',
  'center.open': 'Open repository',
  'center.tab.plugin': 'Plugins',
  'center.tab.skill': 'Skills',
  'center.tab.mcp': 'MCP',
  'center.skill.body': 'Skills are not bundles. Place SKILL.md files in the workspace or host skill directory; the live skill catalog lists them.',
  'center.mcp.body': 'MCP servers are enabled through `@deepseek-ai/dsh-mcp-client` config. Each server command is trusted executable code; no server is enabled by default.',
} satisfies Record<ExtensionsKey, string>
