import * as server from '../entries/pages/(site)/author/_slug_/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/author/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/author/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.BgpHNlV7.js","_app/immutable/chunks/DDLLnUFm.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/IAydn-XI.js","_app/immutable/chunks/CaaM2rxu.js","_app/immutable/chunks/nWrO1ygz.js","_app/immutable/chunks/k3j3YFGy.js","_app/immutable/chunks/BVroMPc_2.js","_app/immutable/chunks/BWGnVJ8A.js","_app/immutable/chunks/B-AIxPuB2.js","_app/immutable/chunks/DQSZJEsK2.js","_app/immutable/chunks/xy9y_ioj2.js"];
export const stylesheets = ["_app/immutable/assets/PostCard.DkfxoPot.css","_app/immutable/assets/16.KaYJH0h0.css"];
export const fonts = [];
