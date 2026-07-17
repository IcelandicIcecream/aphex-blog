import { n as private_env } from "../../../chunks/shared-server.js";
import { redirect } from "@sveltejs/kit";
//#region src/lib/server/auth/auth.config.ts
var authOptions = { requireEmailVerification: private_env.AUTH_REQUIRE_EMAIL_VERIFICATION === "true" };
//#endregion
//#region src/routes/login/+page.server.ts
var load = async ({ locals, request }) => {
	const { aphexCMS } = locals;
	if ((await aphexCMS.auth?.getSession(request, aphexCMS.databaseAdapter))?.session) throw redirect(302, "/admin");
	return { requireEmailVerification: authOptions.requireEmailVerification };
};
//#endregion
export { load };
