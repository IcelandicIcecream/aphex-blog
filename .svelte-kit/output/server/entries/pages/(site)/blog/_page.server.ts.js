import { t as siteContext } from "../../../../chunks/site.js";
import { t as loadTagMap } from "../../../../chunks/tags.js";
//#region src/routes/(site)/blog/+page.server.ts
var load = async ({ locals }) => {
	const { orgId, context } = await siteContext(locals);
	const localAPI = locals.aphexCMS.localAPI;
	const posts = [...(await localAPI.collections.blog_post.find(context, { limit: 50 })).docs].sort((a, b) => (b.postDate ?? "").localeCompare(a.postDate ?? ""));
	const [, tagMap] = await Promise.all([locals.aphexCMS.assetService.injectAssetUrls(orgId, ...posts), loadTagMap(localAPI, context)]);
	return {
		posts,
		tagMap
	};
};
//#endregion
export { load };
