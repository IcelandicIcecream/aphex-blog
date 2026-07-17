import * as server from '../entries/pages/invitations/_page.server.ts.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/invitations/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/invitations/+page.server.ts";
export const imports = ["_app/immutable/nodes/22.Dx3hOj0y.js","_app/immutable/chunks/DDLLnUFm.js","_app/immutable/chunks/QTnfLwEv.js","_app/immutable/chunks/CaaM2rxu.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/nWrO1ygz.js","_app/immutable/chunks/DERMgX-Q.js","_app/immutable/chunks/k3j3YFGy.js","_app/immutable/chunks/BWGnVJ8A.js","_app/immutable/chunks/CakyYNpo.js","_app/immutable/chunks/C_zMQb38.js","_app/immutable/chunks/Dnu9Qr1O.js","_app/immutable/chunks/CcOUKpOK.js","_app/immutable/chunks/DVEaZvyx.js","_app/immutable/chunks/Cq-uS5sU.js","_app/immutable/chunks/Beqkqc30.js","_app/immutable/chunks/BKQfZHAA.js","_app/immutable/chunks/Bsdhp00N.js"];
export const stylesheets = ["_app/immutable/assets/client.Dch0GSbm.css"];
export const fonts = [];
