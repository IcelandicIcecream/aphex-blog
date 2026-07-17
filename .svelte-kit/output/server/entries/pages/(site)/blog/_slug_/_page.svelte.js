import { b as attr, e as escape_html, d as stringify, a as ensure_array_like, f as derived } from "../../../../../chunks/renderer.js";
import { P as Prose } from "../../../../../chunks/Prose.js";
import { S as Seo } from "../../../../../chunks/Seo.js";
import { r as readingTime } from "../../../../../chunks/reading-time.js";
import { p as postTags } from "../../../../../chunks/tags.js";
import { p as postAuthor } from "../../../../../chunks/authors.js";
import { s as seoDescription, a as seoTitle, b as seoOgImageUrl } from "../../../../../chunks/seo2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/root.js";
import "../../../../../chunks/state.svelte.js";
import { u as usePreview, s as stegaClean } from "../../../../../chunks/use-preview.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const ve = usePreview();
    const post = derived(() => ve.live(data.post, { type: "blog_post" }));
    const cover = derived(() => ve.image(post().coverImage));
    const coverAlt = derived(() => cover().alt || stegaClean(post().title ?? ""));
    const tags = derived(() => postTags(post().tags, data.tagMap));
    const author = derived(() => postAuthor(post().author, data.authorMap));
    const authorAvatar = derived(() => author()?.avatarUrl ?? null);
    const seoImage = derived(() => seoOgImageUrl(post().seo) ?? cover().src);
    const modifiedTime = derived(() => post()._meta?.updatedAt ? new Date(post()._meta.updatedAt).toISOString() : void 0);
    function formatDate(dateStr) {
      if (!dateStr) return null;
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }
    function initials(name) {
      if (!name) return "·";
      return name.split(/\s+/).slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("");
    }
    Seo($$renderer2, {
      title: seoTitle(post().seo, post().title),
      description: seoDescription(post().seo, post().excerpt),
      image: seoImage(),
      type: "article",
      noindex: post().seo?.noIndex,
      publishedTime: post().postDate,
      modifiedTime: modifiedTime(),
      authorName: author()?.name
    });
    $$renderer2.push(`<!----> <article class="article svelte-18jd5ta"><a href="/blog" class="back svelte-18jd5ta">← All stories</a> <header class="article__head svelte-18jd5ta"><p class="article__meta svelte-18jd5ta">`);
    if (post().postDate) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<time${attr("datetime", ve.encode(post().postDate, { field: "postDate" }))}>${escape_html(formatDate(post().postDate))}</time>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <span class="dot svelte-18jd5ta">·</span> <span>${escape_html(readingTime(post().content))}</span></p> <h1 class="svelte-18jd5ta">${escape_html(post().title ?? "Untitled")}</h1> `);
    if (post().excerpt) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="lead svelte-18jd5ta">${escape_html(post().excerpt)}</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (author()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a class="byline svelte-18jd5ta"${attr("href", `/author/${stringify(author().slug)}`)}>`);
      if (authorAvatar()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<img class="avatar avatar--photo svelte-18jd5ta"${attr("src", authorAvatar())}${attr("alt", author().name)}/>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<span class="avatar svelte-18jd5ta">${escape_html(initials(author().name))}</span>`);
      }
      $$renderer2.push(`<!--]--> <div><span class="byline__name svelte-18jd5ta">${escape_html(author().name)}</span> <span class="byline__role svelte-18jd5ta">${escape_html(author().role ?? "Author")}</span></div></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (tags().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="tags svelte-18jd5ta"><!--[-->`);
      const each_array = ensure_array_like(tags());
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let tag = each_array[i];
        $$renderer2.push(`<a class="tag svelte-18jd5ta"${attr("href", `/tag/${stringify(tag.slug)}`)}>${escape_html(ve.encode(tag.title, { field: "tags", arrayIndex: i }))}</a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> `);
    if (cover().src) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<figure class="cover svelte-18jd5ta"><img${attr("src", cover().src)}${attr("alt", ve.encode(coverAlt(), { field: "coverImage" }))} class="svelte-18jd5ta"/></figure>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (post().content && Array.isArray(post().content)) {
      $$renderer2.push("<!--[0-->");
      Prose($$renderer2, { value: post().content });
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="empty-body svelte-18jd5ta">This story has no content yet.</p>`);
    }
    $$renderer2.push(`<!--]--> <footer class="article__foot svelte-18jd5ta"><a href="/blog" class="back svelte-18jd5ta">← All stories</a></footer></article>`);
  });
}
export {
  _page as default
};
