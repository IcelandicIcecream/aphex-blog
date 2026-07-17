import * as server from '../entries/pages/(site)/author/_slug_/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(site)/author/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(site)/author/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.DklAWu9l.js","_app/immutable/chunks/DDLLnUFm.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DeKwkmDp.js","_app/immutable/chunks/BM3KlXc_.js","_app/immutable/chunks/AeeDb2iI.js","_app/immutable/chunks/k3j3YFGy.js","_app/immutable/chunks/BjlY1nDz2.js","_app/immutable/chunks/C7FQJRe1.js","_app/immutable/chunks/C5OWHJ8I2.js","_app/immutable/chunks/DTk4PlGm2.js","_app/immutable/chunks/xy9y_ioj2.js"];
export const stylesheets = ["_app/immutable/assets/PostCard.DkfxoPot.css","_app/immutable/assets/16.KaYJH0h0.css"];
export const fonts = [];
