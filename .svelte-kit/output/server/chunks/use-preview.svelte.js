import "clsx";
import { g as getContext, s as setContext } from "./renderer.js";
import { g as getLivePreviewDocument } from "./live-preview.svelte.js";
import { w, y } from "./index5.js";
function stegaClean(value) {
  return w(value);
}
function stegaEncode(value, payload) {
  return y(value, payload);
}
const PT_FIELD_KEY = /* @__PURE__ */ Symbol("aphex:pt-field");
function setPortableTextField(field) {
  setContext(PT_FIELD_KEY, typeof field === "function" ? field : () => field);
}
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
      return stegaEncode(raw || " ", { ...payload, field });
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
        // injected at load (server) or into the live doc (editor)
        alt: img?.alt || img?.asset?.alt || ""
        // per-placement override → asset default
      };
    }
  };
}
export {
  setPortableTextField as a,
  stegaClean as s,
  usePreview as u
};
