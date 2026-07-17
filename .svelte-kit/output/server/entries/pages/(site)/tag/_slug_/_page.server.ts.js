import { error } from "@sveltejs/kit";
import { s as siteContext } from "../../../../../chunks/site.js";
import { l as loadTagMap } from "../../../../../chunks/tags.js";
const load = async ({ locals, params }) => {
  const { orgId, context } = await siteContext(locals);
  const localAPI = locals.aphexCMS.localAPI;
  const tagRes = await localAPI.collections.tag.find(context, {
    limit: 1,
    where: { slug: { equals: params.slug } }
  });
  const tag = tagRes.docs[0];
  if (!tag) error(404, "Tag not found");
  const postRes = await localAPI.collections.blog_post.find(context, {
    limit: 100
  });
  const posts = postRes.docs.filter((post) => post.tags?.some((t) => t._ref === tag.id)).sort((a, b) => (b.postDate ?? "").localeCompare(a.postDate ?? ""));
  const [, tagMap] = await Promise.all([
    // Hydrate the tag's SEO image and every post card's cover in one batch.
    locals.aphexCMS.assetService.injectAssetUrls(orgId, tag, ...posts),
    loadTagMap(localAPI, context)
  ]);
  return { tag, posts, tagMap };
};
export {
  load
};
