# @haibala/dsh-ui-extensions

[English](README.md) | 中文

Haibala 的 DeepSeek Harness Web 插件：列出打了 [`dsh-plugin`](https://github.com/topics/dsh-plugin) 标签的 GitHub 仓库。页面只复制官方安装命令，不会在浏览器里执行 `dsh plugin add`。

## 安装

```sh
dsh plugin --profile web add github:haibala-aii/dsh-haibala-ui-extensions
```

添加成功后重启 `dsh web`（或桌面壳）。本仓库带有预构建的 `lib/`，首次安装不需要在 profile 里写 pnpm `allowBuilds`。

旧仓库名 `haibala-aii/dsh-ui-extensions` 会重定向到这里。

## 出现在哪

第三方 bundle 不能给 AppFrame 或 SidebarRoot 开新洞。只有这两个父组件能声明 `sidebar.nav` 和 `shell.surface`。

因此本插件会：

- 宿主已经声明这两席时，占用 `sidebar.nav` + `shell.surface`
- 否则占用官方可叠加席位：设置上方的 `sidebar.footer.action`「扩展」行，以及铺满窗口的 `shell.overlay` 目录

原版 DeepSeek Harness `0.1.0-rc.5` 已有这两处官方席位，所以 GitHub 安装不用分叉外壳。

## 页面做什么

- **插件** — 先查 GitHub topic `dsh-plugin`，再走 ghfast 镜像，最后用精选回退列表。每张卡片复制：

  ```sh
  dsh plugin --profile web add github:owner/repo
  ```

- **Skill** — 只说明。把 `SKILL.md` 放到工作区或 host skill 目录。
- **MCP** — 只说明。通过 `@deepseek-ai/dsh-mcp-client` 配置启用服务器。

## 许可证

MIT。Copyright (c) 2026 haibala / haibala-aii.
