import { bt as setContext, vt as getContext } from "./dev.js";
import "./index-server.js";
import "./navigation.js";
import { n as y, t as w } from "./dist5.js";
//#region ../../node_modules/.pnpm/@aphexcms+visual-editing@0.2.0_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+_969cc3b7339c2c905fd2d4f5f98623d0/node_modules/@aphexcms/visual-editing/dist/live-preview.svelte.js
var KEY = Symbol("aphex:live-preview");
var LivePreviewContext = class {
	current = null;
	currentType = null;
	currentId = null;
};
function setLivePreviewContext() {
	const ctx = new LivePreviewContext();
	setContext(KEY, ctx);
	return ctx;
}
/**
* Returns the live preview document context set by <AphexVisualOverlay>.
* `preview.current` is null until the CMS pushes data via postMessage.
* Use as: `const post = $derived(preview.current ?? data.post)`
*/
function getLivePreviewDocument() {
	return getContext(KEY) ?? new LivePreviewContext();
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+visual-editing@0.2.0_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+_969cc3b7339c2c905fd2d4f5f98623d0/node_modules/@aphexcms/visual-editing/dist/stega.js
/**
* Remove all stega-encoded data from a string or deep JSON structure.
* Use in <svelte:head> (title, meta), alt text, aria-labels, comparisons.
*/
function stegaClean(value) {
	return w(value);
}
/**
* Stamp a navigation payload onto a string as invisible stega characters.
*
* The CMS auto-encodes a document's own string fields, but values that aren't
* literally in the document — a resolved `reference` label, a denormalized
* title — have nothing to stamp. Encode those at render time so the overlay
* treats them like any other clickable field. Returns the value unchanged if
* it's empty.
*/
function stegaEncode(value, payload) {
	if (!value) return value;
	return y(value, payload);
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+visual-editing@0.2.0_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+_969cc3b7339c2c905fd2d4f5f98623d0/node_modules/@aphexcms/visual-editing/dist/AphexVisualOverlay.svelte
function AphexVisualOverlay($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* Whether to use stega encoding for auto-detecting fields.
		* Must match the setting in DocumentEditor / aphex.config.ts. Default: true.
		*/
		let { stega = true, children } = $$props;
		setLivePreviewContext();
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+visual-editing@0.2.0_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+_969cc3b7339c2c905fd2d4f5f98623d0/node_modules/@aphexcms/visual-editing/dist/use-preview.svelte.js
var PT_FIELD_KEY = Symbol("aphex:pt-field");
function setPortableTextField(field) {
	setContext(PT_FIELD_KEY, typeof field === "function" ? field : () => field);
}
/**
* One-call visual-editing helper for a page or component. Reads the context set by
* `<AphexVisualOverlay>` (and any Portable Text field context). Call once during init.
*
* @example
* const ve = usePreview();
* const post = $derived(ve.live(data.post));
* const cover = $derived(ve.image(post.coverImage));
* // <time datetime={ve.encode(post.postDate, { field: 'postDate' })}>
* // <img src={cover.src} alt={ve.encode(cover.alt, { field: 'coverImage' })} />
*/
function usePreview() {
	const ctx = getLivePreviewDocument();
	const ptField = getContext(PT_FIELD_KEY);
	return {
		get inPreview() {
			return ctx.current != null;
		},
		get document() {
			return ctx.current;
		},
		live(fallback, options = {}) {
			if (options.type && ctx.currentType !== options.type) return fallback;
			if (options.id && ctx.currentId !== options.id) return fallback;
			return ctx.current ?? fallback;
		},
		encode(value, payload = {}) {
			const raw = value ?? "";
			if (ctx.current == null) return raw;
			const field = payload.field ?? ptField?.();
			if (!field) return raw;
			return stegaEncode(raw || " ", {
				...payload,
				field
			});
		},
		edit(target) {
			const attrs = {};
			if (ctx.current == null) return attrs;
			attrs["data-aphex-field"] = target.field ?? "title";
			attrs["data-aphex-document-id"] = target.id;
			attrs["data-aphex-document-type"] = target.type;
			return attrs;
		},
		image(img) {
			return {
				src: img?.asset?.url ?? null,
				alt: img?.alt || img?.asset?.alt || ""
			};
		}
	};
}
//#endregion
export { stegaClean as i, usePreview as n, AphexVisualOverlay as r, setPortableTextField as t };
