import { t as siteContext } from "../../../../../chunks/site.js";
import { t as loadTagMap } from "../../../../../chunks/tags.js";
import { error } from "@sveltejs/kit";
//#region src/routes/(site)/tag/[slug]/+page.server.ts
var load = async ({ locals, params }) => {
	const { orgId, context } = await siteContext(locals);
	const localAPI = locals.aphexCMS.localAPI;
	const tag = (await localAPI.collections.tag.find(context, {
		limit: 1,
		where: { slug: { equals: params.slug } }
	})).docs[0];
	if (!tag) error(404, "Tag not found");
	const posts = (await localAPI.collections.blog_post.find(context, { limit: 100 })).docs.filter((post) => post.tags?.some((t) => t._ref === tag.id)).sort((a, b) => (b.postDate ?? "").localeCompare(a.postDate ?? ""));
	const [, tagMap] = await Promise.all([locals.aphexCMS.assetService.injectAssetUrls(orgId, tag, ...posts), loadTagMap(localAPI, context)]);
	return {
		tag,
		posts,
		tagMap
	};
};
//#endregion
export { load };
