import { s as siteContext } from "../../../../chunks/site.js";
import { l as loadTagMap } from "../../../../chunks/tags.js";
const load = async ({ locals }) => {
  const { orgId, context } = await siteContext(locals);
  const localAPI = locals.aphexCMS.localAPI;
  const result = await localAPI.collections.blog_post.find(context, {
    limit: 50
  });
  const posts = [...result.docs].sort((a, b) => (b.postDate ?? "").localeCompare(a.postDate ?? ""));
  const [, tagMap] = await Promise.all([
    locals.aphexCMS.assetService.injectAssetUrls(orgId, ...posts),
    loadTagMap(localAPI, context)
  ]);
  return { posts, tagMap };
};
export {
  load
};
