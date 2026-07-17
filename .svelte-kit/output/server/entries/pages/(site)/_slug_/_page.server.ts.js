import { error } from "@sveltejs/kit";
import { s as siteContext } from "../../../../chunks/site.js";
const load = async ({ locals, params }) => {
  const { orgId, context } = await siteContext(locals);
  const result = await locals.aphexCMS.localAPI.collections.page.find(context, {
    limit: 1,
    where: { slug: { equals: params.slug } }
  });
  const page = result.docs[0];
  if (!page) error(404, "Page not found");
  await locals.aphexCMS.assetService.injectAssetUrls(orgId, page);
  return { page };
};
export {
  load
};
