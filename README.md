# @haibala/dsh-ui-extensions

English | [中文](README.zh.md)

Haibala DeepSeek Harness web plugin that lists GitHub repositories tagged [`dsh-plugin`](https://github.com/topics/dsh-plugin). The page copies an official install command; it does not run `dsh plugin add` inside the browser.

## Install

```sh
dsh plugin --profile web add github:haibara757/dsh-haibala-ui-extensions
```

Restart `dsh web` (or the desktop shell) after the add succeeds. This repository ships prebuilt `lib/`, so the first install does not need a pnpm `allowBuilds` entry.

The previous repository name `haibara757/dsh-ui-extensions` redirects here.

## Where it appears

A third-party bundle cannot add new holes to AppFrame or SidebarRoot. Those parents alone may declare `sidebar.nav` and `shell.surface`.

This plugin therefore:

- occupies `sidebar.nav` + `shell.surface` when the host already declares them
- otherwise occupies the official additive seats: a **Extensions** row on `sidebar.footer.action` (above Settings) and a full-frame `shell.overlay` catalog

Stock DeepSeek Harness `0.1.0-rc.5` has the official seats, so the GitHub install works there without a forked shell.

## What the page does

- **Plugins** — live GitHub topic search (`dsh-plugin`), then a ghfast mirror, then a curated fallback list. Each card copies:

  ```sh
  dsh plugin --profile web add github:owner/repo
  ```

- **Skills** — documentation only. Place `SKILL.md` files in the workspace or host skill directory.
- **MCP** — documentation only. Enable servers through `@deepseek-ai/dsh-mcp-client` config.

## License

MIT. Copyright (c) 2026 haibala / haibara757.
