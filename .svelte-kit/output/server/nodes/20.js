import * as server from '../entries/pages/god-mode/_page.server.ts.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/god-mode/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/god-mode/+page.server.ts";
export const imports = ["_app/immutable/nodes/20.CS8zqyfR.js","_app/immutable/chunks/CJzah9id.js","_app/immutable/chunks/BMqZ2OJ-.js","_app/immutable/chunks/CWiwdRed.js","_app/immutable/chunks/CVb7NyXy.js","_app/immutable/chunks/BZPeipNi.js","_app/immutable/chunks/pvaRr2Fv.js","_app/immutable/chunks/BQkKhZuB.js","_app/immutable/chunks/DiOc-Ivd.js","_app/immutable/chunks/Cqvre0Yk.js","_app/immutable/chunks/CqORhcLo.js","_app/immutable/chunks/I8AlH2a-.js","_app/immutable/chunks/BLu3mf8N.js","_app/immutable/chunks/DWRVmNa7.js"];
export const stylesheets = [];
export const fonts = [];
