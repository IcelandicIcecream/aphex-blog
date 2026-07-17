const SvelteSet = globalThis.Set;
const SvelteMap = globalThis.Map;
const SvelteURLSearchParams = globalThis.URLSearchParams;
class MediaQuery {
  current;
  /**
   * @param {string} query
   * @param {boolean} [matches]
   */
  constructor(query, matches = false) {
    this.current = matches;
  }
}
function createSubscriber(_) {
  return () => {
  };
}
export {
  MediaQuery as M,
  SvelteMap as S,
  SvelteURLSearchParams as a,
  SvelteSet as b,
  createSubscriber as c
};
