import { e as escape_html, a as ensure_array_like, f as derived } from "../../../../../chunks/renderer.js";
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
    const tag = derived(() => ve.live(data.tag, { type: "tag" }));
    const posts = derived(() => data.posts);
    const seoImage = derived(() => seoOgImageUrl(tag().seo));
    Seo($$renderer2, {
      title: seoTitle(tag().seo, `${tag().title} — Stories`),
      description: seoDescription(tag().seo, tag().description),
      image: seoImage(),
      noindex: tag().seo?.noIndex
    });
    $$renderer2.push(`<!----> <section class="tag-head svelte-1medrvo"><a href="/blog" class="back svelte-1medrvo">← All stories</a> <p class="eyebrow svelte-1medrvo">Topic</p> <h1 class="svelte-1medrvo">${escape_html(tag().title)}</h1> `);
    if (tag().description) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="sub svelte-1medrvo">${escape_html(tag().description)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <p class="count svelte-1medrvo">${escape_html(posts().length)} ${escape_html(posts().length === 1 ? "story" : "stories")}</p></section> `);
    if (posts().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty svelte-1medrvo"><p>No stories tagged “${escape_html(tag().title)}” yet.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="grid svelte-1medrvo"><!--[-->`);
      const each_array = ensure_array_like(posts());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let post = each_array[$$index];
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
