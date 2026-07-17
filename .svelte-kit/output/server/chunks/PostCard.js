import { h as attributes, d as stringify, b as attr, e as escape_html, a as ensure_array_like, f as derived } from "./renderer.js";
import { r as readingTime } from "./reading-time.js";
import { p as postTags } from "./tags.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./root.js";
import "./state.svelte.js";
import "./index5.js";
import { u as usePreview } from "./use-preview.svelte.js";
function PostCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { post, tagMap } = $$props;
    const ve = usePreview();
    const cover = derived(() => ve.image(post.coverImage));
    const coverAlt = derived(() => cover().alt || post.title);
    const tags = derived(() => postTags(post.tags, tagMap));
    function formatDate(dateStr) {
      if (!dateStr) return null;
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    $$renderer2.push(`<article class="card svelte-kw5evs"><a${attributes(
      {
        href: `/blog/${stringify(post.slug)}`,
        ...ve.edit({ id: post.id, type: "blog_post" })
      },
      "svelte-kw5evs"
    )}>`);
    if (cover().src) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="card__media svelte-kw5evs"><img${attr("src", cover().src)}${attr("alt", coverAlt())} loading="lazy" class="svelte-kw5evs"/></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <p class="meta svelte-kw5evs">`);
    if (post.postDate) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<time${attr("datetime", post.postDate)}>${escape_html(formatDate(post.postDate))}</time>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <span class="meta__dot svelte-kw5evs">·</span> <span>${escape_html(readingTime(post.content))}</span></p> <h3 class="svelte-kw5evs">${escape_html(post.title ?? "Untitled")}</h3> `);
    if (post.excerpt) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="card__excerpt svelte-kw5evs">${escape_html(post.excerpt)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></a> `);
    if (tags().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="tags svelte-kw5evs"><!--[-->`);
      const each_array = ensure_array_like(tags());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let tag = each_array[$$index];
        $$renderer2.push(`<a class="tag svelte-kw5evs"${attr("href", `/tag/${stringify(tag.slug)}`)}>${escape_html(tag.title)}</a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></article>`);
  });
}
export {
  PostCard as P
};
