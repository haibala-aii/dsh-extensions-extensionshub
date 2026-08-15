/**
 * Extension center: a sidebar.nav row and a keyed shell.surface page.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { fetchPluginCatalog } from './catalog.ts'
import { ExtensionCenter } from './ExtensionCenter.tsx'
import { ExtensionNav } from './ExtensionNav.tsx'
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
 * Register the Extensions nav row and the extension-center surface.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-extensions: dictionaries')

  ctx.slots.inject('sidebar.nav', () => ctx.slots.register({
    name: 'sidebar.nav',
    id: 'extensions',
    locale: NS,
  }, ExtensionNav))

  ctx.slots.inject('shell.surface', () => ctx.slots.register({
    name: 'shell.surface',
    key: EXTENSION_SURFACE_ID,
    locale: NS,
    inject: () => ({ loadCatalog: () => fetchPluginCatalog() }),
  }, ExtensionCenter))
}
