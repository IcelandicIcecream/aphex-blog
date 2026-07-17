import { b as attr, e as escape_html, a as ensure_array_like, f as derived } from "../../../../../chunks/renderer.js";
import { P as PostCard } from "../../../../../chunks/PostCard.js";
import { S as Seo } from "../../../../../chunks/Seo.js";
import { s as seoDescription, a as seoTitle, b as seoOgImageUrl } from "../../../../../chunks/seo2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/root.js";
import "../../../../../chunks/state.svelte.js";
import "../../../../../chunks/index5.js";
import { u as usePreview } from "../../../../../chunks/use-preview.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const ve = usePreview();
    const author = derived(() => ve.live(data.author, { type: "author" }));
    const posts = derived(() => data.posts);
    const avatar = derived(() => ve.image(author().avatar));
    const seoImage = derived(() => seoOgImageUrl(author().seo) ?? avatar().src);
    Seo($$renderer2, {
      title: seoTitle(author().seo, author().name),
      description: seoDescription(author().seo, author().bio),
      image: seoImage(),
      noindex: author().seo?.noIndex
    });
    $$renderer2.push(`<!----> <section class="author-head svelte-sp8vp5"><a href="/blog" class="back svelte-sp8vp5">← All stories</a> <div class="ident svelte-sp8vp5">`);
    if (avatar().src) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img class="avatar svelte-sp8vp5"${attr("src", avatar().src)}${attr("alt", author().name)}/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div><p class="eyebrow svelte-sp8vp5">Author</p> <h1 class="svelte-sp8vp5">${escape_html(author().name)}</h1> `);
    if (author().role) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="role svelte-sp8vp5">${escape_html(author().role)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (author().bio) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="bio svelte-sp8vp5">${escape_html(author().bio)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if ((author().links?.length ?? 0) > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="links svelte-sp8vp5"><!--[-->`);
      const each_array = ensure_array_like(author().links ?? []);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link = each_array[$$index];
        if (link.url) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<a${attr("href", link.url)} target="_blank" rel="noopener noreferrer me" class="svelte-sp8vp5">${escape_html(link.label ?? link.url)}</a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <p class="count svelte-sp8vp5">${escape_html(posts().length)} ${escape_html(posts().length === 1 ? "story" : "stories")}</p></section> `);
    if (posts().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty svelte-sp8vp5"><p>No stories by ${escape_html(author().name)} yet.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="grid svelte-sp8vp5"><!--[-->`);
      const each_array_1 = ensure_array_like(posts());
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let post = each_array_1[$$index_1];
        PostCard($$renderer2, { post, tagMap: data.tagMap });
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
