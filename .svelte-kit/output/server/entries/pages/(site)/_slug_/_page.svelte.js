import { $ as attr, m as stringify, r as attr_style, s as derived, tt as escape_html } from "../../../../chunks/dev.js";
import { i as stegaClean, n as usePreview } from "../../../../chunks/dist4.js";
import { t as Prose } from "../../../../chunks/Prose.js";
import { t as Seo } from "../../../../chunks/Seo.js";
import { n as seoOgImageUrl, r as seoTitle, t as seoDescription } from "../../../../chunks/seo2.js";
//#region src/routes/(site)/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const ve = usePreview();
		const page = derived(() => ve.live(data.page, { type: "page" }));
		const cover = derived(() => ve.image(page().coverImage));
		const coverAlt = derived(() => cover().alt || stegaClean(page().title ?? ""));
		const seoImage = derived(() => seoOgImageUrl(page().seo) ?? cover().src);
		const containerPad = derived(() => page().containerPadding != null ? `${page().containerPadding}px` : null);
		const headerAlign = derived(() => stegaClean(page().headerAlign ?? "left"));
		Seo($$renderer, {
			title: seoTitle(page().seo, page().title),
			description: seoDescription(page().seo, page().excerpt),
			image: seoImage(),
			noindex: page().seo?.noIndex
		});
		$$renderer.push(`<!----> <article class="page svelte-14dib2x"${attr_style(containerPad() ? `--page-pad: ${containerPad()}` : void 0)}><header class="page__head svelte-14dib2x"${attr_style(`text-align: ${stringify(headerAlign())}`)}><h1 class="svelte-14dib2x">${escape_html(page().title ?? "Untitled")}</h1> `);
		if (page().excerpt) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="lead svelte-14dib2x">${escape_html(page().excerpt)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header> `);
		if (cover().src) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<figure class="cover svelte-14dib2x"><img${attr("src", cover().src)}${attr("alt", ve.encode(coverAlt(), { field: "coverImage" }))} class="svelte-14dib2x"/></figure>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (page().content && Array.isArray(page().content)) {
			$$renderer.push("<!--[0-->");
			Prose($$renderer, { value: page().content });
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="empty-body svelte-14dib2x">This page has no content yet.</p>`);
		}
		$$renderer.push(`<!--]--></article>`);
	});
}
//#endregion
export { _page as default };
