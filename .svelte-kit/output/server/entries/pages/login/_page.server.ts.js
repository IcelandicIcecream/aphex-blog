import { redirect } from "@sveltejs/kit";
import { p as private_env } from "../../../chunks/shared-server.js";
const authOptions = {
  requireEmailVerification: private_env.AUTH_REQUIRE_EMAIL_VERIFICATION === "true"
};
const load = async ({ locals, request }) => {
  const { aphexCMS } = locals;
  const session = await aphexCMS.auth?.getSession(request, aphexCMS.databaseAdapter);
  if (session?.session) {
    throw redirect(302, "/admin");
  }
  return { requireEmailVerification: authOptions.requireEmailVerification };
};
export {
  load
};
