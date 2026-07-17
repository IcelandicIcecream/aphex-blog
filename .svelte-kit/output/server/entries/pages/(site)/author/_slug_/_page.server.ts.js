import { error } from "@sveltejs/kit";
import { s as siteContext } from "../../../../../chunks/site.js";
import { l as loadTagMap } from "../../../../../chunks/tags.js";
const load = async ({ locals, params }) => {
  const { orgId, context } = await siteContext(locals);
  const localAPI = locals.aphexCMS.localAPI;
  const authorRes = await localAPI.collections.author.find(context, {
    limit: 1,
    where: { slug: { equals: params.slug } }
  });
  const author = authorRes.docs[0];
  if (!author) error(404, "Author not found");
  const postRes = await localAPI.collections.blog_post.find(context, {
    limit: 100
  });
  const posts = postRes.docs.filter((post) => post.author?._ref === author.id).sort((a, b) => (b.postDate ?? "").localeCompare(a.postDate ?? ""));
  const [tagMap] = await Promise.all([
    loadTagMap(localAPI, context),
    // Hydrate the author (avatar + SEO image) and every post card's cover in one batch.
    locals.aphexCMS.assetService.injectAssetUrls(orgId, author, ...posts)
  ]);
  return { author, posts, tagMap };
};
export {
  load
};
