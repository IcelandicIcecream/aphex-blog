import { $ as attr, l as ensure_array_like, m as stringify, n as attr_class, p as spread_props, r as attr_style, s as derived, tt as escape_html, u as head } from "../../../chunks/dev.js";
import { i as stegaClean, n as usePreview } from "../../../chunks/dist4.js";
import { t as page } from "../../../chunks/state.js";
import { t as Icon } from "../../../chunks/Icon.js";
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/menu.svelte
function Menu($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* @license @lucide/svelte v0.554.0 - ISC
		*
		* ISC License
		*
		* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
		*
		* Permission to use, copy, modify, and/or distribute this software for any
		* purpose with or without fee is hereby granted, provided that the above
		* copyright notice and this permission notice appear in all copies.
		*
		* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		*
		* ---
		*
		* The MIT License (MIT) (for portions derived from Feather)
		*
		* Copyright (c) 2013-2023 Cole Bemis
		*
		* Permission is hereby granted, free of charge, to any person obtaining a copy
		* of this software and associated documentation files (the "Software"), to deal
		* in the Software without restriction, including without limitation the rights
		* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		* copies of the Software, and to permit persons to whom the Software is
		* furnished to do so, subject to the following conditions:
		*
		* The above copyright notice and this permission notice shall be included in all
		* copies or substantial portions of the Software.
		*
		* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		* SOFTWARE.
		*
		*/
		let { $$slots, $$events, ...props } = $$props;
		Icon($$renderer, spread_props([
			{ name: "menu" },
			props,
			{
				iconNode: [
					["path", { "d": "M4 5h16" }],
					["path", { "d": "M4 12h16" }],
					["path", { "d": "M4 19h16" }]
				],
				children: ($$renderer) => {
					props.children?.($$renderer);
					$$renderer.push(`<!---->`);
				},
				$$slots: { default: true }
			}
		]));
	});
}
//#endregion
//#region src/lib/site/templates/BrutalistLedgerShell.svelte
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
	$$renderer.push("<!--[-1-->");
	Menu($$renderer, { size: 18 });
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
//#endregion
//#region src/lib/site/templates/EditorialJournalShell.svelte
function EditorialJournalShell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, siteTitle, tagline, nav, social, logoUrl, logoHeight, footerLogoHeight, year } = $$props;
		let navOpen = false;
		$$renderer.push(`<header class="blog-header"><div class="blog-header__inner"><a href="/blog" class="blog-wordmark">`);
		if (logoUrl) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", logoUrl)}${attr("alt", siteTitle)} class="blog-logo"${attr_style(`height: ${stringify(logoHeight)}px`)}/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(siteTitle)}<span class="blog-wordmark__dot">.</span>`);
		}
		$$renderer.push(`<!--]--></a> `);
		if (nav.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button" class="blog-nav-toggle"${attr("aria-expanded", navOpen)} aria-controls="blog-primary-nav">`);
			$$renderer.push("<!--[-1-->");
			Menu($$renderer, { size: 18 });
			$$renderer.push(`<!--]--> <span>${escape_html("Menu")}</span></button> <nav id="blog-primary-nav"${attr_class("blog-nav", void 0, { "open": navOpen })} aria-label="Primary navigation"><!--[-->`);
			const each_array = ensure_array_like(nav);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let link = each_array[$$index];
				$$renderer.push(`<a${attr("href", link.url)}${attr("target", link.newTab ? "_blank" : void 0)}${attr("rel", link.newTab ? "noopener noreferrer" : void 0)}>${escape_html(link.label)}</a>`);
			}
			$$renderer.push(`<!--]--></nav>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></header> <main class="journal-main">`);
		children?.($$renderer);
		$$renderer.push(`<!----></main> <footer class="blog-footer"><div class="blog-footer__inner"><div class="blog-footer__brand">`);
		if (logoUrl) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", logoUrl)}${attr("alt", siteTitle)} class="blog-logo blog-logo--footer"${attr_style(`height: ${stringify(footerLogoHeight)}px`)}/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span class="blog-wordmark blog-wordmark--sm">${escape_html(siteTitle)}<span class="blog-wordmark__dot">.</span></span>`);
		}
		$$renderer.push(`<!--]--> <p>${escape_html(tagline)}</p> `);
		if (social.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="blog-footer__social"><!--[-->`);
			const each_array_1 = ensure_array_like(social);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let link = each_array_1[$$index_1];
				if (link.url) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a${attr("href", link.url)} target="_blank" rel="noopener noreferrer">${escape_html(link.label)}</a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="blog-footer__meta"><span>© ${escape_html(year)} ${escape_html(siteTitle)}</span> <span class="blog-footer__sep">·</span> <a href="/admin">Powered by AphexCMS</a></div></div></footer>`);
	});
}
//#endregion
//#region src/lib/site/templates/MinimalIndexShell.svelte
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
	$$renderer.push("<!--[-1-->");
	Menu($$renderer, { size: 18 });
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
//#endregion
//#region src/lib/site/templates.ts
var SITE_TEMPLATES = [
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
var templateById = new Map(SITE_TEMPLATES.map((template) => [template.id, template]));
/** Resolve untrusted CMS data to a compiled, supported public template. */
function resolveSiteTemplate(value) {
	return templateById.get(value) ?? SITE_TEMPLATES[0];
}
//#endregion
//#region src/routes/(site)/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
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
		const footerLogoHeight = derived(() => Math.round(logoHeight() * .78));
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
			if (doc?.id && type) return {
				id: doc.id,
				type,
				label: TYPE_LABEL[type] ?? "document"
			};
			return null;
		});
		const isFramed = typeof window !== "undefined" && window.self !== window.top;
		const isPreview = derived(() => page.url.searchParams.has("aphex-preview") || isFramed);
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		head("1br2sqw", $$renderer, ($$renderer) => {
			if (faviconUrl()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<link rel="icon"${attr("href", faviconUrl())}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<div${attr_class(`blog-shell site-template--${stringify(template().id)}`, "svelte-1br2sqw", { "is-preview": isPreview() })}${attr_style("", { "--accent": brandColor() })}>`);
		if (isAuthed()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="edit-bar svelte-1br2sqw"><span class="edit-bar__dot svelte-1br2sqw"></span> `);
			if (editDoc()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="svelte-1br2sqw">You're signed in</span> <a${attr("href", `/admin?docType=${stringify(editDoc().type)}&docId=${stringify(editDoc().id)}`)} class="svelte-1br2sqw">Edit this ${escape_html(editDoc().label)} →</a>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span class="svelte-1br2sqw">You're signed in</span> <a href="/admin" class="svelte-1br2sqw">Open Studio →</a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (TemplateShell()) {
			$$renderer.push("<!--[-->");
			TemplateShell()($$renderer, {
				siteTitle: siteTitle(),
				tagline: tagline(),
				nav: nav(),
				social: social(),
				logoUrl: logoUrl(),
				logoHeight: logoHeight(),
				footerLogoHeight: footerLogoHeight(),
				year,
				children: ($$renderer) => {
					children($$renderer);
					$$renderer.push(`<!---->`);
				},
				$$slots: { default: true }
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div>`);
	});
}
//#endregion
export { _layout as default };
