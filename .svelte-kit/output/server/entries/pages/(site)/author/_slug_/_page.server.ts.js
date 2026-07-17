import { t as siteContext } from "../../../../../chunks/site.js";
import { t as loadTagMap } from "../../../../../chunks/tags.js";
import { error } from "@sveltejs/kit";
//#region src/routes/(site)/author/[slug]/+page.server.ts
var load = async ({ locals, params }) => {
	const { orgId, context } = await siteContext(locals);
	const localAPI = locals.aphexCMS.localAPI;
	const author = (await localAPI.collections.author.find(context, {
		limit: 1,
		where: { slug: { equals: params.slug } }
	})).docs[0];
	if (!author) error(404, "Author not found");
	const posts = (await localAPI.collections.blog_post.find(context, { limit: 100 })).docs.filter((post) => post.author?._ref === author.id).sort((a, b) => (b.postDate ?? "").localeCompare(a.postDate ?? ""));
	const [tagMap] = await Promise.all([loadTagMap(localAPI, context), locals.aphexCMS.assetService.injectAssetUrls(orgId, author, ...posts)]);
	return {
		author,
		posts,
		tagMap
	};
};
//#endregion
export { load };
