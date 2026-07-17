import { i as stegaClean } from "./dist4.js";
//#region src/lib/blog/seo.ts
/** Meta title: the SEO override, else the document title. Stega-cleaned for <head>. */
function seoTitle(seo, fallback) {
	return (stegaClean(seo?.metaTitle ?? "") || stegaClean(fallback ?? "") || "").trim();
}
/** Meta description: the SEO override, else the excerpt. Stega-cleaned for <head>. */
function seoDescription(seo, fallback) {
	return (stegaClean(seo?.metaDescription ?? "") || stegaClean(fallback ?? "") || "").trim();
}
/** URL for the SEO social image, if set (injected at load time via `injectAssetUrls`). */
function seoOgImageUrl(seo) {
	return seo?.ogImage?.asset?.url ?? null;
}
//#endregion
export { seoOgImageUrl as n, seoTitle as r, seoDescription as t };
