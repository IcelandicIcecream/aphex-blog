import { $ as attr, l as ensure_array_like, m as stringify, s as derived, tt as escape_html } from "../../../../../chunks/dev.js";
import { i as stegaClean, n as usePreview } from "../../../../../chunks/dist4.js";
import { t as Prose } from "../../../../../chunks/Prose.js";
import { t as Seo } from "../../../../../chunks/Seo.js";
import { n as seoOgImageUrl, r as seoTitle, t as seoDescription } from "../../../../../chunks/seo2.js";
import { t as readingTime } from "../../../../../chunks/reading-time.js";
import { n as postTags } from "../../../../../chunks/tags.js";
import { n as postAuthor } from "../../../../../chunks/authors.js";
//#region src/routes/(site)/blog/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
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
			return new Date(dateStr).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		}
		function initials(name) {
			if (!name) return "·";
			return name.split(/\s+/).slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("");
		}
		Seo($$renderer, {
			title: seoTitle(post().seo, post().title),
			description: seoDescription(post().seo, post().excerpt),
			image: seoImage(),
			type: "article",
			noindex: post().seo?.noIndex,
			publishedTime: post().postDate,
			modifiedTime: modifiedTime(),
			authorName: author()?.name
		});
		$$renderer.push(`<!----> <article class="article svelte-18jd5ta"><a href="/blog" class="back svelte-18jd5ta">← All stories</a> <header class="article__head svelte-18jd5ta"><p class="article__meta svelte-18jd5ta">`);
		if (post().postDate) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<time${attr("datetime", ve.encode(post().postDate, { field: "postDate" }))}>${escape_html(formatDate(post().postDate))}</time>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span class="dot svelte-18jd5ta">·</span> <span>${escape_html(readingTime(post().content))}</span></p> <h1 class="svelte-18jd5ta">${escape_html(post().title ?? "Untitled")}</h1> `);
		if (post().excerpt) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="lead svelte-18jd5ta">${escape_html(post().excerpt)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (author()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a class="byline svelte-18jd5ta"${attr("href", `/author/${stringify(author().slug)}`)}>`);
			if (authorAvatar()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img class="avatar avatar--photo svelte-18jd5ta"${attr("src", authorAvatar())}${attr("alt", author().name)}/>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span class="avatar svelte-18jd5ta">${escape_html(initials(author().name))}</span>`);
			}
			$$renderer.push(`<!--]--> <div><span class="byline__name svelte-18jd5ta">${escape_html(author().name)}</span> <span class="byline__role svelte-18jd5ta">${escape_html(author().role ?? "Author")}</span></div></a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (tags().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="tags svelte-18jd5ta"><!--[-->`);
			const each_array = ensure_array_like(tags());
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let tag = each_array[i];
				$$renderer.push(`<a class="tag svelte-18jd5ta"${attr("href", `/tag/${stringify(tag.slug)}`)}>${escape_html(ve.encode(tag.title, {
					field: "tags",
					arrayIndex: i
				}))}</a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></header> `);
		if (cover().src) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<figure class="cover svelte-18jd5ta"><img${attr("src", cover().src)}${attr("alt", ve.encode(coverAlt(), { field: "coverImage" }))} class="svelte-18jd5ta"/></figure>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (post().content && Array.isArray(post().content)) {
			$$renderer.push("<!--[0-->");
			Prose($$renderer, { value: post().content });
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="empty-body svelte-18jd5ta">This story has no content yet.</p>`);
		}
		$$renderer.push(`<!--]--> <footer class="article__foot svelte-18jd5ta"><a href="/blog" class="back svelte-18jd5ta">← All stories</a></footer></article>`);
	});
}
//#endregion
export { _page as default };
