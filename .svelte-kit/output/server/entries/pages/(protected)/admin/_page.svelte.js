import { $ as attr, n as attr_class, r as attr_style, s as derived, tt as escape_html } from "../../../../chunks/dev.js";
import { n as AdminApp, x as Pencil, y as Trash_2 } from "../../../../chunks/client.js";
import { t as plugins } from "../../../../chunks/plugins.js";
import { t as page } from "../../../../chunks/state.js";
import { t as schemaTypes } from "../../../../chunks/schemaTypes.js";
import { t as activeTabState } from "../../../../chunks/activeTab.svelte.js";
import { n as embedSrc, t as embedRatio } from "../../../../chunks/embed.js";
//#region src/lib/components/studio/EmbedPreview.svelte
function EmbedPreview($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, selected = false, onEdit, onDelete } = $$props;
		const code = derived(() => typeof data.embedCode === "string" ? data.embedCode : "");
		const caption = derived(() => typeof data.caption === "string" ? data.caption : "");
		const src = derived(() => embedSrc(code()));
		const ratio = derived(() => embedRatio(code()));
		$$renderer.push(`<div${attr_class("group relative my-2 rounded-md border", void 0, {
			"ring-2": selected,
			"ring-primary": selected
		})}>`);
		if (src()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="pointer-events-none overflow-hidden rounded-md"${attr_style("", { "aspect-ratio": ratio() })}><iframe${attr("src", src())}${attr("title", caption() || "Embedded content")} loading="lazy" class="h-full w-full border-0"></iframe></div> `);
			if (caption()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="text-muted-foreground truncate px-3 py-2 text-xs">${escape_html(caption())}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="text-muted-foreground p-6 text-center text-sm">Embed — paste an &lt;iframe> snippet to preview it here.</div>`);
		}
		$$renderer.push(`<!--]--> <div class="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100"><button type="button" title="Edit" aria-label="Edit embed" class="bg-background/90 hover:bg-background rounded border p-1.5 shadow-sm">`);
		Pencil($$renderer, { class: "h-3.5 w-3.5" });
		$$renderer.push(`<!----></button> <button type="button" title="Remove" aria-label="Remove embed" class="bg-background/90 hover:bg-background text-destructive rounded border p-1.5 shadow-sm">`);
		Trash_2($$renderer, { class: "h-3.5 w-3.5" });
		$$renderer.push(`<!----></button></div></div>`);
	});
}
//#endregion
//#region src/routes/(protected)/admin/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const blockPreviews = { embed: EmbedPreview };
		let { data } = $$props;
		const capabilities = derived(() => page.data.rbac?.capabilities ?? []);
		const rbacRole = derived(() => page.data.rbac?.role ?? null);
		function handleTabChange(value) {
			if (activeTabState) activeTabState.value = value;
		}
		AdminApp($$renderer, {
			schemas: schemaTypes,
			plugins,
			blockPreviews,
			documentTypes: data.documentTypes,
			schemaError: data.schemaError,
			graphqlSettings: data.graphqlSettings,
			isReadOnly: data.isReadOnly,
			capabilities: capabilities(),
			rbacRole: rbacRole(),
			userPreferences: data.userPreferences,
			activeTab: activeTabState,
			handleTabChange,
			title: "Aphex CMS"
		});
	});
}
//#endregion
export { _page as default };
