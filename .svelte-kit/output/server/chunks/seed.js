import { n as private_env } from "./shared-server.js";
import { n as systemContext } from "./auth-helpers.js";
//#region src/lib/server/seed/index.ts
/**
* Demo-content seed for the blog.
*
* Two entry points:
*
* - `seedOnFirstRun(locals)` — wired into `hooks.server.ts`. Runs once per process,
*   and only when the site is completely untouched: the first organization exists and
*   holds zero rows of any seeded type (posts, pages, authors, tags, site settings —
*   even a lazy-created settings row counts as touched). That makes it safe to leave
*   enabled in production: it can populate exactly one moment in a site's life, right
*   after the first signup, and can never stomp anything a person made.
*
* - `seedBlogContent(...)` — the actual content creation, also used by the dev-only
*   `GET /api/seed-blog` route with `wipe: true` as a reset button.
*
* Don't want demo content? Set `APHEX_SEED=false`, or delete this directory and the
* seed hook in `hooks.server.ts`.
*/
var n = 0;
var key = () => `k${n++}`;
var span = (text, marks) => ({
	_type: "span",
	_key: key(),
	text,
	...marks ? { marks } : {}
});
var block = (style, children, extra = {}) => ({
	_type: "block",
	_key: key(),
	style,
	markDefs: [],
	children,
	...extra
});
var p = (...children) => block("normal", children);
var h = (level, text) => block(`h${level}`, [span(text)]);
var quote = (text) => block("blockquote", [span(text)]);
var li = (text, listItem) => block("normal", [span(text)], {
	listItem,
	level: 1
});
var callout = (tone, text) => ({
	_type: "callout",
	_key: key(),
	tone,
	text
});
var code = (language, codeStr) => ({
	_type: "codeBlock",
	_key: key(),
	language,
	code: codeStr
});
var divider = (style = "line") => ({
	_type: "divider",
	_key: key(),
	style
});
var toggle = (heading, content) => ({
	_type: "toggle",
	_key: key(),
	heading,
	content
});
var button = (label, url, opts = {}) => ({
	_type: "button",
	_key: key(),
	label,
	url,
	style: opts.style ?? "primary",
	align: opts.align ?? "center"
});
var embed = (embedCode, caption) => ({
	_type: "embed",
	_key: key(),
	embedCode,
	...caption ? { caption } : {}
});
var gallery = (images, caption) => {
	const present = images.filter(Boolean);
	return present.length > 0 ? {
		_type: "gallery",
		_key: key(),
		images: present,
		...caption ? { caption } : {}
	} : null;
};
var ref = (id) => ({
	_type: "reference",
	_ref: id,
	_key: key()
});
var imageValue = (id, alt) => id ? {
	_type: "image",
	asset: {
		_type: "reference",
		_ref: id
	},
	...alt ? { alt } : {}
} : void 0;
var imageBlock = (id, alt) => id ? {
	_type: "image",
	_key: key(),
	asset: {
		_type: "reference",
		_ref: id
	},
	...alt ? { alt } : {}
} : null;
/** The document types the seed creates — and the types whose presence blocks it. */
var SEEDED_TYPES = [
	"blog_post",
	"page",
	"author",
	"tag",
	"siteSettings"
];
/**
* Create the demo content set: tags, authors, three posts, two pages, and site
* settings. Assumes the target org — pass `wipe: true` (the dev reset path) to
* delete existing seeded-type documents first; the first-run path never wipes.
*/
async function seedBlogContent(aphex, orgId, context, options = {}) {
	const { localAPI, assetService } = aphex;
	if (options.wipe) {
		const collectionsToWipe = [
			localAPI.collections.blog_post,
			localAPI.collections.page,
			localAPI.collections.author,
			localAPI.collections.tag
		];
		for (const coll of collectionsToWipe) {
			const existing = await coll.find(context, {
				perspective: "draft",
				limit: 1e3
			});
			for (const doc of existing.docs) await coll.delete(context, doc.id);
		}
	}
	async function unsplash(photoId) {
		try {
			const url = `https://images.unsplash.com/photo-${photoId}?w=1600&q=80&auto=format&fit=crop`;
			const r = await fetch(url);
			if (!r.ok) return null;
			const buffer = Buffer.from(await r.arrayBuffer());
			return (await assetService.uploadAsset(orgId, {
				buffer,
				originalFilename: `${photoId}.jpg`,
				mimeType: r.headers.get("content-type") ?? "image/jpeg",
				size: buffer.length,
				creditLine: "Photo via Unsplash"
			})).id;
		} catch {
			return null;
		}
	}
	const [coverOpen, coverTypes, coverPT, inlinePT, coverAbout, avatarMara, avatarDev, heroImage, galleryA, galleryB, galleryC] = await Promise.all([
		unsplash("1517180102446-f3ece451e9d8"),
		unsplash("1461749280684-dccba630e2f6"),
		unsplash("1455390582262-044cdead277a"),
		unsplash("1499750310107-5fef28a66643"),
		unsplash("1481277542470-605612bd2d61"),
		unsplash("1494790108377-be9c29b29330"),
		unsplash("1500648767791-00dcc994a43e"),
		unsplash("1486312338219-ce68d2c6f44d"),
		unsplash("1497366216548-37526070297c"),
		unsplash("1519389950473-47ba0277781c"),
		unsplash("1504384308090-c894fdcc538d")
	]);
	const tagDefs = [
		{
			title: "Design",
			slug: "design",
			description: "Craft, type, and the visual side of the studio."
		},
		{
			title: "Engineering",
			slug: "engineering",
			description: "How the software actually gets built."
		},
		{
			title: "Process",
			slug: "process",
			description: "How we work, ship, and stay sane doing it."
		}
	];
	const tagIds = {};
	for (const t of tagDefs) {
		const res = await localAPI.collections.tag.create(context, t, { publish: true });
		tagIds[t.slug] = res.document.id;
	}
	const authorDefs = [{
		name: "Mara Lindqvist",
		slug: "mara-lindqvist",
		role: "Founder & Writer",
		bio: "Mara started the studio to make small, sharp tools for the web. She writes about craft, process, and the work in progress.",
		avatar: imageValue(avatarMara, "Portrait of Mara Lindqvist"),
		links: [{
			_type: "link",
			_key: key(),
			label: "Website",
			url: "https://example.com"
		}, {
			_type: "link",
			_key: key(),
			label: "Twitter",
			url: "https://twitter.com/example"
		}]
	}, {
		name: "Dev Okonkwo",
		slug: "dev-okonkwo",
		role: "Engineer",
		bio: "Dev builds the parts you do not see — type generation, APIs, and the plumbing that makes content type-safe.",
		avatar: imageValue(avatarDev, "Portrait of Dev Okonkwo"),
		links: [{
			_type: "link",
			_key: key(),
			label: "GitHub",
			url: "https://github.com/example"
		}]
	}];
	const authorIds = {};
	for (const a of authorDefs) {
		const res = await localAPI.collections.author.create(context, a, { publish: true });
		authorIds[a.name] = res.document.id;
	}
	const posts = [
		{
			title: "Designing in the open",
			slug: "designing-in-the-open",
			author: ref(authorIds["Mara Lindqvist"]),
			postDate: "2026-05-28",
			excerpt: "Why we publish work-in-progress, and what a year of building the studio journal taught us about momentum.",
			coverImage: imageValue(coverOpen, "Desk with a laptop and notes"),
			tags: [ref(tagIds.design), ref(tagIds.process)],
			content: [
				p(span("There is a particular kind of courage in showing work before it is finished. "), span("Designing in the open", ["em"]), span(" is not a marketing tactic for us — it is how the work stays honest.")),
				h(2, "Momentum beats polish"),
				p(span("A draft shipped on Tuesday teaches you more than a perfect thing shipped next month. The feedback loop is the product.")),
				quote("Make it real, then make it right. In that order, always."),
				divider("dots"),
				h(3, "What we changed"),
				li("Weekly notes instead of quarterly essays", "bullet"),
				li("Smaller, more frequent releases", "bullet"),
				li("Public changelogs for every package", "bullet"),
				callout("info", "These notes are written in the same editor you are reading them from."),
				toggle("Doesn’t publishing drafts invite bad feedback?", "The opposite, mostly. People are kinder to work labelled in-progress than to work presented as finished — and far more specific. The worst feedback we ever got was on things we polished in private."),
				p(span("The studio journal is the result. Thanks for reading along.")),
				button("Read the colophon", "/colophon", { style: "secondary" })
			]
		},
		{
			title: "Type-safe content with Aphex",
			slug: "type-safe-content-with-aphex",
			author: ref(authorIds["Dev Okonkwo"]),
			postDate: "2026-05-14",
			excerpt: "Schemas are the single source of truth. Generate the types once and the whole frontend stops lying to you.",
			coverImage: imageValue(coverTypes, "Code on a screen"),
			tags: [ref(tagIds.engineering)],
			content: [
				p(span("Most CMS bugs are really type bugs — a field renamed in the studio, a shape the frontend still assumes. Aphex closes that gap by generating TypeScript straight from your schema.")),
				h(2, "One command"),
				code("bash", "pnpm generate:types\n# → src/lib/generated-types.ts"),
				p(span("Now "), span("post.coverImage", ["code"]), span(" is an "), span("ImageValue", ["code"]), span(", "), span("post.tags", ["code"]), span(" is "), span("Reference<Tag>[]", ["code"]), span(", and the editor and the page can never drift apart.")),
				callout("warning", "Re-run generate:types whenever you change a schema — it is not automatic."),
				divider("line"),
				h(3, "In a load function"),
				code("ts", "const { docs } = await api.collections.blog_post.find(ctx, {\n  perspective: 'published',\n  limit: 12\n});\n// docs is BlogPost[] — fully typed."),
				toggle("What happens to existing documents when a schema changes?", "Nothing, immediately — documents are stored as plain JSON, so old rows keep their shape. The generated types describe the current schema, which is exactly how you find every place the frontend still assumes the old one: the compiler lists them.")
			]
		},
		{
			title: "A field guide to portable text",
			slug: "a-field-guide-to-portable-text",
			author: ref(authorIds["Mara Lindqvist"]),
			postDate: "2026-04-30",
			excerpt: "Rich text as data, not markup. Why we store an array of blocks and render it on our own terms.",
			coverImage: imageValue(coverPT, "Notebook and pen on a desk"),
			tags: [ref(tagIds.engineering), ref(tagIds.design)],
			content: [
				p(span("Portable Text treats a document as structured data: an array of blocks, each with a style and a list of spans. No HTML soup, no surprises.")),
				imageBlock(inlinePT, "Writing in a notebook"),
				h(2, "The shape"),
				li("Blocks carry a style — normal, h2, blockquote, code", "number"),
				li("Spans carry marks — strong, em, links", "number"),
				li("Custom types sit between blocks — images, embeds, galleries, callouts", "number"),
				p(span("Because it is just data, you render it however you like. This sentence has "), span("a bold bit", ["strong"]), span(" and "), span("an emphatic bit", ["em"]), span(", and both round-trip cleanly.")),
				quote("Markup is a rendering decision. Content should outlive it."),
				divider("dots"),
				h(2, "Beyond text"),
				p(span("Anything with a schema can sit between paragraphs. An embed is just a block holding an iframe snippet — the renderer extracts the src and emits its own markup:")),
				embed("<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/AdNJ3fydeao\" title=\"Rethinking Reactivity — Rich Harris\" frameborder=\"0\" allow=\"accelerometer; encrypted-media; picture-in-picture\" allowfullscreen></iframe>", "Rich Harris — Rethinking Reactivity, the talk behind Svelte 3."),
				p(span("A gallery is a block holding an array of image references. Same storage rules as every other image — real assets, credited, reusable:")),
				gallery([
					imageBlock(galleryA, "The studio, mid-morning"),
					imageBlock(galleryB, "Pairing on the editor"),
					imageBlock(galleryC, "Notes from a planning day")
				], "Scenes from the studio, stored as one gallery block."),
				toggle("And this one?", "A toggle — a heading plus a collapsible body, rendered as a native details/summary. Good for asides and FAQs that would break the flow if they sat open on the page."),
				callout("info", "Every block you see here is a row in the array stored for this post."),
				button("Write your own in the studio", "/admin", { align: "center" })
			]
		}
	];
	const postIds = [];
	for (const post of posts) {
		const data = {
			...post,
			content: post.content.filter(Boolean)
		};
		const res = await localAPI.collections.blog_post.create(context, data, { publish: true });
		postIds.push(res.document.id);
	}
	const pages = [{
		title: "About",
		slug: "about",
		excerpt: "A small studio building tools for people who make things on the web.",
		coverImage: imageValue(coverAbout, "Bookshelf"),
		content: [
			p(span("We are a small, independent studio. We design and build software, and we write about the parts worth sharing.")),
			h(2, "What we do"),
			p(span("Product design, frontend engineering, and the occasional open-source tool — like the CMS rendering this very page.")),
			divider("line"),
			p(span("Say hello: "), span("hello@aphexstudio.example", ["code"]), span(".")),
			button("Read the journal", "/blog", {
				style: "secondary",
				align: "left"
			})
		]
	}, {
		title: "Colophon",
		slug: "colophon",
		excerpt: "How this site is made.",
		content: [
			h(2, "Made with"),
			li("AphexCMS — schema-driven content", "bullet"),
			li("SvelteKit — the app and this page", "bullet"),
			li("Fraunces & Inter — the typefaces", "bullet"),
			p(span("Set in the open. Edited live. Published when ready."))
		]
	}];
	const pageIds = [];
	for (const page of pages) {
		const res = await localAPI.collections.page.create(context, page, { publish: true });
		pageIds.push(res.document.id);
	}
	const settingsColl = localAPI.collections.siteSettings;
	await settingsColl.get(context, { perspective: "draft" });
	const settingsId = settingsColl.getSingletonId(context);
	if (settingsId) await settingsColl.update(context, settingsId, {
		title: "Aphex",
		tagline: "Field notes, essays, and dispatches from the studio.",
		template: "editorial-journal",
		heroEyebrow: "The Journal",
		heroTitle: "Notes from a studio\nbuilding in the open.",
		heroSubtitle: "Essays on craft, process, and the tools we make along the way. Published when ready, drafted in public.",
		heroImage: imageValue(heroImage, "Hands on a laptop keyboard, morning light"),
		heroLayout: "split",
		color: {
			hex: "#9D2F2F",
			alpha: 1,
			rgb: {
				r: 157,
				g: 47,
				b: 47,
				a: 1
			},
			hsl: {
				h: 0,
				s: 53.9,
				l: 40,
				a: 1
			},
			hsv: {
				h: 0,
				s: 70.1,
				v: 61.6,
				a: 1
			}
		},
		nav: [{
			_type: "navLink",
			_key: key(),
			label: "About",
			url: "/about",
			newTab: false
		}, {
			_type: "navLink",
			_key: key(),
			label: "Colophon",
			url: "/colophon",
			newTab: false
		}],
		social: [{
			_type: "socialLink",
			_key: key(),
			label: "Twitter",
			url: "https://twitter.com/example"
		}, {
			_type: "socialLink",
			_key: key(),
			label: "GitHub",
			url: "https://github.com/example"
		}]
	}, { publish: true });
	return {
		tags: Object.keys(tagIds).length,
		authors: Object.keys(authorIds).length,
		posts: postIds.length,
		pages: pageIds.length
	};
}
/**
* Per-process latch. `'done'` means "decided" — either we seeded, or the site was
* already touched. A pending promise dedupes concurrent first requests. `null`
* means "no organization yet, check again next request" (pre-signup, one cheap
* org query per request; signup itself creates the org mid-request, so the
* decision lands on the request after it).
*/
var seedState = null;
/** Seed demo content the first time the app runs against an untouched site. */
function seedOnFirstRun(locals) {
	if (seedState === "done") return Promise.resolve();
	if (seedState) return seedState;
	const attempt = (async () => {
		const { databaseAdapter } = locals.aphexCMS;
		const org = (await databaseAdapter.findAllOrganizations())[0];
		if (!org) {
			seedState = null;
			return;
		}
		const counts = await databaseAdapter.getDocCountsByType(org.id);
		if (SEEDED_TYPES.some((type) => (counts[type] ?? 0) > 0)) {
			seedState = "done";
			return;
		}
		console.log("[seed] Fresh site detected — creating demo content…");
		const created = await seedBlogContent(locals.aphexCMS, org.id, systemContext(org.id));
		console.log(`[seed] Done: ${created.posts} posts, ${created.pages} pages, ${created.authors} authors, ${created.tags} tags.`);
		seedState = "done";
	})().catch((error) => {
		console.error("[seed] Failed to seed demo content:", error);
		seedState = "done";
	});
	seedState = attempt;
	return attempt;
}
/** Whether the first-run seed is enabled (kill switch: `APHEX_SEED=false`). */
function seedEnabled() {
	return private_env.APHEX_SEED !== "false";
}
//#endregion
export { seedEnabled as n, seedOnFirstRun as r, seedBlogContent as t };
