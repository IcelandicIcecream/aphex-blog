import * as server from '../entries/pages/(protected)/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(protected)/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(protected)/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.SNrA03av.js","_app/immutable/chunks/DDLLnUFm.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/BM3KlXc_.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/AeeDb2iI.js","_app/immutable/chunks/C7FQJRe1.js","_app/immutable/chunks/D4sEkxGC.js","_app/immutable/chunks/k3j3YFGy.js","_app/immutable/chunks/CakyYNpo.js","_app/immutable/chunks/C_zMQb38.js","_app/immutable/chunks/Dnu9Qr1O.js","_app/immutable/chunks/CcOUKpOK.js","_app/immutable/chunks/DVEaZvyx.js","_app/immutable/chunks/Cq-uS5sU.js","_app/immutable/chunks/Beqkqc30.js","_app/immutable/chunks/BKQfZHAA.js","_app/immutable/chunks/BHHi6o6Y.js","_app/immutable/chunks/Bsdhp00N.js","_app/immutable/chunks/BSfDGCLQ.js"];
export const stylesheets = ["_app/immutable/assets/client.CBTuzSrg.css"];
export const fonts = [];
