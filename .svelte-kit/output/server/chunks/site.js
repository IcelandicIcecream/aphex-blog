import { n as systemContext } from "./auth-helpers.js";
import { error } from "@sveltejs/kit";
//#region src/lib/server/site.ts
/**
* The organization whose content powers the public site.
*
* The studio seeds several organizations and the demo content lives under the
* second one; a single-org deploy (a real blog) only has the first. `[1] ?? [0]`
* covers both. Swap this for a slug/env lookup if you host multiple sites.
*/
async function siteContext(locals) {
	const org = (await locals.aphexCMS.databaseAdapter.findAllOrganizations())[0];
	if (!org) throw error(404, "No organization configured");
	const perspective = locals.previewPerspective ?? "published";
	return {
		orgId: org.id,
		context: {
			...systemContext(org.id),
			perspective
		}
	};
}
//#endregion
export { siteContext as t };
