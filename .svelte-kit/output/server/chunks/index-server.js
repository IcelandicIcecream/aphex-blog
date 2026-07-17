import { r as __exportAll } from "./rolldown-runtime.js";
import { Ct as hydratable_serialization_failed, Et as uneval, Tt as experimental_async_required, _t as getAllContexts, at as async_mode_flag, bt as setContext, gt as createContext, ht as run, it as get_render_context, ot as getAbortSignal, pt as noop, vt as getContext, wt as lifecycle_function_unavailable, xt as ssr_context, yt as hasContext } from "./dev.js";
//#region ../../node_modules/.pnpm/svelte@5.55.5_@typescript-eslint+types@8.57.2/node_modules/svelte/src/internal/server/hydratable.js
/** @import { HydratableLookupEntry } from '#server' */
/**
* @template T
* @param {string} key
* @param {() => T} fn
* @returns {T}
*/
function hydratable(key, fn) {
	if (!async_mode_flag) experimental_async_required("hydratable");
	const { hydratable } = get_render_context();
	let entry = hydratable.lookup.get(key);
	if (entry !== void 0) return entry.value;
	const value = fn();
	entry = encode(key, value, hydratable.unresolved_promises);
	hydratable.lookup.set(key, entry);
	return value;
}
/**
* @param {string} key
* @param {any} value
* @param {Map<Promise<any>, string>} [unresolved]
*/
function encode(key, value, unresolved) {
	/** @type {HydratableLookupEntry} */
	const entry = {
		value,
		serialized: ""
	};
	let uid = 1;
	entry.serialized = uneval(entry.value, (value, uneval) => {
		if (is_promise(value)) {
			const placeholder = `"${uid++}"`;
			const p = value.then((v) => {
				entry.serialized = entry.serialized.replace(placeholder, `r(${uneval(v)})`);
			}).catch((devalue_error) => hydratable_serialization_failed(key, serialization_stack(entry.stack, devalue_error?.stack)));
			unresolved?.set(p, key);
			p.catch(() => {}).finally(() => unresolved?.delete(p));
			(entry.promises ??= []).push(p);
			return placeholder;
		}
	});
	return entry;
}
/**
* @param {any} value
* @returns {value is Promise<any>}
*/
function is_promise(value) {
	return Object.prototype.toString.call(value) === "[object Promise]";
}
/**
* @param {string | undefined} root_stack
* @param {string | undefined} uneval_stack
*/
function serialization_stack(root_stack, uneval_stack) {
	let out = "";
	if (root_stack) out += root_stack + "\n";
	if (uneval_stack) out += "Caused by:\n" + uneval_stack + "\n";
	return out || "<missing stack trace>";
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.55.5_@typescript-eslint+types@8.57.2/node_modules/svelte/src/internal/server/blocks/snippet.js
/** @import { Snippet } from 'svelte' */
/** @import { Renderer } from '../renderer' */
/** @import { Getters } from '#shared' */
/**
* Create a snippet programmatically
* @template {unknown[]} Params
* @param {(...params: Getters<Params>) => {
*   render: () => string
*   setup?: (element: Element) => void | (() => void)
* }} fn
* @returns {Snippet<Params>}
*/
function createRawSnippet(fn) {
	return (renderer, ...args) => {
		var getters = args.map((value) => () => value);
		renderer.push(fn(...getters).render().trim());
	};
}
//#endregion
//#region ../../node_modules/.pnpm/svelte@5.55.5_@typescript-eslint+types@8.57.2/node_modules/svelte/src/index-server.js
/** @import { SSRContext } from '#server' */
/** @import { Renderer } from './internal/server/renderer.js' */
var index_server_exports = /* @__PURE__ */ __exportAll({
	afterUpdate: () => noop,
	beforeUpdate: () => noop,
	createContext: () => createContext,
	createEventDispatcher: () => createEventDispatcher,
	createRawSnippet: () => createRawSnippet,
	flushSync: () => noop,
	fork: () => fork,
	getAbortSignal: () => getAbortSignal,
	getAllContexts: () => getAllContexts,
	getContext: () => getContext,
	hasContext: () => hasContext,
	hydratable: () => hydratable,
	hydrate: () => hydrate,
	mount: () => mount,
	onDestroy: () => onDestroy,
	onMount: () => noop,
	setContext: () => setContext,
	settled: () => settled,
	tick: () => tick,
	unmount: () => unmount,
	untrack: () => run
});
/** @param {() => void} fn */
function onDestroy(fn) {
	/** @type {Renderer} */ ssr_context.r.on_destroy(fn);
}
function createEventDispatcher() {
	return noop;
}
function mount() {
	lifecycle_function_unavailable("mount");
}
function hydrate() {
	lifecycle_function_unavailable("hydrate");
}
function unmount() {
	lifecycle_function_unavailable("unmount");
}
function fork() {
	lifecycle_function_unavailable("fork");
}
async function tick() {}
async function settled() {}
//#endregion
export { unmount as a, tick as i, mount as n, hydratable as o, settled as r, index_server_exports as t };
