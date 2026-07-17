import { error } from "@sveltejs/kit";
import { s as siteContext } from "../../../../../chunks/site.js";
import { l as loadTagMap } from "../../../../../chunks/tags.js";
import { l as loadAuthorMap } from "../../../../../chunks/authors.js";
const load = async ({ locals, params }) => {
  const { orgId, context } = await siteContext(locals);
  const localAPI = locals.aphexCMS.localAPI;
  const assetService = locals.aphexCMS.assetService;
  const result = await localAPI.collections.blog_post.find(context, {
    limit: 1,
    where: { slug: { equals: params.slug } }
  });
  const post = result.docs[0];
  if (!post) error(404, "Post not found");
  const [tagMap, authorMap] = await Promise.all([
    loadTagMap(localAPI, context),
    loadAuthorMap(localAPI, context, assetService, orgId)
  ]);
  await assetService.injectAssetUrls(orgId, post);
  return { post, tagMap, authorMap };
};
export {
  load
};
