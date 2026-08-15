# dsh-ui-extensions

English | [中文](README.zh.md)

A DeepSeek Harness web plugin that adds an **Extensions** row to the sidebar and a center-column catalog of GitHub repositories tagged [`dsh-plugin`](https://github.com/topics/dsh-plugin). The page copies an official install command; it does not run `dsh plugin add` inside the browser.

## Install

```sh
dsh plugin --profile web add github:haibara757/dsh-ui-extensions
```

Restart `dsh web` (or the desktop shell) after the add succeeds. This repository ships prebuilt `lib/`, so the first install does not need a pnpm `allowBuilds` entry.

## Host requirement

The plugin registers into two host slots:

- `sidebar.nav` — the additive sidebar row
- `shell.surface` with key `extensions` — the catalog page

Those slots exist in a Harness checkout that already has the shell-surface work. **Official `0.1.0-rc.5` does not declare them.** On that release the bundle installs, but no Extensions row appears.

`openSurface('extensions')` must also exist on the layout service. Without it, the nav row cannot switch the center column.

## What the page does

- **Plugins** — live GitHub topic search (`dsh-plugin`), then a ghfast mirror, then a curated fallback list. Each card copies:

  ```sh
  dsh plugin --profile web add github:owner/repo
  ```

- **Skills** — documentation only. Place `SKILL.md` files in the workspace or host skill directory.
- **MCP** — documentation only. Enable servers through `@deepseek-ai/dsh-mcp-client` config.

## License

MIT
