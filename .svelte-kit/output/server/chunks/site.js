import { s as systemContext } from "./auth-helpers.js";
import { error } from "@sveltejs/kit";
async function siteContext(locals) {
  const orgs = await locals.aphexCMS.databaseAdapter.findAllOrganizations();
  const org = orgs[0];
  if (!org) throw error(404, "No organization configured");
  const perspective = locals.previewPerspective ?? "published";
  return { orgId: org.id, context: { ...systemContext(org.id), perspective } };
}
export {
  siteContext as s
};
