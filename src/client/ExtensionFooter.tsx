/**
 * Official-slot fallback: a `sidebar.footer.action` row that opens the overlay.
 */
import clsx from 'clsx'
import { IconCordisPluginOutline14, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type { createExtensionsStore } from './store.ts'
import css from './ExtensionNav.module.css'

/** Footer-row props: column width, locale, and the overlay store. */
export type ExtensionFooterProps =
  & PropsRuntime<'sidebar.footer.action'>
  & PropsLocale<'extensions'>
  & PropsStore<ReturnType<typeof createExtensionsStore>>

/**
 * Render the Extensions footer action.
 * @param props - owner share (`wide`) plus locale and overlay actions.
 * @returns the footer button.
 */
export function ExtensionFooter({ wide, t, actions }: ExtensionFooterProps) {
  return (
    <Tooltip label={t('nav.aria')} delayMs={500} disabled={wide}>
      <button
        type="button"
        className={clsx(css.item, !wide && css.rail)}
        aria-label={t('nav.aria')}
        onClick={() => { actions.openOverlay() }}
      >
        <IconCordisPluginOutline14 size={wide ? 14 : 18} />
        {wide && <span className={css.label}>{t('nav.label')}</span>}
      </button>
    </Tooltip>
  )
}
