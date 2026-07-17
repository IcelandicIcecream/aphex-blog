import { $ as attr, et as clsx, i as attributes, l as ensure_array_like, m as stringify, n as attr_class, o as bind_props, p as spread_props, r as attr_style, s as derived, tt as escape_html } from "./dev.js";
import "./index-server.js";
import { Bt as readPath, D as Chevron_down, E as Circle_check, S as Triangle_alert, Vt as resolvePreviewSubtitle, _ as Popover_trigger, g as Root, i as Command, n as Command_item, p as toast, r as Command_group, t as Command_list, v as Popover_content, w as Refresh_cw, y as Textarea } from "./command.js";
import { c as documents } from "./api.js";
import "./dist.js";
import { t as cn } from "./utils2.js";
import { t as Button } from "./button.js";
import { t as Input } from "./input.js";
import { t as Icon } from "./Icon.js";
import { tv } from "tailwind-variants";
//#region ../../node_modules/.pnpm/@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af/node_modules/@aphexcms/cms-core/dist/schema-utils/desugar.js
/**
* Layer the authored field back over the built one.
*
* The builder owns structure (`type`, `fields`); the author owns intent (`group`,
* `validation`, `access`, and any property added to BaseField later — hence a
* spread rather than an allowlist, which would silently go stale).
*/
function preserveAuthored(authored, built, sugarKeys) {
	const rest = { ...authored };
	delete rest.type;
	for (const key of sugarKeys) delete rest[key];
	const builtRecord = built;
	const merged = {
		...builtRecord,
		...rest,
		type: builtRecord.type,
		input: rest.input ?? builtRecord.input,
		inputOptions: mergeInputOptions(builtRecord.inputOptions, rest.inputOptions)
	};
	if ("fields" in builtRecord) merged.fields = builtRecord.fields;
	return merged;
}
/** Combine the builder's derived widget options with any the author declared. */
function mergeInputOptions(built, authored) {
	const isRecord = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
	if (!isRecord(built)) return isRecord(authored) ? authored : void 0;
	if (!isRecord(authored)) return built;
	return {
		...built,
		...authored
	};
}
function expandFields(fields, options) {
	const sugarKeys = options.sugarKeys ?? [];
	return fields.map((field) => {
		if (field.type === options.type) return preserveAuthored(field, options.build(field), sugarKeys);
		if (field.type === "object" && Array.isArray(field.fields)) return {
			...field,
			fields: expandFields(field.fields, options)
		};
		if (field.type === "array" && Array.isArray(field.of)) return {
			...field,
			of: field.of.map((member) => expandMember(member, options))
		};
		return field;
	});
}
/** Array `of` members are `TypeReference`s, not `Field`s — expand them the same way. */
function expandMember(member, options) {
	if (member.type === options.type) {
		const authored = {
			...member,
			name: member.name ?? options.type
		};
		return preserveAuthored(authored, options.build(authored), options.sugarKeys ?? []);
	}
	if (Array.isArray(member.fields)) return {
		...member,
		fields: expandFields(member.fields, options)
	};
	return member;
}
/**
* Desugar every `{ type: <options.type> }` field across a schema list, recursing into
* nested objects and array members, preserving everything the author declared.
*
* Intended as the body of an `aphex/schema/transform` part, so it runs identically in
* the engine, the admin, and the type generator — nothing downstream ever sees the
* sugar keyword.
*/
function desugarFieldType(schemas, options) {
	return schemas.map((schema) => "fields" in schema && Array.isArray(schema.fields) ? {
		...schema,
		fields: expandFields(schema.fields, options)
	} : schema);
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af/node_modules/@aphexcms/cms-core/dist/plugins/types.js
/**
* Identity helper that pins the `CMSPlugin` type for authoring. Kept a pure
* pass-through so bundlers can tree-shake unused plugins; validation (duplicate
* ids/names) happens in the part resolver at boot, where it can see all plugins.
*/
function definePlugin(plugin) {
	return plugin;
}
//#endregion
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/arrow-right.svelte
function Arrow_right($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* @license @lucide/svelte v0.554.0 - ISC
		*
		* ISC License
		*
		* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
		*
		* Permission to use, copy, modify, and/or distribute this software for any
		* purpose with or without fee is hereby granted, provided that the above
		* copyright notice and this permission notice appear in all copies.
		*
		* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		*
		* ---
		*
		* The MIT License (MIT) (for portions derived from Feather)
		*
		* Copyright (c) 2013-2023 Cole Bemis
		*
		* Permission is hereby granted, free of charge, to any person obtaining a copy
		* of this software and associated documentation files (the "Software"), to deal
		* in the Software without restriction, including without limitation the rights
		* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		* copies of the Software, and to permit persons to whom the Software is
		* furnished to do so, subject to the following conditions:
		*
		* The above copyright notice and this permission notice shall be included in all
		* copies or substantial portions of the Software.
		*
		* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		* SOFTWARE.
		*
		*/
		let { $$slots, $$events, ...props } = $$props;
		Icon($$renderer, spread_props([
			{ name: "arrow-right" },
			props,
			{
				iconNode: [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]],
				children: ($$renderer) => {
					props.children?.($$renderer);
					$$renderer.push(`<!---->`);
				},
				$$slots: { default: true }
			}
		]));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/circle-x.svelte
function Circle_x($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* @license @lucide/svelte v0.554.0 - ISC
		*
		* ISC License
		*
		* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
		*
		* Permission to use, copy, modify, and/or distribute this software for any
		* purpose with or without fee is hereby granted, provided that the above
		* copyright notice and this permission notice appear in all copies.
		*
		* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		*
		* ---
		*
		* The MIT License (MIT) (for portions derived from Feather)
		*
		* Copyright (c) 2013-2023 Cole Bemis
		*
		* Permission is hereby granted, free of charge, to any person obtaining a copy
		* of this software and associated documentation files (the "Software"), to deal
		* in the Software without restriction, including without limitation the rights
		* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		* copies of the Software, and to permit persons to whom the Software is
		* furnished to do so, subject to the following conditions:
		*
		* The above copyright notice and this permission notice shall be included in all
		* copies or substantial portions of the Software.
		*
		* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		* SOFTWARE.
		*
		*/
		let { $$slots, $$events, ...props } = $$props;
		Icon($$renderer, spread_props([
			{ name: "circle-x" },
			props,
			{
				iconNode: [
					["circle", {
						"cx": "12",
						"cy": "12",
						"r": "10"
					}],
					["path", { "d": "m15 9-6 6" }],
					["path", { "d": "m9 9 6 6" }]
				],
				children: ($$renderer) => {
					props.children?.($$renderer);
					$$renderer.push(`<!---->`);
				},
				$$slots: { default: true }
			}
		]));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/sparkles.svelte
function Sparkles($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/**
		* @license @lucide/svelte v0.554.0 - ISC
		*
		* ISC License
		*
		* Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
		*
		* Permission to use, copy, modify, and/or distribute this software for any
		* purpose with or without fee is hereby granted, provided that the above
		* copyright notice and this permission notice appear in all copies.
		*
		* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
		* WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
		* MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
		* ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
		* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
		* ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
		* OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
		*
		* ---
		*
		* The MIT License (MIT) (for portions derived from Feather)
		*
		* Copyright (c) 2013-2023 Cole Bemis
		*
		* Permission is hereby granted, free of charge, to any person obtaining a copy
		* of this software and associated documentation files (the "Software"), to deal
		* in the Software without restriction, including without limitation the rights
		* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		* copies of the Software, and to permit persons to whom the Software is
		* furnished to do so, subject to the following conditions:
		*
		* The above copyright notice and this permission notice shall be included in all
		* copies or substantial portions of the Software.
		*
		* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		* SOFTWARE.
		*
		*/
		let { $$slots, $$events, ...props } = $$props;
		Icon($$renderer, spread_props([
			{ name: "sparkles" },
			props,
			{
				iconNode: [
					["path", { "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }],
					["path", { "d": "M20 2v4" }],
					["path", { "d": "M22 4h-4" }],
					["circle", {
						"cx": "4",
						"cy": "20",
						"r": "2"
					}]
				],
				children: ($$renderer) => {
					props.children?.($$renderer);
					$$renderer.push(`<!---->`);
				},
				$$slots: { default: true }
			}
		]));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-seo@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af__@_8a5f1a256dbf8c550a6bb4084759fb8e/node_modules/@aphexcms/plugin-seo/dist/config.js
/** Conventional field names to scan when a schema doesn't pin one down. */
var TITLE_FIELDS = [
	"title",
	"heading",
	"name",
	"label"
];
var DESCRIPTION_FIELDS = [
	"excerpt",
	"description",
	"summary",
	"bio",
	"tagline",
	"abstract"
];
var IMAGE_FIELDS = [
	"coverImage",
	"mainImage",
	"image",
	"avatar",
	"photo"
];
function str(value) {
	return typeof value === "string" && value.trim() ? value.trim() : "";
}
/**
* Best-effort title for a document, honoring the schema's `preview` config first
* (the canonical "what represents this doc" declaration), then conventional field
* names. Returns `''` when nothing real is found — so callers can detect a
* genuinely missing title rather than a placeholder.
*/
function resolveTitle(doc, schema) {
	const path = schema?.preview?.select?.title;
	if (path) {
		const fromPreview = str(readPath(doc, path));
		if (fromPreview) return fromPreview;
	}
	for (const name of TITLE_FIELDS) {
		const value = str(doc[name]);
		if (value) return value;
	}
	return "";
}
/**
* Best-effort meta description: conventional description-ish fields, then the
* schema's preview subtitle as a last resort. Returns `''` when none apply.
*/
function resolveDescription(doc, schema) {
	for (const name of DESCRIPTION_FIELDS) {
		const value = str(doc[name]);
		if (value) return value;
	}
	return (schema ? resolvePreviewSubtitle(doc, schema) : null) ?? "";
}
/** Whether the document has a usable social/preview image (uploaded asset). */
function hasSocialImage(doc, schema) {
	if ((doc.seo ?? {}).ogImage?.asset) return true;
	const path = schema?.preview?.select?.media;
	if (path) {
		if (readPath(doc, path)?.asset) return true;
	}
	return IMAGE_FIELDS.some((name) => doc[name]?.asset);
}
var defaults = {
	generateTitle: (doc, ctx) => resolveTitle(doc, ctx?.schema),
	generateDescription: (doc, ctx) => resolveDescription(doc, ctx?.schema),
	generateURL: (doc) => typeof doc.slug === "string" ? `/${doc.slug}` : "/"
};
var current = defaults;
function configureSeo(overrides) {
	current = {
		...defaults,
		...overrides
	};
}
function seoGenerators() {
	return current;
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-seo@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af__@_8a5f1a256dbf8c550a6bb4084759fb8e/node_modules/@aphexcms/plugin-seo/dist/GenerateSeoAction.svelte
function GenerateSeoAction($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { action } = $$props;
		let busy = false;
		async function generate() {
			if (busy) return;
			busy = true;
			try {
				const data = action.data;
				const existing = data.seo ?? {};
				const gen = seoGenerators();
				const ctx = {
					schema: action.schema,
					typeName: action.schema.name
				};
				const seo = {
					...existing,
					metaTitle: gen.generateTitle(data, ctx),
					metaDescription: gen.generateDescription(data, ctx)
				};
				if (gen.generateImage) {
					const img = gen.generateImage(data, ctx);
					if (img) seo.ogImage = img;
				}
				action.updateData({ seo });
				await action.save();
				toast.success("SEO fields generated.");
			} catch (err) {
				toast.error(err instanceof Error ? err.message : "Could not generate SEO.");
			} finally {
				busy = false;
			}
		}
		Button($$renderer, {
			variant: "ghost",
			size: "icon",
			onclick: generate,
			disabled: busy,
			class: "h-8 w-8 hover:cursor-pointer",
			title: "Generate SEO meta",
			children: ($$renderer) => {
				Sparkles($$renderer, { class: `h-4 w-4 ${stringify(busy ? "animate-pulse" : "")}` });
			},
			$$slots: { default: true }
		});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-seo@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af__@_8a5f1a256dbf8c550a6bb4084759fb8e/node_modules/@aphexcms/plugin-seo/dist/SeoTool.svelte
function SeoTool($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { tool } = $$props;
		const targetTypes = derived(() => tool.schemas.filter((s) => s.type === "document" && s.fields.some((f) => f.name === "seo")));
		let audits = [];
		let loading = true;
		let error = null;
		const str = (v) => typeof v === "string" && v.trim() ? v.trim() : "";
		/**
		* Compute an SEO health check for one document. The schema comes from the query
		* (we filtered `targetTypes` by it), so it's authoritative — the REST list row
		* carries no reliable top-level `type`. Title / description / image are resolved
		* the same way the Generate action fills them: the schema's own `preview` config
		* first (so an author uses `name`/`bio`, not the blog's `title`/`excerpt`), then
		* conventional fallbacks. Editors can always override via the `seo` fields.
		*/
		function auditDoc(doc, schema) {
			const data = doc;
			const seo = data.seo ?? {};
			const issues = [];
			if (!(str(seo.metaTitle) || resolveTitle(data, schema))) issues.push("No title");
			const metaDesc = str(seo.metaDescription) || resolveDescription(data, schema);
			if (!metaDesc) issues.push("No meta description");
			else if (metaDesc.length > 160) issues.push("Meta description too long");
			else if (metaDesc.length < 50) issues.push("Meta description too short");
			if (!hasSocialImage(data, schema)) issues.push("No social image");
			if (seo.noIndex) issues.push("Hidden from search");
			const critical = issues.includes("No title") || issues.includes("No meta description");
			const status = issues.length === 0 ? "good" : critical ? "missing" : "warn";
			return {
				id: doc.id,
				type: schema.name,
				typeTitle: schema.title,
				title: resolveTitle(data, schema) || "Untitled",
				issues,
				status
			};
		}
		async function load() {
			loading = true;
			error = null;
			try {
				audits = (await Promise.all(targetTypes().map(async (t) => {
					const res = await documents.list({
						type: t.name,
						perspective: "draft",
						pageSize: 100
					});
					return (res.success && res.data ? res.data : []).map((d) => auditDoc(d, t));
				}))).flat();
			} catch (e) {
				error = e instanceof Error ? e.message : "Failed to load documents.";
			} finally {
				loading = false;
			}
		}
		const stats = derived(() => ({
			total: audits.length,
			good: audits.filter((a) => a.status === "good").length,
			warn: audits.filter((a) => a.status === "warn").length,
			missing: audits.filter((a) => a.status === "missing").length
		}));
		$$renderer.push(`<div class="mx-auto max-w-4xl px-6 py-10"><div class="flex items-start justify-between gap-4"><div class="flex items-center gap-3"><div class="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">`);
		Sparkles($$renderer, { class: "h-5 w-5" });
		$$renderer.push(`<!----></div> <div><h1 class="text-xl font-semibold tracking-tight">SEO Audit</h1> <p class="text-muted-foreground text-sm">${escape_html(stats().total)} item${escape_html(stats().total === 1 ? "" : "s")} across ${escape_html(targetTypes().length)} type${escape_html(targetTypes().length === 1 ? "" : "s")}</p></div></div> `);
		Button($$renderer, {
			variant: "outline",
			size: "sm",
			onclick: load,
			disabled: loading,
			class: "gap-2",
			children: ($$renderer) => {
				Refresh_cw($$renderer, { class: `h-3.5 w-3.5 ${stringify(loading ? "animate-spin" : "")}` });
				$$renderer.push(`<!----> Refresh`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> <div class="mt-6 grid grid-cols-3 gap-3"><div class="border-border bg-card rounded-lg border p-4"><div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">`);
		Circle_check($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span class="text-2xl font-semibold tabular-nums">${escape_html(stats().good)}</span></div> <p class="text-muted-foreground mt-1 text-xs">Optimized</p></div> <div class="border-border bg-card rounded-lg border p-4"><div class="flex items-center gap-2 text-amber-600 dark:text-amber-500">`);
		Triangle_alert($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span class="text-2xl font-semibold tabular-nums">${escape_html(stats().warn)}</span></div> <p class="text-muted-foreground mt-1 text-xs">Warnings</p></div> <div class="border-border bg-card rounded-lg border p-4"><div class="text-destructive flex items-center gap-2">`);
		Circle_x($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> <span class="text-2xl font-semibold tabular-nums">${escape_html(stats().missing)}</span></div> <p class="text-muted-foreground mt-1 text-xs">Needs work</p></div></div> <div class="border-border bg-card mt-6 overflow-hidden rounded-xl border">`);
		if (loading) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-muted-foreground p-8 text-center text-sm">Auditing content…</div>`);
		} else if (error) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="text-destructive p-8 text-center text-sm">${escape_html(error)}</div>`);
		} else if (audits.length === 0) {
			$$renderer.push("<!--[2-->");
			$$renderer.push(`<div class="text-muted-foreground p-8 text-center text-sm">No posts or pages to audit yet.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<ul class="divide-border divide-y"><!--[-->`);
			const each_array = ensure_array_like(audits);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let a = each_array[$$index];
				$$renderer.push(`<li class="flex items-center gap-3 px-4 py-3">`);
				if (a.status === "good") {
					$$renderer.push("<!--[0-->");
					Circle_check($$renderer, { class: "h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" });
				} else if (a.status === "warn") {
					$$renderer.push("<!--[1-->");
					Triangle_alert($$renderer, { class: "h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" });
				} else {
					$$renderer.push("<!--[-1-->");
					Circle_x($$renderer, { class: "text-destructive h-4 w-4 shrink-0" });
				}
				$$renderer.push(`<!--]--> <div class="min-w-0 flex-1"><div class="flex items-center gap-2"><span class="truncate text-sm font-medium">${escape_html(a.title)}</span> <span class="bg-muted text-muted-foreground shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">${escape_html(a.typeTitle)}</span></div> `);
				if (a.issues.length > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<p class="text-muted-foreground mt-0.5 truncate text-xs">${escape_html(a.issues.join(" · "))}</p>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<p class="mt-0.5 text-xs text-emerald-600 dark:text-emerald-500">All checks passed</p>`);
				}
				$$renderer.push(`<!--]--></div> `);
				Button($$renderer, {
					variant: "ghost",
					size: "sm",
					class: "shrink-0 gap-1 hover:cursor-pointer",
					onclick: () => tool.openDocument(a.type, a.id),
					children: ($$renderer) => {
						$$renderer.push(`<!---->Fix `);
						Arrow_right($$renderer, { class: "h-3.5 w-3.5" });
						$$renderer.push(`<!---->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></li>`);
			}
			$$renderer.push(`<!--]--></ul>`);
		}
		$$renderer.push(`<!--]--></div> <p class="text-muted-foreground mt-4 text-xs leading-relaxed">This dashboard is a plugin admin tool (<code>aphex/admin/tool</code>). It fetches content
		through the session-authenticated REST client, scores each item, and routes you into the editor
		via <code>tool.openDocument()</code> — no core files touched.</p></div>`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-seo@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af__@_8a5f1a256dbf8c550a6bb4084759fb8e/node_modules/@aphexcms/plugin-seo/dist/MetaLengthInput.svelte
function MetaLengthInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { field, value, onUpdate, readonly = false, validationClasses } = $$props;
		const text = derived(() => typeof value === "string" ? value : "");
		const len = derived(() => text().length);
		const isDescription = derived(() => field.type === "text");
		const ideal = derived(() => isDescription() ? 155 : 60);
		const max = derived(() => isDescription() ? 165 : 70);
		const tone = derived(() => len() === 0 ? "idle" : len() <= ideal() ? "good" : len() <= max() ? "warn" : "over");
		const toneClass = derived(() => tone() === "good" ? "text-emerald-600 dark:text-emerald-500" : tone() === "warn" ? "text-amber-600 dark:text-amber-500" : tone() === "over" ? "text-destructive" : "text-muted-foreground");
		$$renderer.push(`<div class="relative">`);
		if (isDescription()) {
			$$renderer.push("<!--[0-->");
			Textarea($$renderer, {
				value: text(),
				oninput: (e) => onUpdate(e.currentTarget.value),
				disabled: readonly,
				rows: 3,
				class: `pr-14 ${stringify(validationClasses ?? "")}`
			});
		} else {
			$$renderer.push("<!--[-1-->");
			Input($$renderer, {
				type: "text",
				value: text(),
				oninput: (e) => onUpdate(e.currentTarget.value),
				disabled: readonly,
				class: `pr-14 ${stringify(validationClasses ?? "")}`
			});
		}
		$$renderer.push(`<!--]--> <span${attr_class(`pointer-events-none absolute right-3 font-mono text-[11px] tabular-nums ${stringify(toneClass())} ${stringify(isDescription() ? "top-2.5" : "top-1/2 -translate-y-1/2")}`)}${attr("title", `Ideal ≤ ${stringify(ideal())} characters`)}>${escape_html(len())}/${escape_html(ideal())}</span></div>`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-seo@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af__@_8a5f1a256dbf8c550a6bb4084759fb8e/node_modules/@aphexcms/plugin-seo/dist/SeoPreview.svelte
function SeoPreview($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { documentData, schemaType } = $$props;
		const doc = derived(() => documentData ?? {});
		const seo = derived(() => doc().seo ?? {});
		const gen = seoGenerators();
		const ctx = derived(() => ({ typeName: schemaType }));
		const title = derived(() => seo().metaTitle || gen.generateTitle(doc(), ctx()) || "Untitled");
		const description = derived(() => seo().metaDescription || gen.generateDescription(doc(), ctx()) || "");
		const url = derived(() => gen.generateURL(doc(), ctx()));
		const displayUrl = derived(() => url().replace(/^https?:\/\//, "").replace(/\/$/, "") || "example.com");
		$$renderer.push(`<div class="border-border bg-card rounded-lg border p-4"><div class="text-[11px] leading-none text-emerald-700 dark:text-emerald-500">${escape_html(displayUrl())}</div> <div class="mt-1 truncate text-lg leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">${escape_html(title())}</div> <p class="text-muted-foreground mt-0.5 line-clamp-2 text-sm leading-snug">${escape_html(description() || "Add a meta description, or one is generated from the excerpt.")}</p> `);
		if (seo().noIndex) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="text-destructive mt-2 text-[11px] font-medium">Hidden from search engines</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
/** Build the "SEO & Social" object field. Everything is optional — the frontend
*  falls back to the document's own title / excerpt / cover image. */
function buildSeoField(config = {}) {
	const { name = "seo", title = "SEO & Social", description = "Optional. Control how this appears in Google and on social media. Leave blank to use sensible defaults from the fields above.", group } = config;
	return {
		name,
		type: "object",
		title,
		description,
		...group ? { group } : {},
		fields: [
			{
				name: "metaTitle",
				type: "string",
				title: "Meta title",
				description: "Overrides the title in search results and social cards. Best around 60 characters.",
				input: "seo-length",
				validation: (Rule) => Rule.max(70)
			},
			{
				name: "metaDescription",
				type: "text",
				title: "Meta description",
				rows: 3,
				description: "The snippet shown under the title in search results. ~155 characters. Falls back to the excerpt.",
				input: "seo-length",
				validation: (Rule) => Rule.max(200)
			},
			{
				name: "ogImage",
				type: "image",
				title: "Social share image",
				description: "Shown when this is shared on social media. Ideally 1200×630. Falls back to the cover image."
			},
			{
				name: "noIndex",
				type: "boolean",
				title: "Hide from search engines",
				description: "Stops Google and others from indexing this page (it stays publicly reachable)."
			},
			{
				name: "seoPreview",
				type: "string",
				title: "Search preview",
				input: "seo-preview"
			}
		]
	};
}
/**
* The reusable "SEO & Social" object field. Embed it in any document with
* `seoField('seo')` (or pass a group name), or use the `{ type: 'seo' }` literal.
*/
function seoField(group) {
	return buildSeoField({ group });
}
/**
* Schema-transform: desugar every `{ type: 'seo' }` field into the SEO `object`,
* everywhere in the schema list. Registered as an `aphex/schema/transform` part so
* it runs in the engine, admin, and type generator alike — the engine never sees a
* `seo` primitive.
*/
function expandSeoTypes(schemas) {
	return desugarFieldType(schemas, {
		type: "seo",
		build: (f) => buildSeoField({
			name: f.name,
			title: f.title
		})
	});
}
/**
* Inject the SEO field group into a document schema (adds the `seo` field and a
* `SEO` group tab if absent). Idempotent — a schema that already has a `seo` field
* is returned untouched. Used by the plugin's schema-transform part to auto-enable
* SEO on chosen collections, like Payload's `collections: [...]`.
*/
function injectSeoField(schema, group = "seo") {
	if (schema.type !== "document") return schema;
	if (schema.fields.some((f) => f.name === "seo")) return schema;
	const groups = schema.groups ?? [];
	const withGroup = groups.some((g) => g.name === group) ? groups : [...groups, {
		name: group,
		title: "SEO"
	}];
	return {
		...schema,
		groups: withGroup,
		fields: [...schema.fields, seoField(group)]
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-seo@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af__@_8a5f1a256dbf8c550a6bb4084759fb8e/node_modules/@aphexcms/plugin-seo/dist/index.js
/**
* First-party SEO plugin — feature-comparable to @payloadcms/plugin-seo.
*
* `seoPlugin({ collections, generateTitle, ... })`:
*  - `collections` auto-injects the SEO meta field group into those document types
*    (via an aphex/schema/transform part) — you don't add `seoField` by hand.
*  - the `generate*` functions drive the ✨ Generate action and the live search
*    preview.
*
* Contributes: a document action (Generate SEO), an admin tool (SEO audit), the
* length-metered inputs, the search-result preview, a schema transform that
* desugars the `{ type: 'seo' }` literal, and — when `collections` is set — a
* second transform that auto-injects SEO on those types. Everything is client-plane
* except the transforms, which are pure and run on both the engine and the admin.
*/
function seoPlugin(options = {}) {
	const { collections, group = "seo", ...generators } = options;
	configureSeo(generators);
	const parts = [
		{
			implements: "aphex/document/action",
			id: "seo.generate",
			title: "Generate SEO",
			component: GenerateSeoAction,
			appliesTo: collections
		},
		{
			implements: "aphex/admin/tool",
			id: "seo",
			title: "SEO",
			icon: Sparkles,
			component: SeoTool,
			placement: "sidebar"
		},
		{
			implements: "aphex/field/component",
			input: "seo-length",
			component: MetaLengthInput
		},
		{
			implements: "aphex/field/component",
			input: "seo-preview",
			component: SeoPreview
		},
		{
			implements: "aphex/schema/transform",
			transform: expandSeoTypes
		}
	];
	if (collections && collections.length > 0) parts.push({
		implements: "aphex/schema/transform",
		transform: (schemas) => schemas.map((s) => collections.includes(s.name) ? injectSeoField(s, group) : s)
	});
	return definePlugin({
		name: "@aphexcms/plugin-seo",
		version: "0.1.0",
		parts
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/button-group/button-group.svelte
var buttonGroupVariants = tv({
	base: "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	variants: { orientation: {
		horizontal: "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]]:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
		vertical: "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! flex-col [&>[data-slot]]:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0"
	} },
	defaultVariants: { orientation: "horizontal" }
});
function Button_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, orientation = "horizontal", $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			role: "group",
			"data-slot": "button-group",
			"data-orientation": orientation,
			class: clsx(cn(buttonGroupVariants({ orientation }), className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-color-picker@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb_a39e1f8882e15929930b9cee10e2ac32/node_modules/@aphexcms/plugin-color-picker/dist/ColorPicker.svelte
function ColorPicker($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = "#000000", class: className, allowOpacity = false, defaultFormat = "hex", formats = [
			"hex",
			"rgb",
			"hsl",
			"oklch"
		], onChange } = $$props;
		let h = 0;
		let s = 0;
		let v = 0;
		let a = 1;
		let activeFormat = defaultFormat;
		const hueGradient = "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)";
		let formatOpen = false;
		function updateExternal() {
			value = formatOutput(h, s, v, a, activeFormat);
			onChange?.(value);
		}
		function setFormat(fmt) {
			activeFormat = fmt;
			updateExternal();
			formatOpen = false;
		}
		function parseColor(str) {
			str = str.trim().toLowerCase();
			if (str.startsWith("#")) {
				const hex = str.replace("#", "");
				let r = 0, g = 0, b = 0, alpha = 1;
				if (hex.length === 3) {
					r = parseInt(hex.slice(0, 1).repeat(2), 16);
					g = parseInt(hex.slice(1, 2).repeat(2), 16);
					b = parseInt(hex.slice(2, 3).repeat(2), 16);
				} else if (hex.length === 6) {
					r = parseInt(hex.substring(0, 2), 16);
					g = parseInt(hex.substring(2, 4), 16);
					b = parseInt(hex.substring(4, 6), 16);
				} else if (hex.length === 8) {
					r = parseInt(hex.substring(0, 2), 16);
					g = parseInt(hex.substring(2, 4), 16);
					b = parseInt(hex.substring(4, 6), 16);
					alpha = parseInt(hex.substring(6, 8), 16) / 255;
				} else return null;
				return {
					...rgbToHsv(r, g, b),
					a: alpha
				};
			}
			if (str.startsWith("rgb")) {
				const values = str.match(/[\d.]+/g)?.map(Number);
				if (values && values.length >= 3) {
					const [r = 0, g = 0, b = 0, alpha = 1] = values;
					return {
						...rgbToHsv(r, g, b),
						a: alpha
					};
				}
			}
			if (str.startsWith("hsl")) {
				const values = str.match(/[\d.]+/g)?.map(Number);
				if (values && values.length >= 3) {
					const [hue = 0, sat = 0, light = 0, alpha = 1] = values;
					const sNorm = sat / 100, lNorm = light / 100;
					const vNorm = lNorm + sNorm * Math.min(lNorm, 1 - lNorm);
					return {
						h: hue,
						s: (vNorm === 0 ? 0 : 2 * (1 - lNorm / vNorm)) * 100,
						v: vNorm * 100,
						a: alpha
					};
				}
			}
			if (str.startsWith("oklch")) {
				const values = str.match(/[\d.%]+/g)?.map((s) => s.includes("%") ? parseFloat(s) / 100 : parseFloat(s));
				if (values && values.length >= 3) {
					const [l = 0, c = 0, hue = 0, alpha = 1] = values;
					const rgb = oklchToRgb(l, c, hue);
					return {
						...rgbToHsv(rgb.r, rgb.g, rgb.b),
						a: alpha
					};
				}
			}
			return null;
		}
		function formatOutput(h, s, v, a, format) {
			if (format === "hex") return hsvToHex(h, s, v, a);
			if (format === "rgb") return hsvToRgbString(h, s, v, a);
			if (format === "hsl") return hsvToHslString(h, s, v, a);
			if (format === "oklch") return hsvToOklchString(h, s, v, a);
			return "";
		}
		function rgbToHsv(r, g, b) {
			r /= 255;
			g /= 255;
			b /= 255;
			const max = Math.max(r, g, b), min = Math.min(r, g, b);
			let h = 0, s = 0, v = max;
			const d = max - min;
			s = max === 0 ? 0 : d / max;
			if (max !== min) {
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}
			return {
				h: h * 360,
				s: s * 100,
				v: v * 100
			};
		}
		function hsvToRgb(h, s, v) {
			let sNorm = s / 100, vNorm = v / 100;
			let r = 0, g = 0, b = 0;
			const i = Math.floor(h / 60), f = h / 60 - i, p = vNorm * (1 - sNorm), q = vNorm * (1 - f * sNorm), t = vNorm * (1 - (1 - f) * sNorm);
			switch (i % 6) {
				case 0:
					r = vNorm;
					g = t;
					b = p;
					break;
				case 1:
					r = q;
					g = vNorm;
					b = p;
					break;
				case 2:
					r = p;
					g = vNorm;
					b = t;
					break;
				case 3:
					r = p;
					g = q;
					b = vNorm;
					break;
				case 4:
					r = t;
					g = p;
					b = vNorm;
					break;
				case 5:
					r = vNorm;
					g = p;
					b = q;
					break;
			}
			return {
				r: Math.round(r * 255),
				g: Math.round(g * 255),
				b: Math.round(b * 255)
			};
		}
		function hsvToOklchString(h, s, v, a) {
			const rgb = hsvToRgb(h, s, v);
			const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
			const L = (oklch.l * 100).toFixed(1) + "%";
			const C = oklch.c.toFixed(3);
			const H = (oklch.h || 0).toFixed(1);
			if (allowOpacity && a < 1) return `oklch(${L} ${C} ${H} / ${parseFloat(a.toFixed(2))})`;
			return `oklch(${L} ${C} ${H})`;
		}
		function rgbToOklch(r, g, b) {
			r /= 255;
			g /= 255;
			b /= 255;
			r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92;
			g = g > .04045 ? Math.pow((g + .055) / 1.055, 2.4) : g / 12.92;
			b = b > .04045 ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;
			const l = .4122214708 * r + .5363325363 * g + .0514459929 * b;
			const m = .2119034982 * r + .6806995451 * g + .1073969566 * b;
			const s = .0883024619 * r + .2817188376 * g + .6299787005 * b;
			const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
			const L = .2104542553 * l_ + .793617785 * m_ - .0040720468 * s_;
			const A = 1.9779984951 * l_ - 2.428592205 * m_ + .4505937099 * s_;
			const B = .0259040371 * l_ + .7827717662 * m_ - .808675766 * s_;
			const C = Math.sqrt(A * A + B * B);
			let H = Math.atan2(B, A) * 180 / Math.PI;
			if (H < 0) H += 360;
			return {
				l: L,
				c: C,
				h: H
			};
		}
		function oklchToRgb(l, c, h) {
			const hRad = h * (Math.PI / 180);
			const A = c * Math.cos(hRad);
			const B = c * Math.sin(hRad);
			const L = l;
			const l_ = L + .3963377774 * A + .2158037573 * B;
			const m_ = L - .1055613458 * A - .0638541728 * B;
			const s_ = L - .0894841775 * A - 1.291485548 * B;
			const lLin = l_ * l_ * l_;
			const mLin = m_ * m_ * m_;
			const sLin = s_ * s_ * s_;
			let r = 4.0767416621 * lLin - 3.3077115913 * mLin + .2309699292 * sLin;
			let g = -1.2684380046 * lLin + 2.6097574011 * mLin - .3413193965 * sLin;
			let b = -.0041960863 * lLin - .7034186147 * mLin + 1.707614701 * sLin;
			r = r >= .0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : 12.92 * r;
			g = g >= .0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - .055 : 12.92 * g;
			b = b >= .0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : 12.92 * b;
			r = Math.min(Math.max(0, r), 1) * 255;
			g = Math.min(Math.max(0, g), 1) * 255;
			b = Math.min(Math.max(0, b), 1) * 255;
			return {
				r,
				g,
				b
			};
		}
		function hsvToHex(h, s, v, a) {
			const { r, g, b } = hsvToRgb(h, s, v);
			const toHex = (x) => {
				const hex = x.toString(16);
				return hex.length === 1 ? "0" + hex : hex;
			};
			let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
			if (allowOpacity && a < 1) hex += toHex(Math.round(a * 255));
			return hex.toUpperCase();
		}
		function hsvToRgbString(h, s, v, a) {
			const { r, g, b } = hsvToRgb(h, s, v);
			if (allowOpacity && a < 1) return `rgba(${r}, ${g}, ${b}, ${parseFloat(a.toFixed(2))})`;
			return `rgb(${r}, ${g}, ${b})`;
		}
		function hsvToHslString(h, s, v, a) {
			const sNorm = s / 100, vNorm = v / 100;
			let l = (2 - sNorm) * vNorm / 2;
			let sHsl = l && l < 1 ? sNorm * vNorm / (l < .5 ? l * 2 : 2 - l * 2) : sNorm;
			if (allowOpacity && a < 1) return `hsla(${Math.round(h)}, ${Math.round(sHsl * 100)}%, ${Math.round(l * 100)}%, ${parseFloat(a.toFixed(2))})`;
			return `hsl(${Math.round(h)}, ${Math.round(sHsl * 100)}%, ${Math.round(l * 100)}%)`;
		}
		function handleAlphaInput(e) {
			let val = parseInt(e.currentTarget.value);
			if (isNaN(val)) return;
			val = Math.max(0, Math.min(100, val));
			a = val / 100;
			updateExternal();
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div${attr_class(clsx(cn("bg-popover flex w-[350px] flex-col gap-3 rounded-lg border p-3 shadow-sm", className)))}><div class="relative h-56 w-full cursor-crosshair touch-none rounded-md shadow-sm" role="slider" aria-label="Saturation and brightness"${attr("aria-valuenow", s)} tabindex="0"${attr_style("", { "background-color": `hsl(${h}, 100%, 50%)` })}><div class="pointer-events-none absolute inset-0 overflow-hidden rounded-md"><div class="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div> <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div></div> <svg class="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true"${attr_style("", { overflow: "visible" })}><circle${attr("cx", `${s}%`)}${attr("cy", `${100 - v}%`)} r="6" fill="none" stroke="rgba(0, 0, 0, 0.25)"></circle><circle${attr("cx", `${s}%`)}${attr("cy", `${100 - v}%`)} r="5" fill="none" stroke="white" stroke-width="2"></circle></svg></div> <div class="flex items-center gap-3"><div class="relative mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-md border bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')] shadow-sm"><div class="absolute inset-0"${attr_style("", { "background-color": hsvToHex(h, s, v, a) })}></div></div> <div class="flex flex-1 flex-col justify-center gap-3"><div class="relative h-3 w-full cursor-pointer touch-none rounded-full shadow-sm ring-1 ring-black/5" role="slider" aria-label="Hue"${attr("aria-valuenow", h)} tabindex="0"${attr_style("", { background: hueGradient })}><div class="pointer-events-none absolute top-1/2 z-10 h-3 w-3 rounded-full bg-white"${attr_style("", {
				left: `min(max(6px, ${h / 360 * 100}%), calc(100% - 6px))`,
				transform: "translate(-50%, -50%)"
			})}></div></div> `);
			if (allowOpacity) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="relative h-3 w-full cursor-pointer touch-none rounded-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')] shadow-sm ring-1 ring-black/5" role="slider" aria-label="Opacity"${attr("aria-valuenow", a)} tabindex="0"><div class="absolute inset-0 rounded-full"${attr_style("", { background: `linear-gradient(to right, transparent, ${hsvToHex(h, s, v, 1)})` })}></div> <div class="pointer-events-none absolute top-1/2 z-10 h-3 w-3 rounded-full bg-white"${attr_style("", {
					left: `min(max(6px, ${a * 100}%), calc(100% - 6px))`,
					transform: "translate(-50%, -50%)"
				})}></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> `);
			if (Button_group) {
				$$renderer.push("<!--[-->");
				Button_group($$renderer, {
					class: "w-full",
					children: ($$renderer) => {
						if (formats.length > 1) {
							$$renderer.push("<!--[0-->");
							if (Root) {
								$$renderer.push("<!--[-->");
								Root($$renderer, {
									get open() {
										return formatOpen;
									},
									set open($$value) {
										formatOpen = $$value;
										$$settled = false;
									},
									children: ($$renderer) => {
										{
											function child($$renderer, { props }) {
												Button($$renderer, spread_props([props, {
													variant: "outline",
													class: "h-9 max-w-[5rem] justify-between px-2 text-[10px]",
													children: ($$renderer) => {
														$$renderer.push(`<!---->${escape_html(activeFormat.toUpperCase())} `);
														Chevron_down($$renderer, { class: "h-3 w-3 opacity-50" });
														$$renderer.push(`<!---->`);
													},
													$$slots: { default: true }
												}]));
											}
											if (Popover_trigger) {
												$$renderer.push("<!--[-->");
												Popover_trigger($$renderer, {
													child,
													$$slots: { child: true }
												});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										}
										$$renderer.push(` `);
										if (Popover_content) {
											$$renderer.push("<!--[-->");
											Popover_content($$renderer, {
												class: "w-[4.5rem] p-0",
												align: "start",
												children: ($$renderer) => {
													if (Command) {
														$$renderer.push("<!--[-->");
														Command($$renderer, {
															children: ($$renderer) => {
																if (Command_list) {
																	$$renderer.push("<!--[-->");
																	Command_list($$renderer, {
																		children: ($$renderer) => {
																			if (Command_group) {
																				$$renderer.push("<!--[-->");
																				Command_group($$renderer, {
																					children: ($$renderer) => {
																						$$renderer.push(`<!--[-->`);
																						const each_array = ensure_array_like(formats);
																						for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
																							let fmt = each_array[$$index];
																							if (Command_item) {
																								$$renderer.push("<!--[-->");
																								Command_item($$renderer, {
																									value: fmt,
																									onSelect: () => setFormat(fmt),
																									class: "flex h-7 justify-center text-[10px]",
																									children: ($$renderer) => {
																										$$renderer.push(`<!---->${escape_html(fmt.toUpperCase())}`);
																									},
																									$$slots: { default: true }
																								});
																								$$renderer.push("<!--]-->");
																							} else {
																								$$renderer.push("<!--[!-->");
																								$$renderer.push("<!--]-->");
																							}
																						}
																						$$renderer.push(`<!--]-->`);
																					},
																					$$slots: { default: true }
																				});
																				$$renderer.push("<!--]-->");
																			} else {
																				$$renderer.push("<!--[!-->");
																				$$renderer.push("<!--]-->");
																			}
																		},
																		$$slots: { default: true }
																	});
																	$$renderer.push("<!--]-->");
																} else {
																	$$renderer.push("<!--[!-->");
																	$$renderer.push("<!--]-->");
																}
															},
															$$slots: { default: true }
														});
														$$renderer.push("<!--]-->");
													} else {
														$$renderer.push("<!--[!-->");
														$$renderer.push("<!--]-->");
													}
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						} else {
							$$renderer.push("<!--[-1-->");
							Button($$renderer, {
								variant: "outline",
								class: "h-9 max-w-[5rem] justify-between px-2 text-[10px]",
								children: ($$renderer) => {
									$$renderer.push(`<!---->${escape_html(activeFormat.toUpperCase())}`);
								},
								$$slots: { default: true }
							});
						}
						$$renderer.push(`<!--]--> `);
						Input($$renderer, {
							class: "h-9 flex-1 font-mono text-[10px] uppercase",
							value,
							oninput: (e) => {
								const parsed = parseColor(e.currentTarget.value);
								if (parsed) {
									h = parsed.h;
									s = parsed.s;
									v = parsed.v;
									a = parsed.a;
									updateExternal();
								}
							}
						});
						$$renderer.push(`<!----> `);
						if (allowOpacity) {
							$$renderer.push("<!--[0-->");
							Input($$renderer, {
								class: "h-9 max-w-[4.2rem] text-right font-mono text-[10px]",
								value: Math.round(a * 100) + "%",
								oninput: handleAlphaInput,
								maxlength: 3
							});
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]-->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { value });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-color-picker@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb_a39e1f8882e15929930b9cee10e2ac32/node_modules/@aphexcms/plugin-color-picker/dist/color.js
/**
* Color value model + conversions for the rich (object) color field.
*
* The picker can store a color two ways:
*   - `type: 'string'` → a plain hex/CSS string (simple, drops straight into CSS).
*   - `type: 'object'` → this `ColorValue` — hex + alpha + rgb/hsl/hsv, mirroring
*     Sanity's `@sanity/color-input` data model so a color is usable in any format
*     without re-converting at the call site.
*
* Plain TS (no DOM), safe to import anywhere.
*/
var clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
var round = (n, dp = 0) => {
	const f = 10 ** dp;
	return Math.round(n * f) / f;
};
function hexToRgb(hex) {
	let h = hex.replace("#", "").trim();
	if (h.length === 3 || h.length === 4) h = h.split("").map((c) => c + c).join("");
	if (h.length === 6) h += "ff";
	if (h.length !== 8 || /[^0-9a-f]/i.test(h)) return null;
	return {
		r: parseInt(h.slice(0, 2), 16),
		g: parseInt(h.slice(2, 4), 16),
		b: parseInt(h.slice(4, 6), 16),
		a: round(parseInt(h.slice(6, 8), 16) / 255, 2)
	};
}
function rgbToHsv({ r, g, b, a }) {
	const rn = r / 255, gn = g / 255, bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const d = max - Math.min(rn, gn, bn);
	let h = 0;
	if (d !== 0) {
		if (max === rn) h = (gn - bn) / d % 6;
		else if (max === gn) h = (bn - rn) / d + 2;
		else h = (rn - gn) / d + 4;
		h *= 60;
		if (h < 0) h += 360;
	}
	const s = max === 0 ? 0 : d / max;
	return {
		h: round(h, 1),
		s: round(s * 100, 1),
		v: round(max * 100, 1),
		a
	};
}
function rgbToHsl({ r, g, b, a }) {
	const rn = r / 255, gn = g / 255, bn = b / 255;
	const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
	const d = max - min;
	const l = (max + min) / 2;
	let h = 0;
	let s = 0;
	if (d !== 0) {
		s = d / (1 - Math.abs(2 * l - 1));
		if (max === rn) h = (gn - bn) / d % 6;
		else if (max === gn) h = (bn - rn) / d + 2;
		else h = (rn - gn) / d + 4;
		h *= 60;
		if (h < 0) h += 360;
	}
	return {
		h: round(h, 1),
		s: round(s * 100, 1),
		l: round(l * 100, 1),
		a
	};
}
var toHex2 = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
/** RGBA → `#RRGGBB` (or `#RRGGBBAA` when alpha < 1). */
function rgbToHex({ r, g, b, a }) {
	const base = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
	return a < 1 ? `${base}${toHex2(a * 255)}` : base.toUpperCase();
}
/** Parse a CSS color string the picker emits (hex / rgb(a) / hsl(a)) into `RgbaColor`. */
function parseCssToRgb(css) {
	const s = css.trim().toLowerCase();
	if (s.startsWith("#")) return hexToRgb(s);
	if (s.startsWith("rgb")) {
		const n = s.match(/[\d.]+/g)?.map(Number);
		if (n && n.length >= 3) {
			const [r = 0, g = 0, b = 0, a = 1] = n;
			return {
				r,
				g,
				b,
				a
			};
		}
	}
	if (s.startsWith("hsl")) {
		const n = s.match(/[\d.]+/g)?.map(Number);
		if (n && n.length >= 3) {
			const [hh = 0, ss = 0, ll = 0, a = 1] = n;
			const h = hh / 360, sl = ss / 100, l = ll / 100;
			const q = l < .5 ? l * (1 + sl) : l + sl - l * sl;
			const p = 2 * l - q;
			const hue = (t) => {
				let tt = t;
				if (tt < 0) tt += 1;
				if (tt > 1) tt -= 1;
				if (tt < 1 / 6) return p + (q - p) * 6 * tt;
				if (tt < 1 / 2) return q;
				if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
				return p;
			};
			return {
				r: round(hue(h + 1 / 3) * 255),
				g: round(hue(h) * 255),
				b: round(hue(h - 1 / 3) * 255),
				a
			};
		}
	}
	return null;
}
/** Build the full `ColorValue` from any CSS color string the picker emits. `null` if unparseable. */
function parseColorToValue(css) {
	const rgb = parseCssToRgb(css);
	if (!rgb) return null;
	return {
		hex: rgbToHex(rgb),
		alpha: rgb.a,
		rgb,
		hsl: rgbToHsl(rgb),
		hsv: rgbToHsv(rgb)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-color-picker@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb_a39e1f8882e15929930b9cee10e2ac32/node_modules/@aphexcms/plugin-color-picker/dist/ColorInput.svelte
function ColorInput($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { field, value, onUpdate, validationClasses, readonly = false } = $$props;
		const isObject = derived(() => field.type === "object");
		const allowOpacity = derived(() => field.inputOptions?.alpha === true);
		const formats = derived(() => isObject() ? [
			"hex",
			"rgb",
			"hsl"
		] : field.inputOptions?.hexOnly === true ? ["hex"] : void 0);
		let picked = "";
		function emit(css) {
			if (isObject()) onUpdate(css ? parseColorToValue(css) : void 0);
			else onUpdate(css);
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div${attr("aria-disabled", readonly)}${attr_class("", void 0, {
				"pointer-events-none": readonly,
				"opacity-50": readonly
			})}>`);
			ColorPicker($$renderer, {
				allowOpacity: allowOpacity(),
				formats: formats(),
				class: validationClasses,
				onChange: emit,
				get value() {
					return picked;
				},
				set value($$value) {
					picked = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-color-picker@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb_a39e1f8882e15929930b9cee10e2ac32/node_modules/@aphexcms/plugin-color-picker/dist/constants.js
/** The input key this plugin registers. Use it in schemas: `input: COLOR_INPUT` (`'color'`).
*  Kept in a Svelte-free module so the server-safe `./schema` export can import it. */
var COLOR_INPUT = "color";
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-color-picker@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb_a39e1f8882e15929930b9cee10e2ac32/node_modules/@aphexcms/plugin-color-picker/dist/schema.js
/** The `type` keyword this plugin desugars (authored as `{ type: 'color' }`). */
var COLOR_TYPE = "color";
var numberSub = (name) => ({
	name,
	type: "number",
	title: name
});
/** Build a rich-color `object` field: stores `{ hex, alpha, rgb, hsl, hsv }`, edited by the picker. */
function color(config) {
	const { name, title, alpha, ...rest } = config;
	return {
		...rest,
		name,
		type: "object",
		title: title ?? name,
		input: COLOR_INPUT,
		inputOptions: { alpha: alpha === true },
		fields: [
			{
				name: "hex",
				type: "string",
				title: "Hex"
			},
			{
				name: "alpha",
				type: "number",
				title: "Alpha"
			},
			{
				name: "rgb",
				type: "object",
				title: "RGB",
				fields: [
					"r",
					"g",
					"b",
					"a"
				].map(numberSub)
			},
			{
				name: "hsl",
				type: "object",
				title: "HSL",
				fields: [
					"h",
					"s",
					"l",
					"a"
				].map(numberSub)
			},
			{
				name: "hsv",
				type: "object",
				title: "HSV",
				fields: [
					"h",
					"s",
					"v",
					"a"
				].map(numberSub)
			}
		]
	};
}
/**
* Schema-transform: desugar every `{ type: 'color' }` field into the rich color
* `object`, everywhere in the schema list. Registered as the plugin's
* `aphex/schema/transform` part so it runs in the engine, admin, and type generator
* alike — the engine never sees a `color` primitive.
*
* `desugarFieldType` owns the walk (nested objects, array members) and preserves
* whatever the author declared — `access`, `validation`, multiple groups — so this
* only has to describe the shape. `alpha` is sugar: it becomes `inputOptions.alpha`
* and must not survive onto the expanded object.
*/
function expandColorTypes(schemas) {
	return desugarFieldType(schemas, {
		type: COLOR_TYPE,
		sugarKeys: ["alpha"],
		build: (f) => color({
			name: f.name,
			title: f.title,
			alpha: f.alpha === true
		})
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+plugin-color-picker@0.1.0_@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb_a39e1f8882e15929930b9cee10e2ac32/node_modules/@aphexcms/plugin-color-picker/dist/index.js
/**
* Color plugin — a rich color field widget for AphexCMS.
*
* Registers an `aphex/field/component` part for the `color` input. It works over
* two storage shapes, chosen by the field's `type`:
*   - `{ type: 'string', input: 'color' }` → stores a plain hex/CSS string (drops
*     straight into CSS; ideal for theme tokens).
*   - a rich object storing `{ hex, alpha, rgb, hsl, hsv }` (Sanity's data model) —
*     use the `color()` helper from `@aphexcms/plugin-color-picker/schema` to declare
*     it in one line.
*
* Color is intentionally NOT a built-in field type in cms-core — like Sanity, the
* engine ships the primitives and color is a plugin. Register it once:
*
* ```ts
* // src/lib/plugins.ts
* import { colorPickerPlugin } from '@aphexcms/plugin-color-picker';
* export const plugins = [colorPickerPlugin()];
* ```
*/
function colorPickerPlugin() {
	return definePlugin({
		name: "@aphexcms/plugin-color-picker",
		version: "0.1.0",
		parts: [{
			implements: "aphex/field/component",
			input: COLOR_INPUT,
			component: ColorInput
		}, {
			implements: "aphex/schema/transform",
			transform: expandColorTypes
		}]
	});
}
//#endregion
//#region src/lib/plugins.ts
/**
* Client-safe plugin registry for the admin app.
*
* The admin page imports this directly (component parts can't cross SvelteKit
* `load`); `aphex.config.ts` imports the same array so the server engine ingests
* schema/route/transform parts. Keep this module free of server-only imports (DB
* adapters, secrets) so it's safe in the browser bundle.
*/
var plugins = [seoPlugin({
	collections: [
		"blog_post",
		"page",
		"author",
		"tag"
	],
	generateURL: (doc, { typeName }) => {
		const slug = typeof doc.slug === "string" ? doc.slug : "";
		if (typeName === "author") return `/author/${slug}`;
		if (typeName === "tag") return `/tag/${slug}`;
		if (typeName === "page") return `/${slug}`;
		return `/blog/${slug}`;
	}
}), colorPickerPlugin()];
//#endregion
export { plugins as t };
