async function loadTagMap(localAPI, context) {
  const res = await localAPI.collections.tag.find(context, {
    limit: 200
  });
  const map = {};
  for (const t of res.docs) map[t.id] = { id: t.id, title: t.title, slug: t.slug };
  return map;
}
function postTags(tags, tagMap) {
  if (!Array.isArray(tags)) return [];
  return tags.map((ref) => tagMap[ref._ref]).filter((t) => !!t);
}
export {
  loadTagMap as l,
  postTags as p
};
