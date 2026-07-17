import "clsx";
import { s as setContext, g as getContext } from "./renderer.js";
const KEY = /* @__PURE__ */ Symbol("aphex:live-preview");
class LivePreviewContext {
  current = null;
  currentType = null;
  currentId = null;
}
function setLivePreviewContext() {
  const ctx = new LivePreviewContext();
  setContext(KEY, ctx);
  return ctx;
}
function getLivePreviewDocument() {
  return getContext(KEY) ?? new LivePreviewContext();
}
export {
  getLivePreviewDocument as g,
  setLivePreviewContext as s
};
