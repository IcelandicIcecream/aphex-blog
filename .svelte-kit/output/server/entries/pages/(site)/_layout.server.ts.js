import { t as siteContext } from "../../../chunks/site.js";
import "../../../chunks/dist4.js";
import { redirect } from "@sveltejs/kit";
//#region ../../node_modules/.pnpm/@aphexcms+visual-editing@0.2.0_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+_969cc3b7339c2c905fd2d4f5f98623d0/node_modules/@aphexcms/visual-editing/dist/preview.js
/**
* Whether the current URL is in preview mode (has the `aphex-preview` marker).
* Safe to call client-side — it only reports the param's presence and does NOT
* grant access to draft content.
*
* To resolve the actual content perspective (draft vs published) use
* `getPreviewPerspective(locals.auth, url)` from `@aphexcms/cms-core/server`
* inside a load function — draft access is gated on an authenticated session,
* so appending `?aphex-preview` alone never exposes drafts.
*/
function isPreviewMode(url) {
	return url.searchParams.has("aphex-preview");
}
//#endregion
//#region src/routes/(site)/+layout.server.ts
var load = async ({ locals, url }) => {
	const isAuthed = locals.auth?.type === "session";
	if (!isAuthed && isPreviewMode(url)) {
		const clean = new URL(url);
		clean.searchParams.delete("aphex-preview");
		redirect(307, clean.pathname + clean.search + clean.hash);
	}
	try {
		const { orgId, context } = await siteContext(locals);
		const settings = await locals.aphexCMS.localAPI.collections.siteSettings.get(context);
		await locals.aphexCMS.assetService.injectAssetUrls(orgId, settings);
		return {
			settings,
			isAuthed,
			logoUrl: settings?.logo?.asset?.url ?? null,
			faviconUrl: settings?.favicon?.asset?.url ?? null
		};
	} catch {
		return {
			settings: null,
			isAuthed,
			logoUrl: null,
			faviconUrl: null
		};
	}
};
//#endregion
export { load };
