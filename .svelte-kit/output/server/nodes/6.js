

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.BYzF3ckZ.js","_app/immutable/chunks/CJzah9id.js","_app/immutable/chunks/BMqZ2OJ-.js","_app/immutable/chunks/C3JyqMS4.js"];
export const stylesheets = [];
export const fonts = [];
