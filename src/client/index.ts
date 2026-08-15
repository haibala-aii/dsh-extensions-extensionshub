/**
 * Extension center: a sidebar.nav row and a keyed shell.surface page.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { fetchPluginCatalog } from './catalog.ts'
import { ExtensionCenter } from './ExtensionCenter.tsx'
import { ExtensionFooter } from './ExtensionFooter.tsx'
import { ExtensionNav } from './ExtensionNav.tsx'
import { ExtensionOverlay } from './ExtensionOverlay.tsx'
import { createExtensionsStore } from './store.ts'
import { EXTENSION_SURFACE_ID } from './surface-id.ts'
import { en, zh, type ExtensionsKey } from './locales.ts'

export type { ExtensionsKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Extension-center copy. */
    extensions: ExtensionsKey
  }
}

/** Dictionary namespace owned by this plugin. */
const NS = 'extensions'

/** Required services: slots plus the two declaration owners and locale. */
export const inject = ['slots', 'locale']

/**
 * Register the Extensions entry and catalog.
 * Prefers `sidebar.nav` + `shell.surface` when the host declares them.
 * Otherwise occupies the official additive seats `sidebar.footer.action`
 * and `shell.overlay` — a third-party bundle cannot add children to
 * AppFrame or SidebarRoot.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-extensions: dictionaries')
  const store = createExtensionsStore()
  const loadCatalog = () => fetchPluginCatalog()

  ctx.slots.inject('sidebar.nav', () => ctx.slots.register({
    name: 'sidebar.nav',
    id: 'extensions',
    locale: NS,
  }, ExtensionNav))

  ctx.slots.inject('shell.surface', () => ctx.slots.register({
    name: 'shell.surface',
    key: EXTENSION_SURFACE_ID,
    locale: NS,
    inject: () => ({ loadCatalog }),
  }, ExtensionCenter))

  ctx.slots.inject('sidebar.footer.action', () => {
    if (ctx.slots.spec('sidebar.nav') !== undefined) return () => {}
    return ctx.slots.register({
      name: 'sidebar.footer.action',
      id: 'extensions',
      locale: NS,
      store,
    }, ExtensionFooter)
  })

  ctx.slots.inject('shell.overlay', () => {
    if (ctx.slots.spec('shell.surface') !== undefined) return () => {}
    return ctx.slots.register({
      name: 'shell.overlay',
      id: 'extensions',
      locale: NS,
      store,
      inject: () => ({ loadCatalog }),
    }, ExtensionOverlay)
  })
}
