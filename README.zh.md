# dsh-ui-extensions

[English](README.md) | 中文

DeepSeek Harness 的 Web 插件：在侧栏加入「扩展」一行，并在主区列出打了 [`dsh-plugin`](https://github.com/topics/dsh-plugin) 标签的 GitHub 仓库。页面只复制官方安装命令，不会在浏览器里执行 `dsh plugin add`。

## 安装

```sh
dsh plugin --profile web add github:haibara757/dsh-ui-extensions
```

添加成功后重启 `dsh web`（或桌面壳）。本仓库带有预构建的 `lib/`，首次安装不需要在 profile 里写 pnpm `allowBuilds`。

## 宿主要求

插件注册到两个宿主插槽：

- `sidebar.nav` — 侧栏附加导航行
- `shell.surface`，key 为 `extensions` — 目录页

这两个插槽只存在于已经做了壳换面改造的 Harness 检出里。**官方 `0.1.0-rc.5` 没有声明它们。** 在该版本上包能装上，但侧栏不会出现「扩展」。

布局服务还需要 `openSurface('extensions')`。没有它，导航行无法切换主区。

## 页面做什么

- **插件** — 先查 GitHub topic `dsh-plugin`，再走 ghfast 镜像，最后用精选回退列表。每张卡片复制：

  ```sh
  dsh plugin --profile web add github:owner/repo
  ```

- **Skill** — 只说明。把 `SKILL.md` 放到工作区或 host skill 目录。
- **MCP** — 只说明。通过 `@deepseek-ai/dsh-mcp-client` 配置启用服务器。

## 许可证

MIT
