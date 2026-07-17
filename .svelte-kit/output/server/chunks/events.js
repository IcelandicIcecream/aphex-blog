import "./legacy-client.js";
globalThis.Date;
var SvelteSet = globalThis.Set;
var SvelteMap = globalThis.Map;
globalThis.URL;
var SvelteURLSearchParams = globalThis.URLSearchParams;
var MediaQuery = class {
	current;
	/**
	* @param {string} query
	* @param {boolean} [matches]
	*/
	constructor(query, matches = false) {
		this.current = matches;
	}
};
/**
* @param {any} _
*/
function createSubscriber(_) {
	return () => {};
}
//#endregion
export { createSubscriber as a, SvelteURLSearchParams as i, SvelteMap as n, SvelteSet as r, MediaQuery as t };
