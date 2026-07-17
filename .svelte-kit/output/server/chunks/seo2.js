import "clsx";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./root.js";
import "./state.svelte.js";
import { s as stegaClean } from "./use-preview.svelte.js";
function seoTitle(seo, fallback) {
  return (stegaClean(seo?.metaTitle ?? "") || stegaClean(fallback ?? "") || "").trim();
}
function seoDescription(seo, fallback) {
  return (stegaClean(seo?.metaDescription ?? "") || stegaClean(fallback ?? "") || "").trim();
}
function seoOgImageUrl(seo) {
  return seo?.ogImage?.asset?.url ?? null;
}
export {
  seoTitle as a,
  seoOgImageUrl as b,
  seoDescription as s
};
