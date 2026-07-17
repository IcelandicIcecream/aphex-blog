import { d as defineCapability, m as mergeCapabilityCatalog } from "./capabilities.js";
import { l as spread_props } from "./renderer.js";
import { I as Icon } from "./Icon.js";
import { S as Settings } from "./settings.js";
function createPartResolver(plugins = []) {
  const allParts = plugins.flatMap((p) => p.parts ?? []);
  const seen = /* @__PURE__ */ new Map();
  for (const part of allParts) {
    if ("id" in part && typeof part.id === "string") {
      const bucket = seen.get(part.implements) ?? /* @__PURE__ */ new Set();
      if (bucket.has(part.id)) {
        throw new Error(`Duplicate plugin part id "${part.id}" for ${part.implements}. Part ids must be unique per extension point.`);
      }
      bucket.add(part.id);
      seen.set(part.implements, bucket);
    }
  }
  const settingsIds = /* @__PURE__ */ new Set();
  for (const part of allParts) {
    if (part.implements !== "aphex/settings")
      continue;
    if (settingsIds.has(part.pluginId)) {
      throw new Error(`Duplicate plugin settings declaration for "${part.pluginId}". Each plugin may declare settings once.`);
    }
    settingsIds.add(part.pluginId);
  }
  const getParts = (kind) => allParts.filter((p) => p.implements === kind);
  const hasCaps = (required, caps, overrideAccess) => overrideAccess || !required || required.length === 0 || required.every((c) => caps.includes(c));
  return {
    plugins,
    getParts,
    schemaTypes: () => getParts("aphex/schema").flatMap((p) => p.schemas),
    applySchemaTransforms: (schemas) => getParts("aphex/schema/transform").reduce((acc, part) => part.transform(acc), schemas),
    serverRoutes: () => getParts("aphex/server/route"),
    capabilities: () => {
      const set = /* @__PURE__ */ new Set();
      for (const p of getParts("aphex/capabilities"))
        for (const c of p.capabilities)
          set.add(typeof c === "string" ? c : c.id);
      return [...set];
    },
    capabilityCatalog: () => {
      const pluginDefs = [];
      for (const p of getParts("aphex/capabilities"))
        for (const c of p.capabilities)
          pluginDefs.push(typeof c === "string" ? defineCapability(c) : c);
      return mergeCapabilityCatalog(pluginDefs);
    },
    documentActions: ({ schemaName, capabilities = [], overrideAccess = false }) => getParts("aphex/document/action").filter((a) => !a.appliesTo || a.appliesTo.includes(schemaName)).filter((a) => hasCaps(a.requiredCapabilities, capabilities, overrideAccess)).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    adminTools: ({ capabilities = [], overrideAccess = false } = {}) => getParts("aphex/admin/tool").filter((t) => hasCaps(t.requiredCapabilities, capabilities, overrideAccess)).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    fieldComponent: (input) => getParts("aphex/field/component").find((f) => f.input === input),
    settingsDeclarations: () => getParts("aphex/settings"),
    settingsDeclaration: (pluginId) => getParts("aphex/settings").find((s) => s.pluginId === pluginId)
  };
}
function Book_open($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M12 7v14" }],
      [
        "path",
        {
          "d": "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
        }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "book-open" },
      /**
       * @component @name BookOpen
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgN3YxNCIgLz4KICA8cGF0aCBkPSJNMyAxOGExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMWg1YTQgNCAwIDAgMSA0IDQgNCA0IDAgMCAxIDQtNGg1YTEgMSAwIDAgMSAxIDF2MTNhMSAxIDAgMCAxLTEgMWgtNmEzIDMgMCAwIDAtMyAzIDMgMyAwIDAgMC0zLTN6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/book-open
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function File_text($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      [
        "path",
        {
          "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
        }
      ],
      ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
      ["path", { "d": "M10 9H8" }],
      ["path", { "d": "M16 13H8" }],
      ["path", { "d": "M16 17H8" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "file-text" },
      /**
       * @component @name FileText
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNiAyMmEyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMmg4YTIuNCAyLjQgMCAwIDEgMS43MDQuNzA2bDMuNTg4IDMuNTg4QTIuNCAyLjQgMCAwIDEgMjAgOHYxMmEyIDIgMCAwIDEtMiAyeiIgLz4KICA8cGF0aCBkPSJNMTQgMnY1YTEgMSAwIDAgMCAxIDFoNSIgLz4KICA8cGF0aCBkPSJNMTAgOUg4IiAvPgogIDxwYXRoIGQ9Ik0xNiAxM0g4IiAvPgogIDxwYXRoIGQ9Ik0xNiAxN0g4IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/file-text
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function Tag($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      [
        "path",
        {
          "d": "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
        }
      ],
      [
        "circle",
        { "cx": "7.5", "cy": "7.5", "r": ".5", "fill": "currentColor" }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "tag" },
      /**
       * @component @name Tag
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIuNTg2IDIuNTg2QTIgMiAwIDAgMCAxMS4xNzIgMkg0YTIgMiAwIDAgMC0yIDJ2Ny4xNzJhMiAyIDAgMCAwIC41ODYgMS40MTRsOC43MDQgOC43MDRhMi40MjYgMi40MjYgMCAwIDAgMy40MiAwbDYuNTgtNi41OGEyLjQyNiAyLjQyNiAwIDAgMCAwLTMuNDJ6IiAvPgogIDxjaXJjbGUgY3g9IjcuNSIgY3k9IjcuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/tag
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function Text_align_center($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M21 5H3" }],
      ["path", { "d": "M17 12H7" }],
      ["path", { "d": "M19 19H5" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "text-align-center" },
      /**
       * @component @name TextAlignCenter
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgNUgzIiAvPgogIDxwYXRoIGQ9Ik0xNyAxMkg3IiAvPgogIDxwYXRoIGQ9Ik0xOSAxOUg1IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/text-align-center
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function Text_align_end($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M21 5H3" }],
      ["path", { "d": "M21 12H9" }],
      ["path", { "d": "M21 19H7" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "text-align-end" },
      /**
       * @component @name TextAlignEnd
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgNUgzIiAvPgogIDxwYXRoIGQ9Ik0yMSAxMkg5IiAvPgogIDxwYXRoIGQ9Ik0yMSAxOUg3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/text-align-end
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function Text_align_start($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M21 5H3" }],
      ["path", { "d": "M15 12H3" }],
      ["path", { "d": "M17 19H3" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "text-align-start" },
      /**
       * @component @name TextAlignStart
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgNUgzIiAvPgogIDxwYXRoIGQ9Ik0xNSAxMkgzIiAvPgogIDxwYXRoIGQ9Ik0xNyAxOUgzIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/text-align-start
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function User_round($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["circle", { "cx": "12", "cy": "8", "r": "5" }],
      ["path", { "d": "M20 21a8 8 0 0 0-16 0" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "user-round" },
      /**
       * @component @name UserRound
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiIC8+CiAgPHBhdGggZD0iTTIwIDIxYTggOCAwIDAgMC0xNiAwIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/user-round
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function seoField(group) {
  return {
    name: "seo",
    type: "object",
    title: "SEO & Social",
    description: "Optional. Control how this appears in Google and on social media. Leave blank to use sensible defaults from the fields above.",
    ...group ? { group } : {},
    fields: [
      {
        name: "metaTitle",
        type: "string",
        title: "Meta title",
        description: "Overrides the title in search results and social cards. Best around 60 characters.",
        validation: (Rule) => Rule.max(70)
      },
      {
        name: "metaDescription",
        type: "text",
        title: "Meta description",
        rows: 3,
        description: "The snippet shown under the title in search results. ~155 characters. Falls back to the excerpt.",
        validation: (Rule) => Rule.max(160)
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
      }
    ]
  };
}
const callout = {
  type: "callout",
  title: "Callout",
  fields: [
    {
      name: "tone",
      type: "string",
      title: "Tone",
      description: "info, warning, or error",
      options: { layout: "dropdown" },
      list: [
        { title: "Info", value: "info" },
        { title: "Warning", value: "warning" },
        { title: "Error", value: "error" }
      ]
    },
    { name: "text", type: "text", title: "Text" }
  ],
  preview: { select: { subtitle: "text" } }
};
const codeBlock = {
  type: "codeBlock",
  title: "Code Block",
  fields: [
    { name: "language", type: "string", title: "Language" },
    { name: "code", type: "text", title: "Code" }
  ],
  preview: { select: { subtitle: "language" } }
};
const embed = {
  type: "embed",
  title: "Embed",
  fields: [
    {
      name: "embedCode",
      type: "text",
      title: "Embed code",
      description: "Paste the <iframe> snippet from the provider (YouTube → Share → Embed). A direct embed URL also works.",
      validation: (Rule) => Rule.required()
    },
    { name: "caption", type: "string", title: "Caption" }
  ],
  preview: { select: { subtitle: "caption" } }
};
const divider = {
  type: "divider",
  title: "Divider",
  fields: [
    {
      name: "style",
      type: "string",
      title: "Style",
      options: { layout: "dropdown" },
      list: [
        { title: "Line", value: "line" },
        { title: "Dots", value: "dots" }
      ],
      initialValue: "line"
    }
  ],
  preview: { select: { subtitle: "style" } }
};
const button = {
  type: "button",
  title: "Button",
  fields: [
    {
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required()
    },
    { name: "url", type: "url", title: "URL", validation: (Rule) => Rule.required() },
    {
      name: "style",
      type: "string",
      title: "Style",
      options: { layout: "dropdown" },
      list: [
        { title: "Primary", value: "primary" },
        { title: "Secondary", value: "secondary" }
      ],
      initialValue: "primary"
    },
    {
      name: "align",
      type: "string",
      title: "Alignment",
      options: { layout: "tabs" },
      list: [
        { title: "Left", value: "left" },
        { title: "Center", value: "center" },
        { title: "Right", value: "right" }
      ],
      initialValue: "center"
    }
  ],
  preview: { select: { title: "label", subtitle: "url" } }
};
const gallery = {
  type: "gallery",
  title: "Gallery",
  fields: [
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required()
    },
    { name: "caption", type: "string", title: "Caption" }
  ],
  preview: { select: { subtitle: "caption" } }
};
const toggle = {
  type: "toggle",
  title: "Toggle",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
      description: "The always-visible line people click to expand",
      validation: (Rule) => Rule.required()
    },
    { name: "content", type: "text", title: "Content", rows: 4 }
  ],
  preview: { select: { title: "heading", subtitle: "content" } }
};
const blogPost = {
  type: "document",
  name: "blog_post",
  title: "Blog Post",
  description: "A blog post with rich text content",
  icon: Book_open,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage"
    }
  },
  // Relative path — resolved against the studio's own origin for the preview
  // iframe. Return an absolute URL here to point the preview at a separate
  // public site (e.g. `${import.meta.env.VITE_SITE_URL}/blog/${slug}`).
  previewUrl: (doc) => {
    const slug = doc.slug;
    return slug ? `/blog/${slug}?aphex-preview=1` : null;
  },
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
      validation: (Rule) => Rule.required()
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      source: "title",
      group: "settings",
      validation: (Rule) => Rule.required()
    },
    {
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
      group: "settings"
    },
    {
      name: "postDate",
      type: "date",
      title: "Published Date",
      group: "settings"
    },
    {
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description: "A short summary shown on the blog listing page",
      group: "content"
    },
    {
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      group: "content"
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      group: "content",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab"
                  }
                ]
              }
            ]
          }
        },
        { type: "image", title: "Image" },
        callout,
        codeBlock,
        embed,
        toggle,
        divider,
        button,
        gallery
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      group: "settings",
      description: "Topics this post belongs to",
      of: [{ type: "reference", to: [{ type: "tag" }] }]
    },
    seoField("seo")
  ]
};
const author = {
  type: "document",
  name: "author",
  title: "Author",
  description: "A byline — the person a post is attributed to",
  icon: User_round,
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "settings", title: "Settings" }
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "avatar"
    }
  },
  previewUrl: (doc) => {
    const slug = doc.slug;
    return slug ? `/author/${slug}?aphex-preview=1` : null;
  },
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      group: "profile",
      validation: (Rule) => Rule.required()
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      source: "name",
      group: "settings",
      validation: (Rule) => Rule.required()
    },
    {
      name: "role",
      type: "string",
      title: "Role",
      description: "e.g. Founder & Writer",
      group: "profile"
    },
    {
      name: "avatar",
      type: "image",
      title: "Avatar",
      description: "Square profile photo",
      group: "profile"
    },
    {
      name: "bio",
      type: "text",
      title: "Bio",
      rows: 3,
      description: "A short introduction shown on the author page",
      group: "profile"
    },
    {
      name: "links",
      type: "array",
      title: "Links",
      description: "Social profiles and personal sites",
      group: "profile",
      of: [
        {
          type: "object",
          name: "link",
          title: "Link",
          fields: [
            {
              name: "label",
              type: "string",
              title: "Label",
              description: "e.g. Twitter, GitHub, Website"
            },
            { name: "url", type: "url", title: "URL" }
          ]
        }
      ]
    },
    {
      name: "userId",
      type: "string",
      title: "Linked account (advanced)",
      description: "Optional. The CMS account this author writes as. Used to sync the byline and gate editing. Most editors can leave this blank.",
      group: "settings"
    },
    seoField("settings")
  ]
};
const tag = {
  type: "document",
  name: "tag",
  title: "Tag",
  description: "A topic that groups related posts together",
  icon: Tag,
  preview: {
    select: {
      title: "title",
      subtitle: "description"
    }
  },
  previewUrl: (doc) => {
    const slug = doc.slug;
    return slug ? `/tag/${slug}?aphex-preview=1` : null;
  },
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required().max(60)
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      source: "title",
      validation: (Rule) => Rule.required()
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "Shown on the tag archive page"
    },
    seoField()
  ]
};
const page = {
  type: "document",
  name: "page",
  title: "Page",
  description: "A standalone page (About, Contact, …) served at its own URL",
  icon: File_text,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Configuration" },
    { name: "seo", title: "SEO" }
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage"
    }
  },
  previewUrl: (doc) => {
    const slug = doc.slug;
    return slug ? `/${slug}?aphex-preview=1` : null;
  },
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
      validation: (Rule) => Rule.required()
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      source: "title",
      group: "settings",
      description: "Lives at the site root, e.g. /about",
      validation: (Rule) => Rule.required()
    },
    {
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description: "Optional summary shown under the title and in social previews",
      group: "content"
    },
    {
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      group: "content"
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      group: "content",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Open in new tab" }
                ]
              }
            ]
          }
        },
        { type: "image", title: "Image" },
        callout,
        codeBlock,
        embed,
        toggle,
        divider,
        button,
        gallery
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: "containerPadding",
      type: "number",
      title: "Container padding",
      description: "Inner spacing around the page content container.",
      group: "settings",
      min: 0,
      max: 200,
      step: 4,
      initialValue: 0,
      options: { layout: "slider", unit: "px" }
    },
    {
      name: "headerAlign",
      type: "string",
      title: "Header alignment",
      description: "Alignment of the title and excerpt.",
      group: "settings",
      initialValue: "left",
      list: [
        { title: "Left", value: "left", icon: Text_align_start },
        { title: "Center", value: "center", icon: Text_align_center },
        { title: "Right", value: "right", icon: Text_align_end }
      ],
      options: { layout: "tabs" }
    },
    seoField("seo")
  ]
};
const siteSettings = {
  type: "document",
  name: "siteSettings",
  title: "Site Settings",
  description: "Wordmark, navigation, footer, home hero, and template for the public site",
  icon: Settings,
  group: "Settings",
  singleton: true,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "home", title: "Home" },
    { name: "navigation", title: "Navigation" },
    { name: "design", title: "Design" }
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site title",
      description: "The wordmark text, also used in tab titles. Shown when no logo is set.",
      group: "general"
    },
    {
      name: "tagline",
      type: "string",
      title: "Tagline",
      description: "Short line shown in the footer",
      group: "general"
    },
    {
      name: "logo",
      type: "image",
      title: "Logo",
      description: "Shown in the header instead of the title text. Use a transparent PNG or SVG.",
      group: "general"
    },
    {
      name: "logoHeight",
      type: "number",
      title: "Logo height",
      description: "Height of the header logo. The width scales to keep the aspect ratio.",
      group: "general",
      min: 16,
      max: 64,
      step: 1,
      initialValue: 28,
      options: { layout: "slider", unit: "px" }
    },
    {
      name: "favicon",
      type: "image",
      title: "Favicon",
      description: "The little icon shown in the browser tab. A square image works best.",
      group: "general"
    },
    // ---- Home hero: drives the masthead on the /blog index ----
    {
      name: "heroEyebrow",
      type: "string",
      title: "Hero eyebrow",
      description: 'Small label above the headline (e.g. "The Journal").',
      group: "home"
    },
    {
      name: "heroTitle",
      type: "text",
      title: "Hero headline",
      description: "The large headline on the home page. Line breaks are preserved.",
      rows: 2,
      group: "home"
    },
    {
      name: "heroSubtitle",
      type: "text",
      title: "Hero subtitle",
      description: "Supporting line shown below the headline.",
      rows: 2,
      group: "home"
    },
    {
      name: "heroImage",
      type: "image",
      title: "Hero image",
      description: "Optional image for the home hero. Placement follows the layout below.",
      group: "home"
    },
    {
      name: "heroLayout",
      type: "string",
      title: "Hero layout",
      description: "How the headline and image are arranged on the home page.",
      group: "home",
      initialValue: "split",
      list: [
        { title: "Split — headline beside the image", value: "split" },
        { title: "Banner — image below the headline", value: "banner" },
        { title: "Overlay — headline over the image", value: "overlay" }
      ],
      options: { layout: "radio" }
    },
    {
      name: "nav",
      type: "array",
      title: "Header links",
      description: "Links shown in the top navigation, in order",
      group: "navigation",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Link",
          fields: [
            { name: "label", type: "string", title: "Label" },
            {
              name: "url",
              type: "string",
              title: "URL",
              description: "Internal (e.g. /about) or external (https://…)"
            },
            { name: "newTab", type: "boolean", title: "Open in new tab" }
          ]
        }
      ]
    },
    {
      name: "social",
      type: "array",
      title: "Social links",
      description: "Shown in the footer",
      group: "navigation",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social link",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" }
          ]
        }
      ]
    },
    // ---- Design: which compiled public-site template to render ----
    {
      name: "template",
      type: "string",
      title: "Template",
      description: "Changes the public-site structure without changing your content.",
      group: "design",
      initialValue: "editorial-journal",
      validation: (Rule) => Rule.required(),
      list: [
        { title: "Editorial Journal", value: "editorial-journal" },
        { title: "Minimal Index", value: "minimal-index" },
        { title: "Brutalist Ledger", value: "brutalist-ledger" }
      ],
      options: { layout: "radio" }
    },
    {
      // `type: 'color'` is registered by @aphexcms/plugin-color-picker — the plugin's
      // transform desugars it into the rich color object { hex, alpha, rgb, hsl, hsv }.
      // Read `.hex` for a CSS value. No import needed; registering the plugin makes
      // the type available and type-safe.
      name: "color",
      type: "color",
      title: "Brand color",
      description: "Used for links, buttons, highlights, and focus states. Leave empty to use the template default.",
      group: "design"
    }
  ],
  previewUrl: () => {
    return `/blog?aphex-preview=1`;
  }
};
const schemaTypes = [blogPost, page, author, tag, siteSettings];
export {
  File_text as F,
  createPartResolver as c,
  schemaTypes as s
};
