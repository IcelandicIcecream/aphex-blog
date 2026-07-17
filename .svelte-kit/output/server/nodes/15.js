import * as server from '../entries/pages/(site)/_slug_/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.BufeKgYk.js","_app/immutable/chunks/DDLLnUFm.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/IAydn-XI.js","_app/immutable/chunks/CaaM2rxu.js","_app/immutable/chunks/nWrO1ygz.js","_app/immutable/chunks/k3j3YFGy.js","_app/immutable/chunks/As5WlQnO2.js","_app/immutable/chunks/HclGiUj8.js","_app/immutable/chunks/Cq-uS5sU.js","_app/immutable/chunks/DZ5SiFtV.js","_app/immutable/chunks/BVroMPc_2.js","_app/immutable/chunks/BWGnVJ8A.js","_app/immutable/chunks/B-AIxPuB2.js"];
export const stylesheets = ["_app/immutable/assets/Prose.CxVZZJj0.css","_app/immutable/assets/15.Bu8U9Q38.css"];
export const fonts = [];
