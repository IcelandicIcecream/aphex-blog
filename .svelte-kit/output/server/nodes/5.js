import * as server from '../entries/pages/god-mode/_layout.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/god-mode/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/god-mode/+layout.server.ts";
export const imports = ["_app/immutable/nodes/5.DlbRrzFp.js","_app/immutable/chunks/DDLLnUFm.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/CaaM2rxu.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/nWrO1ygz.js","_app/immutable/chunks/BWGnVJ8A.js","_app/immutable/chunks/CakyYNpo.js","_app/immutable/chunks/Dnu9Qr1O.js","_app/immutable/chunks/C_zMQb38.js","_app/immutable/chunks/Bsdhp00N.js"];
export const stylesheets = [];
export const fonts = [];
