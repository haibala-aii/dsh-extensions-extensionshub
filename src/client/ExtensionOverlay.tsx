/**
 * Official-slot fallback: a `shell.overlay` page that covers the frame.
 * Renders nothing while closed so the click-through overlay layer stays empty.
 */
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import { ExtensionCenter } from './ExtensionCenter.tsx'
import type { ExtensionCenterInjected } from './ExtensionCenter.tsx'
import type { createExtensionsStore } from './store.ts'
import css from './ExtensionOverlay.module.css'

/** Overlay props: locale, catalog loader, and the overlay store. */
export type ExtensionOverlayProps =
  & PropsRuntime<'shell.overlay'>
  & PropsLocale<'extensions'>
  & PropsStore<ReturnType<typeof createExtensionsStore>>
  & ExtensionCenterInjected

/**
 * Render the extension catalog as a frame overlay, or null while closed.
 * @param props - locale, catalog loader, overlay store, and framework hooks.
 * @returns the overlay dialog, or null.
 */
export function ExtensionOverlay({
  t, loadCatalog, useStore, actions, useSessions, useWorkspaces,
}: ExtensionOverlayProps) {
  const open = useStore(s => s.overlayOpen)
  if (!open) return null
  return (
    <div className={css.overlay} role="dialog" aria-label={t('center.title')}>
      <button type="button" className={css.close} onClick={() => { actions.closeOverlay() }}>
        {t('center.close')}
      </button>
      <ExtensionCenter
        t={t}
        loadCatalog={loadCatalog}
        useSessions={useSessions}
        useWorkspaces={useWorkspaces}
      />
    </div>
  )
}
