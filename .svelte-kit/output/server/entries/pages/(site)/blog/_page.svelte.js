import { c as attr_class, d as stringify, b as attr, e as escape_html, h as attributes, a as ensure_array_like, f as derived } from "../../../../chunks/renderer.js";
import { r as readingTime } from "../../../../chunks/reading-time.js";
import { P as PostCard } from "../../../../chunks/PostCard.js";
import { S as Seo } from "../../../../chunks/Seo.js";
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
    const posts = derived(() => data.posts);
    const settings = derived(() => ve.live(data.settings, { type: "siteSettings" }));
    const featured = derived(() => posts()[0] ?? null);
    const rest = derived(() => posts().slice(1));
    const heroEyebrow = derived(() => settings()?.heroEyebrow || "The Journal");
    const heroTitle = derived(() => settings()?.heroTitle || "Stories from\nthe studio.");
    const heroSubtitle = derived(() => settings()?.heroSubtitle || "Essays on craft, process, and the work in progress — written by the people making it.");
    const heroImage = derived(() => ve.image(settings()?.heroImage));
    const heroLayout = derived(() => stegaClean(settings()?.heroLayout || "") || "split");
    function formatDate(dateStr) {
      if (!dateStr) return null;
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
    Seo($$renderer2, {
      title: "Stories",
      description: settings()?.tagline ?? "Field notes, essays, and dispatches from the studio."
    });
    $$renderer2.push(`<!----> <section${attr_class(`masthead masthead--${stringify(heroImage().src ? heroLayout() : "text")}`, "svelte-1epue5w")}>`);
    if (heroImage().src) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="masthead__media svelte-1epue5w"><img${attr("src", heroImage().src)}${attr("alt", heroImage().alt || heroTitle())} loading="eager" class="svelte-1epue5w"/></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="masthead__text svelte-1epue5w"><p class="eyebrow svelte-1epue5w">${escape_html(heroEyebrow())}</p> <h1 class="svelte-1epue5w">${escape_html(heroTitle())}</h1> <p class="masthead__sub svelte-1epue5w">${escape_html(heroSubtitle())}</p></div></section> `);
    if (posts().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty svelte-1epue5w"><p class="svelte-1epue5w">No published stories yet.</p> <a href="/admin" class="svelte-1epue5w">Open the studio to write one →</a></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      if (featured()) {
        $$renderer2.push("<!--[0-->");
        const cover = ve.image(featured().coverImage);
        $$renderer2.push(`<a${attributes(
          {
            class: "featured",
            href: `/blog/${stringify(featured().slug)}`,
            ...ve.edit({ id: featured().id, type: "blog_post" })
          },
          "svelte-1epue5w"
        )}>`);
        if (cover.src) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="featured__media svelte-1epue5w"><img${attr("src", cover.src)}${attr("alt", cover.alt || featured().title)} loading="eager" class="svelte-1epue5w"/></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="featured__body svelte-1epue5w"><p class="meta svelte-1epue5w"><span class="meta__tag svelte-1epue5w">Featured</span> `);
        if (featured().postDate) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<time${attr("datetime", featured().postDate)}>${escape_html(formatDate(featured().postDate))}</time>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <span class="meta__dot svelte-1epue5w">·</span> <span>${escape_html(readingTime(featured().content))}</span></p> <h2 class="svelte-1epue5w">${escape_html(featured().title ?? "Untitled")}</h2> `);
        if (featured().excerpt) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<p class="featured__excerpt svelte-1epue5w">${escape_html(featured().excerpt)}</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <span class="readlink svelte-1epue5w">Read story</span></div></a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (rest().length > 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="rule svelte-1epue5w"></div> <div class="grid svelte-1epue5w"><!--[-->`);
        const each_array = ensure_array_like(rest());
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let post = each_array[$$index];
          PostCard($$renderer2, { post, tagMap: data.tagMap });
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
