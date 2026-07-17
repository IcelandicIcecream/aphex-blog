import "../../../../chunks/seed.js";
import "../../../../chunks/site.js";
import { error } from "@sveltejs/kit";
//#region src/routes/api/seed-blog/+server.ts
/**
* Dev-only reset button: wipe the blog's seeded-type documents and recreate the
* demo content set. First-run population is automatic (see `$lib/server/seed`) —
* this exists for getting back to a known state after experimenting.
*/
var GET = async ({ locals }) => {
	throw error(404);
};
//#endregion
export { GET };
