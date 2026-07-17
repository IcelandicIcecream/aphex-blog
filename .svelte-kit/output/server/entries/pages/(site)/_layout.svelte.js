import { l as spread_props, b as attr, t as attr_style, e as escape_html, c as attr_class, a as ensure_array_like, d as stringify, m as head, f as derived } from "../../../chunks/renderer.js";
import { p as page } from "../../../chunks/index3.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { u as usePreview, s as stegaClean } from "../../../chunks/use-preview.svelte.js";
import { I as Icon } from "../../../chunks/Icon.js";
function Menu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M4 5h16" }],
      ["path", { "d": "M4 12h16" }],
      ["path", { "d": "M4 19h16" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "menu" },
      /**
       * @component @name Menu
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCA1aDE2IiAvPgogIDxwYXRoIGQ9Ik00IDEyaDE2IiAvPgogIDxwYXRoIGQ9Ik00IDE5aDE2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/menu
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function BrutalistLedgerShell($$renderer, $$props) {
  let { children, siteTitle, tagline, nav, logoUrl, logoHeight, year } = $$props;
  let navOpen = false;
  $$renderer.push(`<div class="brutalist-layout"><header class="brutalist-header"><a href="/blog" class="brutalist-wordmark">`);
  if (logoUrl) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<img${attr("src", logoUrl)}${attr("alt", siteTitle)} class="brutalist-logo"${attr_style(`height: ${stringify(logoHeight)}px`)}/>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`${escape_html(siteTitle)}`);
  }
  $$renderer.push(`<!--]--></a> <button type="button" class="brutalist-nav-toggle"${attr("aria-expanded", navOpen)} aria-controls="brutalist-primary-nav">`);
  {
    $$renderer.push("<!--[-1-->");
    Menu($$renderer, { size: 18 });
  }
  $$renderer.push(`<!--]--> <span>${escape_html("Menu")}</span></button> <nav id="brutalist-primary-nav"${attr_class("brutalist-nav", void 0, { "open": navOpen })} aria-label="Primary navigation"><a href="/blog">Journal</a> <!--[-->`);
  const each_array = ensure_array_like(nav);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$renderer.push(`<a${attr("href", link.url)}${attr("target", link.newTab ? "_blank" : void 0)}${attr("rel", link.newTab ? "noopener noreferrer" : void 0)}>${escape_html(link.label)}</a>`);
  }
  $$renderer.push(`<!--]--></nav></header> <main class="brutalist-main"><div class="brutalist-stamp">Index / ${escape_html(year)}</div> `);
  children?.($$renderer);
  $$renderer.push(`<!----></main> <footer class="brutalist-footer"><span>${escape_html(tagline)}</span> <span>© ${escape_html(year)} ${escape_html(siteTitle)}</span></footer></div>`);
}
function EditorialJournalShell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      children,
      siteTitle,
      tagline,
      nav,
      social,
      logoUrl,
      logoHeight,
      footerLogoHeight,
      year
    } = $$props;
    let navOpen = false;
    $$renderer2.push(`<header class="blog-header"><div class="blog-header__inner"><a href="/blog" class="blog-wordmark">`);
    if (logoUrl) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img${attr("src", logoUrl)}${attr("alt", siteTitle)} class="blog-logo"${attr_style(`height: ${stringify(logoHeight)}px`)}/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`${escape_html(siteTitle)}<span class="blog-wordmark__dot">.</span>`);
    }
    $$renderer2.push(`<!--]--></a> `);
    if (nav.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button type="button" class="blog-nav-toggle"${attr("aria-expanded", navOpen)} aria-controls="blog-primary-nav">`);
      {
        $$renderer2.push("<!--[-1-->");
        Menu($$renderer2, { size: 18 });
      }
      $$renderer2.push(`<!--]--> <span>${escape_html("Menu")}</span></button> <nav id="blog-primary-nav"${attr_class("blog-nav", void 0, { "open": navOpen })} aria-label="Primary navigation"><!--[-->`);
      const each_array = ensure_array_like(nav);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link = each_array[$$index];
        $$renderer2.push(`<a${attr("href", link.url)}${attr("target", link.newTab ? "_blank" : void 0)}${attr("rel", link.newTab ? "noopener noreferrer" : void 0)}>${escape_html(link.label)}</a>`);
      }
      $$renderer2.push(`<!--]--></nav>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></header> <main class="journal-main">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></main> <footer class="blog-footer"><div class="blog-footer__inner"><div class="blog-footer__brand">`);
    if (logoUrl) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img${attr("src", logoUrl)}${attr("alt", siteTitle)} class="blog-logo blog-logo--footer"${attr_style(`height: ${stringify(footerLogoHeight)}px`)}/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<span class="blog-wordmark blog-wordmark--sm">${escape_html(siteTitle)}<span class="blog-wordmark__dot">.</span></span>`);
    }
    $$renderer2.push(`<!--]--> <p>${escape_html(tagline)}</p> `);
    if (social.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="blog-footer__social"><!--[-->`);
      const each_array_1 = ensure_array_like(social);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let link = each_array_1[$$index_1];
        if (link.url) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<a${attr("href", link.url)} target="_blank" rel="noopener noreferrer">${escape_html(link.label)}</a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="blog-footer__meta"><span>© ${escape_html(year)} ${escape_html(siteTitle)}</span> <span class="blog-footer__sep">·</span> <a href="/admin">Powered by AphexCMS</a></div></div></footer>`);
  });
}
function MinimalIndexShell($$renderer, $$props) {
  let { children, siteTitle, tagline, nav, logoUrl, logoHeight, year } = $$props;
  let navOpen = false;
  $$renderer.push(`<div class="index-layout"><aside class="index-rail"><div class="index-rail__header"><a href="/blog" class="index-wordmark">`);
  if (logoUrl) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<img${attr("src", logoUrl)}${attr("alt", siteTitle)} class="index-logo"${attr_style(`height: ${stringify(logoHeight)}px`)}/>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`${escape_html(siteTitle)}<span>.</span>`);
  }
  $$renderer.push(`<!--]--></a> <button type="button" class="index-nav-toggle"${attr("aria-expanded", navOpen)} aria-controls="index-primary-nav">`);
  {
    $$renderer.push("<!--[-1-->");
    Menu($$renderer, { size: 18 });
  }
  $$renderer.push(`<!--]--> <span>${escape_html("Menu")}</span></button></div> <p class="index-tagline">${escape_html(tagline)}</p> <nav id="index-primary-nav"${attr_class("index-nav", void 0, { "open": navOpen })} aria-label="Primary navigation"><a href="/blog">Journal</a> <!--[-->`);
  const each_array = ensure_array_like(nav);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$renderer.push(`<a${attr("href", link.url)}${attr("target", link.newTab ? "_blank" : void 0)}${attr("rel", link.newTab ? "noopener noreferrer" : void 0)}>${escape_html(link.label)}</a>`);
  }
  $$renderer.push(`<!--]--></nav> <div class="index-rail__meta">© ${escape_html(year)} ${escape_html(siteTitle)}</div></aside> <main class="index-main">`);
  children?.($$renderer);
  $$renderer.push(`<!----></main></div>`);
}
const SITE_TEMPLATES = [
  {
    id: "editorial-journal",
    name: "Editorial Journal",
    description: "A story-led publication with an expansive editorial shell.",
    component: EditorialJournalShell
  },
  {
    id: "minimal-index",
    name: "Minimal Index",
    description: "A compact index with a fixed site rail and utility navigation.",
    component: MinimalIndexShell
  },
  {
    id: "brutalist-ledger",
    name: "Brutalist Ledger",
    description: "A high-contrast, grid-led shell with assertive utility navigation.",
    component: BrutalistLedgerShell
  }
];
const templateById = new Map(SITE_TEMPLATES.map((template) => [template.id, template]));
function resolveSiteTemplate(value) {
  return templateById.get(value) ?? SITE_TEMPLATES[0];
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, children } = $$props;
    const ve = usePreview();
    const settings = derived(() => ve.live(data.settings, { type: "siteSettings" }));
    const template = derived(() => resolveSiteTemplate(stegaClean(settings()?.template ?? "")));
    const TemplateShell = derived(() => template().component);
    const siteTitle = derived(() => settings()?.title || "Aphex");
    const tagline = derived(() => settings()?.tagline || "Field notes and dispatches from the studio.");
    const nav = derived(() => settings()?.nav ?? []);
    const social = derived(() => settings()?.social ?? []);
    const logo = derived(() => ve.image(settings()?.logo));
    const favicon = derived(() => ve.image(settings()?.favicon));
    const logoUrl = derived(() => logo().src ?? data.logoUrl);
    const faviconUrl = derived(() => favicon().src ?? data.faviconUrl);
    const isAuthed = derived(() => data.isAuthed);
    const logoHeight = derived(() => settings()?.logoHeight ?? 28);
    const footerLogoHeight = derived(() => Math.round(logoHeight() * 0.78));
    const brandColor = derived(() => {
      const value = stegaClean(settings()?.color?.hex ?? "").trim();
      return /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value) ? value : void 0;
    });
    const TYPE_LABEL = {
      blog_post: "post",
      page: "page",
      author: "author",
      tag: "tag"
    };
    const editDoc = derived(() => {
      const d = page.data;
      const doc = d.post ?? d.page ?? d.author ?? d.tag;
      const type = doc?._meta?.type;
      if (doc?.id && type) return { id: doc.id, type, label: TYPE_LABEL[type] ?? "document" };
      return null;
    });
    const isFramed = typeof window !== "undefined" && window.self !== window.top;
    const isPreview = derived(() => page.url.searchParams.has("aphex-preview") || isFramed);
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    head("1br2sqw", $$renderer2, ($$renderer3) => {
      if (faviconUrl()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<link rel="icon"${attr("href", faviconUrl())}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`<div${attr_class(`blog-shell site-template--${stringify(template().id)}`, "svelte-1br2sqw", { "is-preview": isPreview() })}${attr_style("", { "--accent": brandColor() })}>`);
    if (isAuthed()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="edit-bar svelte-1br2sqw"><span class="edit-bar__dot svelte-1br2sqw"></span> `);
      if (editDoc()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="svelte-1br2sqw">You're signed in</span> <a${attr("href", `/admin?docType=${stringify(editDoc().type)}&docId=${stringify(editDoc().id)}`)} class="svelte-1br2sqw">Edit this ${escape_html(editDoc().label)} →</a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<span class="svelte-1br2sqw">You're signed in</span> <a href="/admin" class="svelte-1br2sqw">Open Studio →</a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (TemplateShell()) {
      $$renderer2.push("<!--[-->");
      TemplateShell()($$renderer2, {
        siteTitle: siteTitle(),
        tagline: tagline(),
        nav: nav(),
        social: social(),
        logoUrl: logoUrl(),
        logoHeight: logoHeight(),
        footerLogoHeight: footerLogoHeight(),
        year,
        children: ($$renderer3) => {
          children($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
    $$renderer2.push(`</div>`);
  });
}
export {
  _layout as default
};
