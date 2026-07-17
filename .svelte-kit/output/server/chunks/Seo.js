import { $ as attr, h as html, s as derived, tt as escape_html, u as head } from "./dev.js";
import { t as page } from "./state.js";
//#region src/lib/blog/Seo.svelte
function Seo($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Plain (stega-cleaned) title — the site name is appended automatically. */
		/** Plain (stega-cleaned) title — the site name is appended automatically. */
		/** OG/Twitter image URL (relative or absolute). */
		let { title, description = "", image = null, type = "website", noindex = false, publishedTime, modifiedTime, authorName, siteName } = $$props;
		const pageData = derived(() => page.data);
		const site = derived(() => siteName || pageData().settings?.title || "Aphex");
		const origin = derived(() => page.url.origin);
		const canonical = derived(() => origin() + page.url.pathname);
		const absImage = derived(() => image ? image.startsWith("http") ? image : origin() + image : null);
		const fullTitle = derived(() => title ? `${title} · ${site()}` : site());
		const jsonLd = derived(() => type === "article" ? JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: title,
			description: description || void 0,
			image: absImage() || void 0,
			datePublished: publishedTime || void 0,
			dateModified: modifiedTime || publishedTime || void 0,
			author: authorName ? {
				"@type": "Person",
				name: authorName
			} : void 0,
			publisher: {
				"@type": "Organization",
				name: site()
			},
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": canonical()
			}
		}).replace(/</g, "\\u003c") : null);
		const ldScript = derived(() => jsonLd() ? `<script type="application/ld+json">${jsonLd()}<\/script>` : null);
		head("1ajbkp", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(fullTitle())}</title>`);
			});
			if (description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<meta name="description"${attr("content", description)}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <link rel="canonical"${attr("href", canonical())}/> `);
			if (noindex) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<meta name="robots" content="noindex, nofollow"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <meta property="og:site_name"${attr("content", site())}/> <meta property="og:type"${attr("content", type)}/> <meta property="og:title"${attr("content", title || site())}/> `);
			if (description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<meta property="og:description"${attr("content", description)}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <meta property="og:url"${attr("content", canonical())}/> `);
			if (absImage()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<meta property="og:image"${attr("content", absImage())}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <meta name="twitter:card"${attr("content", absImage() ? "summary_large_image" : "summary")}/> <meta name="twitter:title"${attr("content", title || site())}/> `);
			if (description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<meta name="twitter:description"${attr("content", description)}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (absImage()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<meta name="twitter:image"${attr("content", absImage())}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (type === "article") {
				$$renderer.push("<!--[0-->");
				if (publishedTime) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<meta property="article:published_time"${attr("content", publishedTime)}/>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (modifiedTime) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<meta property="article:modified_time"${attr("content", modifiedTime)}/>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (authorName) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<meta property="article:author"${attr("content", authorName)}/>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		});
		if (ldScript()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`${html(ldScript())}`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { Seo as t };
