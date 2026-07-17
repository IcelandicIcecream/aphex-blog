//#region src/lib/blog/authors.ts
/** Load every author keyed by id, for resolving `post.author` references. Avatar
*  URLs are injected up front so the byline can read them directly. The read
*  perspective is inherited from `context` (published live / draft in preview). */
async function loadAuthorMap(localAPI, context, assetService, organizationId) {
	const res = await localAPI.collections.author.find(context, { limit: 200 });
	await assetService.injectAssetUrls(organizationId, ...res.docs);
	const map = {};
	for (const a of res.docs) map[a.id] = {
		id: a.id,
		name: a.name,
		slug: a.slug,
		role: a.role,
		avatarUrl: a.avatar?.asset?.url
	};
	return map;
}
/** Resolve a post's author reference against the map (null if missing). */
function postAuthor(ref, authorMap) {
	return ref ? authorMap[ref._ref] ?? null : null;
}
//#endregion
export { postAuthor as n, loadAuthorMap as t };
