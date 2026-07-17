async function loadAuthorMap(localAPI, context, assetService, organizationId) {
  const res = await localAPI.collections.author.find(context, {
    limit: 200
  });
  await assetService.injectAssetUrls(organizationId, ...res.docs);
  const map = {};
  for (const a of res.docs) {
    map[a.id] = {
      id: a.id,
      name: a.name,
      slug: a.slug,
      role: a.role,
      avatarUrl: a.avatar?.asset?.url
    };
  }
  return map;
}
function postAuthor(ref, authorMap) {
  return ref ? authorMap[ref._ref] ?? null : null;
}
export {
  loadAuthorMap as l,
  postAuthor as p
};
