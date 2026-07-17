import * as server from '../entries/pages/god-mode/_page.server.ts.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/god-mode/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/god-mode/+page.server.ts";
export const imports = ["_app/immutable/nodes/20.CPYw7aZu.js","_app/immutable/chunks/DDLLnUFm.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BKQfZHAA.js","_app/immutable/chunks/C_zMQb38.js"];
export const stylesheets = [];
export const fonts = [];
