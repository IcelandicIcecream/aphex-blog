import { t as siteContext } from "../../../../chunks/site.js";
import { error } from "@sveltejs/kit";
//#region src/routes/(site)/[slug]/+page.server.ts
var load = async ({ locals, params }) => {
	const { orgId, context } = await siteContext(locals);
	const page = (await locals.aphexCMS.localAPI.collections.page.find(context, {
		limit: 1,
		where: { slug: { equals: params.slug } }
	})).docs[0];
	if (!page) error(404, "Page not found");
	await locals.aphexCMS.assetService.injectAssetUrls(orgId, page);
	return { page };
};
//#endregion
export { load };
