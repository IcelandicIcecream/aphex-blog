import { t as building } from "../chunks/environment.js";
import { n as seedEnabled, r as seedOnFirstRun } from "../chunks/seed.js";
import { n as auth } from "../chunks/service.js";
import { n as createCMSHook } from "../chunks/server2.js";
import { t as aphex_config_default } from "../chunks/aphex.config.js";
import "../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
//#region ../../node_modules/.pnpm/better-auth@1.5.3_c60f13aa9391f2a547aabca80bea1d1e/node_modules/better-auth/dist/integrations/svelte-kit.mjs
var svelteKitHandler = async ({ auth, event, resolve, building }) => {
	if (building) return resolve(event);
	const { request, url } = event;
	if (isAuthPath(url.toString(), auth.options)) return auth.handler(request);
	return resolve(event);
};
function isAuthPath(url, options) {
	const _url = new URL(url);
	const baseURLStr = typeof options.baseURL === "string" ? options.baseURL : void 0;
	const baseURL = new URL(`${baseURLStr || _url.origin}${options.basePath || "/api/auth"}`);
	if (_url.origin !== baseURL.origin) return false;
	if (!_url.pathname.startsWith(baseURL.pathname.endsWith("/") ? baseURL.pathname : `${baseURL.pathname}/`)) return false;
	return true;
}
//#endregion
//#region src/hooks.server.ts
var authHook = async ({ event, resolve }) => {
	return svelteKitHandler({
		event,
		resolve,
		auth,
		building
	});
};
var aphexHook = createCMSHook(aphex_config_default);
var seedHook = async ({ event, resolve }) => {
	if (!building && seedEnabled()) await seedOnFirstRun(event.locals);
	return resolve(event);
};
var routingHook = async ({ event, resolve }) => {
	if (event.url.pathname === "/") throw redirect(302, "/admin");
	return resolve(event);
};
var handle = sequence(authHook, aphexHook, seedHook, routingHook);
//#endregion
export { handle };
