//#region src/lib/blog/tags.ts
/**
* Load every tag keyed by id, so `post.tags` references (stored as
* `{ _type: 'reference', _ref }`) can be resolved to `{ title, slug }` for
* rendering. A blog has few tags, so one fetch + a map is plenty. The read
* perspective is inherited from `context` (published live / draft in preview).
*/
async function loadTagMap(localAPI, context) {
	const res = await localAPI.collections.tag.find(context, { limit: 200 });
	const map = {};
	for (const t of res.docs) map[t.id] = {
		id: t.id,
		title: t.title,
		slug: t.slug
	};
	return map;
}
/** Resolve a post's tag references to the tags present in the map (drops missing). */
function postTags(tags, tagMap) {
	if (!Array.isArray(tags)) return [];
	return tags.map((ref) => tagMap[ref._ref]).filter((t) => !!t);
}
//#endregion
export { postTags as n, loadTagMap as t };
