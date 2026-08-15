window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-extensions",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/catalog.ts
		const GITHUB_SEARCH = "https://api.github.com/search/repositories?q=topic:dsh-plugin&sort=stars&order=desc&per_page=24";
		const MIRROR_SEARCH = `https://ghfast.top/${GITHUB_SEARCH}`;
		/** Curated rows used when both GitHub endpoints fail. */
		const FALLBACK_ITEMS = [
			{
				id: "haibara757/dsh-ui-extensions",
				name: "dsh-ui-extensions",
				description: "Sidebar extension center that lists GitHub dsh-plugin repositories.",
				repo: "haibara757/dsh-ui-extensions"
			},
			{
				id: "whyihaveyou/dsh-suite",
				name: "dsh-suite",
				description: "Living plugin directory plus an in-app store and scaffolder.",
				repo: "whyihaveyou/dsh-suite"
			},
			{
				id: "Toukaiteio/dsh-plugin-installer",
				name: "dsh-plugin-installer",
				description: "Marketplace tab that discovers GitHub topic repositories.",
				repo: "Toukaiteio/dsh-plugin-installer"
			},
			{
				id: "0xsline/awesome-deepseek-harness",
				name: "awesome-deepseek-harness",
				description: "Curated list of plugins, skills, and MCP servers.",
				repo: "0xsline/awesome-deepseek-harness"
			}
		];
		/**
		* Build the official profile-install command for a GitHub repository.
		* @param repo - `owner/repo`.
		* @returns the `dsh plugin add` command for the web profile.
		*/
		function installCommand(repo) {
			return `dsh plugin --profile web add github:${repo}`;
		}
		/**
		* Map a GitHub search payload to catalog rows.
		* @param payload - parsed `search/repositories` JSON.
		* @returns rows for every complete repository item.
		*/
		function parseGithubSearch(payload) {
			if (payload === null || typeof payload !== "object" || !("items" in payload)) return [];
			const items = payload.items;
			if (!Array.isArray(items)) return [];
			const rows = [];
			for (const item of items) {
				if (item === null || typeof item !== "object") continue;
				const record = item;
				if (typeof record.full_name !== "string" || record.full_name === "") continue;
				rows.push({
					id: record.full_name,
					name: typeof record.name === "string" && record.name !== "" ? record.name : record.full_name,
					description: typeof record.description === "string" ? record.description : "",
					repo: record.full_name,
					...typeof record.stargazers_count === "number" ? { stars: record.stargazers_count } : {}
				});
			}
			return rows;
		}
		/**
		* Fetch one JSON URL.
		* @param url - absolute URL.
		* @param fetchImpl - fetch implementation (tests inject a stub).
		* @returns parsed JSON, or undefined when the request fails.
		*/
		async function readJson(url, fetchImpl) {
			try {
				const response = await fetchImpl(url, { headers: { Accept: "application/vnd.github+json" } });
				if (!response.ok) return void 0;
				return await response.json();
			} catch {
				return;
			}
		}
		/**
		* Load the plugin catalog: GitHub, then the ghfast mirror, then the fallback.
		* @param fetchImpl - fetch implementation; defaults to the platform `fetch`.
		* @returns rows plus the source that produced them.
		*/
		async function fetchPluginCatalog(fetchImpl = fetch) {
			const github = parseGithubSearch(await readJson(GITHUB_SEARCH, fetchImpl));
			if (github.length > 0) return {
				items: github,
				source: "github"
			};
			const mirror = parseGithubSearch(await readJson(MIRROR_SEARCH, fetchImpl));
			if (mirror.length > 0) return {
				items: mirror,
				source: "mirror"
			};
			return {
				items: [...FALLBACK_ITEMS],
				source: "fallback"
			};
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region \0dsh-css:E:\dsh\packages\client\ui-extensions\src\client\ExtensionCenter.module.css.mjs
		const css$1 = ".kW1kPG_root{background:var(--dsw-alias-bg-base);min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;flex:1;padding:28px 36px 32px;display:flex;overflow:auto}.kW1kPG_title{margin:0 0 6px;font-size:22px;font-weight:600;line-height:30px}.kW1kPG_subtitle{color:var(--dsw-alias-label-secondary);max-width:640px;margin:0 0 16px;font-size:13px;line-height:20px}.kW1kPG_tabs{gap:8px;margin-bottom:14px;display:flex}.kW1kPG_tab{border:1px solid var(--dsw-alias-border-l2);height:30px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border-radius:999px;padding:0 12px;font-size:13px}.kW1kPG_tabCurrent{background:var(--dsw-alias-bg-multi-select);color:var(--dsw-alias-label-primary);border-color:#0000}.kW1kPG_search{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);height:38px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:10px;margin-bottom:12px;padding:0 12px;font-size:13px}.kW1kPG_source{color:var(--dsw-alias-label-secondary);margin:0 0 16px;font-size:12px}.kW1kPG_note{color:var(--dsw-alias-label-secondary);max-width:640px;margin:0;font-size:14px;line-height:22px}.kW1kPG_cards{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;display:grid}.kW1kPG_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:12px;flex-direction:column;gap:8px;padding:14px;display:flex}.kW1kPG_cardName{margin:0;font-size:14px;font-weight:600}.kW1kPG_cardBody{color:var(--dsw-alias-label-secondary);flex:1;margin:0;font-size:12px;line-height:18px}.kW1kPG_stars{color:var(--dsw-alias-label-secondary);font-size:12px}.kW1kPG_actions{flex-wrap:wrap;gap:8px;display:flex}.kW1kPG_link{border:1px solid var(--dsw-alias-border-l2);height:28px;color:var(--dsw-alias-label-primary);font:inherit;background:0 0;border-radius:8px;align-items:center;padding:0 10px;font-size:12px;text-decoration:none;display:inline-flex}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-extensions/ExtensionCenter.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-extensions";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var ExtensionCenter_module_css_default = {
			"subtitle": "kW1kPG_subtitle",
			"source": "kW1kPG_source",
			"search": "kW1kPG_search",
			"note": "kW1kPG_note",
			"cards": "kW1kPG_cards",
			"tab": "kW1kPG_tab",
			"card": "kW1kPG_card",
			"cardBody": "kW1kPG_cardBody",
			"stars": "kW1kPG_stars",
			"cardName": "kW1kPG_cardName",
			"actions": "kW1kPG_actions",
			"title": "kW1kPG_title",
			"tabs": "kW1kPG_tabs",
			"tabCurrent": "kW1kPG_tabCurrent",
			"root": "kW1kPG_root",
			"link": "kW1kPG_link"
		};
		//#endregion
		//#region src/client/ExtensionCenter.tsx
		/**
		* Center-column extension catalog: GitHub topic search plus install-command copy.
		*/
		/**
		* Render the extension center.
		* @param props - locale seat plus the catalog loader.
		* @returns the catalog page.
		*/
		function ExtensionCenter({ t, loadCatalog }) {
			const [tab, setTab] = (0, react.useState)("plugin");
			const [query, setQuery] = (0, react.useState)("");
			const [result, setResult] = (0, react.useState)(void 0);
			const [copied, setCopied] = (0, react.useState)(void 0);
			(0, react.useEffect)(() => {
				let cancelled = false;
				loadCatalog().then((next) => {
					if (!cancelled) setResult(next);
				});
				return () => {
					cancelled = true;
				};
			}, [loadCatalog]);
			const items = (0, react.useMemo)(() => {
				const rows = result?.items ?? [];
				const needle = query.trim().toLowerCase();
				if (needle === "") return rows;
				return rows.filter((row) => row.name.toLowerCase().includes(needle) || row.description.toLowerCase().includes(needle) || row.repo.toLowerCase().includes(needle));
			}, [query, result]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: ExtensionCenter_module_css_default.root,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", {
						className: ExtensionCenter_module_css_default.title,
						children: t("center.title")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: ExtensionCenter_module_css_default.subtitle,
						children: t("center.subtitle")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: ExtensionCenter_module_css_default.tabs,
						role: "tablist",
						children: [
							"plugin",
							"skill",
							"mcp"
						].map((id) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							className: clsx(ExtensionCenter_module_css_default.tab, tab === id && ExtensionCenter_module_css_default.tabCurrent),
							"aria-selected": tab === id,
							onClick: () => {
								setTab(id);
							},
							children: t(`center.tab.${id}`)
						}, id))
					}),
					tab === "skill" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: ExtensionCenter_module_css_default.note,
						children: t("center.skill.body")
					}),
					tab === "mcp" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: ExtensionCenter_module_css_default.note,
						children: t("center.mcp.body")
					}),
					tab === "plugin" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							className: ExtensionCenter_module_css_default.search,
							value: query,
							placeholder: t("center.search"),
							onChange: (event) => {
								setQuery(event.target.value);
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: ExtensionCenter_module_css_default.source,
							children: result === void 0 ? t("center.loading") : t(`center.source.${result.source}`)
						}),
						result !== void 0 && items.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: ExtensionCenter_module_css_default.note,
							children: t("center.empty")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: ExtensionCenter_module_css_default.cards,
							children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogCard, {
								item,
								copied: copied === item.id,
								installLabel: t("center.install"),
								copiedLabel: t("center.copied"),
								openLabel: t("center.open"),
								onCopy: async () => {
									if (await (0, _deepseek_ai_dsh_client_ui_primitives.writeClipboard)(installCommand(item.repo))) setCopied(item.id);
								}
							}, item.id))
						})
					] })
				]
			});
		}
		function CatalogCard(props) {
			const { item, copied, installLabel, copiedLabel, openLabel, onCopy } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
				className: ExtensionCenter_module_css_default.card,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
						className: ExtensionCenter_module_css_default.cardName,
						children: item.name
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: ExtensionCenter_module_css_default.cardBody,
						children: item.description
					}),
					item.stars !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: ExtensionCenter_module_css_default.stars,
						children: item.stars
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ExtensionCenter_module_css_default.actions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "primary",
							size: "sm",
							onClick: onCopy,
							children: copied ? copiedLabel : installLabel
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
							className: ExtensionCenter_module_css_default.link,
							href: `https://github.com/${item.repo}`,
							target: "_blank",
							rel: "noreferrer",
							children: openLabel
						})]
					})
				]
			});
		}
		//#endregion
		//#region src/client/surface-id.ts
		/** `shell.surface` / `openSurface` key for the extension center. */
		const EXTENSION_SURFACE_ID = "extensions";
		//#endregion
		//#region \0dsh-css:E:\dsh\packages\client\ui-extensions\src\client\ExtensionNav.module.css.mjs
		const css = "._5R_mgq_item{box-sizing:border-box;height:34px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:8px;flex:none;align-items:center;gap:10px;width:100%;padding:0 10px;font-size:14px;font-weight:400;line-height:22px;display:flex;overflow:hidden}._5R_mgq_item:hover{background:var(--dsw-alias-interactive-bg-hover)}._5R_mgq_current{background:var(--dsw-alias-bg-multi-select)}._5R_mgq_rail{justify-content:center;gap:0;width:36px;height:36px;padding:0}._5R_mgq_label{white-space:nowrap;overflow:hidden}._5R_mgq_rail ._5R_mgq_label{display:none}";
		const tagId = "@deepseek-ai/dsh-client-ui-extensions/ExtensionNav.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-extensions";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var ExtensionNav_module_css_default = {
			"current": "_5R_mgq_current",
			"rail": "_5R_mgq_rail",
			"item": "_5R_mgq_item",
			"label": "_5R_mgq_label"
		};
		//#endregion
		//#region src/client/ExtensionNav.tsx
		/**
		* Additive sidebar nav row that opens the extension-center surface.
		*/
		/**
		* Render the Extensions nav row.
		* @param props - owner share (wide / surface / openSurface) plus locale.
		* @returns the nav button.
		*/
		function ExtensionNav({ wide, surface, openSurface, t }) {
			const current = surface === EXTENSION_SURFACE_ID;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label: t("nav.aria"),
				delayMs: 500,
				disabled: wide,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					className: clsx(ExtensionNav_module_css_default.item, current && ExtensionNav_module_css_default.current, !wide && ExtensionNav_module_css_default.rail),
					"aria-label": t("nav.aria"),
					"aria-current": current ? "page" : void 0,
					onClick: () => {
						openSurface(EXTENSION_SURFACE_ID);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCordisPluginOutline14, { size: wide ? 14 : 18 }), wide && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: ExtensionNav_module_css_default.label,
						children: t("nav.label")
					})]
				})
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `extensions` namespace dictionaries. */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"nav.label": "扩展",
			"nav.aria": "打开扩展中心",
			"center.title": "扩展",
			"center.subtitle": "从 GitHub 发现 DSH 插件。安装走官方 `dsh plugin add`，本页只负责发现和复制命令。",
			"center.search": "搜索仓库…",
			"center.loading": "正在拉取 GitHub…",
			"center.empty": "没有匹配的仓库。",
			"center.source.github": "来源：GitHub topic dsh-plugin",
			"center.source.mirror": "来源：GitHub 镜像",
			"center.source.fallback": "GitHub 不可达，显示精选目录",
			"center.install": "复制安装命令",
			"center.copied": "已复制",
			"center.open": "打开仓库",
			"center.tab.plugin": "插件",
			"center.tab.skill": "Skill",
			"center.tab.mcp": "MCP",
			"center.skill.body": "Skill 不是 bundle。把 SKILL.md 放到工作区或 host skill 目录后，当前会话的 skill 目录会列出它们。",
			"center.mcp.body": "MCP 服务器通过 `@deepseek-ai/dsh-mcp-client` 的配置启用。每条服务器命令都是受信任的可执行代码，默认不开启任何服务器。"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"nav.label": "Extensions",
			"nav.aria": "Open the extension center",
			"center.title": "Extensions",
			"center.subtitle": "Discover DSH plugins on GitHub. Install still uses official `dsh plugin add`; this page only finds packages and copies the command.",
			"center.search": "Search repositories…",
			"center.loading": "Loading GitHub…",
			"center.empty": "No matching repositories.",
			"center.source.github": "Source: GitHub topic dsh-plugin",
			"center.source.mirror": "Source: GitHub mirror",
			"center.source.fallback": "GitHub unreachable; showing a curated list",
			"center.install": "Copy install command",
			"center.copied": "Copied",
			"center.open": "Open repository",
			"center.tab.plugin": "Plugins",
			"center.tab.skill": "Skills",
			"center.tab.mcp": "MCP",
			"center.skill.body": "Skills are not bundles. Place SKILL.md files in the workspace or host skill directory; the live skill catalog lists them.",
			"center.mcp.body": "MCP servers are enabled through `@deepseek-ai/dsh-mcp-client` config. Each server command is trusted executable code; no server is enabled by default."
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS = "extensions";
		/** Required services: slots plus the two declaration owners and locale. */
		const inject = ["slots", "locale"];
		/**
		* Register the Extensions nav row and the extension-center surface.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-extensions: dictionaries");
			ctx.slots.inject("sidebar.nav", () => ctx.slots.register({
				name: "sidebar.nav",
				id: "extensions",
				locale: NS
			}, ExtensionNav));
			ctx.slots.inject("shell.surface", () => ctx.slots.register({
				name: "shell.surface",
				key: EXTENSION_SURFACE_ID,
				locale: NS,
				inject: () => ({ loadCatalog: () => fetchPluginCatalog() })
			}, ExtensionCenter));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map