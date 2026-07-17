import { $ as attr, i as attributes, l as ensure_array_like, m as stringify, s as derived, tt as escape_html } from "./dev.js";
import { n as usePreview } from "./dist4.js";
import { t as readingTime } from "./reading-time.js";
import { n as postTags } from "./tags.js";
//#region src/lib/blog/PostCard.svelte
function PostCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { post, tagMap } = $$props;
		const ve = usePreview();
		const cover = derived(() => ve.image(post.coverImage));
		const coverAlt = derived(() => cover().alt || post.title);
		const tags = derived(() => postTags(post.tags, tagMap));
		function formatDate(dateStr) {
			if (!dateStr) return null;
			return new Date(dateStr).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		$$renderer.push(`<article class="card svelte-kw5evs"><a${attributes({
			href: `/blog/${stringify(post.slug)}`,
			...ve.edit({
				id: post.id,
				type: "blog_post"
			})
		}, "svelte-kw5evs")}>`);
		if (cover().src) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="card__media svelte-kw5evs"><img${attr("src", cover().src)}${attr("alt", coverAlt())} loading="lazy" class="svelte-kw5evs"/></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <p class="meta svelte-kw5evs">`);
		if (post.postDate) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<time${attr("datetime", post.postDate)}>${escape_html(formatDate(post.postDate))}</time>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <span class="meta__dot svelte-kw5evs">·</span> <span>${escape_html(readingTime(post.content))}</span></p> <h3 class="svelte-kw5evs">${escape_html(post.title ?? "Untitled")}</h3> `);
		if (post.excerpt) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="card__excerpt svelte-kw5evs">${escape_html(post.excerpt)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></a> `);
		if (tags().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="tags svelte-kw5evs"><!--[-->`);
			const each_array = ensure_array_like(tags());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tag = each_array[$$index];
				$$renderer.push(`<a class="tag svelte-kw5evs"${attr("href", `/tag/${stringify(tag.slug)}`)}>${escape_html(tag.title)}</a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></article>`);
	});
}
//#endregion
export { PostCard as t };
