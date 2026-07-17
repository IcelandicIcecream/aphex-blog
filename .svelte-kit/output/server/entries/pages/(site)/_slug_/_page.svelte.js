import { t as attr_style, d as stringify, e as escape_html, b as attr, f as derived } from "../../../../chunks/renderer.js";
import { P as Prose } from "../../../../chunks/Prose.js";
import { S as Seo } from "../../../../chunks/Seo.js";
import { s as seoDescription, a as seoTitle, b as seoOgImageUrl } from "../../../../chunks/seo2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import { u as usePreview, s as stegaClean } from "../../../../chunks/use-preview.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const ve = usePreview();
    const page = derived(() => ve.live(data.page, { type: "page" }));
    const cover = derived(() => ve.image(page().coverImage));
    const coverAlt = derived(() => cover().alt || stegaClean(page().title ?? ""));
    const seoImage = derived(() => seoOgImageUrl(page().seo) ?? cover().src);
    const containerPad = derived(() => page().containerPadding != null ? `${page().containerPadding}px` : null);
    const headerAlign = derived(() => stegaClean(page().headerAlign ?? "left"));
    Seo($$renderer2, {
      title: seoTitle(page().seo, page().title),
      description: seoDescription(page().seo, page().excerpt),
      image: seoImage(),
      noindex: page().seo?.noIndex
    });
    $$renderer2.push(`<!----> <article class="page svelte-14dib2x"${attr_style(containerPad() ? `--page-pad: ${containerPad()}` : void 0)}><header class="page__head svelte-14dib2x"${attr_style(`text-align: ${stringify(headerAlign())}`)}><h1 class="svelte-14dib2x">${escape_html(page().title ?? "Untitled")}</h1> `);
    if (page().excerpt) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="lead svelte-14dib2x">${escape_html(page().excerpt)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> `);
    if (cover().src) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<figure class="cover svelte-14dib2x"><img${attr("src", cover().src)}${attr("alt", ve.encode(coverAlt(), { field: "coverImage" }))} class="svelte-14dib2x"/></figure>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (page().content && Array.isArray(page().content)) {
      $$renderer2.push("<!--[0-->");
      Prose($$renderer2, { value: page().content });
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-body svelte-14dib2x">This page has no content yet.</p>`);
    }
    $$renderer2.push(`<!--]--></article>`);
  });
}
export {
  _page as default
};
