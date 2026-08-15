/**
 * Overlay-open flag used only when the host has no `shell.surface`.
 * Module-level factory only — apply calls it once and shares the handle.
 */
import { defineStore } from '@deepseek-ai/dsh-client-runtime/client'

/** Overlay visibility for the official-slot fallback. */
type ExtensionsState = {
  overlayOpen: boolean
}

/**
 * Shared overlay store for the footer button and the `shell.overlay` page.
 * @returns a store handle; call once in `apply`.
 */
export function createExtensionsStore() {
  return defineStore({
    init: (): ExtensionsState => ({ overlayOpen: false }),
    actions: {
      openOverlay: (draft: ExtensionsState) => { draft.overlayOpen = true },
      closeOverlay: (draft: ExtensionsState) => { draft.overlayOpen = false },
    },
  })
}
