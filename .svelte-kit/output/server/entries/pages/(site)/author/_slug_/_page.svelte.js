import { $ as attr, l as ensure_array_like, s as derived, tt as escape_html } from "../../../../../chunks/dev.js";
import { n as usePreview } from "../../../../../chunks/dist4.js";
import { t as Seo } from "../../../../../chunks/Seo.js";
import { n as seoOgImageUrl, r as seoTitle, t as seoDescription } from "../../../../../chunks/seo2.js";
import { t as PostCard } from "../../../../../chunks/PostCard.js";
//#region src/routes/(site)/author/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const ve = usePreview();
		const author = derived(() => ve.live(data.author, { type: "author" }));
		const posts = derived(() => data.posts);
		const avatar = derived(() => ve.image(author().avatar));
		const seoImage = derived(() => seoOgImageUrl(author().seo) ?? avatar().src);
		Seo($$renderer, {
			title: seoTitle(author().seo, author().name),
			description: seoDescription(author().seo, author().bio),
			image: seoImage(),
			noindex: author().seo?.noIndex
		});
		$$renderer.push(`<!----> <section class="author-head svelte-sp8vp5"><a href="/blog" class="back svelte-sp8vp5">← All stories</a> <div class="ident svelte-sp8vp5">`);
		if (avatar().src) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img class="avatar svelte-sp8vp5"${attr("src", avatar().src)}${attr("alt", author().name)}/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div><p class="eyebrow svelte-sp8vp5">Author</p> <h1 class="svelte-sp8vp5">${escape_html(author().name)}</h1> `);
		if (author().role) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="role svelte-sp8vp5">${escape_html(author().role)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		if (author().bio) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="bio svelte-sp8vp5">${escape_html(author().bio)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if ((author().links?.length ?? 0) > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="links svelte-sp8vp5"><!--[-->`);
			const each_array = ensure_array_like(author().links ?? []);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let link = each_array[$$index];
				if (link.url) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<a${attr("href", link.url)} target="_blank" rel="noopener noreferrer me" class="svelte-sp8vp5">${escape_html(link.label ?? link.url)}</a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <p class="count svelte-sp8vp5">${escape_html(posts().length)} ${escape_html(posts().length === 1 ? "story" : "stories")}</p></section> `);
		if (posts().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty svelte-sp8vp5"><p>No stories by ${escape_html(author().name)} yet.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid svelte-sp8vp5"><!--[-->`);
			const each_array_1 = ensure_array_like(posts());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let post = each_array_1[$$index_1];
				PostCard($$renderer, {
					post,
					tagMap: data.tagMap
				});
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
