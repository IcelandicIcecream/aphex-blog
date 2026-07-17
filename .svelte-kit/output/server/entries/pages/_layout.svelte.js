import { $ as attr, u as head } from "../../chunks/dev.js";
import { r as AphexVisualOverlay } from "../../chunks/dist4.js";
//#region src/lib/assets/favicon.svg
var favicon_default = "/_app/immutable/assets/favicon.DN4o9Qxv.svg";
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	let { children } = $$props;
	head("12qhfyh", $$renderer, ($$renderer) => {
		$$renderer.push(`<link rel="icon"${attr("href", favicon_default)}/>`);
	});
	AphexVisualOverlay($$renderer, {
		children: ($$renderer) => {
			children?.($$renderer);
			$$renderer.push(`<!---->`);
		},
		$$slots: { default: true }
	});
}
//#endregion
export { _layout as default };
