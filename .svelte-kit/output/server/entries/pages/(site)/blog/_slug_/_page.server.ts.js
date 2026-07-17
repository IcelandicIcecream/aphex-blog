import { t as siteContext } from "../../../../../chunks/site.js";
import { t as loadTagMap } from "../../../../../chunks/tags.js";
import { t as loadAuthorMap } from "../../../../../chunks/authors.js";
import { error } from "@sveltejs/kit";
//#region src/routes/(site)/blog/[slug]/+page.server.ts
var load = async ({ locals, params }) => {
	const { orgId, context } = await siteContext(locals);
	const localAPI = locals.aphexCMS.localAPI;
	const assetService = locals.aphexCMS.assetService;
	const post = (await localAPI.collections.blog_post.find(context, {
		limit: 1,
		where: { slug: { equals: params.slug } }
	})).docs[0];
	if (!post) error(404, "Post not found");
	const [tagMap, authorMap] = await Promise.all([loadTagMap(localAPI, context), loadAuthorMap(localAPI, context, assetService, orgId)]);
	await assetService.injectAssetUrls(orgId, post);
	return {
		post,
		tagMap,
		authorMap
	};
};
//#endregion
export { load };
