//#region lib/types/invariant.js
/**
* Package-owned invariant companion for `@haibala-aii/dsh-extensions-extensionshub`.
* @module @haibala-aii/dsh-extensions-extensionshub/invariant
*/
const PACKAGE_NAME = "@haibala-aii/dsh-extensions-extensionshub";
/** Cordis companion plugin name. */
const name = "client-ui-extensions-invariant";
/** Service required before the companion can reserve package ownership. */
const inject = ["invariants"];
/**
* No runtime invariant: slot registrations are effects owned by the slot
* registry; the catalog fetch is a disposable browser read with no durable
* cross-plugin state.
*/
const install = () => {};
/**
* Register this package's invariant companion.
* @param ctx - Cordis context carrying the invariant service.
* @returns The installed registration's disposer after setup succeeds.
*/
const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
//#endregion
export { apply, inject, name };

