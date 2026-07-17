import { l as ensure_array_like, s as derived, tt as escape_html } from "../../../../../chunks/dev.js";
import { n as usePreview } from "../../../../../chunks/dist4.js";
import { t as Seo } from "../../../../../chunks/Seo.js";
import { n as seoOgImageUrl, r as seoTitle, t as seoDescription } from "../../../../../chunks/seo2.js";
import { t as PostCard } from "../../../../../chunks/PostCard.js";
//#region src/routes/(site)/tag/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const ve = usePreview();
		const tag = derived(() => ve.live(data.tag, { type: "tag" }));
		const posts = derived(() => data.posts);
		const seoImage = derived(() => seoOgImageUrl(tag().seo));
		Seo($$renderer, {
			title: seoTitle(tag().seo, `${tag().title} — Stories`),
			description: seoDescription(tag().seo, tag().description),
			image: seoImage(),
			noindex: tag().seo?.noIndex
		});
		$$renderer.push(`<!----> <section class="tag-head svelte-1medrvo"><a href="/blog" class="back svelte-1medrvo">← All stories</a> <p class="eyebrow svelte-1medrvo">Topic</p> <h1 class="svelte-1medrvo">${escape_html(tag().title)}</h1> `);
		if (tag().description) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="sub svelte-1medrvo">${escape_html(tag().description)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <p class="count svelte-1medrvo">${escape_html(posts().length)} ${escape_html(posts().length === 1 ? "story" : "stories")}</p></section> `);
		if (posts().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="empty svelte-1medrvo"><p>No stories tagged “${escape_html(tag().title)}” yet.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid svelte-1medrvo"><!--[-->`);
			const each_array = ensure_array_like(posts());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let post = each_array[$$index];
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
