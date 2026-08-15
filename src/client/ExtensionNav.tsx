/**
 * Additive sidebar nav row that opens the extension-center surface.
 */
import clsx from 'clsx'
import { IconCordisPluginOutline14, Tooltip } from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { EXTENSION_SURFACE_ID } from './surface-id.ts'
import css from './ExtensionNav.module.css'

/** Composed nav-row props: sidebar.nav owner share plus locale. */
export type ExtensionNavProps =
  & PropsRuntime<'sidebar.nav'>
  & PropsLocale<'extensions'>

/**
 * Render the Extensions nav row.
 * @param props - owner share (wide / surface / openSurface) plus locale.
 * @returns the nav button.
 */
export function ExtensionNav({ wide, surface, openSurface, t }: ExtensionNavProps) {
  const current = surface === EXTENSION_SURFACE_ID
  return (
    <Tooltip label={t('nav.aria')} delayMs={500} disabled={wide}>
      <button
        type="button"
        className={clsx(css.item, current && css.current, !wide && css.rail)}
        aria-label={t('nav.aria')}
        aria-current={current ? 'page' : undefined}
        onClick={() => { openSurface(EXTENSION_SURFACE_ID) }}
      >
        <IconCordisPluginOutline14 size={wide ? 14 : 18} />
        {wide && <span className={css.label}>{t('nav.label')}</span>}
      </button>
    </Tooltip>
  )
}
