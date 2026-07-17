import { $ as attr, H as snapshot, _t as getAllContexts, bt as setContext, d as props_id, et as clsx, ht as run, i as attributes, o as bind_props, p as spread_props, s as derived, tt as escape_html, vt as getContext, yt as hasContext } from "./dev.js";
import { a as unmount, i as tick, n as mount } from "./index-server.js";
import { i as on } from "./legacy-client.js";
import { a as createSubscriber, n as SvelteMap } from "./events.js";
import { t as cn$1 } from "./utils2.js";
import { C as isWritableBox, D as isObject, E as toReadonlyBox, S as isBox, T as simpleBox, _ as composeHandlers, a as boolToStrTrueOrUndef, b as boxFrom, d as getDataTransitionAttrs, f as attachRef, g as cssToStyleObj, h as executeCallbacks, i as boolToStr, m as styleToString, n as createId, p as mergeProps, r as boolToEmptyStrOrUndef, s as createBitsAttrs, u as getDataOpenClosed, v as BoxSymbol, w as isWritableSymbol, x as boxWith, y as boxFlatten } from "./input.js";
import { t as Icon } from "./Icon.js";
//#region ../../node_modules/.pnpm/@aphexcms+cms-core@9.5.1_735fe546a3765c13e723ad4ebb2a94af/node_modules/@aphexcms/cms-core/dist/utils/preview.js
/**
* Walk a dot-path (e.g. `seo.title`) through an object. Returns the
* terminal value, or `undefined` if any segment along the way is missing.
*
* Quoted strings (single or double) are treated as literals and returned
* as-is, e.g. `'"My Title"'` → `'My Title'`. Useful for singletons or
* any schema that needs a static preview title.
*/
function readPath(item, path) {
	const match = path.match(/^(['"])(.+)\1$/);
	if (match) return match[2];
	let current = item;
	for (const segment of path.split(".")) {
		if (current == null) return void 0;
		current = current[segment];
	}
	return current;
}
/**
* Coerce a value into a printable string for preview rows. Returns `null`
* when the value isn't worth rendering (empty, nullish, non-primitive).
*/
function toPreviewString(value) {
	if (typeof value === "string") {
		const trimmed = value.trim();
		return trimmed ? trimmed : null;
	}
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	if (typeof value === "boolean") return value ? "true" : "false";
	return null;
}
/**
* Conventional fallback field names for the title slot when a schema
* doesn't declare a `preview.select.title`. Mirrors Sanity's heuristic
* — the first non-empty string wins.
*/
var DEFAULT_TITLE_FIELDS = [
	"title",
	"heading",
	"name",
	"label"
];
/**
* Run `preview.prepare` if defined: resolve every dot-path in `select`,
* pass the resolved selection map to `prepare`, and return the result.
* Returns `null` when no `prepare` is configured — callers should fall
* back to direct `select.title` / `select.subtitle` reads in that case.
*/
function runPrepare(item, schema) {
	const prepare = schema?.preview?.prepare;
	if (!prepare) return null;
	const select = schema?.preview?.select ?? {};
	const selection = {};
	for (const [key, path] of Object.entries(select)) selection[key] = readPath(item, path);
	return prepare(selection);
}
/**
* Resolve the title to display for an item (array row, document list row,
* reference picker row, editor breadcrumb). Precedence: `preview.prepare()` →
* literal `preview.title` → `select.title` dot-path → conventional field names →
* schema title → type name.
*/
function resolvePreviewTitle(item, schema, defaultTypeLabel) {
	const prepared = runPrepare(item, schema);
	if (prepared) {
		const resolved = toPreviewString(prepared.title);
		if (resolved) return resolved;
	} else {
		const literal = toPreviewString(schema?.preview?.title);
		if (literal) return literal;
		const configured = schema?.preview?.select?.title;
		if (configured) {
			const resolved = toPreviewString(readPath(item, configured));
			if (resolved) return resolved;
		} else for (const name of DEFAULT_TITLE_FIELDS) {
			const resolved = toPreviewString(item?.[name]);
			if (resolved) return resolved;
		}
	}
	return schema?.title ?? defaultTypeLabel ?? "Untitled";
}
/**
* Resolve the subtitle to display for an item. Returns `null` when no
* subtitle is configured or the configured field is empty — callers
* should branch on the null and skip rendering the subtitle line.
*/
function resolvePreviewSubtitle(item, schema) {
	const prepared = runPrepare(item, schema);
	if (prepared) return toPreviewString(prepared.subtitle);
	const configured = schema?.preview?.select?.subtitle;
	if (!configured) return null;
	return toPreviewString(readPath(item, configured));
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plu_f59e01bcdd5097b1d7f27afdbac55714/node_modules/svelte-toolbelt/dist/box/box.svelte.js
function box(initialValue) {
	let current = initialValue;
	return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return current;
		},
		set current(v) {
			current = v;
		}
	};
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plu_f59e01bcdd5097b1d7f27afdbac55714/node_modules/svelte-toolbelt/dist/utils/sr-only-styles.js
var srOnlyStyles = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0",
	transform: "translateX(-100%)"
};
styleToString(srOnlyStyles);
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow = void 0;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/internal/utils/dom.js
/**
* Handles getting the active element in a document or shadow root.
* If the active element is within a shadow root, it will traverse the shadow root
* to find the active element.
* If not, it will return the active element in the document.
*
* @param document A document or shadow root to get the active element from.
* @returns The active element in the document or shadow root.
*/
function getActiveElement$1(document) {
	let activeElement = document.activeElement;
	while (activeElement?.shadowRoot) {
		const node = activeElement.shadowRoot.activeElement;
		if (node === activeElement) break;
		else activeElement = node;
	}
	return activeElement;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var ActiveElement = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window = defaultWindow, document = window?.document } = options;
		if (window === void 0) return;
		this.#document = document;
		this.#subscribe = createSubscriber((update) => {
			const cleanupFocusIn = on(window, "focusin", update);
			const cleanupFocusOut = on(window, "focusout", update);
			return () => {
				cleanupFocusIn();
				cleanupFocusOut();
			};
		});
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement$1(this.#document);
	}
};
new ActiveElement();
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/internal/utils/is.js
function isFunction(value) {
	return typeof value === "function";
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/utilities/context/context.js
var Context = class {
	#name;
	#key;
	/**
	* @param name The name of the context.
	* This is used for generating the context key and error messages.
	*/
	constructor(name) {
		this.#name = name;
		this.#key = Symbol(name);
	}
	/**
	* The key used to get and set the context.
	*
	* It is not recommended to use this value directly.
	* Instead, use the methods provided by this class.
	*/
	get key() {
		return this.#key;
	}
	/**
	* Checks whether this has been set in the context of a parent component.
	*
	* Must be called during component initialisation.
	*/
	exists() {
		return hasContext(this.#key);
	}
	/**
	* Retrieves the context that belongs to the closest parent component.
	*
	* Must be called during component initialisation.
	*
	* @throws An error if the context does not exist.
	*/
	get() {
		const context = getContext(this.#key);
		if (context === void 0) throw new Error(`Context "${this.#name}" not found`);
		return context;
	}
	/**
	* Retrieves the context that belongs to the closest parent component,
	* or the given fallback value if the context does not exist.
	*
	* Must be called during component initialisation.
	*/
	getOr(fallback) {
		const context = getContext(this.#key);
		if (context === void 0) return fallback;
		return context;
	}
	/**
	* Associates the given value with the current component and returns it.
	*
	* Must be called during component initialisation.
	*/
	set(context) {
		return setContext(this.#key, context);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/utilities/watch/watch.svelte.js
function runWatcher(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
}
function watch(sources, effect, options) {
	runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
	runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function watchOnce(source, effect) {}
function watchOncePre(source, effect) {}
watchOnce.pre = watchOncePre;
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/internal/utils/get.js
function get$1(value) {
	if (isFunction(value)) return value();
	return value;
}
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/utilities/element-size/element-size.svelte.js
var ElementSize = class {
	#size = {
		width: 0,
		height: 0
	};
	#observed = false;
	#options;
	#node;
	#window;
	#width = derived(() => {
		this.#subscribe()?.();
		return this.getSize().width;
	});
	#height = derived(() => {
		this.#subscribe()?.();
		return this.getSize().height;
	});
	#subscribe = derived(() => {
		const node$ = get$1(this.#node);
		if (!node$) return;
		return createSubscriber((update) => {
			if (!this.#window) return;
			const observer = new this.#window.ResizeObserver((entries) => {
				this.#observed = true;
				for (const entry of entries) {
					const boxSize = this.#options.box === "content-box" ? entry.contentBoxSize : entry.borderBoxSize;
					const boxSizeArr = Array.isArray(boxSize) ? boxSize : [boxSize];
					this.#size.width = boxSizeArr.reduce((acc, size) => Math.max(acc, size.inlineSize), 0);
					this.#size.height = boxSizeArr.reduce((acc, size) => Math.max(acc, size.blockSize), 0);
				}
				update();
			});
			observer.observe(node$);
			return () => {
				this.#observed = false;
				observer.disconnect();
			};
		});
	});
	constructor(node, options = { box: "border-box" }) {
		this.#window = options.window ?? defaultWindow;
		this.#options = options;
		this.#node = node;
		this.#size = {
			width: 0,
			height: 0
		};
	}
	calculateSize() {
		const element = get$1(this.#node);
		if (!element || !this.#window) return;
		const offsetWidth = element.offsetWidth;
		const offsetHeight = element.offsetHeight;
		if (this.#options.box === "border-box") return {
			width: offsetWidth,
			height: offsetHeight
		};
		const style = this.#window.getComputedStyle(element);
		const paddingWidth = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
		const paddingHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
		const borderWidth = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
		const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
		return {
			width: offsetWidth - paddingWidth - borderWidth,
			height: offsetHeight - paddingHeight - borderHeight
		};
	}
	getSize() {
		return this.#observed ? this.#size : this.calculateSize() ?? this.#size;
	}
	get current() {
		this.#subscribe()?.();
		return this.getSize();
	}
	get width() {
		return this.#width();
	}
	get height() {
		return this.#height();
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/utilities/previous/previous.svelte.js
var Previous = class {
	#previousCallback = () => void 0;
	#previous = derived(() => this.#previousCallback());
	constructor(getter, initialValue) {
		let actualPrevious = void 0;
		if (initialValue !== void 0) actualPrevious = initialValue;
		this.#previousCallback = () => {
			try {
				return actualPrevious;
			} finally {
				actualPrevious = getter();
			}
		};
	}
	get current() {
		return this.#previous();
	}
};
//#endregion
//#region ../../node_modules/.pnpm/runed@0.35.1_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plugin-svelte_1b0d02824824692a596442f5978db595/node_modules/runed/dist/utilities/resource/resource.svelte.js
function debounce$1(fn, delay) {
	let timeoutId;
	let lastResolve = null;
	return (...args) => {
		return new Promise((resolve) => {
			if (lastResolve) lastResolve(void 0);
			lastResolve = resolve;
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				const result = await fn(...args);
				if (lastResolve) {
					lastResolve(result);
					lastResolve = null;
				}
			}, delay);
		});
	};
}
function throttle(fn, delay) {
	let lastRun = 0;
	let lastPromise = null;
	return (...args) => {
		const now = Date.now();
		if (lastRun && now - lastRun < delay) return lastPromise ?? Promise.resolve(void 0);
		lastRun = now;
		lastPromise = fn(...args);
		return lastPromise;
	};
}
function runResource(source, fetcher, options = {}, effectFn) {
	const { lazy = false, once = false, initialValue, debounce: debounceTime, throttle: throttleTime } = options;
	let current = initialValue;
	let loading = false;
	let error = void 0;
	let cleanupFns = [];
	const runCleanup = () => {
		cleanupFns.forEach((fn) => fn());
		cleanupFns = [];
	};
	const onCleanup = (fn) => {
		cleanupFns = [...cleanupFns, fn];
	};
	const baseFetcher = async (value, previousValue, refetching = false) => {
		try {
			loading = true;
			error = void 0;
			runCleanup();
			const controller = new AbortController();
			onCleanup(() => controller.abort());
			const result = await fetcher(value, previousValue, {
				data: current,
				refetching,
				onCleanup,
				signal: controller.signal
			});
			current = result;
			return result;
		} catch (e) {
			if (!(e instanceof DOMException && e.name === "AbortError")) error = e;
			return;
		} finally {
			loading = false;
		}
	};
	const runFetcher = debounceTime ? debounce$1(baseFetcher, debounceTime) : throttleTime ? throttle(baseFetcher, throttleTime) : baseFetcher;
	const sources = Array.isArray(source) ? source : [source];
	let prevValues;
	effectFn((values, previousValues) => {
		if (once && prevValues) return;
		prevValues = values;
		runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? previousValues : previousValues?.[0]);
	}, { lazy });
	return {
		get current() {
			return current;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},
		mutate: (value) => {
			current = value;
		},
		refetch: (info) => {
			const values = sources.map((s) => s());
			return runFetcher(Array.isArray(source) ? values : values[0], Array.isArray(source) ? values : values[0], info ?? true);
		}
	};
}
function resource(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options) => {
		const sources = Array.isArray(source) ? source : [source];
		const getters = () => sources.map((s) => s());
		watch(getters, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options);
	});
}
function resourcePre(source, fetcher, options) {
	return runResource(source, fetcher, options, (fn, options) => {
		const sources = Array.isArray(source) ? source : [source];
		const getter = () => sources.map((s) => s());
		watch.pre(getter, (values, previousValues) => {
			fn(values, previousValues ?? []);
		}, options);
	});
}
resource.pre = resourcePre;
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plu_f59e01bcdd5097b1d7f27afdbac55714/node_modules/svelte-toolbelt/dist/utils/on-destroy-effect.svelte.js
function onDestroyEffect(fn) {}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plu_f59e01bcdd5097b1d7f27afdbac55714/node_modules/svelte-toolbelt/dist/utils/after-sleep.js
/**
* A utility function that executes a callback after a specified number of milliseconds.
*/
function afterSleep(ms, cb) {
	return setTimeout(cb, ms);
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plu_f59e01bcdd5097b1d7f27afdbac55714/node_modules/svelte-toolbelt/dist/utils/after-tick.js
function afterTick(fn) {
	(/* @__PURE__ */ tick()).then(fn);
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plu_f59e01bcdd5097b1d7f27afdbac55714/node_modules/svelte-toolbelt/dist/utils/dom.js
var ELEMENT_NODE = 1;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
function isHTMLElement$2(node) {
	return isObject(node) && node.nodeType === ELEMENT_NODE && typeof node.nodeName === "string";
}
function isDocument(node) {
	return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
function isWindow(node) {
	return isObject(node) && node.constructor?.name === "VisualViewport";
}
function isNode$1(node) {
	return isObject(node) && node.nodeType !== void 0;
}
function isShadowRoot$1(node) {
	return isNode$1(node) && node.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in node;
}
function contains(parent, child) {
	if (!parent || !child) return false;
	if (!isHTMLElement$2(parent) || !isHTMLElement$2(child)) return false;
	const rootNode = child.getRootNode?.();
	if (parent === child) return true;
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot$1(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getDocument(node) {
	if (isDocument(node)) return node;
	if (isWindow(node)) return node.document;
	return node?.ownerDocument ?? document;
}
function getWindow$1(node) {
	if (isShadowRoot$1(node)) return getWindow$1(node.host);
	if (isDocument(node)) return node.defaultView ?? window;
	if (isHTMLElement$2(node)) return node.ownerDocument?.defaultView ?? window;
	return window;
}
function getActiveElement(rootNode) {
	let activeElement = rootNode.activeElement;
	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement;
		if (el === activeElement) break;
		else activeElement = el;
	}
	return activeElement;
}
//#endregion
//#region ../../node_modules/.pnpm/svelte-toolbelt@0.10.6_@sveltejs+kit@2.59.1_@opentelemetry+api@1.9.0_@sveltejs+vite-plu_f59e01bcdd5097b1d7f27afdbac55714/node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var DOMContext = class {
	element;
	#root = derived(() => {
		if (!this.element.current) return document;
		return this.element.current.getRootNode() ?? document;
	});
	get root() {
		return this.#root();
	}
	set root($$value) {
		return this.#root($$value);
	}
	constructor(element) {
		if (typeof element === "function") this.element = boxWith(element);
		else this.element = element;
	}
	getDocument = () => {
		return getDocument(this.root);
	};
	getWindow = () => {
		return this.getDocument().defaultView ?? window;
	};
	getActiveElement = () => {
		return getActiveElement(this.root);
	};
	isActiveElement = (node) => {
		return node === this.getActiveElement();
	};
	getElementById(id) {
		return this.root.getElementById(id);
	}
	querySelector = (selector) => {
		if (!this.root) return null;
		return this.root.querySelector(selector);
	};
	querySelectorAll = (selector) => {
		if (!this.root) return [];
		return this.root.querySelectorAll(selector);
	};
	setTimeout = (callback, delay) => {
		return this.getWindow().setTimeout(callback, delay);
	};
	clearTimeout = (timeoutId) => {
		return this.getWindow().clearTimeout(timeoutId);
	};
};
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
var ARROW_UP = "ArrowUp";
var CAPS_LOCK = "CapsLock";
var CONTROL = "Control";
var ENTER = "Enter";
var ESCAPE = "Escape";
var HOME = "Home";
var META = "Meta";
var PAGE_DOWN = "PageDown";
var PAGE_UP = "PageUp";
var SHIFT = "Shift";
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/locale.js
/**
* Detects the text direction in the element.
* @returns {Direction} The text direction ('ltr' for left-to-right or 'rtl' for right-to-left).
*/
function getElemDirection(elem) {
	return window.getComputedStyle(elem).getPropertyValue("direction");
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/get-directional-keys.js
var FIRST_KEYS$1 = [
	ARROW_DOWN,
	PAGE_UP,
	HOME
];
var LAST_KEYS$1 = [
	ARROW_UP,
	PAGE_DOWN,
	"End"
];
[...FIRST_KEYS$1, ...LAST_KEYS$1];
/**
* A utility function that returns the next key based on the direction and orientation.
*/
function getNextKey(dir = "ltr", orientation = "horizontal") {
	return {
		horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
		vertical: ARROW_DOWN
	}[orientation];
}
/**
* A utility function that returns the previous key based on the direction and orientation.
*/
function getPrevKey(dir = "ltr", orientation = "horizontal") {
	return {
		horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
		vertical: ARROW_UP
	}[orientation];
}
/**
* A utility function that returns the next and previous keys based on the direction
* and orientation.
*/
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
	if (!["ltr", "rtl"].includes(dir)) dir = "ltr";
	if (!["horizontal", "vertical"].includes(orientation)) orientation = "horizontal";
	return {
		nextKey: getNextKey(dir, orientation),
		prevKey: getPrevKey(dir, orientation)
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/is.js
var isBrowser$1 = typeof document !== "undefined";
var isIOS = getIsIOS();
function getIsIOS() {
	return isBrowser$1 && window?.navigator?.userAgent && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function isHTMLElement$1(element) {
	return element instanceof HTMLElement;
}
function isElement$1(element) {
	return element instanceof Element;
}
function isElementOrSVGElement(element) {
	return element instanceof Element || element instanceof SVGElement;
}
function isTouch(e) {
	return e.pointerType === "touch";
}
function isFocusVisible(element) {
	return element.matches(":focus-visible");
}
function isNotNull(value) {
	return value !== null;
}
/**
* Determines if the provided object is a valid `HTMLInputElement` with
* a `select` method available.
*/
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/roving-focus-group.js
var RovingFocusGroup = class {
	#opts;
	#currentTabStopId = box(null);
	constructor(opts) {
		this.#opts = opts;
	}
	getCandidateNodes() {
		return [];
	}
	focusFirstCandidate() {
		const items = this.getCandidateNodes();
		if (!items.length) return;
		items[0]?.focus();
	}
	handleKeydown(node, e, both = false) {
		const rootNode = this.#opts.rootNode.current;
		if (!rootNode || !node) return;
		const items = this.getCandidateNodes();
		if (!items.length) return;
		const currentIndex = items.indexOf(node);
		const { nextKey, prevKey } = getDirectionalKeys(getElemDirection(rootNode), this.#opts.orientation.current);
		const loop = this.#opts.loop.current;
		const keyToIndex = {
			[nextKey]: currentIndex + 1,
			[prevKey]: currentIndex - 1,
			[HOME]: 0,
			["End"]: items.length - 1
		};
		if (both) {
			const altNextKey = nextKey === "ArrowDown" ? ARROW_RIGHT : ARROW_DOWN;
			const altPrevKey = prevKey === "ArrowUp" ? ARROW_LEFT : ARROW_UP;
			keyToIndex[altNextKey] = currentIndex + 1;
			keyToIndex[altPrevKey] = currentIndex - 1;
		}
		let itemIndex = keyToIndex[e.key];
		if (itemIndex === void 0) return;
		e.preventDefault();
		if (itemIndex < 0 && loop) itemIndex = items.length - 1;
		else if (itemIndex === items.length && loop) itemIndex = 0;
		const itemToFocus = items[itemIndex];
		if (!itemToFocus) return;
		itemToFocus.focus();
		this.#currentTabStopId.current = itemToFocus.id;
		this.#opts.onCandidateFocus?.(itemToFocus);
		return itemToFocus;
	}
	getTabIndex(node) {
		const items = this.getCandidateNodes();
		const anyActive = this.#currentTabStopId.current !== null;
		if (node && !anyActive && items[0] === node) {
			this.#currentTabStopId.current = node.id;
			return 0;
		} else if (node?.id === this.#currentTabStopId.current) return 0;
		return -1;
	}
	setCurrentTabStopId(id) {
		this.#currentTabStopId.current = id;
	}
	focusCurrentTabStop() {
		const currentTabStopId = this.#currentTabStopId.current;
		if (!currentTabStopId) return;
		const currentTabStop = this.#opts.rootNode.current?.querySelector(`#${currentTabStopId}`);
		if (!currentTabStop || !isHTMLElement$1(currentTabStop)) return;
		currentTabStop.focus();
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/animations-complete.js
var AnimationsComplete = class {
	#opts;
	#currentFrame = null;
	#observer = null;
	#runId = 0;
	constructor(opts) {
		this.#opts = opts;
	}
	#cleanup() {
		if (this.#currentFrame !== null) {
			window.cancelAnimationFrame(this.#currentFrame);
			this.#currentFrame = null;
		}
		this.#observer?.disconnect();
		this.#observer = null;
		this.#runId++;
	}
	run(fn) {
		this.#cleanup();
		const node = this.#opts.ref.current;
		if (!node) return;
		if (typeof node.getAnimations !== "function") {
			this.#executeCallback(fn);
			return;
		}
		const runId = this.#runId;
		const executeIfCurrent = () => {
			if (runId !== this.#runId) return;
			this.#executeCallback(fn);
		};
		const waitForAnimations = () => {
			if (runId !== this.#runId) return;
			const animations = node.getAnimations();
			if (animations.length === 0) {
				executeIfCurrent();
				return;
			}
			Promise.all(animations.map((animation) => animation.finished)).then(() => {
				executeIfCurrent();
			}).catch(() => {
				if (runId !== this.#runId) return;
				if (node.getAnimations().some((animation) => animation.pending || animation.playState !== "finished")) {
					waitForAnimations();
					return;
				}
				executeIfCurrent();
			});
		};
		const requestWaitForAnimations = () => {
			this.#currentFrame = window.requestAnimationFrame(() => {
				this.#currentFrame = null;
				waitForAnimations();
			});
		};
		if (!this.#opts.afterTick.current) {
			requestWaitForAnimations();
			return;
		}
		this.#currentFrame = window.requestAnimationFrame(() => {
			this.#currentFrame = null;
			const startingStyleAttr = "data-starting-style";
			if (!node.hasAttribute(startingStyleAttr)) {
				requestWaitForAnimations();
				return;
			}
			this.#observer = new MutationObserver(() => {
				if (runId !== this.#runId) return;
				if (node.hasAttribute(startingStyleAttr)) return;
				this.#observer?.disconnect();
				this.#observer = null;
				requestWaitForAnimations();
			});
			this.#observer.observe(node, {
				attributes: true,
				attributeFilter: [startingStyleAttr]
			});
		});
	}
	#executeCallback(fn) {
		const execute = () => {
			fn();
		};
		if (this.#opts.afterTick) afterTick(execute);
		else execute();
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/presence-manager.svelte.js
var PresenceManager = class {
	#opts;
	#enabled;
	#afterAnimations;
	#shouldRender = false;
	#transitionStatus = void 0;
	#hasMounted = false;
	#transitionFrame = null;
	constructor(opts) {
		this.#opts = opts;
		this.#shouldRender = opts.open.current;
		this.#enabled = opts.enabled ?? true;
		this.#afterAnimations = new AnimationsComplete({
			ref: this.#opts.ref,
			afterTick: this.#opts.open
		});
		watch(() => this.#opts.open.current, (isOpen) => {
			if (!this.#hasMounted) {
				this.#hasMounted = true;
				return;
			}
			this.#clearTransitionFrame();
			if (!isOpen && this.#opts.shouldSkipExitAnimation?.()) {
				this.#shouldRender = false;
				this.#transitionStatus = void 0;
				this.#opts.onComplete?.();
				return;
			}
			if (isOpen) this.#shouldRender = true;
			this.#transitionStatus = isOpen ? "starting" : "ending";
			if (isOpen) this.#transitionFrame = window.requestAnimationFrame(() => {
				this.#transitionFrame = null;
				if (this.#opts.open.current) this.#transitionStatus = void 0;
			});
			if (!this.#enabled) {
				if (!isOpen) this.#shouldRender = false;
				this.#transitionStatus = void 0;
				this.#opts.onComplete?.();
				return;
			}
			this.#afterAnimations.run(() => {
				if (isOpen === this.#opts.open.current) {
					if (!this.#opts.open.current) this.#shouldRender = false;
					this.#transitionStatus = void 0;
					this.#opts.onComplete?.();
				}
			});
		});
	}
	get shouldRender() {
		return this.#shouldRender;
	}
	get transitionStatus() {
		return this.#transitionStatus;
	}
	#clearTransitionFrame() {
		if (this.#transitionFrame === null) return;
		window.cancelAnimationFrame(this.#transitionFrame);
		this.#transitionFrame = null;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/noop.js
/**
* A no operation function (does nothing)
*/
function noop() {}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/dialog.svelte.js
var dialogAttrs = createBitsAttrs({
	component: "dialog",
	parts: [
		"content",
		"trigger",
		"overlay",
		"title",
		"description",
		"close",
		"cancel",
		"action"
	]
});
var DialogRootContext = new Context("Dialog.Root | AlertDialog.Root");
var DialogRootState = class DialogRootState {
	static create(opts) {
		const parent = DialogRootContext.getOr(null);
		return DialogRootContext.set(new DialogRootState(opts, parent));
	}
	opts;
	triggerNode = null;
	contentNode = null;
	overlayNode = null;
	descriptionNode = null;
	contentId = void 0;
	titleId = void 0;
	triggerId = void 0;
	descriptionId = void 0;
	cancelNode = null;
	nestedOpenCount = 0;
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(opts, parent) {
		this.opts = opts;
		this.parent = parent;
		this.depth = parent ? parent.depth + 1 : 0;
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			enabled: true,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
		this.overlayPresence = new PresenceManager({
			ref: boxWith(() => this.overlayNode),
			open: this.opts.open,
			enabled: true
		});
		watch(() => this.opts.open.current, (isOpen) => {
			if (!this.parent) return;
			if (isOpen) this.parent.incrementNested();
			else this.parent.decrementNested();
		}, { lazy: true });
	}
	handleOpen() {
		if (this.opts.open.current) return;
		this.opts.open.current = true;
	}
	handleClose() {
		if (!this.opts.open.current) return;
		this.opts.open.current = false;
	}
	getBitsAttr = (part) => {
		return dialogAttrs.getAttr(part, this.opts.variant.current);
	};
	incrementNested() {
		this.nestedOpenCount++;
		this.parent?.incrementNested();
	}
	decrementNested() {
		if (this.nestedOpenCount === 0) return;
		this.nestedOpenCount--;
		this.parent?.decrementNested();
	}
	#sharedProps = derived(() => ({ "data-state": getDataOpenClosed(this.opts.open.current) }));
	get sharedProps() {
		return this.#sharedProps();
	}
	set sharedProps($$value) {
		return this.#sharedProps($$value);
	}
};
var DialogTriggerState = class DialogTriggerState {
	static create(opts) {
		return new DialogTriggerState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.triggerNode = v;
			this.root.triggerId = v?.id;
		});
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button > 0) return;
		this.root.handleOpen();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			this.root.handleOpen();
		}
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": boolToStr(this.root.opts.open.current),
		"aria-controls": this.root.contentId,
		[this.root.getBitsAttr("trigger")]: "",
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		disabled: this.opts.disabled.current ? true : void 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogCloseState = class DialogCloseState {
	static create(opts) {
		return new DialogCloseState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button > 0) return;
		this.root.handleClose();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			this.root.handleClose();
		}
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr(this.opts.variant.current)]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		disabled: this.opts.disabled.current ? true : void 0,
		tabindex: 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogActionState = class DialogActionState {
	static create(opts) {
		return new DialogActionState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("action")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogTitleState = class DialogTitleState {
	static create(opts) {
		return new DialogTitleState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.root.titleId = this.opts.id.current;
		this.attachment = attachRef(this.opts.ref);
		watch.pre(() => this.opts.id.current, (id) => {
			this.root.titleId = id;
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogDescriptionState = class DialogDescriptionState {
	static create(opts) {
		return new DialogDescriptionState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.root.descriptionId = this.opts.id.current;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.descriptionNode = v;
		});
		watch.pre(() => this.opts.id.current, (id) => {
			this.root.descriptionId = id;
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DialogContentState = class DialogContentState {
	static create(opts) {
		return new DialogContentState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => {
			this.root.contentNode = v;
			this.root.contentId = v?.id;
		});
	}
	#snippetProps = derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
		"aria-modal": "true",
		"aria-describedby": this.root.descriptionId,
		"aria-labelledby": this.root.titleId,
		[this.root.getBitsAttr("content")]: "",
		style: {
			pointerEvents: "auto",
			outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0,
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount,
			contain: "layout style"
		},
		tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
		"data-nested-open": boolToEmptyStrOrUndef(this.root.nestedOpenCount > 0),
		"data-nested": boolToEmptyStrOrUndef(this.root.parent !== null),
		...getDataTransitionAttrs(this.root.contentPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
};
var DialogOverlayState = class DialogOverlayState {
	static create(opts) {
		return new DialogOverlayState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.overlayNode = v);
	}
	#snippetProps = derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("overlay")]: "",
		style: {
			pointerEvents: "auto",
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		"data-nested-open": boolToEmptyStrOrUndef(this.root.nestedOpenCount > 0),
		"data-nested": boolToEmptyStrOrUndef(this.root.parent !== null),
		...getDataTransitionAttrs(this.root.overlayPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
};
var AlertDialogCancelState = class AlertDialogCancelState {
	static create(opts) {
		return new AlertDialogCancelState(opts, DialogRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.cancelNode = v);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button > 0) return;
		this.root.handleClose();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			this.root.handleClose();
		}
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("cancel")]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		tabindex: 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/components/dialog-title.svelte
function Dialog_title$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, child, children, level = 2, $$slots, $$events, ...restProps } = $$props;
		const titleState = DialogTitleState.create({
			id: boxWith(() => id),
			level: boxWith(() => level),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, titleState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function Portal_consumer($$renderer, $$props) {
	const { children } = $$props;
	$$renderer.push(`<!---->`);
	children?.($$renderer);
	$$renderer.push(`<!---->`);
	$$renderer.push(`<!---->`);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
var BitsConfigContext = new Context("BitsConfig");
/**
* Gets the current Bits UI configuration state from the context.
*
* Returns a default configuration (where all values are `undefined`) if no configuration is found.
*/
function getBitsConfig() {
	const fallback = new BitsConfigState(null, {});
	return BitsConfigContext.getOr(fallback).opts;
}
/**
* Configuration state that inherits from parent configurations.
*
* @example
* Config resolution:
* ```
* Level 1: { defaultPortalTo: "#some-element", theme: "dark" }
* Level 2: { spacing: "large" } // inherits defaultPortalTo="#some-element", theme="dark"
* Level 3: { theme: "light" }   // inherits defaultPortalTo="#some-element", spacing="large", overrides theme="light"
* ```
*/
var BitsConfigState = class {
	opts;
	constructor(parent, opts) {
		const resolveConfigOption = createConfigResolver(parent, opts);
		this.opts = {
			defaultPortalTo: resolveConfigOption((config) => config.defaultPortalTo),
			defaultLocale: resolveConfigOption((config) => config.defaultLocale)
		};
	}
};
/**
* Returns a config resolver that resolves a given config option's value.
*
* The resolver creates reactive boxes that resolve config option values using this priority:
* 1. Current level's value (if defined)
* 2. Parent level's value (if defined and current is undefined)
* 3. `undefined` (if no value is found in either parent or child)
*
* @param parent - Parent configuration state (null if this is root level)
* @param currentOpts - Current level's configuration options
*
* @example
* ```typescript
* // Given this hierarchy:
* // Root: { defaultPortalTo: "#some-element" }
* // Child: { someOtherProp: "value" } // no defaultPortalTo specified
*
* const resolveConfigOption = createConfigResolver(parent, opts);
* const portalTo = resolveConfigOption(config => config.defaultPortalTo);
*
* // portalTo.current === "#some-element" (inherited from parent)
* // even when child didn't specify `defaultPortalTo`
* ```
*/
function createConfigResolver(parent, currentOpts) {
	return (getter) => {
		return boxWith(() => {
			const value = getter(currentOpts)?.current;
			if (value !== void 0) return value;
			if (parent === null) return void 0;
			return getter(parent.opts)?.current;
		});
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
/**
* Creates a generic prop resolver that follows a standard priority chain:
* 1. The getter's prop value (if defined)
* 2. The config default value (if no getter prop value is defined)
* 3. The fallback value (if no config value found)
*/
function createPropResolver(configOption, fallback) {
	return (getProp) => {
		const config = getBitsConfig();
		return boxWith(() => {
			const propValue = getProp();
			if (propValue !== void 0) return propValue;
			const option = configOption(config).current;
			if (option !== void 0) return option;
			return fallback;
		});
	};
}
/**
* Resolves a portal's `to` value using the prop, the config default, or a fallback.
*
* Default value: `"body"`
*/
var resolvePortalToProp = createPropResolver((config) => config.defaultPortalTo, "body");
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function Portal$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { to: toProp, children, disabled } = $$props;
		const to = resolvePortalToProp(() => toProp);
		const context = getAllContexts();
		let target = derived(getTarget);
		function getTarget() {
			if (!isBrowser$1 || disabled) return null;
			let localTarget = null;
			if (typeof to.current === "string") localTarget = document.querySelector(to.current);
			else localTarget = to.current;
			return localTarget;
		}
		let instance;
		function unmountInstance() {
			if (instance) {
				unmount(instance);
				instance = null;
			}
		}
		watch([() => target(), () => disabled], ([target, disabled]) => {
			if (!target || disabled) {
				unmountInstance();
				return;
			}
			instance = mount(Portal_consumer, {
				target,
				props: { children },
				context
			});
			return () => {
				unmountInstance();
			};
		});
		if (disabled) {
			$$renderer.push("<!--[0-->");
			children?.($$renderer);
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/events.js
/**
* Creates a typed event dispatcher and listener pair for custom events
* @template T - The type of data that will be passed in the event detail
* @param eventName - The name of the custom event
* @param options - CustomEvent options (bubbles, cancelable, etc.)
*/
var CustomEventDispatcher = class {
	eventName;
	options;
	constructor(eventName, options = {
		bubbles: true,
		cancelable: true
	}) {
		this.eventName = eventName;
		this.options = options;
	}
	createEvent(detail) {
		return new CustomEvent(this.eventName, {
			...this.options,
			detail
		});
	}
	dispatch(element, detail) {
		const event = this.createEvent(detail);
		element.dispatchEvent(event);
		return event;
	}
	listen(element, callback, options) {
		const handler = (event) => {
			callback(event);
		};
		return on(element, this.eventName, handler, options);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/debounce.js
function debounce(fn, wait = 500) {
	let timeout = null;
	const debounced = (...args) => {
		if (timeout !== null) clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn(...args);
		}, wait);
	};
	debounced.destroy = () => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
	};
	return debounced;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/elements.js
function isOrContainsTarget(node, target) {
	return node === target || node.contains(target);
}
function getOwnerDocument(el) {
	return el?.ownerDocument ?? document;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/dom.js
function getFirstNonCommentChild(element) {
	if (!element) return null;
	for (const child of element.childNodes) if (child.nodeType !== Node.COMMENT_NODE) return child;
	return null;
}
/**
* Determines if the click event truly occurred outside the content node.
* This was added to handle password managers and other elements that may be injected
* into the DOM but visually appear inside the content.
*/
function isClickTrulyOutside(event, contentNode) {
	const { clientX, clientY } = event;
	const rect = contentNode.getBoundingClientRect();
	return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/menu/utils.js
var SELECTION_KEYS = [ENTER, " "];
var FIRST_KEYS = [
	ARROW_DOWN,
	PAGE_UP,
	HOME
];
var LAST_KEYS = [
	ARROW_UP,
	PAGE_DOWN,
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
[...SELECTION_KEYS], [...SELECTION_KEYS];
function isMouseEvent(event) {
	return event.pointerType === "mouse";
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/focus.js
/**
* A utility function that focuses an element.
*/
function focus(element, { select = false } = {}) {
	if (!element || !element.focus) return;
	const doc = getDocument(element);
	if (doc.activeElement === element) return;
	const previouslyFocusedElement = doc.activeElement;
	element.focus({ preventScroll: true });
	if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
}
/**
* Attempts to focus the first element in a list of candidates.
* Stops when focus is successful.
*/
function focusFirst(candidates, { select = false } = {}, getActiveElement) {
	const previouslyFocusedElement = getActiveElement();
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (getActiveElement() !== previouslyFocusedElement) return true;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/is-using-keyboard/is-using-keyboard.svelte.js
var isUsingKeyboard = false;
var IsUsingKeyboard = class {
	static _refs = 0;
	static _cleanup;
	constructor() {}
	get current() {
		return isUsingKeyboard;
	}
	set current(value) {
		isUsingKeyboard = value;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/tabbable@6.2.0/node_modules/tabbable/dist/index.esm.js
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = [
	"input:not([inert])",
	"select:not([inert])",
	"textarea:not([inert])",
	"a[href]:not([inert])",
	"button:not([inert])",
	"[tabindex]:not(slot):not([inert])",
	"audio[controls]:not([inert])",
	"video[controls]:not([inert])",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert])",
	"details>summary:first-of-type:not([inert])",
	"details:not([inert])"
];
var candidateSelector = /* #__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
	var _element$getRootNode;
	return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
	return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
/**
* Determines if a node is inert or in an inert ancestor.
* @param {Element} [node]
* @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
*  see if any of them are inert. If false, only `node` itself is considered.
* @returns {boolean} True if inert itself or by way of being in an inert ancestor.
*  False if `node` is falsy.
*/
var isInert = function isInert(node, lookUp) {
	var _node$getAttribute;
	if (lookUp === void 0) lookUp = true;
	var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
	return inertAtt === "" || inertAtt === "true" || lookUp && node && isInert(node.parentNode);
};
/**
* Determines if a node's content is editable.
* @param {Element} [node]
* @returns True if it's content-editable; false if it's not or `node` is falsy.
*/
var isContentEditable = function isContentEditable(node) {
	var _node$getAttribute2;
	var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
	return attValue === "" || attValue === "true";
};
/**
* @param {Element} el container to check in
* @param {boolean} includeContainer add container to check
* @param {(node: Element) => boolean} filter filter candidates
* @returns {Element[]}
*/
var getCandidates = function getCandidates(el, includeContainer, filter) {
	if (isInert(el)) return [];
	var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
	if (includeContainer && matches.call(el, candidateSelector)) candidates.unshift(el);
	candidates = candidates.filter(filter);
	return candidates;
};
/**
* @callback GetShadowRoot
* @param {Element} element to check for shadow root
* @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
*/
/**
* @callback ShadowRootFilter
* @param {Element} shadowHostNode the element which contains shadow content
* @returns {boolean} true if a shadow root could potentially contain valid candidates.
*/
/**
* @typedef {Object} CandidateScope
* @property {Element} scopeParent contains inner candidates
* @property {Element[]} candidates list of candidates found in the scope parent
*/
/**
* @typedef {Object} IterativeOptions
* @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
*  if a function, implies shadow support is enabled and either returns the shadow root of an element
*  or a boolean stating if it has an undisclosed shadow root
* @property {(node: Element) => boolean} filter filter candidates
* @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
* @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
*/
/**
* @param {Element[]} elements list of element containers to match candidates from
* @param {boolean} includeContainer add container list to check
* @param {IterativeOptions} options
* @returns {Array.<Element|CandidateScope>}
*/
var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
	var candidates = [];
	var elementsToCheck = Array.from(elements);
	while (elementsToCheck.length) {
		var element = elementsToCheck.shift();
		if (isInert(element, false)) continue;
		if (element.tagName === "SLOT") {
			var assigned = element.assignedElements();
			var nestedCandidates = getCandidatesIteratively(assigned.length ? assigned : element.children, true, options);
			if (options.flatten) candidates.push.apply(candidates, nestedCandidates);
			else candidates.push({
				scopeParent: element,
				candidates: nestedCandidates
			});
		} else {
			if (matches.call(element, candidateSelector) && options.filter(element) && (includeContainer || !elements.includes(element))) candidates.push(element);
			var shadowRoot = element.shadowRoot || typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
			var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
			if (shadowRoot && validShadowRoot) {
				var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
				if (options.flatten) candidates.push.apply(candidates, _nestedCandidates);
				else candidates.push({
					scopeParent: element,
					candidates: _nestedCandidates
				});
			} else elementsToCheck.unshift.apply(elementsToCheck, element.children);
		}
	}
	return candidates;
};
/**
* @private
* Determines if the node has an explicitly specified `tabindex` attribute.
* @param {HTMLElement} node
* @returns {boolean} True if so; false if not.
*/
var hasTabIndex = function hasTabIndex(node) {
	return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
/**
* Determine the tab index of a given node.
* @param {HTMLElement} node
* @returns {number} Tab order (negative, 0, or positive number).
* @throws {Error} If `node` is falsy.
*/
var getTabIndex = function getTabIndex(node) {
	if (!node) throw new Error("No node provided");
	if (node.tabIndex < 0) {
		if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) return 0;
	}
	return node.tabIndex;
};
/**
* Determine the tab index of a given node __for sort order purposes__.
* @param {HTMLElement} node
* @param {boolean} [isScope] True for a custom element with shadow root or slot that, by default,
*  has tabIndex -1, but needs to be sorted by document order in order for its content to be
*  inserted into the correct sort position.
* @returns {number} Tab order (negative, 0, or positive number).
*/
var getSortOrderTabIndex = function getSortOrderTabIndex(node, isScope) {
	var tabIndex = getTabIndex(node);
	if (tabIndex < 0 && isScope && !hasTabIndex(node)) return 0;
	return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
	return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
	return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput(node) {
	return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
	return node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
		return child.tagName === "SUMMARY";
	});
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
	for (var i = 0; i < nodes.length; i++) if (nodes[i].checked && nodes[i].form === form) return nodes[i];
};
var isTabbableRadio = function isTabbableRadio(node) {
	if (!node.name) return true;
	var radioScope = node.form || getRootNode(node);
	var queryRadios = function queryRadios(name) {
		return radioScope.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
	};
	var radioSet;
	if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") radioSet = queryRadios(window.CSS.escape(node.name));
	else try {
		radioSet = queryRadios(node.name);
	} catch (err) {
		console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
		return false;
	}
	var checked = getCheckedRadio(radioSet, node.form);
	return !checked || checked === node;
};
var isRadio = function isRadio(node) {
	return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
	return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached(node) {
	var _nodeRoot;
	var nodeRoot = node && getRootNode(node);
	var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
	var attached = false;
	if (nodeRoot && nodeRoot !== node) {
		var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
		attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
		while (!attached && nodeRootHost) {
			var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
			nodeRoot = getRootNode(nodeRootHost);
			nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
			attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
		}
	}
	return attached;
};
var isZeroArea = function isZeroArea(node) {
	var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
	return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
	var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
	if (getComputedStyle(node).visibility === "hidden") return true;
	var nodeUnderDetails = matches.call(node, "details>summary:first-of-type") ? node.parentElement : node;
	if (matches.call(nodeUnderDetails, "details:not([open]) *")) return true;
	if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
		if (typeof getShadowRoot === "function") {
			var originalNode = node;
			while (node) {
				var parentElement = node.parentElement;
				var rootNode = getRootNode(node);
				if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) return isZeroArea(node);
				else if (node.assignedSlot) node = node.assignedSlot;
				else if (!parentElement && rootNode !== node.ownerDocument) node = rootNode.host;
				else node = parentElement;
			}
			node = originalNode;
		}
		if (isNodeAttached(node)) return !node.getClientRects().length;
		if (displayCheck !== "legacy-full") return true;
	} else if (displayCheck === "non-zero-area") return isZeroArea(node);
	return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
		var parentNode = node.parentElement;
		while (parentNode) {
			if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
				for (var i = 0; i < parentNode.children.length; i++) {
					var child = parentNode.children.item(i);
					if (child.tagName === "LEGEND") return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
				}
				return true;
			}
			parentNode = parentNode.parentElement;
		}
	}
	return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
	if (node.disabled || isInert(node) || isHiddenInput(node) || isHidden(node, options) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) return false;
	return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
	if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) return false;
	return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
	var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
	if (isNaN(tabIndex) || tabIndex >= 0) return true;
	return false;
};
/**
* @param {Array.<Element|CandidateScope>} candidates
* @returns Element[]
*/
var sortByOrder = function sortByOrder(candidates) {
	var regularTabbables = [];
	var orderedTabbables = [];
	candidates.forEach(function(item, i) {
		var isScope = !!item.scopeParent;
		var element = isScope ? item.scopeParent : item;
		var candidateTabindex = getSortOrderTabIndex(element, isScope);
		var elements = isScope ? sortByOrder(item.candidates) : element;
		if (candidateTabindex === 0) isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
		else orderedTabbables.push({
			documentOrder: i,
			tabIndex: candidateTabindex,
			item,
			isScope,
			content: elements
		});
	});
	return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
		sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
		return acc;
	}, []).concat(regularTabbables);
};
var tabbable = function tabbable(container, options) {
	options = options || {};
	var candidates;
	if (options.getShadowRoot) candidates = getCandidatesIteratively([container], options.includeContainer, {
		filter: isNodeMatchingSelectorTabbable.bind(null, options),
		flatten: false,
		getShadowRoot: options.getShadowRoot,
		shadowRootFilter: isValidShadowRootTabbable
	});
	else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
	return sortByOrder(candidates);
};
var focusable = function focusable(container, options) {
	options = options || {};
	var candidates;
	if (options.getShadowRoot) candidates = getCandidatesIteratively([container], options.includeContainer, {
		filter: isNodeMatchingSelectorFocusable.bind(null, options),
		flatten: true,
		getShadowRoot: options.getShadowRoot
	});
	else candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
	return candidates;
};
var isTabbable = function isTabbable(node, options) {
	options = options || {};
	if (!node) throw new Error("No node provided");
	if (matches.call(node, candidateSelector) === false) return false;
	return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable(node, options) {
	options = options || {};
	if (!node) throw new Error("No node provided");
	if (matches.call(node, focusableCandidateSelector) === false) return false;
	return isNodeMatchingSelectorFocusable(options, node);
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/tabbable.js
function getTabbableOptions() {
	return {
		getShadowRoot: true,
		displayCheck: typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
	};
}
/**
* Gets all tabbable elements in the body and finds the next/previous tabbable element
* from the `currentNode` based on the `direction` provided.
* @param currentNode - the node we want to get the next/previous tabbable from
*/
function getTabbableFrom(currentNode, direction) {
	if (!isTabbable(currentNode, getTabbableOptions())) return getTabbableFromFocusable(currentNode, direction);
	const doc = getDocument(currentNode);
	const allTabbable = tabbable(doc.body, getTabbableOptions());
	if (direction === "prev") allTabbable.reverse();
	const activeIndex = allTabbable.indexOf(currentNode);
	if (activeIndex === -1) return doc.body;
	return allTabbable.slice(activeIndex + 1)[0];
}
function getTabbableFromFocusable(currentNode, direction) {
	const doc = getDocument(currentNode);
	if (!isFocusable(currentNode, getTabbableOptions())) return doc.body;
	const allFocusable = focusable(doc.body, getTabbableOptions());
	if (direction === "prev") allFocusable.reverse();
	const activeIndex = allFocusable.indexOf(currentNode);
	if (activeIndex === -1) return doc.body;
	return allFocusable.slice(activeIndex + 1).find((node) => isTabbable(node, getTabbableOptions())) ?? doc.body;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/arrays.js
/**
* Returns the array element after the given index, or undefined for out-of-bounds or empty arrays.
* @param array the array.
* @param index the index of the current element.
* @param loop loop to the beginning of the array if the next index is out of bounds?
*/
/**
* Returns the array element after the given index, or undefined for out-of-bounds or empty arrays.
* For single-element arrays, returns the element if the index is 0.
* @param array the array.
* @param index the index of the current element.
* @param loop loop to the beginning of the array if the next index is out of bounds?
*/
function next(array, index, loop = true) {
	if (array.length === 0 || index < 0 || index >= array.length) return;
	if (array.length === 1 && index === 0) return array[0];
	if (index === array.length - 1) return loop ? array[0] : void 0;
	return array[index + 1];
}
/**
* Returns the array element prior to the given index, or undefined for out-of-bounds or empty arrays.
* For single-element arrays, returns the element if the index is 0.
* @param array the array.
* @param index the index of the current element.
* @param loop loop to the end of the array if the previous index is out of bounds?
*/
function prev(array, index, loop = true) {
	if (array.length === 0 || index < 0 || index >= array.length) return;
	if (array.length === 1 && index === 0) return array[0];
	if (index === 0) return loop ? array[array.length - 1] : void 0;
	return array[index - 1];
}
/**
* Returns the element some number after the given index. If the target index is out of bounds:
*   - If looping is disabled, the first or last element will be returned.
*   - If looping is enabled, it will wrap around the array.
* Returns undefined for empty arrays or out-of-bounds initial indices.
* @param array the array.
* @param index the index of the current element.
* @param increment the number of elements to move forward (can be negative).
* @param loop loop around the array if the target index is out of bounds?
*/
function forward(array, index, increment, loop = true) {
	if (array.length === 0 || index < 0 || index >= array.length) return;
	let targetIndex = index + increment;
	if (loop) targetIndex = (targetIndex % array.length + array.length) % array.length;
	else targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
	return array[targetIndex];
}
/**
* Returns the element some number before the given index. If the target index is out of bounds:
*   - If looping is disabled, the first or last element will be returned.
*   - If looping is enabled, it will wrap around the array.
* Returns undefined for empty arrays or out-of-bounds initial indices.
* @param array the array.
* @param index the index of the current element.
* @param decrement the number of elements to move backward (can be negative).
* @param loop loop around the array if the target index is out of bounds?
*/
function backward(array, index, decrement, loop = true) {
	if (array.length === 0 || index < 0 || index >= array.length) return;
	let targetIndex = index - decrement;
	if (loop) targetIndex = (targetIndex % array.length + array.length) % array.length;
	else targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
	return array[targetIndex];
}
/**
* Finds the next matching item from a list of values based on a search string.
*
* This function handles several special cases in typeahead behavior:
*
* 1. Space handling: When a search string ends with a space, it handles it specially:
*    - If there's only one match for the text before the space, it ignores the space
*    - If there are multiple matches and the current match already starts with the search prefix
*      followed by a space, it keeps the current match (doesn't change selection on space)
*    - Only after typing characters beyond the space will it move to a more specific match
*
* 2. Repeated character handling: If a search consists of repeated characters (e.g., "aaa"),
*    it treats it as a single character for matching purposes
*
* 3. Cycling behavior: The function wraps around the values array starting from the current match
*    to find the next appropriate match, creating a cycling selection behavior
*
* @param values - Array of string values to search through (e.g., the text content of menu items)
* @param search - The current search string typed by the user
* @param currentMatch - The currently selected/matched item, if any
* @returns The next matching value that should be selected, or undefined if no match is found
*/
function getNextMatch(values, search, currentMatch) {
	const lowerSearch = search.toLowerCase();
	if (lowerSearch.endsWith(" ")) {
		const searchWithoutSpace = lowerSearch.slice(0, -1);
		/**
		* If there's only one match for the prefix without space, we don't
		* watch to match with space.
		*/
		if (values.filter((value) => value.toLowerCase().startsWith(searchWithoutSpace)).length <= 1) return getNextMatch(values, searchWithoutSpace, currentMatch);
		const currentMatchLowercase = currentMatch?.toLowerCase();
		/**
		* If the current match already starts with the search prefix and has a space afterward,
		* and the user has only typed up to that space, keep the current match until they
		* disambiguate.
		*/
		if (currentMatchLowercase && currentMatchLowercase.startsWith(searchWithoutSpace) && currentMatchLowercase.charAt(searchWithoutSpace.length) === " " && search.trim() === searchWithoutSpace) return currentMatch;
		/**
		* With multiple matches, find items that match the full search string with space
		*/
		const spacedMatches = values.filter((value) => value.toLowerCase().startsWith(lowerSearch));
		/**
		* If we found matches with the space, use the first one that's not the current match
		*/
		if (spacedMatches.length > 0) {
			const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
			return wrapArray(spacedMatches, Math.max(currentMatchIndex, 0)).find((match) => match !== currentMatch) || currentMatch;
		}
	}
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const normalizedLowerSearch = normalizedSearch.toLowerCase();
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value?.toLowerCase().startsWith(normalizedLowerSearch));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/box-auto-reset.svelte.js
var defaultOptions = {
	afterMs: 1e4,
	onChange: noop
};
function boxAutoReset(defaultValue, options) {
	const { afterMs, onChange, getWindow } = {
		...defaultOptions,
		...options
	};
	let timeout = null;
	let value = defaultValue;
	function resetAfter() {
		return getWindow().setTimeout(() => {
			value = defaultValue;
			onChange?.(defaultValue);
		}, afterMs);
	}
	return boxWith(() => value, (v) => {
		value = v;
		onChange?.(v);
		if (timeout) getWindow().clearTimeout(timeout);
		timeout = resetAfter();
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/dom-typeahead.svelte.js
var DOMTypeahead = class {
	#opts;
	#search;
	#onMatch = derived(() => {
		if (this.#opts.onMatch) return this.#opts.onMatch;
		return (node) => node.focus();
	});
	#getCurrentItem = derived(() => {
		if (this.#opts.getCurrentItem) return this.#opts.getCurrentItem;
		return this.#opts.getActiveElement;
	});
	constructor(opts) {
		this.#opts = opts;
		this.#search = boxAutoReset("", {
			afterMs: 1e3,
			getWindow: opts.getWindow
		});
		this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
		this.resetTypeahead = this.resetTypeahead.bind(this);
	}
	handleTypeaheadSearch(key, candidates) {
		if (!candidates.length) return;
		this.#search.current = this.#search.current + key;
		const currentItem = this.#getCurrentItem()();
		const currentMatch = candidates.find((item) => item === currentItem)?.textContent?.trim() ?? "";
		const nextMatch = getNextMatch(candidates.map((item) => item.textContent?.trim() ?? ""), this.#search.current, currentMatch);
		const newItem = candidates.find((item) => item.textContent?.trim() === nextMatch);
		if (newItem) this.#onMatch()(newItem);
		return newItem;
	}
	resetTypeahead() {
		this.#search.current = "";
	}
	get search() {
		return this.#search.current;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/menu/menu.svelte.js
var CONTEXT_MENU_TRIGGER_ATTR = "data-context-menu-trigger";
var CONTEXT_MENU_CONTENT_ATTR = "data-context-menu-content";
var MenuRootContext = new Context("Menu.Root");
var MenuMenuContext = new Context("Menu.Root | Menu.Sub");
var MenuContentContext = new Context("Menu.Content");
new Context("Menu.Group | Menu.RadioGroup");
new Context("Menu.RadioGroup");
new Context("Menu.CheckboxGroup");
var MenuOpenEvent = new CustomEventDispatcher("bitsmenuopen", {
	bubbles: false,
	cancelable: true
});
var menuAttrs = createBitsAttrs({
	component: "menu",
	parts: [
		"trigger",
		"content",
		"sub-trigger",
		"item",
		"group",
		"group-heading",
		"checkbox-group",
		"checkbox-item",
		"radio-group",
		"radio-item",
		"separator",
		"sub-content",
		"arrow"
	]
});
var MenuSubmenuIntent = class {
	#opts;
	#cleanupDocMove = null;
	#fallbackTimer = null;
	#active = false;
	#target = null;
	#apex = null;
	#pointerPoint = null;
	#launchPoint = null;
	constructor(opts) {
		this.#opts = opts;
		watch([
			opts.triggerNode,
			opts.contentNode,
			opts.enabled
		], ([triggerNode, contentNode, enabled]) => {
			this.#reset();
			if (!triggerNode || !contentNode || !enabled) return;
			const onTriggerMove = (e) => {
				if (!isMouseEvent(e)) return;
				this.#launchPoint = {
					x: e.clientX,
					y: e.clientY
				};
				if (!this.#active) this.#preview(e, "content");
			};
			const onTriggerLeave = (e) => {
				if (!isMouseEvent(e)) return;
				this.#engage(e, "content");
			};
			const onContentMove = (e) => {
				if (!isMouseEvent(e)) return;
				if (!this.#active) this.#preview(e, "trigger");
			};
			const onContentLeave = (e) => {
				if (!isMouseEvent(e)) return;
				if (isElement$1(e.relatedTarget)) {
					const selector = this.#opts.subContentSelector();
					const matchedSubContent = e.relatedTarget.closest(selector);
					if (matchedSubContent && matchedSubContent !== contentNode && matchedSubContent.id) {
						if (!!contentNode.querySelector(`[aria-controls="${matchedSubContent.id}"]`)) return;
					}
				}
				this.#engage(e, "trigger");
			};
			const onTriggerEnter = (e) => {
				if (!isMouseEvent(e)) return;
				this.#disengage();
			};
			const onContentEnter = (e) => {
				if (!isMouseEvent(e)) return;
				this.#disengage();
			};
			triggerNode.addEventListener("pointermove", onTriggerMove);
			triggerNode.addEventListener("pointerleave", onTriggerLeave);
			triggerNode.addEventListener("pointerenter", onTriggerEnter);
			contentNode.addEventListener("pointermove", onContentMove);
			contentNode.addEventListener("pointerleave", onContentLeave);
			contentNode.addEventListener("pointerenter", onContentEnter);
			return () => {
				triggerNode.removeEventListener("pointermove", onTriggerMove);
				triggerNode.removeEventListener("pointerleave", onTriggerLeave);
				triggerNode.removeEventListener("pointerenter", onTriggerEnter);
				contentNode.removeEventListener("pointermove", onContentMove);
				contentNode.removeEventListener("pointerleave", onContentLeave);
				contentNode.removeEventListener("pointerenter", onContentEnter);
				this.#reset();
			};
		});
	}
	#parentTargetRect() {
		const parent = this.#opts.parentContentNode();
		if (parent) return parent.getBoundingClientRect();
		return this.#opts.triggerNode()?.getBoundingClientRect() ?? null;
	}
	#computePolygons(pointerPt, target) {
		const triggerNode = this.#opts.triggerNode();
		const contentNode = this.#opts.contentNode();
		if (!triggerNode || !contentNode) return null;
		const triggerRect = triggerNode.getBoundingClientRect();
		const contentRect = contentNode.getBoundingClientRect();
		const side = getSide$2(triggerRect, contentRect);
		let apex;
		let targetRect;
		let sourceRect;
		if (target === "content") {
			apex = this.#active ? this.#apex ?? pointerPt : pointerPt;
			targetRect = contentRect;
		} else {
			apex = this.#launchPoint ?? pointerPt;
			targetRect = this.#parentTargetRect() ?? triggerRect;
			sourceRect = contentRect;
		}
		this.#apex = apex;
		return {
			corridor: getCorridorPolygon(triggerRect, contentRect, side),
			intent: getIntentPolygon(apex, targetRect, side, target, sourceRect),
			targetRect,
			side
		};
	}
	#isInSafeZone(pt, corridor, intent) {
		return isPointInPolygon$1(pt, corridor) || isPointInPolygon$1(pt, intent);
	}
	#preview(e, target) {
		const pt = {
			x: e.clientX,
			y: e.clientY
		};
		if (!this.#computePolygons(pt, target)) return;
		this.#target = target;
		this.#pointerPoint = pt;
	}
	#engage(e, target) {
		if (!this.#opts.enabled()) return;
		const triggerNode = this.#opts.triggerNode();
		const contentNode = this.#opts.contentNode();
		if (!triggerNode || !contentNode) return;
		const related = e.relatedTarget;
		if (isElement$1(related)) {
			if (target === "content" && contentNode.contains(related)) return;
			if (target === "trigger" && triggerNode.contains(related)) return;
		}
		const pt = {
			x: e.clientX,
			y: e.clientY
		};
		const geo = this.#computePolygons(pt, target);
		if (!geo) return;
		if (!isInsideRect$1(pt, geo.targetRect) && !this.#isInSafeZone(pt, geo.corridor, geo.intent)) {
			this.#clearVisuals();
			return;
		}
		this.#active = true;
		this.#target = target;
		this.#pointerPoint = pt;
		this.#opts.setIsPointerInTransit(true);
		this.#attachDocMove();
		this.#startFallback();
	}
	#disengageTimer = null;
	#disengage() {
		if (!this.#active) return;
		const wasReturning = this.#target === "trigger";
		this.#detachDocMove();
		this.#clearFallback();
		this.#active = false;
		this.#clearVisuals();
		if (wasReturning) {
			this.#clearDisengageTimer();
			this.#disengageTimer = setTimeout(() => {
				this.#disengageTimer = null;
				this.#opts.setIsPointerInTransit(false);
			}, 100);
		} else this.#opts.setIsPointerInTransit(false);
	}
	#clearDisengageTimer() {
		if (this.#disengageTimer === null) return;
		clearTimeout(this.#disengageTimer);
		this.#disengageTimer = null;
	}
	#intentExit() {
		const pointerPoint = this.#pointerPoint;
		this.#detachDocMove();
		this.#clearFallback();
		this.#clearDisengageTimer();
		this.#active = false;
		this.#opts.setIsPointerInTransit(false);
		this.#clearVisuals();
		this.#opts.onIntentExit(pointerPoint);
	}
	#reset() {
		this.#detachDocMove();
		this.#clearFallback();
		this.#clearDisengageTimer();
		if (this.#active) this.#opts.setIsPointerInTransit(false);
		this.#active = false;
		this.#target = null;
		this.#apex = null;
		this.#pointerPoint = null;
		this.#launchPoint = null;
	}
	#isPointerInDescendantSubContent(pt) {
		const contentNode = this.#opts.contentNode();
		if (!contentNode) return false;
		const el = contentNode.ownerDocument.elementFromPoint(pt.x, pt.y);
		if (!el) return false;
		const selector = this.#opts.subContentSelector();
		const subContent = el.closest(selector);
		if (!subContent || subContent === contentNode) return false;
		if (subContent.id) return !!contentNode.querySelector(`[aria-controls="${subContent.id}"]`);
		return false;
	}
	#onDocMove = (e) => {
		if (!this.#active || !this.#target) return;
		if (!isMouseEvent(e)) return;
		const triggerNode = this.#opts.triggerNode();
		const contentNode = this.#opts.contentNode();
		if (!triggerNode || !contentNode) {
			this.#intentExit();
			return;
		}
		this.#clearFallback();
		const pt = {
			x: e.clientX,
			y: e.clientY
		};
		this.#pointerPoint = pt;
		const triggerRect = triggerNode.getBoundingClientRect();
		const contentRect = contentNode.getBoundingClientRect();
		if (this.#target === "content" && isInsideRect$1(pt, contentRect)) {
			this.#disengage();
			return;
		}
		if (this.#target === "trigger" && isInsideInsetRect(pt, triggerRect, 4)) {
			this.#disengage();
			return;
		}
		if (this.#isPointerInDescendantSubContent(pt)) {
			this.#startFallback();
			return;
		}
		const geo = this.#computePolygons(pt, this.#target);
		if (!geo) {
			this.#intentExit();
			return;
		}
		if (this.#isInSafeZone(pt, geo.corridor, geo.intent)) {
			this.#startFallback();
			return;
		}
		this.#intentExit();
	};
	#attachDocMove() {
		if (this.#cleanupDocMove) return;
		const doc = getDocument(this.#opts.triggerNode() ?? this.#opts.contentNode());
		if (!doc) return;
		doc.addEventListener("pointermove", this.#onDocMove, true);
		this.#cleanupDocMove = () => {
			doc.removeEventListener("pointermove", this.#onDocMove, true);
			this.#cleanupDocMove = null;
		};
	}
	#detachDocMove() {
		this.#cleanupDocMove?.();
	}
	#startFallback() {
		this.#clearFallback();
		this.#fallbackTimer = setTimeout(() => {
			this.#fallbackTimer = null;
			if (this.#active) this.#intentExit();
		}, 500);
	}
	#clearFallback() {
		if (this.#fallbackTimer === null) return;
		clearTimeout(this.#fallbackTimer);
		this.#fallbackTimer = null;
	}
	#clearVisuals() {
		this.#target = null;
		this.#apex = null;
		this.#pointerPoint = null;
	}
};
function isPointInPolygon$1(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isInsideRect$1(point, rect) {
	return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
}
function isInsideInsetRect(point, rect, inset) {
	return point.x >= rect.left + inset && point.x <= rect.right - inset && point.y >= rect.top + inset && point.y <= rect.bottom - inset;
}
function getSide$2(triggerRect, contentRect) {
	const triggerCenterX = triggerRect.left + triggerRect.width / 2;
	const triggerCenterY = triggerRect.top + triggerRect.height / 2;
	const contentCenterX = contentRect.left + contentRect.width / 2;
	const contentCenterY = contentRect.top + contentRect.height / 2;
	const deltaX = contentCenterX - triggerCenterX;
	const deltaY = contentCenterY - triggerCenterY;
	if (Math.abs(deltaX) > Math.abs(deltaY)) return deltaX > 0 ? "right" : "left";
	return deltaY > 0 ? "bottom" : "top";
}
function getCorridorPolygon(triggerRect, contentRect, side) {
	const buffer = 2;
	switch (side) {
		case "top": return [
			{
				x: Math.min(triggerRect.left, contentRect.left) - buffer,
				y: triggerRect.top
			},
			{
				x: Math.min(triggerRect.left, contentRect.left) - buffer,
				y: contentRect.bottom
			},
			{
				x: Math.max(triggerRect.right, contentRect.right) + buffer,
				y: contentRect.bottom
			},
			{
				x: Math.max(triggerRect.right, contentRect.right) + buffer,
				y: triggerRect.top
			}
		];
		case "bottom": return [
			{
				x: Math.min(triggerRect.left, contentRect.left) - buffer,
				y: triggerRect.bottom
			},
			{
				x: Math.min(triggerRect.left, contentRect.left) - buffer,
				y: contentRect.top
			},
			{
				x: Math.max(triggerRect.right, contentRect.right) + buffer,
				y: contentRect.top
			},
			{
				x: Math.max(triggerRect.right, contentRect.right) + buffer,
				y: triggerRect.bottom
			}
		];
		case "left": return [
			{
				x: triggerRect.left,
				y: Math.min(triggerRect.top, contentRect.top) - buffer
			},
			{
				x: contentRect.right,
				y: Math.min(triggerRect.top, contentRect.top) - buffer
			},
			{
				x: contentRect.right,
				y: Math.max(triggerRect.bottom, contentRect.bottom) + buffer
			},
			{
				x: triggerRect.left,
				y: Math.max(triggerRect.bottom, contentRect.bottom) + buffer
			}
		];
		case "right": return [
			{
				x: triggerRect.right,
				y: Math.min(triggerRect.top, contentRect.top) - buffer
			},
			{
				x: contentRect.left,
				y: Math.min(triggerRect.top, contentRect.top) - buffer
			},
			{
				x: contentRect.left,
				y: Math.max(triggerRect.bottom, contentRect.bottom) + buffer
			},
			{
				x: triggerRect.right,
				y: Math.max(triggerRect.bottom, contentRect.bottom) + buffer
			}
		];
	}
}
function getIntentPolygon(exitPoint, targetRect, side, target, sourceRect) {
	const edgeBuffer = 8;
	const effectiveSide = target === "trigger" ? flipSide(side) : side;
	const top = sourceRect ? Math.min(targetRect.top, sourceRect.top) - edgeBuffer : targetRect.top - edgeBuffer;
	const bottom = sourceRect ? Math.max(targetRect.bottom, sourceRect.bottom) + edgeBuffer : targetRect.bottom + edgeBuffer;
	const left = sourceRect ? Math.min(targetRect.left, sourceRect.left) - edgeBuffer : targetRect.left - edgeBuffer;
	const right = sourceRect ? Math.max(targetRect.right, sourceRect.right) + edgeBuffer : targetRect.right + edgeBuffer;
	switch (effectiveSide) {
		case "right": return [
			exitPoint,
			{
				x: targetRect.left,
				y: top
			},
			{
				x: targetRect.left,
				y: bottom
			}
		];
		case "left": return [
			exitPoint,
			{
				x: targetRect.right,
				y: top
			},
			{
				x: targetRect.right,
				y: bottom
			}
		];
		case "bottom": return [
			exitPoint,
			{
				x: left,
				y: targetRect.top
			},
			{
				x: right,
				y: targetRect.top
			}
		];
		case "top": return [
			exitPoint,
			{
				x: left,
				y: targetRect.bottom
			},
			{
				x: right,
				y: targetRect.bottom
			}
		];
	}
}
function flipSide(side) {
	switch (side) {
		case "top": return "bottom";
		case "bottom": return "top";
		case "left": return "right";
		case "right": return "left";
	}
}
var MenuRootState = class MenuRootState {
	static create(opts) {
		const root = new MenuRootState(opts);
		return MenuRootContext.set(root);
	}
	opts;
	isUsingKeyboard = new IsUsingKeyboard();
	ignoreCloseAutoFocus = false;
	isPointerInTransit = false;
	constructor(opts) {
		this.opts = opts;
	}
	getBitsAttr = (part) => {
		return menuAttrs.getAttr(part, this.opts.variant.current);
	};
};
var MenuMenuState = class MenuMenuState {
	static create(opts, root) {
		return MenuMenuContext.set(new MenuMenuState(opts, root, null));
	}
	opts;
	root;
	parentMenu;
	contentId = boxWith(() => "");
	contentNode = null;
	contentPresence;
	triggerNode = null;
	constructor(opts, root, parentMenu) {
		this.opts = opts;
		this.root = root;
		this.parentMenu = parentMenu;
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			},
			shouldSkipExitAnimation: () => {
				if (this.root.opts.variant.current !== "menubar" || this.parentMenu !== null) return false;
				return this.root.opts.shouldSkipExitAnimation?.() ?? false;
			}
		});
		if (parentMenu) watch(() => parentMenu.opts.open.current, () => {
			if (parentMenu.opts.open.current) return;
			this.opts.open.current = false;
		});
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	onOpen() {
		this.opts.open.current = true;
	}
	onClose() {
		this.opts.open.current = false;
	}
};
var MenuContentState = class MenuContentState {
	static create(opts) {
		return MenuContentContext.set(new MenuContentState(opts, MenuMenuContext.get()));
	}
	opts;
	parentMenu;
	rovingFocusGroup;
	domContext;
	attachment;
	search = "";
	#timer = 0;
	#handleTypeaheadSearch;
	mounted = false;
	#isSub;
	constructor(opts, parentMenu) {
		this.opts = opts;
		this.parentMenu = parentMenu;
		this.domContext = new DOMContext(opts.ref);
		this.attachment = attachRef(this.opts.ref, (v) => {
			if (this.parentMenu.contentNode !== v) this.parentMenu.contentNode = v;
		});
		parentMenu.contentId = opts.id;
		this.#isSub = opts.isSub ?? false;
		this.onkeydown = this.onkeydown.bind(this);
		this.onblur = this.onblur.bind(this);
		this.onfocus = this.onfocus.bind(this);
		this.handleInteractOutside = this.handleInteractOutside.bind(this);
		new MenuSubmenuIntent({
			contentNode: () => this.parentMenu.contentNode,
			triggerNode: () => this.parentMenu.triggerNode,
			parentContentNode: () => this.parentMenu.parentMenu?.contentNode ?? null,
			subContentSelector: () => `[${this.parentMenu.root.getBitsAttr("sub-content")}]`,
			enabled: () => this.parentMenu.opts.open.current && Boolean(this.parentMenu.triggerNode?.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger"))),
			onIntentExit: (pointerPoint) => {
				this.parentMenu.opts.open.current = false;
				this.#dispatchPointerMoveToHoveredSubTrigger(pointerPoint);
			},
			setIsPointerInTransit: (value) => {
				this.parentMenu.root.isPointerInTransit = value;
			}
		});
		this.#handleTypeaheadSearch = new DOMTypeahead({
			getActiveElement: () => this.domContext.getActiveElement(),
			getWindow: () => this.domContext.getWindow()
		}).handleTypeaheadSearch;
		this.rovingFocusGroup = new RovingFocusGroup({
			rootNode: boxWith(() => this.parentMenu.contentNode),
			candidateAttr: this.parentMenu.root.getBitsAttr("item"),
			loop: this.opts.loop,
			orientation: boxWith(() => "vertical")
		});
		watch(() => this.parentMenu.contentNode, (contentNode) => {
			if (!contentNode) return;
			const handler = () => {
				afterTick(() => {
					if (!this.parentMenu.root.isUsingKeyboard.current) return;
					this.rovingFocusGroup.focusFirstCandidate();
				});
			};
			return MenuOpenEvent.listen(contentNode, handler);
		});
	}
	#getCandidateNodes() {
		const node = this.parentMenu.contentNode;
		if (!node) return [];
		return Array.from(node.querySelectorAll(`[${this.parentMenu.root.getBitsAttr("item")}]:not([data-disabled])`));
	}
	#isPointerMovingToSubmenu() {
		return this.parentMenu.root.isPointerInTransit;
	}
	#dispatchPointerMoveToHoveredSubTrigger(pointerPoint) {
		if (!pointerPoint) return;
		const parentContentNode = this.parentMenu.parentMenu?.contentNode;
		if (!parentContentNode) return;
		const hoveredNode = this.domContext.getDocument().elementFromPoint(pointerPoint.x, pointerPoint.y);
		if (!isElement$1(hoveredNode)) return;
		const hoveredSubTrigger = hoveredNode.closest(`[${this.parentMenu.root.getBitsAttr("sub-trigger")}]`);
		if (!hoveredSubTrigger || !parentContentNode.contains(hoveredSubTrigger)) return;
		if (hoveredSubTrigger === this.parentMenu.triggerNode) return;
		hoveredSubTrigger.dispatchEvent(new PointerEvent("pointermove", {
			bubbles: true,
			cancelable: true,
			pointerType: "mouse",
			clientX: pointerPoint.x,
			clientY: pointerPoint.y
		}));
	}
	onCloseAutoFocus = (e) => {
		this.opts.onCloseAutoFocus.current?.(e);
		if (e.defaultPrevented || this.#isSub) return;
		if (this.parentMenu.root.ignoreCloseAutoFocus) {
			e.preventDefault();
			return;
		}
		if (this.parentMenu.triggerNode && isTabbable(this.parentMenu.triggerNode)) {
			e.preventDefault();
			this.parentMenu.triggerNode.focus();
		}
	};
	handleTabKeyDown(e) {
		/**
		* We locate the root `menu`'s trigger by going up the tree until
		* we find a menu that has no parent. This will allow us to focus the next
		* tabbable element before/after the root trigger.
		*/
		let rootMenu = this.parentMenu;
		while (rootMenu.parentMenu !== null) rootMenu = rootMenu.parentMenu;
		if (!rootMenu.triggerNode) return;
		e.preventDefault();
		const nodeToFocus = getTabbableFrom(rootMenu.triggerNode, e.shiftKey ? "prev" : "next");
		if (nodeToFocus) {
			/**
			* We set a flag to ignore the `onCloseAutoFocus` event handler
			* as well as the fallbacks inside the focus scope to prevent
			* race conditions causing focus to fall back to the body even
			* though we're trying to focus the next tabbable element.
			*/
			this.parentMenu.root.ignoreCloseAutoFocus = true;
			rootMenu.onClose();
			afterTick(() => {
				nodeToFocus.focus();
				afterTick(() => {
					this.parentMenu.root.ignoreCloseAutoFocus = false;
				});
			});
		} else this.domContext.getDocument().body.focus();
	}
	onkeydown(e) {
		if (e.defaultPrevented) return;
		if (e.key === "Tab") {
			this.handleTabKeyDown(e);
			return;
		}
		const target = e.target;
		const currentTarget = e.currentTarget;
		if (!isHTMLElement$1(target) || !isHTMLElement$1(currentTarget)) return;
		const isKeydownInside = target.closest(`[${this.parentMenu.root.getBitsAttr("content")}]`)?.id === this.parentMenu.contentId.current;
		const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
		const isCharacterKey = e.key.length === 1;
		if (this.rovingFocusGroup.handleKeydown(target, e)) return;
		if (e.code === "Space") return;
		const candidateNodes = this.#getCandidateNodes();
		if (isKeydownInside) {
			if (!isModifierKey && isCharacterKey) this.#handleTypeaheadSearch(e.key, candidateNodes);
		}
		if (e.target?.id !== this.parentMenu.contentId.current) return;
		if (!FIRST_LAST_KEYS.includes(e.key)) return;
		e.preventDefault();
		if (LAST_KEYS.includes(e.key)) candidateNodes.reverse();
		focusFirst(candidateNodes, { select: false }, () => this.domContext.getActiveElement());
	}
	onblur(e) {
		if (!isElement$1(e.currentTarget)) return;
		if (!isElement$1(e.target)) return;
		if (!e.currentTarget.contains?.(e.target)) {
			this.domContext.getWindow().clearTimeout(this.#timer);
			this.search = "";
		}
	}
	onfocus(_) {
		if (!this.parentMenu.root.isUsingKeyboard.current) return;
		afterTick(() => this.rovingFocusGroup.focusFirstCandidate());
	}
	onItemEnter() {
		return this.#isPointerMovingToSubmenu();
	}
	onItemLeave(e) {
		if (e.currentTarget.hasAttribute(this.parentMenu.root.getBitsAttr("sub-trigger"))) return;
		if (this.#isPointerMovingToSubmenu() || this.parentMenu.root.isUsingKeyboard.current) return;
		this.parentMenu.contentNode?.focus({ preventScroll: true });
		this.rovingFocusGroup.setCurrentTabStopId("");
	}
	onTriggerLeave() {
		if (this.#isPointerMovingToSubmenu()) return true;
		return false;
	}
	handleInteractOutside(e) {
		if (!isElementOrSVGElement(e.target)) return;
		const triggerId = this.parentMenu.triggerNode?.id;
		if (e.target.id === triggerId) {
			e.preventDefault();
			return;
		}
		if (e.target.closest(`#${triggerId}`)) {
			e.preventDefault();
			return;
		}
		/**
		* when the menu closes due to an outside pointer interaction (for example,
		* clicking another dropdown trigger), avoid focusing this menu's trigger
		* to prevent stealing focus from the new interaction target.
		*/
		this.parentMenu.root.ignoreCloseAutoFocus = true;
		afterTick(() => {
			this.parentMenu.root.ignoreCloseAutoFocus = false;
		});
	}
	get shouldRender() {
		return this.parentMenu.contentPresence.shouldRender;
	}
	#snippetProps = derived(() => ({ open: this.parentMenu.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "menu",
		"aria-orientation": "vertical",
		[this.parentMenu.root.getBitsAttr("content")]: "",
		"data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
		...getDataTransitionAttrs(this.parentMenu.contentPresence.transitionStatus),
		onkeydown: this.onkeydown,
		onblur: this.onblur,
		onfocus: this.onfocus,
		dir: this.parentMenu.root.opts.dir.current,
		style: {
			pointerEvents: "auto",
			contain: "layout style"
		},
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	popperProps = { onCloseAutoFocus: (e) => this.onCloseAutoFocus(e) };
};
var MenuItemSharedState = class {
	opts;
	content;
	attachment;
	#isFocused = false;
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
		this.attachment = attachRef(this.opts.ref);
		this.onpointermove = this.onpointermove.bind(this);
		this.onpointerleave = this.onpointerleave.bind(this);
		this.onfocus = this.onfocus.bind(this);
		this.onblur = this.onblur.bind(this);
	}
	onpointermove(e) {
		if (e.defaultPrevented) return;
		if (!isMouseEvent(e)) return;
		if (this.opts.disabled.current) this.content.onItemLeave(e);
		else {
			if (this.content.onItemEnter()) return;
			const item = e.currentTarget;
			if (!isHTMLElement$1(item)) return;
			item.focus({ preventScroll: true });
		}
	}
	onpointerleave(e) {
		if (e.defaultPrevented) return;
		if (!isMouseEvent(e)) return;
		this.content.onItemLeave(e);
	}
	onfocus(e) {
		afterTick(() => {
			if (e.defaultPrevented || this.opts.disabled.current) return;
			this.#isFocused = true;
		});
	}
	onblur(e) {
		afterTick(() => {
			if (e.defaultPrevented) return;
			this.#isFocused = false;
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		role: "menuitem",
		"aria-disabled": boolToStr(this.opts.disabled.current),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-highlighted": this.#isFocused ? "" : void 0,
		[this.content.parentMenu.root.getBitsAttr("item")]: "",
		onpointermove: this.onpointermove,
		onpointerleave: this.onpointerleave,
		onfocus: this.onfocus,
		onblur: this.onblur,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var MenuItemState = class MenuItemState {
	static create(opts) {
		const item = new MenuItemSharedState(opts, MenuContentContext.get());
		return new MenuItemState(opts, item);
	}
	opts;
	item;
	root;
	#isPointerDown = false;
	constructor(opts, item) {
		this.opts = opts;
		this.item = item;
		this.root = item.content.parentMenu.root;
		this.onkeydown = this.onkeydown.bind(this);
		this.onclick = this.onclick.bind(this);
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onpointerup = this.onpointerup.bind(this);
	}
	#handleSelect() {
		if (this.item.opts.disabled.current) return;
		const selectEvent = new CustomEvent("menuitemselect", {
			bubbles: true,
			cancelable: true
		});
		this.opts.onSelect.current(selectEvent);
		if (selectEvent.defaultPrevented) {
			this.item.content.parentMenu.root.isUsingKeyboard.current = false;
			return;
		}
		if (this.opts.closeOnSelect.current) this.item.content.parentMenu.root.opts.onClose();
	}
	onkeydown(e) {
		const isTypingAhead = this.item.content.search !== "";
		if (this.item.opts.disabled.current || isTypingAhead && e.key === " ") return;
		if (SELECTION_KEYS.includes(e.key)) {
			if (!isHTMLElement$1(e.currentTarget)) return;
			e.currentTarget.click();
			/**
			* We prevent default browser behavior for selection keys as they should trigger
			* a selection only:
			* - prevents space from scrolling the page.
			* - if keydown causes focus to move, prevents keydown from firing on the new target.
			*/
			e.preventDefault();
		}
	}
	onclick(_) {
		if (this.item.opts.disabled.current) return;
		this.#handleSelect();
	}
	onpointerup(e) {
		if (e.defaultPrevented) return;
		if (!this.#isPointerDown) {
			if (!isHTMLElement$1(e.currentTarget)) return;
			e.currentTarget?.click();
		}
	}
	onpointerdown(_) {
		this.#isPointerDown = true;
	}
	#props = derived(() => mergeProps(this.item.props, {
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var MenuSeparatorState = class MenuSeparatorState {
	static create(opts) {
		return new MenuSeparatorState(opts, MenuRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "group",
		[this.root.getBitsAttr("separator")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var DropdownMenuTriggerState = class DropdownMenuTriggerState {
	static create(opts) {
		return new DropdownMenuTriggerState(opts, MenuMenuContext.get());
	}
	opts;
	parentMenu;
	attachment;
	constructor(opts, parentMenu) {
		this.opts = opts;
		this.parentMenu = parentMenu;
		this.attachment = attachRef(this.opts.ref, (v) => this.parentMenu.triggerNode = v);
	}
	onclick = (e) => {
		/**
		* MacOS VoiceOver sends a click in Safari/Firefox bypassing the keydown event
		* when V0+Space is pressed. Since we already handle the keydown event and the
		* pointerdown events separately, we ignore it if the detail is not 0.
		*/
		if (this.opts.disabled.current || e.detail !== 0) return;
		this.parentMenu.toggleOpen();
		e.preventDefault();
	};
	onpointerdown = (e) => {
		if (this.opts.disabled.current) return;
		if (e.pointerType === "touch") return e.preventDefault();
		if (e.button === 0 && e.ctrlKey === false) {
			this.parentMenu.toggleOpen();
			if (!this.parentMenu.opts.open.current) e.preventDefault();
		}
	};
	onpointerup = (e) => {
		if (this.opts.disabled.current) return;
		if (e.pointerType === "touch") {
			e.preventDefault();
			this.parentMenu.toggleOpen();
		}
	};
	onkeydown = (e) => {
		if (this.opts.disabled.current) return;
		if (e.key === " " || e.key === "Enter") {
			this.parentMenu.toggleOpen();
			e.preventDefault();
			return;
		}
		if (e.key === "ArrowDown") {
			this.parentMenu.onOpen();
			e.preventDefault();
		}
	};
	#ariaControls = derived(() => {
		if (this.parentMenu.opts.open.current && this.parentMenu.contentId.current) return this.parentMenu.contentId.current;
	});
	#props = derived(() => ({
		id: this.opts.id.current,
		disabled: this.opts.disabled.current,
		"aria-haspopup": "menu",
		"aria-expanded": boolToStr(this.parentMenu.opts.open.current),
		"aria-controls": this.#ariaControls(),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-state": getDataOpenClosed(this.parentMenu.opts.open.current),
		[this.parentMenu.root.getBitsAttr("trigger")]: "",
		onclick: this.onclick,
		onpointerdown: this.onpointerdown,
		onpointerup: this.onpointerup,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var MenuSubmenuState = class {
	static create(opts) {
		const menu = MenuMenuContext.get();
		return MenuMenuContext.set(new MenuMenuState(opts, menu.root, menu));
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var DismissibleLayerState = class DismissibleLayerState {
	static create(opts) {
		return new DismissibleLayerState(opts);
	}
	opts;
	#interactOutsideProp;
	#behaviorType;
	#interceptedEvents = { pointerdown: false };
	#isResponsibleLayer = false;
	#isFocusInsideDOMTree = false;
	#documentObj = void 0;
	#onFocusOutside;
	#unsubClickListener = noop;
	constructor(opts) {
		this.opts = opts;
		this.#behaviorType = opts.interactOutsideBehavior;
		this.#interactOutsideProp = opts.onInteractOutside;
		this.#onFocusOutside = opts.onFocusOutside;
		let unsubEvents = noop;
		const cleanup = () => {
			this.#resetState();
			globalThis.bitsDismissableLayers.delete(this);
			this.#handleInteractOutside.destroy();
			unsubEvents();
		};
		watch([() => this.opts.enabled.current, () => this.opts.ref.current], () => {
			if (!this.opts.enabled.current || !this.opts.ref.current) return;
			afterSleep(1, () => {
				if (!this.opts.ref.current) return;
				globalThis.bitsDismissableLayers.set(this, this.#behaviorType);
				unsubEvents();
				unsubEvents = this.#addEventListeners();
			});
			return cleanup;
		});
	}
	#handleFocus = (event) => {
		if (event.defaultPrevented) return;
		if (!this.opts.ref.current) return;
		afterTick(() => {
			if (!this.opts.ref.current || this.#isTargetWithinLayer(event.target)) return;
			if (event.target && !this.#isFocusInsideDOMTree) this.#onFocusOutside.current?.(event);
		});
	};
	#addEventListeners() {
		return executeCallbacks(
			/**
			* CAPTURE INTERACTION START
			* mark interaction-start event as intercepted.
			* mark responsible layer during interaction start
			* to avoid checking if is responsible layer during interaction end
			* when a new floating element may have been opened.
			*/
			on(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), { capture: true }),
			/**
			* BUBBLE INTERACTION START
			* Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
			* to avoid prematurely checking if other events were intercepted.
			*/
			on(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)),
			/**
			* HANDLE FOCUS OUTSIDE
			*/
			on(this.#documentObj, "focusin", this.#handleFocus)
		);
	}
	#handleDismiss = (e) => {
		let event = e;
		if (event.defaultPrevented) event = createWrappedEvent(e);
		this.#interactOutsideProp.current(e);
	};
	#handleInteractOutside = debounce((e) => {
		if (!this.opts.ref.current) {
			this.#unsubClickListener();
			return;
		}
		const isEventValid = this.opts.isValidEvent.current(e, this.opts.ref.current) || isValidEvent(e, this.opts.ref.current);
		if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
			this.#unsubClickListener();
			return;
		}
		let event = e;
		if (event.defaultPrevented) event = createWrappedEvent(event);
		if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
			this.#unsubClickListener();
			return;
		}
		if (e.pointerType === "touch") {
			this.#unsubClickListener();
			this.#unsubClickListener = on(this.#documentObj, "click", this.#handleDismiss, { once: true });
		} else this.#interactOutsideProp.current(event);
	}, 10);
	#markInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = true;
	};
	#markNonInterceptedEvent = (e) => {
		this.#interceptedEvents[e.type] = false;
	};
	#markResponsibleLayer = () => {
		if (!this.opts.ref.current) return;
		this.#isResponsibleLayer = isResponsibleLayer(this.opts.ref.current);
	};
	#isTargetWithinLayer = (target) => {
		if (!this.opts.ref.current) return false;
		return isOrContainsTarget(this.opts.ref.current, target);
	};
	#resetState = debounce(() => {
		for (const eventType in this.#interceptedEvents) this.#interceptedEvents[eventType] = false;
		this.#isResponsibleLayer = false;
	}, 20);
	#isAnyEventIntercepted() {
		return Object.values(this.#interceptedEvents).some(Boolean);
	}
	#onfocuscapture = () => {
		this.#isFocusInsideDOMTree = true;
	};
	#onblurcapture = () => {
		this.#isFocusInsideDOMTree = false;
	};
	props = {
		onfocuscapture: this.#onfocuscapture,
		onblurcapture: this.#onblurcapture
	};
};
function getTopMostDismissableLayer(layersArr = [...globalThis.bitsDismissableLayers]) {
	return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
	const layersArr = [...globalThis.bitsDismissableLayers];
	/**
	* We first check if we can find a top layer with `close` or `ignore`.
	* If that top layer was found and matches the provided node, then the node is
	* responsible for the outside interaction. Otherwise, we know that all layers defer so
	* the first layer is the responsible one.
	*/
	const topMostLayer = getTopMostDismissableLayer(layersArr);
	if (topMostLayer) return topMostLayer[0].opts.ref.current === node;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode.opts.ref.current === node;
}
function isValidEvent(e, node) {
	const target = e.target;
	if (!isElementOrSVGElement(target)) return false;
	const targetIsContextMenuTrigger = Boolean(target.closest(`[${CONTEXT_MENU_TRIGGER_ATTR}]`));
	const nodeIsContextMenu = Boolean(node.closest(`[${CONTEXT_MENU_CONTENT_ATTR}]`));
	if ("button" in e && e.button > 0 && !targetIsContextMenuTrigger) return false;
	if ("button" in e && e.button === 0 && targetIsContextMenuTrigger && nodeIsContextMenu) return true;
	if (targetIsContextMenuTrigger && nodeIsContextMenu) return false;
	return getOwnerDocument(target).documentElement.contains(target) && !isOrContainsTarget(node, target) && isClickTrulyOutside(e, node);
}
function createWrappedEvent(e) {
	const capturedCurrentTarget = e.currentTarget;
	const capturedTarget = e.target;
	let newEvent;
	if (e instanceof PointerEvent) newEvent = new PointerEvent(e.type, e);
	else newEvent = new PointerEvent("pointerdown", e);
	let isPrevented = false;
	return new Proxy(newEvent, { get: (target, prop) => {
		if (prop === "currentTarget") return capturedCurrentTarget;
		if (prop === "target") return capturedTarget;
		if (prop === "preventDefault") return () => {
			isPrevented = true;
			if (typeof target.preventDefault === "function") target.preventDefault();
		};
		if (prop === "defaultPrevented") return isPrevented;
		if (prop in target) return target[prop];
		return e[prop];
	} });
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function Dismissible_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { interactOutsideBehavior = "close", onInteractOutside = noop, onFocusOutside = noop, id, children, enabled, isValidEvent = () => false, ref } = $$props;
		const dismissibleLayerState = DismissibleLayerState.create({
			id: boxWith(() => id),
			interactOutsideBehavior: boxWith(() => interactOutsideBehavior),
			onInteractOutside: boxWith(() => onInteractOutside),
			enabled: boxWith(() => enabled),
			onFocusOutside: boxWith(() => onFocusOutside),
			isValidEvent: boxWith(() => isValidEvent),
			ref
		});
		children?.($$renderer, { props: dismissibleLayerState.props });
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var EscapeLayerState = class EscapeLayerState {
	static create(opts) {
		return new EscapeLayerState(opts);
	}
	opts;
	domContext;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(this.opts.ref);
		let unsubEvents = noop;
		watch(() => opts.enabled.current, (enabled) => {
			if (enabled) {
				globalThis.bitsEscapeLayers.set(this, opts.escapeKeydownBehavior);
				unsubEvents = this.#addEventListener();
			}
			return () => {
				unsubEvents();
				globalThis.bitsEscapeLayers.delete(this);
			};
		});
	}
	#addEventListener = () => {
		return on(this.domContext.getDocument(), "keydown", this.#onkeydown, { passive: false });
	};
	#onkeydown = (e) => {
		if (e.key !== "Escape" || !isResponsibleEscapeLayer(this)) return;
		const clonedEvent = new KeyboardEvent(e.type, e);
		e.preventDefault();
		const behaviorType = this.opts.escapeKeydownBehavior.current;
		if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
		this.opts.onEscapeKeydown.current(clonedEvent);
	};
};
function isResponsibleEscapeLayer(instance) {
	const layersArr = [...globalThis.bitsEscapeLayers];
	/**
	* We first check if we can find a top layer with `close` or `ignore`.
	* If that top layer was found and matches the provided node, then the node is
	* responsible for the escape. Otherwise, we know that all layers defer so
	* the first layer is the responsible one.
	*/
	const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
	if (topMostLayer) return topMostLayer[0] === instance;
	const [firstLayerNode] = layersArr[0];
	return firstLayerNode === instance;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function Escape_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { escapeKeydownBehavior = "close", onEscapeKeydown = noop, children, enabled, ref } = $$props;
		EscapeLayerState.create({
			escapeKeydownBehavior: boxWith(() => escapeKeydownBehavior),
			onEscapeKeydown: boxWith(() => onEscapeKeydown),
			enabled: boxWith(() => enabled),
			ref
		});
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var FocusScopeManager = class FocusScopeManager {
	static instance;
	#scopeStack = simpleBox([]);
	#focusHistory = /* @__PURE__ */ new WeakMap();
	#preFocusHistory = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		if (!this.instance) this.instance = new FocusScopeManager();
		return this.instance;
	}
	register(scope) {
		const current = this.getActive();
		if (current && current !== scope) current.pause();
		const activeElement = document.activeElement;
		if (activeElement && activeElement !== document.body) this.#preFocusHistory.set(scope, activeElement);
		this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
		this.#scopeStack.current.unshift(scope);
	}
	unregister(scope) {
		this.#scopeStack.current = this.#scopeStack.current.filter((s) => s !== scope);
		const next = this.getActive();
		if (next) next.resume();
	}
	getActive() {
		return this.#scopeStack.current[0];
	}
	setFocusMemory(scope, element) {
		this.#focusHistory.set(scope, element);
	}
	getFocusMemory(scope) {
		return this.#focusHistory.get(scope);
	}
	isActiveScope(scope) {
		return this.getActive() === scope;
	}
	setPreFocusMemory(scope, element) {
		this.#preFocusHistory.set(scope, element);
	}
	getPreFocusMemory(scope) {
		return this.#preFocusHistory.get(scope);
	}
	clearPreFocusMemory(scope) {
		this.#preFocusHistory.delete(scope);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte.js
var FocusScope = class FocusScope {
	#paused = false;
	#container = null;
	#manager = FocusScopeManager.getInstance();
	#cleanupFns = [];
	#opts;
	constructor(opts) {
		this.#opts = opts;
	}
	get paused() {
		return this.#paused;
	}
	pause() {
		this.#paused = true;
	}
	resume() {
		this.#paused = false;
	}
	#cleanup() {
		for (const fn of this.#cleanupFns) fn();
		this.#cleanupFns = [];
	}
	mount(container) {
		if (this.#container) this.unmount();
		this.#container = container;
		this.#manager.register(this);
		this.#setupEventListeners();
		this.#handleOpenAutoFocus();
	}
	unmount() {
		if (!this.#container) return;
		this.#cleanup();
		this.#handleCloseAutoFocus();
		this.#manager.unregister(this);
		this.#manager.clearPreFocusMemory(this);
		this.#container = null;
	}
	#handleOpenAutoFocus() {
		if (!this.#container) return;
		const event = new CustomEvent("focusScope.onOpenAutoFocus", {
			bubbles: false,
			cancelable: true
		});
		this.#opts.onOpenAutoFocus.current(event);
		if (!event.defaultPrevented) requestAnimationFrame(() => {
			if (!this.#container) return;
			const firstTabbable = this.#getFirstTabbable();
			if (firstTabbable) {
				firstTabbable.focus();
				this.#manager.setFocusMemory(this, firstTabbable);
			} else this.#container.focus();
		});
	}
	#handleCloseAutoFocus() {
		const event = new CustomEvent("focusScope.onCloseAutoFocus", {
			bubbles: false,
			cancelable: true
		});
		this.#opts.onCloseAutoFocus.current?.(event);
		if (!event.defaultPrevented) {
			const preFocusedElement = this.#manager.getPreFocusMemory(this);
			if (preFocusedElement && document.contains(preFocusedElement)) try {
				preFocusedElement.focus();
			} catch {
				document.body.focus();
			}
		}
	}
	#setupEventListeners() {
		if (!this.#container || !this.#opts.trap.current) return;
		const container = this.#container;
		const doc = container.ownerDocument;
		const handleFocus = (e) => {
			if (this.#paused || !this.#manager.isActiveScope(this)) return;
			const target = e.target;
			if (!target) return;
			if (container.contains(target)) this.#manager.setFocusMemory(this, target);
			else {
				const lastFocused = this.#manager.getFocusMemory(this);
				if (lastFocused && container.contains(lastFocused) && isFocusable(lastFocused)) {
					e.preventDefault();
					lastFocused.focus();
				} else {
					const firstTabbable = this.#getFirstTabbable();
					const firstFocusable = this.#getAllFocusables()[0];
					(firstTabbable || firstFocusable || container).focus();
				}
			}
		};
		const handleKeydown = (e) => {
			if (!this.#opts.loop || this.#paused || e.key !== "Tab") return;
			if (!this.#manager.isActiveScope(this)) return;
			const tabbables = this.#getTabbables();
			if (tabbables.length === 0) return;
			const first = tabbables[0];
			const last = tabbables[tabbables.length - 1];
			if (!e.shiftKey && doc.activeElement === last) {
				e.preventDefault();
				first.focus();
			} else if (e.shiftKey && doc.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		};
		this.#cleanupFns.push(on(doc, "focusin", handleFocus, { capture: true }), on(container, "keydown", handleKeydown));
		const observer = new MutationObserver(() => {
			const lastFocused = this.#manager.getFocusMemory(this);
			if (lastFocused && !container.contains(lastFocused)) {
				const firstTabbable = this.#getFirstTabbable();
				const firstFocusable = this.#getAllFocusables()[0];
				const elementToFocus = firstTabbable || firstFocusable;
				if (elementToFocus) {
					elementToFocus.focus();
					this.#manager.setFocusMemory(this, elementToFocus);
				} else container.focus();
			}
		});
		observer.observe(container, {
			childList: true,
			subtree: true
		});
		this.#cleanupFns.push(() => observer.disconnect());
	}
	#getTabbables() {
		if (!this.#container) return [];
		return tabbable(this.#container, {
			includeContainer: false,
			getShadowRoot: true
		});
	}
	#getFirstTabbable() {
		return this.#getTabbables()[0] || null;
	}
	#getAllFocusables() {
		if (!this.#container) return [];
		return focusable(this.#container, {
			includeContainer: false,
			getShadowRoot: true
		});
	}
	static use(opts) {
		let scope = null;
		watch([() => opts.ref.current, () => opts.enabled.current], ([ref, enabled]) => {
			if (ref && enabled) {
				if (!scope) scope = new FocusScope(opts);
				scope.mount(ref);
			} else if (scope) {
				scope.unmount();
				scope = null;
			}
		});
		return { get props() {
			return { tabindex: -1 };
		} };
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function Focus_scope($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { enabled = false, trapFocus = false, loop = false, onCloseAutoFocus = noop, onOpenAutoFocus = noop, focusScope, ref } = $$props;
		const focusScopeState = FocusScope.use({
			enabled: boxWith(() => enabled),
			trap: boxWith(() => trapFocus),
			loop,
			onCloseAutoFocus: boxWith(() => onCloseAutoFocus),
			onOpenAutoFocus: boxWith(() => onOpenAutoFocus),
			ref
		});
		focusScope?.($$renderer, { props: focusScopeState.props });
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var noopPointer = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var TextSelectionLayerState = class TextSelectionLayerState {
	static create(opts) {
		return new TextSelectionLayerState(opts);
	}
	opts;
	domContext;
	#unsubSelectionLock = noop;
	#enabledSnapshot = false;
	#onPointerDownSnapshot = noopPointer;
	#onPointerUpSnapshot = noopPointer;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(opts.ref);
		let unsubEvents = noop;
		watch(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([enabled, onPointerDown, onPointerUp]) => {
			this.#enabledSnapshot = enabled;
			this.#onPointerDownSnapshot = onPointerDown;
			this.#onPointerUpSnapshot = onPointerUp;
			if (enabled) {
				globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
				unsubEvents();
				unsubEvents = this.#addEventListeners();
			}
			return () => {
				this.#enabledSnapshot = false;
				unsubEvents();
				this.#resetSelectionLock();
				globalThis.bitsTextSelectionLayers.delete(this);
			};
		});
	}
	#addEventListeners() {
		return executeCallbacks(on(this.domContext.getDocument(), "pointerdown", this.#pointerdown), on(this.domContext.getDocument(), "pointerup", composeHandlers(this.#resetSelectionLock, this.#pointerupUserHandler)));
	}
	#pointerupUserHandler = (e) => {
		this.#onPointerUpSnapshot(e);
	};
	#pointerdown = (e) => {
		const node = this.opts.ref.current;
		const target = e.target;
		if (!isHTMLElement$1(node) || !isHTMLElement$1(target) || !this.#enabledSnapshot) return;
		/**
		* We only lock user-selection overflow if layer is the top most layer and
		* pointerdown occurred inside the node. You are still allowed to select text
		* outside the node provided pointerdown occurs outside the node.
		*/
		if (!isHighestLayer(this) || !contains(node, target)) return;
		this.#onPointerDownSnapshot(e);
		if (e.defaultPrevented) return;
		this.#unsubSelectionLock = preventTextSelectionOverflow(node, this.domContext.getDocument().body);
	};
	#resetSelectionLock = () => {
		this.#unsubSelectionLock();
		this.#unsubSelectionLock = noop;
	};
};
var getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node, body) {
	const originalBodyUserSelect = getUserSelect(body);
	const originalNodeUserSelect = getUserSelect(node);
	setUserSelect(body, "none");
	setUserSelect(node, "text");
	return () => {
		setUserSelect(body, originalBodyUserSelect);
		setUserSelect(node, originalNodeUserSelect);
	};
}
function setUserSelect(node, value) {
	node.style.userSelect = value;
	node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
	const layersArr = [...globalThis.bitsTextSelectionLayers];
	if (!layersArr.length) return false;
	const highestLayer = layersArr.at(-1);
	if (!highestLayer) return false;
	return highestLayer[0] === instance;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function Text_selection_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { preventOverflowTextSelection = true, onPointerDown = noop, onPointerUp = noop, id, children, enabled, ref } = $$props;
		TextSelectionLayerState.create({
			id: boxWith(() => id),
			onPointerDown: boxWith(() => onPointerDown),
			onPointerUp: boxWith(() => onPointerUp),
			enabled: boxWith(() => enabled && preventOverflowTextSelection),
			ref
		});
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
/**
* Generates a unique ID based on a global counter.
*/
function useId(prefix = "bits") {
	globalThis.bitsIdCounter.current++;
	return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/shared-state.svelte.js
var SharedState = class {
	#factory;
	#subscribers = 0;
	#state;
	#scope;
	constructor(factory) {
		this.#factory = factory;
	}
	#dispose() {
		this.#subscribers -= 1;
		if (this.#scope && this.#subscribers <= 0) {
			this.#scope();
			this.#state = void 0;
			this.#scope = void 0;
		}
	}
	get(...args) {
		this.#subscribers += 1;
		if (this.#state === void 0) this.#scope = () => {};
		return this.#state;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/body-scroll-lock.svelte.js
var lockMap = new SvelteMap();
var initialBodyStyle = null;
var cleanupTimeoutId = null;
var isInCleanupTransition = false;
var anyLocked = boxWith(() => {
	for (const value of lockMap.values()) if (value) return true;
	return false;
});
/**
* We track the time we scheduled the cleanup to prevent race conditions
* when multiple locks are created/destroyed in the same tick, ensuring
* only the last one to schedule the cleanup will run.
*
* reference: https://github.com/huntabyte/bits-ui/issues/1639
*/
var cleanupScheduledAt = null;
var bodyLockStackCount = new SharedState(() => {
	function resetBodyStyle() {}
	function cancelPendingCleanup() {
		if (cleanupTimeoutId === null) return;
		window.clearTimeout(cleanupTimeoutId);
		cleanupTimeoutId = null;
	}
	function scheduleCleanupIfNoNewLocks(delay, callback) {
		cancelPendingCleanup();
		isInCleanupTransition = true;
		cleanupScheduledAt = Date.now();
		const currentCleanupId = cleanupScheduledAt;
		/**
		* We schedule the cleanup to run after a delay to allow new locks to register
		* that might have been added in the same tick as the current cleanup.
		*
		* If a new lock is added in the same tick, the cleanup will be cancelled and
		* a new cleanup will be scheduled.
		*
		* This is to prevent the cleanup from running too early and resetting the body
		* style before the new lock has had a chance to apply its styles.
		*/
		const cleanupFn = () => {
			cleanupTimeoutId = null;
			if (cleanupScheduledAt !== currentCleanupId) return;
			if (!isAnyLocked(lockMap)) {
				isInCleanupTransition = false;
				callback();
			} else isInCleanupTransition = false;
		};
		const actualDelay = delay === null ? 24 : delay;
		cleanupTimeoutId = window.setTimeout(cleanupFn, actualDelay);
	}
	function ensureInitialStyleCaptured() {
		if (initialBodyStyle === null && lockMap.size === 0 && !isInCleanupTransition) initialBodyStyle = document.body.getAttribute("style");
	}
	watch(() => anyLocked.current, () => {
		if (!anyLocked.current) return;
		ensureInitialStyleCaptured();
		isInCleanupTransition = false;
		const htmlStyle = getComputedStyle(document.documentElement);
		const bodyStyle = getComputedStyle(document.body);
		const hasStableGutter = htmlStyle.scrollbarGutter?.includes("stable") || bodyStyle.scrollbarGutter?.includes("stable");
		const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const config = {
			padding: Number.parseInt(bodyStyle.paddingRight ?? "0", 10) + verticalScrollbarWidth,
			margin: Number.parseInt(bodyStyle.marginRight ?? "0", 10)
		};
		if (verticalScrollbarWidth > 0 && !hasStableGutter) {
			document.body.style.paddingRight = `${config.padding}px`;
			document.body.style.marginRight = `${config.margin}px`;
			document.body.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
		}
		document.body.style.overflow = "hidden";
		if (isIOS) on(document, "touchmove", (e) => {
			if (e.target !== document.documentElement) return;
			if (e.touches.length > 1) return;
			e.preventDefault();
		}, { passive: false });
		/**
		* We ensure pointer-events: none is applied _after_ DOM updates, so that any focus/
		* interaction changes from opening overlays/menus complete _before_ we block pointer
		* events.
		*
		* this avoids race conditions where pointer-events could be set too early and break
		* focus/interaction.
		*/
		afterTick(() => {
			document.body.style.pointerEvents = "none";
			document.body.style.overflow = "hidden";
		});
	});
	return {
		get lockMap() {
			return lockMap;
		},
		resetBodyStyle,
		scheduleCleanupIfNoNewLocks,
		cancelPendingCleanup,
		ensureInitialStyleCaptured
	};
});
var BodyScrollLock = class {
	#id = useId();
	#initialState;
	#restoreScrollDelay = () => null;
	#countState;
	locked;
	constructor(initialState, restoreScrollDelay = () => null) {
		this.#initialState = initialState;
		this.#restoreScrollDelay = restoreScrollDelay;
		this.#countState = bodyLockStackCount.get();
		if (!this.#countState) return;
		/**
		* Since a new lock is being created, we cancel any pending cleanup to
		* prevent the cleanup from running too early and resetting the body style
		* before the new lock has had a chance to apply its styles.
		*
		* reference: https://github.com/huntabyte/bits-ui/issues/1639
		*/
		this.#countState.cancelPendingCleanup();
		this.#countState.ensureInitialStyleCaptured();
		this.#countState.lockMap.set(this.#id, this.#initialState ?? false);
		this.locked = boxWith(() => this.#countState.lockMap.get(this.#id) ?? false, (v) => this.#countState.lockMap.set(this.#id, v));
	}
};
function isAnyLocked(map) {
	for (const [_, value] of map) if (value) return true;
	return false;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function Scroll_lock($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { preventScroll = true, restoreScrollDelay = null } = $$props;
		if (preventScroll) new BodyScrollLock(preventScroll, () => restoreScrollDelay);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
function Dialog_overlay$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), forceMount = false, child, children, ref = null, $$slots, $$events, ...restProps } = $$props;
		const overlayState = DialogOverlayState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, overlayState.props));
		if (overlayState.shouldRender || forceMount) {
			$$renderer.push("<!--[0-->");
			if (child) {
				$$renderer.push("<!--[0-->");
				child($$renderer, {
					props: mergeProps(mergedProps()),
					...overlayState.snippetProps
				});
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div${attributes({ ...mergeProps(mergedProps()) })}>`);
				children?.($$renderer, overlayState.snippetProps);
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/components/dialog-trigger.svelte
function Dialog_trigger$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, disabled = false, $$slots, $$events, ...restProps } = $$props;
		const triggerState = DialogTriggerState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			disabled: boxWith(() => Boolean(disabled))
		});
		const mergedProps = derived(() => mergeProps(restProps, triggerState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
function Dialog_description$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), children, child, ref = null, $$slots, $$events, ...restProps } = $$props;
		const descriptionState = DialogDescriptionState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, descriptionState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide$1(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide$1(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide$1(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide$1(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) ? await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	} : {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$1 = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(min$1, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide$1(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide$1(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
var originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide$1(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide$1(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min = mainAxisCoord + overflow[minSide];
				const max = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min, mainAxisCoord, max);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min = crossAxisCoord + overflow[minSide];
				const max = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min, crossAxisCoord, max);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...rawOffset
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide$1(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			var _state$middlewareData, _state$middlewareData2;
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide$1(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const noShift = !state.middlewareData.shift;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) availableWidth = maximumClippingWidth;
			if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				const xMin = max(overflow.left, 0);
				const xMax = max(overflow.right, 0);
				const yMin = max(overflow.top, 0);
				const yMax = max(overflow.bottom, 0);
				if (isYAxis) availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
				else availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return node.ownerDocument ? node.ownerDocument.body : node.body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region ../../node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) return false;
	return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow(domElement);
		const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit();
		if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	const windowScrollbarX = getWindowScrollBarX(html);
	if (windowScrollbarX <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) width -= clippingStableScrollbarWidth;
	} else if (windowScrollbarX <= SCROLLBAR_MAX) width += windowScrollbarX;
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport") rect = getViewportRect(element, strategy);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) return false;
	return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") currentContainingBlockComputedStyle = null;
		if (elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode)) result = result.filter((ancestor) => ancestor !== currentNode);
		else currentContainingBlockComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	function setLeftRTLScrollbarOffset() {
		offsets.x = getWindowScrollBarX(documentElement);
	}
	if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) setLeftRTLScrollbarOffset();
	}
	if (isFixed && !isOffsetParentAnElement && documentElement) setLeftRTLScrollbarOffset();
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) refresh();
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	refresh(true);
	return cleanup;
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update, { passive: true });
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = offset$1;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = shift$1;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = flip$1;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = size$1;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide = hide$1;
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow = arrow$1;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = limitShift$1;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/floating-svelte/floating-utils.svelte.js
function get(valueOrGetValue) {
	return typeof valueOrGetValue === "function" ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function getFloatingContentCSSVars(name) {
	return {
		[`--bits-${name}-content-transform-origin`]: `var(--bits-floating-transform-origin)`,
		[`--bits-${name}-content-available-width`]: `var(--bits-floating-available-width)`,
		[`--bits-${name}-content-available-height`]: `var(--bits-floating-available-height)`,
		[`--bits-${name}-anchor-width`]: `var(--bits-floating-anchor-width)`,
		[`--bits-${name}-anchor-height`]: `var(--bits-floating-anchor-height)`
	};
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/floating-svelte/use-floating.svelte.js
function useFloating(options) {
	options.whileElementsMounted;
	const openOption = derived(() => get(options.open) ?? true);
	const middlewareOption = derived(() => get(options.middleware));
	const transformOption = derived(() => get(options.transform) ?? true);
	const placementOption = derived(() => get(options.placement) ?? "bottom");
	const strategyOption = derived(() => get(options.strategy) ?? "absolute");
	const sideOffsetOption = derived(() => get(options.sideOffset) ?? 0);
	const alignOffsetOption = derived(() => get(options.alignOffset) ?? 0);
	const reference = options.reference;
	/** State */
	let x = 0;
	let y = 0;
	const floating = simpleBox(null);
	let strategy = strategyOption();
	let placement = placementOption();
	let middlewareData = {};
	let isPositioned = false;
	let updateRequestId = 0;
	const floatingStyles = derived(() => {
		const xVal = floating.current ? roundByDPR(floating.current, x) : x;
		const yVal = floating.current ? roundByDPR(floating.current, y) : y;
		if (transformOption()) return {
			position: strategy,
			left: "0",
			top: "0",
			transform: `translate(${xVal}px, ${yVal}px)`,
			...floating.current && getDPR(floating.current) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy,
			left: `${xVal}px`,
			top: `${yVal}px`
		};
	});
	function update() {
		if (reference.current === null || floating.current === null) return;
		const referenceNode = reference.current;
		const floatingNode = floating.current;
		const requestId = ++updateRequestId;
		computePosition(referenceNode, floatingNode, {
			middleware: middlewareOption(),
			placement: placementOption(),
			strategy: strategyOption()
		}).then((position) => {
			if (requestId !== updateRequestId) return;
			if (reference.current !== referenceNode || floating.current !== floatingNode) return;
			if (isReferenceHidden(referenceNode)) {
				middlewareData = {
					...middlewareData,
					hide: {
						...middlewareData.hide,
						referenceHidden: true
					}
				};
				return;
			}
			if (!openOption() && x !== 0 && y !== 0) {
				const maxExpectedOffset = Math.max(Math.abs(sideOffsetOption()), Math.abs(alignOffsetOption()), 15);
				if (position.x <= maxExpectedOffset && position.y <= maxExpectedOffset) return;
			}
			x = position.x;
			y = position.y;
			strategy = position.strategy;
			placement = position.placement;
			middlewareData = position.middlewareData;
			isPositioned = true;
		});
	}
	return {
		floating,
		reference,
		get strategy() {
			return strategy;
		},
		get placement() {
			return placement;
		},
		get middlewareData() {
			return middlewareData;
		},
		get isPositioned() {
			return isPositioned;
		},
		get floatingStyles() {
			return floatingStyles();
		},
		get update() {
			return update;
		}
	};
}
function isReferenceHidden(node) {
	if (!(node instanceof Element)) return false;
	if (!node.isConnected) return true;
	if (node instanceof HTMLElement && node.hidden) return true;
	return node.getClientRects().length === 0;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/floating-layer/use-floating-layer.svelte.js
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var FloatingRootContext = new Context("Floating.Root");
var FloatingContentContext = new Context("Floating.Content");
var FloatingTooltipRootContext = new Context("Floating.Root");
var FloatingRootState = class FloatingRootState {
	static create(tooltip = false) {
		return tooltip ? FloatingTooltipRootContext.set(new FloatingRootState()) : FloatingRootContext.set(new FloatingRootState());
	}
	anchorNode = simpleBox(null);
	customAnchorNode = simpleBox(null);
	triggerNode = simpleBox(null);
	constructor() {}
};
var FloatingContentState = class FloatingContentState {
	static create(opts, tooltip = false) {
		return tooltip ? FloatingContentContext.set(new FloatingContentState(opts, FloatingTooltipRootContext.get())) : FloatingContentContext.set(new FloatingContentState(opts, FloatingRootContext.get()));
	}
	opts;
	root;
	contentRef = simpleBox(null);
	wrapperRef = simpleBox(null);
	arrowRef = simpleBox(null);
	contentAttachment = attachRef(this.contentRef);
	wrapperAttachment = attachRef(this.wrapperRef);
	arrowAttachment = attachRef(this.arrowRef);
	arrowId = simpleBox(useId());
	#transformedStyle = derived(() => {
		if (typeof this.opts.style === "string") return cssToStyleObj(this.opts.style);
		if (!this.opts.style) return {};
	});
	#updatePositionStrategy = void 0;
	#arrowSize = new ElementSize(() => this.arrowRef.current ?? void 0);
	#arrowWidth = derived(() => this.#arrowSize?.width ?? 0);
	#arrowHeight = derived(() => this.#arrowSize?.height ?? 0);
	#desiredPlacement = derived(() => this.opts.side?.current + (this.opts.align.current !== "center" ? `-${this.opts.align.current}` : ""));
	#boundary = derived(() => Array.isArray(this.opts.collisionBoundary.current) ? this.opts.collisionBoundary.current : [this.opts.collisionBoundary.current]);
	#hasExplicitBoundaries = derived(() => this.#boundary().length > 0);
	get hasExplicitBoundaries() {
		return this.#hasExplicitBoundaries();
	}
	set hasExplicitBoundaries($$value) {
		return this.#hasExplicitBoundaries($$value);
	}
	#detectOverflowOptions = derived(() => ({
		padding: this.opts.collisionPadding.current,
		boundary: this.#boundary().filter(isNotNull),
		altBoundary: this.hasExplicitBoundaries
	}));
	get detectOverflowOptions() {
		return this.#detectOverflowOptions();
	}
	set detectOverflowOptions($$value) {
		return this.#detectOverflowOptions($$value);
	}
	#availableWidth = void 0;
	#availableHeight = void 0;
	#anchorWidth = void 0;
	#anchorHeight = void 0;
	#middleware = derived(() => [
		offset({
			mainAxis: this.opts.sideOffset.current + this.#arrowHeight(),
			alignmentAxis: this.opts.alignOffset.current
		}),
		this.opts.avoidCollisions.current && shift({
			mainAxis: true,
			crossAxis: false,
			limiter: this.opts.sticky.current === "partial" ? limitShift() : void 0,
			...this.detectOverflowOptions
		}),
		this.opts.avoidCollisions.current && flip({ ...this.detectOverflowOptions }),
		size({
			...this.detectOverflowOptions,
			apply: ({ rects, availableWidth, availableHeight }) => {
				const { width: anchorWidth, height: anchorHeight } = rects.reference;
				this.#availableWidth = availableWidth;
				this.#availableHeight = availableHeight;
				this.#anchorWidth = anchorWidth;
				this.#anchorHeight = anchorHeight;
			}
		}),
		this.arrowRef.current && arrow({
			element: this.arrowRef.current,
			padding: this.opts.arrowPadding.current
		}),
		transformOrigin({
			arrowWidth: this.#arrowWidth(),
			arrowHeight: this.#arrowHeight()
		}),
		this.opts.hideWhenDetached.current && hide({
			strategy: "referenceHidden",
			...this.detectOverflowOptions
		})
	].filter(Boolean));
	get middleware() {
		return this.#middleware();
	}
	set middleware($$value) {
		return this.#middleware($$value);
	}
	floating;
	#placedSide = derived(() => getSideFromPlacement(this.floating.placement));
	get placedSide() {
		return this.#placedSide();
	}
	set placedSide($$value) {
		return this.#placedSide($$value);
	}
	#placedAlign = derived(() => getAlignFromPlacement(this.floating.placement));
	get placedAlign() {
		return this.#placedAlign();
	}
	set placedAlign($$value) {
		return this.#placedAlign($$value);
	}
	#arrowX = derived(() => this.floating.middlewareData.arrow?.x ?? 0);
	get arrowX() {
		return this.#arrowX();
	}
	set arrowX($$value) {
		return this.#arrowX($$value);
	}
	#arrowY = derived(() => this.floating.middlewareData.arrow?.y ?? 0);
	get arrowY() {
		return this.#arrowY();
	}
	set arrowY($$value) {
		return this.#arrowY($$value);
	}
	#cannotCenterArrow = derived(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
	get cannotCenterArrow() {
		return this.#cannotCenterArrow();
	}
	set cannotCenterArrow($$value) {
		return this.#cannotCenterArrow($$value);
	}
	contentZIndex;
	#arrowBaseSide = derived(() => OPPOSITE_SIDE[this.placedSide]);
	get arrowBaseSide() {
		return this.#arrowBaseSide();
	}
	set arrowBaseSide($$value) {
		return this.#arrowBaseSide($$value);
	}
	#wrapperProps = derived(() => ({
		id: this.opts.wrapperId.current,
		"data-bits-floating-content-wrapper": "",
		style: {
			...this.floating.floatingStyles,
			transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: this.contentZIndex,
			"--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
			"--bits-floating-available-width": `${this.#availableWidth}px`,
			"--bits-floating-available-height": `${this.#availableHeight}px`,
			"--bits-floating-anchor-width": `${this.#anchorWidth}px`,
			"--bits-floating-anchor-height": `${this.#anchorHeight}px`,
			...this.floating.middlewareData.hide?.referenceHidden && {
				visibility: "hidden",
				"pointer-events": "none"
			},
			...this.#transformedStyle()
		},
		dir: this.opts.dir.current,
		...this.wrapperAttachment
	}));
	get wrapperProps() {
		return this.#wrapperProps();
	}
	set wrapperProps($$value) {
		return this.#wrapperProps($$value);
	}
	#props = derived(() => ({
		"data-side": this.placedSide,
		"data-align": this.placedAlign,
		style: styleToString({ ...this.#transformedStyle() }),
		...this.contentAttachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	#arrowStyle = derived(() => ({
		position: "absolute",
		left: this.arrowX ? `${this.arrowX}px` : void 0,
		top: this.arrowY ? `${this.arrowY}px` : void 0,
		[this.arrowBaseSide]: 0,
		"transform-origin": {
			top: "",
			right: "0 0",
			bottom: "center 0",
			left: "100% 0"
		}[this.placedSide],
		transform: {
			top: "translateY(100%)",
			right: "translateY(50%) rotate(90deg) translateX(-50%)",
			bottom: "rotate(180deg)",
			left: "translateY(50%) rotate(-90deg) translateX(50%)"
		}[this.placedSide],
		visibility: this.cannotCenterArrow ? "hidden" : void 0
	}));
	get arrowStyle() {
		return this.#arrowStyle();
	}
	set arrowStyle($$value) {
		return this.#arrowStyle($$value);
	}
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.#updatePositionStrategy = opts.updatePositionStrategy;
		if (opts.customAnchor) this.root.customAnchorNode.current = opts.customAnchor.current;
		watch(() => opts.customAnchor.current, (customAnchor) => {
			this.root.customAnchorNode.current = customAnchor;
		});
		this.floating = useFloating({
			strategy: () => this.opts.strategy.current,
			placement: () => this.#desiredPlacement(),
			middleware: () => this.middleware,
			reference: this.root.anchorNode,
			whileElementsMounted: (...args) => {
				return autoUpdate(...args, { animationFrame: this.#updatePositionStrategy?.current === "always" });
			},
			open: () => this.opts.enabled.current,
			sideOffset: () => this.opts.sideOffset.current,
			alignOffset: () => this.opts.alignOffset.current
		});
		watch(() => this.contentRef.current, (contentNode) => {
			if (!contentNode || !this.opts.enabled.current) return;
			const win = getWindow$1(contentNode);
			const rafId = win.requestAnimationFrame(() => {
				if (this.contentRef.current !== contentNode || !this.opts.enabled.current) return;
				const zIndex = win.getComputedStyle(contentNode).zIndex;
				if (zIndex !== this.contentZIndex) this.contentZIndex = zIndex;
			});
			return () => {
				win.cancelAnimationFrame(rafId);
			};
		});
	}
};
var FloatingArrowState = class FloatingArrowState {
	static create(opts) {
		return new FloatingArrowState(opts, FloatingContentContext.get());
	}
	opts;
	content;
	constructor(opts, content) {
		this.opts = opts;
		this.content = content;
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		style: this.content.arrowStyle,
		"data-side": this.content.placedSide,
		...this.content.arrowAttachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var FloatingAnchorState = class FloatingAnchorState {
	static create(opts, tooltip = false) {
		return tooltip ? new FloatingAnchorState(opts, FloatingTooltipRootContext.get()) : new FloatingAnchorState(opts, FloatingRootContext.get());
	}
	opts;
	root;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		if (opts.virtualEl && opts.virtualEl.current) root.triggerNode = boxFrom(opts.virtualEl.current);
		else root.triggerNode = opts.ref;
	}
};
function transformOrigin(options) {
	return {
		name: "transformOrigin",
		options,
		fn(data) {
			const { placement, rects, middlewareData } = data;
			const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
			const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
			const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
			const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
			const noArrowAlign = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[placedAlign];
			const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
			const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
			let x = "";
			let y = "";
			if (placedSide === "bottom") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${-arrowHeight}px`;
			} else if (placedSide === "top") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${rects.floating.height + arrowHeight}px`;
			} else if (placedSide === "right") {
				x = `${-arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			} else if (placedSide === "left") {
				x = `${rects.floating.width + arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			}
			return { data: {
				x,
				y
			} };
		}
	};
}
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
function getSideFromPlacement(placement) {
	return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
	return getSideAndAlignFromPlacement(placement)[1];
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer.svelte
function Floating_layer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, tooltip = false } = $$props;
		FloatingRootState.create(tooltip);
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-anchor.svelte
function Floating_layer_anchor($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id, children, virtualEl, ref, tooltip = false } = $$props;
		FloatingAnchorState.create({
			id: boxWith(() => id),
			virtualEl: boxWith(() => virtualEl),
			ref
		}, tooltip);
		children?.($$renderer);
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content.svelte
function Floating_layer_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { content, side = "bottom", sideOffset = 0, align = "center", alignOffset = 0, id, arrowPadding = 0, avoidCollisions = true, collisionBoundary = [], collisionPadding = 0, hideWhenDetached = false, onPlaced = () => {}, sticky = "partial", updatePositionStrategy = "optimized", strategy = "fixed", dir = "ltr", style = {}, wrapperId = useId(), customAnchor = null, enabled, tooltip = false } = $$props;
		const contentState = FloatingContentState.create({
			side: boxWith(() => side),
			sideOffset: boxWith(() => sideOffset),
			align: boxWith(() => align),
			alignOffset: boxWith(() => alignOffset),
			id: boxWith(() => id),
			arrowPadding: boxWith(() => arrowPadding),
			avoidCollisions: boxWith(() => avoidCollisions),
			collisionBoundary: boxWith(() => collisionBoundary),
			collisionPadding: boxWith(() => collisionPadding),
			hideWhenDetached: boxWith(() => hideWhenDetached),
			onPlaced: boxWith(() => onPlaced),
			sticky: boxWith(() => sticky),
			updatePositionStrategy: boxWith(() => updatePositionStrategy),
			strategy: boxWith(() => strategy),
			dir: boxWith(() => dir),
			style: boxWith(() => style),
			enabled: boxWith(() => enabled),
			wrapperId: boxWith(() => wrapperId),
			customAnchor: boxWith(() => customAnchor)
		}, tooltip);
		const mergedProps = derived(() => mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } }));
		content?.($$renderer, {
			props: contentState.props,
			wrapperProps: mergedProps()
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/floating-layer/components/floating-layer-content-static.svelte
function Floating_layer_content_static($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { content, onPlaced } = $$props;
		content?.($$renderer, {
			props: {},
			wrapperProps: {}
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/separator/separator.svelte.js
var separatorAttrs = createBitsAttrs({
	component: "separator",
	parts: ["root"]
});
var SeparatorRootState = class SeparatorRootState {
	static create(opts) {
		return new SeparatorRootState(opts);
	}
	opts;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: this.opts.decorative.current ? "none" : "separator",
		"aria-orientation": this.opts.orientation.current,
		"aria-hidden": boolToStrTrueOrUndef(this.opts.decorative.current),
		"data-orientation": this.opts.orientation.current,
		[separatorAttrs.root]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/separator/components/separator.svelte
function Separator$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, child, children, decorative = false, orientation = "horizontal", $$slots, $$events, ...restProps } = $$props;
		const rootState = SeparatorRootState.create({
			ref: boxWith(() => ref, (v) => ref = v),
			id: boxWith(() => id),
			decorative: boxWith(() => decorative),
			orientation: boxWith(() => orientation)
		});
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-content.svelte
function Popper_content($$renderer, $$props) {
	let { content, isStatic = false, onPlaced, $$slots, $$events, ...restProps } = $$props;
	if (isStatic) {
		$$renderer.push("<!--[0-->");
		Floating_layer_content_static($$renderer, {
			content,
			onPlaced
		});
	} else {
		$$renderer.push("<!--[-1-->");
		Floating_layer_content($$renderer, spread_props([{
			content,
			onPlaced
		}, restProps]));
	}
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-inner.svelte
function Popper_layer_inner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { popper, onEscapeKeydown, escapeKeydownBehavior, preventOverflowTextSelection, id, onPointerDown, onPointerUp, side, sideOffset, align, alignOffset, arrowPadding, avoidCollisions, collisionBoundary, collisionPadding, sticky, hideWhenDetached, updatePositionStrategy, strategy, dir, preventScroll, wrapperId, style, onPlaced, onInteractOutside, onCloseAutoFocus, onOpenAutoFocus, onFocusOutside, interactOutsideBehavior = "close", loop, trapFocus = true, isValidEvent = () => false, customAnchor = null, isStatic = false, enabled, ref, tooltip = false, contentPointerEvents = "auto", $$slots, $$events, ...restProps } = $$props;
		const resolvedPreventScroll = derived(() => preventScroll ?? true);
		const effectiveStrategy = derived(() => strategy ?? (resolvedPreventScroll() ? "fixed" : "absolute"));
		{
			function content($$renderer, { props: floatingProps, wrapperProps }) {
				if (restProps.forceMount && enabled) {
					$$renderer.push("<!--[0-->");
					Scroll_lock($$renderer, { preventScroll: resolvedPreventScroll() });
				} else if (!restProps.forceMount) {
					$$renderer.push("<!--[1-->");
					Scroll_lock($$renderer, { preventScroll: resolvedPreventScroll() });
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				{
					function focusScope($$renderer, { props: focusScopeProps }) {
						Escape_layer($$renderer, {
							onEscapeKeydown,
							escapeKeydownBehavior,
							enabled,
							ref,
							children: ($$renderer) => {
								{
									function children($$renderer, { props: dismissibleProps }) {
										Text_selection_layer($$renderer, {
											id,
											preventOverflowTextSelection,
											onPointerDown,
											onPointerUp,
											enabled,
											ref,
											children: ($$renderer) => {
												popper?.($$renderer, {
													props: mergeProps(restProps, floatingProps, dismissibleProps, focusScopeProps, { style: { pointerEvents: contentPointerEvents } }),
													wrapperProps
												});
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										});
									}
									Dismissible_layer($$renderer, {
										id,
										onInteractOutside,
										onFocusOutside,
										interactOutsideBehavior,
										isValidEvent,
										enabled,
										ref,
										children,
										$$slots: { default: true }
									});
								}
							},
							$$slots: { default: true }
						});
					}
					Focus_scope($$renderer, {
						onOpenAutoFocus,
						onCloseAutoFocus,
						loop,
						enabled,
						trapFocus,
						forceMount: restProps.forceMount,
						ref,
						focusScope,
						$$slots: { focusScope: true }
					});
				}
				$$renderer.push(`<!---->`);
			}
			Popper_content($$renderer, {
				isStatic,
				id,
				side,
				sideOffset,
				align,
				alignOffset,
				arrowPadding,
				avoidCollisions,
				collisionBoundary,
				collisionPadding,
				sticky,
				hideWhenDetached,
				updatePositionStrategy,
				strategy: effectiveStrategy(),
				dir,
				wrapperId,
				style,
				onPlaced,
				customAnchor,
				enabled,
				tooltip,
				content,
				$$slots: { content: true }
			});
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer.svelte
function Popper_layer($$renderer, $$props) {
	let { popper, open, onEscapeKeydown, escapeKeydownBehavior, preventOverflowTextSelection, id, onPointerDown, onPointerUp, side, sideOffset, align, alignOffset, arrowPadding, avoidCollisions, collisionBoundary, collisionPadding, sticky, hideWhenDetached, updatePositionStrategy, strategy, dir, preventScroll, wrapperId, style, onPlaced, onInteractOutside, onCloseAutoFocus, onOpenAutoFocus, onFocusOutside, interactOutsideBehavior = "close", loop, trapFocus = true, isValidEvent = () => false, customAnchor = null, isStatic = false, ref, shouldRender, $$slots, $$events, ...restProps } = $$props;
	if (shouldRender) {
		$$renderer.push("<!--[0-->");
		Popper_layer_inner($$renderer, spread_props([{
			popper,
			onEscapeKeydown,
			escapeKeydownBehavior,
			preventOverflowTextSelection,
			id,
			onPointerDown,
			onPointerUp,
			side,
			sideOffset,
			align,
			alignOffset,
			arrowPadding,
			avoidCollisions,
			collisionBoundary,
			collisionPadding,
			sticky,
			hideWhenDetached,
			updatePositionStrategy,
			strategy,
			dir,
			preventScroll,
			wrapperId,
			style,
			onPlaced,
			customAnchor,
			isStatic,
			enabled: open,
			onInteractOutside,
			onCloseAutoFocus,
			onOpenAutoFocus,
			interactOutsideBehavior,
			loop,
			trapFocus,
			isValidEvent,
			onFocusOutside,
			forceMount: false,
			ref
		}, restProps]));
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/utilities/popper-layer/popper-layer-force-mount.svelte
function Popper_layer_force_mount($$renderer, $$props) {
	let { popper, onEscapeKeydown, escapeKeydownBehavior, preventOverflowTextSelection, id, onPointerDown, onPointerUp, side, sideOffset, align, alignOffset, arrowPadding, avoidCollisions, collisionBoundary, collisionPadding, sticky, hideWhenDetached, updatePositionStrategy, strategy, dir, preventScroll, wrapperId, style, onPlaced, onInteractOutside, onCloseAutoFocus, onOpenAutoFocus, onFocusOutside, interactOutsideBehavior = "close", loop, trapFocus = true, isValidEvent = () => false, customAnchor = null, isStatic = false, enabled, $$slots, $$events, ...restProps } = $$props;
	Popper_layer_inner($$renderer, spread_props([
		{
			popper,
			onEscapeKeydown,
			escapeKeydownBehavior,
			preventOverflowTextSelection,
			id,
			onPointerDown,
			onPointerUp,
			side,
			sideOffset,
			align,
			alignOffset,
			arrowPadding,
			avoidCollisions,
			collisionBoundary,
			collisionPadding,
			sticky,
			hideWhenDetached,
			updatePositionStrategy,
			strategy,
			dir,
			preventScroll,
			wrapperId,
			style,
			onPlaced,
			customAnchor,
			isStatic,
			enabled,
			onInteractOutside,
			onCloseAutoFocus,
			onOpenAutoFocus,
			interactOutsideBehavior,
			loop,
			trapFocus,
			isValidEvent,
			onFocusOutside
		},
		restProps,
		{ forceMount: true }
	]));
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/utils.js
function findNextSibling(el, selector) {
	let sibling = el.nextElementSibling;
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling;
	}
}
function findPreviousSibling(el, selector) {
	let sibling = el.previousElementSibling;
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.previousElementSibling;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/css-escape.js
/**
* https://github.com/mathiasbynens/CSS.escape
*
* @param value - The value to escape for use as a CSS identifier
* @returns The escaped CSS identifier string
*/
function cssEscape(value) {
	if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
	const length = value.length;
	let index = -1;
	let codeUnit;
	let result = "";
	const firstCodeUnit = value.charCodeAt(0);
	if (length === 1 && firstCodeUnit === 45) return "\\" + value;
	while (++index < length) {
		codeUnit = value.charCodeAt(index);
		if (codeUnit === 0) {
			result += "�";
			continue;
		}
		if (codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || index === 0 && codeUnit >= 48 && codeUnit <= 57 || index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45) {
			result += "\\" + codeUnit.toString(16) + " ";
			continue;
		}
		if (codeUnit >= 128 || codeUnit === 45 || codeUnit === 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
			result += value.charAt(index);
			continue;
		}
		result += "\\" + value.charAt(index);
	}
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/command.svelte.js
var COMMAND_VALUE_ATTR = "data-value";
var commandAttrs = createBitsAttrs({
	component: "command",
	parts: [
		"root",
		"list",
		"input",
		"separator",
		"loading",
		"empty",
		"group",
		"group-items",
		"group-heading",
		"item",
		"viewport",
		"input-label"
	]
});
var COMMAND_GROUP_SELECTOR = commandAttrs.selector("group");
var COMMAND_GROUP_ITEMS_SELECTOR = commandAttrs.selector("group-items");
var COMMAND_GROUP_HEADING_SELECTOR = commandAttrs.selector("group-heading");
var COMMAND_ITEM_SELECTOR = commandAttrs.selector("item");
var COMMAND_VALID_ITEM_SELECTOR = `${commandAttrs.selector("item")}:not([aria-disabled="true"])`;
var CommandRootContext = new Context("Command.Root");
var CommandListContext = new Context("Command.List");
var CommandGroupContainerContext = new Context("Command.Group");
var defaultState = {
	search: "",
	value: "",
	filtered: {
		count: 0,
		items: /* @__PURE__ */ new Map(),
		groups: /* @__PURE__ */ new Set()
	}
};
var CommandRootState = class CommandRootState {
	static create(opts) {
		return CommandRootContext.set(new CommandRootState(opts));
	}
	opts;
	attachment;
	#updateScheduled = false;
	#isInitialMount = true;
	sortAfterTick = false;
	sortAndFilterAfterTick = false;
	allItems = /* @__PURE__ */ new Set();
	allGroups = /* @__PURE__ */ new Map();
	allIds = /* @__PURE__ */ new Map();
	key = 0;
	viewportNode = null;
	inputNode = null;
	labelNode = null;
	commandState = defaultState;
	_commandState = defaultState;
	#snapshot() {
		return snapshot(this._commandState);
	}
	#scheduleUpdate() {
		if (this.#updateScheduled) return;
		this.#updateScheduled = true;
		afterTick(() => {
			this.#updateScheduled = false;
			const currentState = this.#snapshot();
			if (!Object.is(this.commandState, currentState)) {
				this.commandState = currentState;
				this.opts.onStateChange?.current?.(currentState);
			}
		});
	}
	setState(key, value, preventScroll) {
		if (Object.is(this._commandState[key], value)) return;
		this._commandState[key] = value;
		if (key === "search") {
			this.#filterItems();
			this.#sort();
		} else if (key === "value") {
			if (!preventScroll) this.#scrollSelectedIntoView();
		}
		this.#scheduleUpdate();
	}
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
		const defaults = {
			...this._commandState,
			value: this.opts.value.current ?? ""
		};
		this._commandState = defaults;
		this.commandState = defaults;
		this.onkeydown = this.onkeydown.bind(this);
	}
	/**
	* Calculates score for an item based on search text and keywords.
	* Higher score = better match.
	*
	* @param value - Item's display text
	* @param keywords - Optional keywords to boost scoring
	* @returns Score from 0-1, where 0 = no match
	*/
	#score(value, keywords) {
		const filter = this.opts.filter.current ?? computeCommandScore;
		return value ? filter(value, this._commandState.search, keywords) : 0;
	}
	/**
	* Sorts items and groups based on search scores.
	* Groups are sorted by their highest scoring item.
	* When no search active, selects first item.
	*/
	#sort() {
		if (!this._commandState.search || this.opts.shouldFilter.current === false) {
			if (!this._commandState.value || !this.#isInitialMount) this.#selectFirstItem();
			else if (this.#isInitialMount && this._commandState.value) this.#scrollInitialValue();
			return;
		}
		const scores = this._commandState.filtered.items;
		const groups = [];
		for (const value of this._commandState.filtered.groups) {
			const items = this.allGroups.get(value);
			let max = 0;
			if (!items) {
				groups.push([value, max]);
				continue;
			}
			for (const item of items) {
				const score = scores.get(item);
				max = Math.max(score ?? 0, max);
			}
			groups.push([value, max]);
		}
		const listInsertionElement = this.viewportNode;
		const sorted = this.getValidItems().sort((a, b) => {
			const valueA = a.getAttribute("data-value");
			const valueB = b.getAttribute("data-value");
			const scoresA = scores.get(valueA) ?? 0;
			return (scores.get(valueB) ?? 0) - scoresA;
		});
		for (const item of sorted) {
			const group = item.closest(COMMAND_GROUP_ITEMS_SELECTOR);
			if (group) {
				const itemToAppend = item.parentElement === group ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
				if (itemToAppend) group.appendChild(itemToAppend);
			} else {
				const itemToAppend = item.parentElement === listInsertionElement ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
				if (itemToAppend) listInsertionElement?.appendChild(itemToAppend);
			}
		}
		const sortedGroups = groups.sort((a, b) => b[1] - a[1]);
		for (const group of sortedGroups) {
			const element = listInsertionElement?.querySelector(`${COMMAND_GROUP_SELECTOR}[${COMMAND_VALUE_ATTR}="${cssEscape(group[0])}"]`);
			element?.parentElement?.appendChild(element);
		}
		this.#selectFirstItem();
	}
	/**
	* Sets current value and triggers re-render if cleared.
	*
	* @param value - New value to set
	*/
	setValue(value, opts) {
		if (value !== this.opts.value.current && value === "") afterTick(() => {
			this.key++;
		});
		this.setState("value", value, opts);
		this.opts.value.current = value;
	}
	/**
	* Selects first non-disabled item on next tick.
	*/
	#selectFirstItem() {
		afterTick(() => {
			const value = this.getValidItems().find((item) => item.getAttribute("aria-disabled") !== "true")?.getAttribute(COMMAND_VALUE_ATTR);
			const shouldPreventScroll = this.#isInitialMount && this.opts.disableInitialScroll.current;
			this.setValue(value ?? "", shouldPreventScroll);
			this.#isInitialMount = false;
		});
	}
	/**
	* Scrolls the initial value into view if it exists and is not the first item.
	* Called during initial mount when a value is provided.
	*/
	#scrollInitialValue() {
		afterTick(() => {
			if (!this.opts.disableInitialScroll.current) this.#scrollSelectedIntoView();
			this.#isInitialMount = false;
		});
	}
	/**
	* Updates filtered items/groups based on search.
	* Recalculates scores and filtered count.
	*/
	#filterItems() {
		if (!this._commandState.search || this.opts.shouldFilter.current === false) {
			this._commandState.filtered.count = this.allItems.size;
			return;
		}
		this._commandState.filtered.groups = /* @__PURE__ */ new Set();
		let itemCount = 0;
		for (const id of this.allItems) {
			const value = this.allIds.get(id)?.value ?? "";
			const keywords = this.allIds.get(id)?.keywords ?? [];
			const rank = this.#score(value, keywords);
			this._commandState.filtered.items.set(id, rank);
			if (rank > 0) itemCount++;
		}
		for (const [groupId, group] of this.allGroups) for (const itemId of group) {
			const currItem = this._commandState.filtered.items.get(itemId);
			if (currItem && currItem > 0) {
				this._commandState.filtered.groups.add(groupId);
				break;
			}
		}
		this._commandState.filtered.count = itemCount;
	}
	/**
	* Gets all non-disabled, visible command items.
	*
	* @returns Array of valid item elements
	* @remarks Exposed for direct item access and bound checking
	*/
	getValidItems() {
		const node = this.opts.ref.current;
		if (!node) return [];
		return Array.from(node.querySelectorAll(COMMAND_VALID_ITEM_SELECTOR)).filter((el) => !!el);
	}
	/**
	* Gets all visible command items.
	*
	* @returns Array of valid item elements
	* @remarks Exposed for direct item access and bound checking
	*/
	getVisibleItems() {
		const node = this.opts.ref.current;
		if (!node) return [];
		return Array.from(node.querySelectorAll(COMMAND_ITEM_SELECTOR)).filter((el) => !!el);
	}
	/** Returns all visible items in a matrix structure
	*
	* @remarks Returns empty if the command isn't configured as a grid
	*
	* @returns
	*/
	get itemsGrid() {
		if (!this.isGrid) return [];
		const columns = this.opts.columns.current ?? 1;
		const items = this.getVisibleItems();
		const grid = [[]];
		let currentGroup = items[0]?.getAttribute("data-group");
		let column = 0;
		let row = 0;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			const itemGroup = item?.getAttribute("data-group");
			if (currentGroup !== itemGroup) {
				currentGroup = itemGroup;
				column = 1;
				row++;
				grid.push([{
					index: i,
					firstRowOfGroup: true,
					ref: item
				}]);
			} else {
				column++;
				if (column > columns) {
					row++;
					column = 1;
					grid.push([]);
				}
				grid[row]?.push({
					index: i,
					firstRowOfGroup: grid[row]?.[0]?.firstRowOfGroup ?? i === 0,
					ref: item
				});
			}
		}
		return grid;
	}
	/**
	* Gets currently selected command item.
	*
	* @returns Selected element or undefined
	*/
	#getSelectedItem() {
		const node = this.opts.ref.current;
		if (!node) return;
		const selectedNode = node.querySelector(`${COMMAND_VALID_ITEM_SELECTOR}[data-selected]`);
		if (!selectedNode) return;
		return selectedNode;
	}
	/**
	* Scrolls selected item into view.
	* Special handling for first items in groups.
	*/
	#scrollSelectedIntoView() {
		afterTick(() => {
			const item = this.#getSelectedItem();
			if (!item) return;
			const grandparent = item.parentElement?.parentElement;
			if (!grandparent) return;
			if (this.isGrid) {
				const isFirstRowOfGroup = this.#itemIsFirstRowOfGroup(item);
				item.scrollIntoView({ block: "nearest" });
				if (isFirstRowOfGroup) {
					(item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR))?.scrollIntoView({ block: "nearest" });
					return;
				}
			} else {
				const firstChildOfParent = getFirstNonCommentChild(grandparent);
				if (firstChildOfParent && firstChildOfParent.dataset?.value === item.dataset?.value) {
					(item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR))?.scrollIntoView({ block: "nearest" });
					return;
				}
			}
			item.scrollIntoView({ block: "nearest" });
		});
	}
	#itemIsFirstRowOfGroup(item) {
		const grid = this.itemsGrid;
		if (grid.length === 0) return false;
		for (let r = 0; r < grid.length; r++) {
			const row = grid[r];
			if (row === void 0) continue;
			for (let c = 0; c < row.length; c++) {
				const column = row[c];
				if (column === void 0 || column.ref !== item) continue;
				return column.firstRowOfGroup;
			}
		}
		return false;
	}
	/**
	* Sets selection to item at specified index in valid items array.
	* If index is out of bounds, does nothing.
	*
	* @param index - Zero-based index of item to select
	* @remarks
	* Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
	* Access valid items directly via `getValidItems()` to check bounds before calling.
	*
	* @example
	* // get valid items length for bounds check
	* const items = getValidItems()
	* if (index < items.length) {
	*   updateSelectedToIndex(index)
	* }
	*/
	updateSelectedToIndex(index) {
		const item = this.getValidItems()[index];
		if (!item) return;
		this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
	}
	/**
	* Updates selected item by moving up/down relative to current selection.
	* Handles wrapping when loop option is enabled.
	*
	* @param change - Direction to move: 1 for next item, -1 for previous item
	* @remarks
	* The loop behavior wraps:
	* - From last item to first when moving next
	* - From first item to last when moving previous
	*
	* Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
	* You can call `getValidItems()` directly to get the current valid items array.
	*
	* @example
	* // select next item
	* updateSelectedByItem(1)
	*
	* // get all valid items
	* const items = getValidItems()
	*/
	updateSelectedByItem(change) {
		const selected = this.#getSelectedItem();
		const items = this.getValidItems();
		const index = items.findIndex((item) => item === selected);
		let newSelected = items[index + change];
		if (this.opts.loop.current) newSelected = index + change < 0 ? items[items.length - 1] : index + change === items.length ? items[0] : items[index + change];
		if (newSelected) this.setValue(newSelected.getAttribute(COMMAND_VALUE_ATTR) ?? "");
	}
	/**
	* Moves selection to the first valid item in the next/previous group.
	* If no group is found, falls back to selecting the next/previous item globally.
	*
	* @param change - Direction to move: 1 for next group, -1 for previous group
	* @example
	* // move to first item in next group
	* updateSelectedByGroup(1)
	*
	* // move to first item in previous group
	* updateSelectedByGroup(-1)
	*/
	updateSelectedByGroup(change) {
		let group = this.#getSelectedItem()?.closest(COMMAND_GROUP_SELECTOR);
		let item;
		while (group && !item) {
			group = change > 0 ? findNextSibling(group, COMMAND_GROUP_SELECTOR) : findPreviousSibling(group, COMMAND_GROUP_SELECTOR);
			item = group?.querySelector(COMMAND_VALID_ITEM_SELECTOR);
		}
		if (item) this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
		else this.updateSelectedByItem(change);
	}
	/**
	* Maps item id to display value and search keywords.
	* Returns cleanup function to remove mapping.
	*
	* @param id - Unique item identifier
	* @param value - Display text
	* @param keywords - Optional search boost terms
	* @returns Cleanup function
	*/
	registerValue(value, keywords) {
		if (!(value && value === this.allIds.get(value)?.value)) this.allIds.set(value, {
			value,
			keywords
		});
		this._commandState.filtered.items.set(value, this.#score(value, keywords));
		if (!this.sortAfterTick) {
			this.sortAfterTick = true;
			afterTick(() => {
				this.#sort();
				this.sortAfterTick = false;
			});
		}
		return () => {
			this.allIds.delete(value);
		};
	}
	/**
	* Registers item in command list and its group.
	* Handles filtering, sorting and selection updates.
	*
	* @param id - Item identifier
	* @param groupId - Optional group to add item to
	* @returns Cleanup function that handles selection
	*/
	registerItem(id, groupId) {
		this.allItems.add(id);
		if (groupId) if (!this.allGroups.has(groupId)) this.allGroups.set(groupId, /* @__PURE__ */ new Set([id]));
		else this.allGroups.get(groupId).add(id);
		if (!this.sortAndFilterAfterTick) {
			this.sortAndFilterAfterTick = true;
			afterTick(() => {
				this.#filterItems();
				this.#sort();
				this.sortAndFilterAfterTick = false;
			});
		}
		this.#scheduleUpdate();
		return () => {
			const selectedItem = this.#getSelectedItem();
			this.allItems.delete(id);
			this.commandState.filtered.items.delete(id);
			this.#filterItems();
			if (selectedItem?.getAttribute("id") === id) this.#selectFirstItem();
			this.#scheduleUpdate();
		};
	}
	/**
	* Creates empty group if not exists.
	*
	* @param id - Group identifier
	* @returns Cleanup function
	*/
	registerGroup(id) {
		if (!this.allGroups.has(id)) this.allGroups.set(id, /* @__PURE__ */ new Set());
		return () => {
			this.allIds.delete(id);
			this.allGroups.delete(id);
		};
	}
	get isGrid() {
		return this.opts.columns.current !== null;
	}
	/**
	* Selects last valid item.
	*/
	#last() {
		return this.updateSelectedToIndex(this.getValidItems().length - 1);
	}
	/**
	* Handles next item selection:
	* - Meta: Jump to last
	* - Alt: Next group
	* - Default: Next item
	*
	* @param e - Keyboard event
	*/
	#next(e) {
		e.preventDefault();
		if (e.metaKey) this.#last();
		else if (e.altKey) this.updateSelectedByGroup(1);
		else this.updateSelectedByItem(1);
	}
	#down(e) {
		if (this.opts.columns.current === null) return;
		e.preventDefault();
		if (e.metaKey) this.updateSelectedByGroup(1);
		else this.updateSelectedByItem(this.#nextRowColumnOffset(e));
	}
	#getColumn(item, grid) {
		if (grid.length === 0) return null;
		for (let r = 0; r < grid.length; r++) {
			const row = grid[r];
			if (row === void 0) continue;
			for (let c = 0; c < row.length; c++) {
				const column = row[c];
				if (column === void 0 || column.ref !== item) continue;
				return {
					columnIndex: c,
					rowIndex: r
				};
			}
		}
		return null;
	}
	#nextRowColumnOffset(e) {
		const grid = this.itemsGrid;
		const selected = this.#getSelectedItem();
		if (!selected) return 0;
		const column = this.#getColumn(selected, grid);
		if (!column) return 0;
		let newItem = null;
		const skipRows = e.altKey ? 1 : 0;
		if (e.altKey && column.rowIndex === grid.length - 2 && !this.opts.loop.current) newItem = this.#findNextNonDisabledItem({
			start: grid.length - 1,
			end: grid.length,
			expectedColumnIndex: column.columnIndex,
			grid
		});
		else if (column.rowIndex === grid.length - 1) {
			if (!this.opts.loop.current) return 0;
			newItem = this.#findNextNonDisabledItem({
				start: 0 + skipRows,
				end: column.rowIndex,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		} else {
			newItem = this.#findNextNonDisabledItem({
				start: column.rowIndex + 1 + skipRows,
				end: grid.length,
				expectedColumnIndex: column.columnIndex,
				grid
			});
			if (newItem === null && this.opts.loop.current) newItem = this.#findNextNonDisabledItem({
				start: 0,
				end: column.rowIndex,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		}
		return this.#calculateOffset(selected, newItem);
	}
	/** Attempts to find the next non-disabled column that matches the expected column.
	*
	* @remarks
	* - Skips over disabled columns
	* - When a row is shorter than the expected column it defaults to the last item in the row
	*
	* @param param0
	* @returns
	*/
	#findNextNonDisabledItem({ start, end, grid, expectedColumnIndex }) {
		let newItem = null;
		for (let r = start; r < end; r++) {
			const row = grid[r];
			newItem = row[expectedColumnIndex]?.ref ?? null;
			if (newItem !== null && itemIsDisabled(newItem)) {
				newItem = null;
				continue;
			}
			if (newItem === null) for (let i = row.length - 1; i >= 0; i--) {
				const item = row[row.length - 1];
				if (item === void 0 || itemIsDisabled(item.ref)) continue;
				newItem = item.ref;
				break;
			}
			break;
		}
		return newItem;
	}
	#calculateOffset(selected, newSelected) {
		if (newSelected === null) return 0;
		const items = this.getValidItems();
		const ogIndex = items.findIndex((item) => item === selected);
		return items.findIndex((item) => item === newSelected) - ogIndex;
	}
	#up(e) {
		if (this.opts.columns.current === null) return;
		e.preventDefault();
		if (e.metaKey) this.updateSelectedByGroup(-1);
		else this.updateSelectedByItem(this.#previousRowColumnOffset(e));
	}
	#previousRowColumnOffset(e) {
		const grid = this.itemsGrid;
		const selected = this.#getSelectedItem();
		if (selected === void 0) return 0;
		const column = this.#getColumn(selected, grid);
		if (column === null) return 0;
		let newItem = null;
		const skipRows = e.altKey ? 1 : 0;
		if (e.altKey && column.rowIndex === 1 && this.opts.loop.current === false) newItem = this.#findNextNonDisabledItemDesc({
			start: 0,
			end: 0,
			expectedColumnIndex: column.columnIndex,
			grid
		});
		else if (column.rowIndex === 0) {
			if (this.opts.loop.current === false) return 0;
			newItem = this.#findNextNonDisabledItemDesc({
				start: grid.length - 1 - skipRows,
				end: column.rowIndex + 1,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		} else {
			newItem = this.#findNextNonDisabledItemDesc({
				start: column.rowIndex - 1 - skipRows,
				end: 0,
				expectedColumnIndex: column.columnIndex,
				grid
			});
			if (newItem === null && this.opts.loop.current) newItem = this.#findNextNonDisabledItemDesc({
				start: grid.length - 1,
				end: column.rowIndex + 1,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		}
		return this.#calculateOffset(selected, newItem);
	}
	/**
	* Attempts to find the next non-disabled column that matches the expected column.
	*
	* @remarks
	* - Skips over disabled columns
	* - When a row is shorter than the expected column it defaults to the last item in the row
	*/
	#findNextNonDisabledItemDesc({ start, end, grid, expectedColumnIndex }) {
		let newItem = null;
		for (let r = start; r >= end; r--) {
			const row = grid[r];
			if (row === void 0) continue;
			newItem = row[expectedColumnIndex]?.ref ?? null;
			if (newItem !== null && itemIsDisabled(newItem)) {
				newItem = null;
				continue;
			}
			if (newItem === null) for (let i = row.length - 1; i >= 0; i--) {
				const item = row[row.length - 1];
				if (item === void 0 || itemIsDisabled(item.ref)) continue;
				newItem = item.ref;
				break;
			}
			break;
		}
		return newItem;
	}
	/**
	* Handles previous item selection:
	* - Meta: Jump to first
	* - Alt: Previous group
	* - Default: Previous item
	*
	* @param e - Keyboard event
	*/
	#prev(e) {
		e.preventDefault();
		if (e.metaKey) this.updateSelectedToIndex(0);
		else if (e.altKey) this.updateSelectedByGroup(-1);
		else this.updateSelectedByItem(-1);
	}
	onkeydown(e) {
		const isVim = this.opts.vimBindings.current && e.ctrlKey;
		switch (e.key) {
			case "n":
			case "j":
				if (isVim) if (this.isGrid) this.#down(e);
				else this.#next(e);
				break;
			case "l":
				if (isVim) {
					if (this.isGrid) this.#next(e);
				}
				break;
			case ARROW_DOWN:
				if (this.isGrid) this.#down(e);
				else this.#next(e);
				break;
			case ARROW_RIGHT:
				if (!this.isGrid) break;
				this.#next(e);
				break;
			case "p":
			case "k":
				if (isVim) if (this.isGrid) this.#up(e);
				else this.#prev(e);
				break;
			case "h":
				if (isVim && this.isGrid) this.#prev(e);
				break;
			case ARROW_UP:
				if (this.isGrid) this.#up(e);
				else this.#prev(e);
				break;
			case ARROW_LEFT:
				if (!this.isGrid) break;
				this.#prev(e);
				break;
			case HOME:
				e.preventDefault();
				this.updateSelectedToIndex(0);
				break;
			case "End":
				e.preventDefault();
				this.#last();
				break;
			case ENTER:
 /**
			* Check if IME composition is finished before triggering the select event.
			* This prevents unwanted triggering while user is still inputting text with IME.
			* e.keyCode === 229 is for the Japanese IME && Safari as `isComposing` does not
			* work with Japanese IME and Safari in combination.
			*/
			if (!e.isComposing && e.keyCode !== 229) {
				e.preventDefault();
				const item = this.#getSelectedItem();
				if (item) item?.click();
			}
		}
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "application",
		[commandAttrs.root]: "",
		tabindex: -1,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
function itemIsDisabled(item) {
	return item.getAttribute("aria-disabled") === "true";
}
var CommandGroupContainerState = class CommandGroupContainerState {
	static create(opts) {
		return CommandGroupContainerContext.set(new CommandGroupContainerState(opts, CommandRootContext.get()));
	}
	opts;
	root;
	attachment;
	#shouldRender = derived(() => {
		if (this.opts.forceMount.current) return true;
		if (this.root.opts.shouldFilter.current === false) return true;
		if (!this.root.commandState.search) return true;
		return this.root._commandState.filtered.groups.has(this.trueValue);
	});
	get shouldRender() {
		return this.#shouldRender();
	}
	set shouldRender($$value) {
		return this.#shouldRender($$value);
	}
	headingNode = null;
	trueValue = "";
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		this.trueValue = opts.value.current ?? opts.id.current;
		watch(() => this.trueValue, () => {
			return this.root.registerGroup(this.trueValue);
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "presentation",
		hidden: this.shouldRender ? void 0 : true,
		"data-value": this.trueValue,
		[commandAttrs.group]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandGroupHeadingState = class CommandGroupHeadingState {
	static create(opts) {
		return new CommandGroupHeadingState(opts, CommandGroupContainerContext.get());
	}
	opts;
	group;
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref, (v) => this.group.headingNode = v);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[commandAttrs["group-heading"]]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandGroupItemsState = class CommandGroupItemsState {
	static create(opts) {
		return new CommandGroupItemsState(opts, CommandGroupContainerContext.get());
	}
	opts;
	group;
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "group",
		[commandAttrs["group-items"]]: "",
		"aria-labelledby": this.group.headingNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandItemState = class CommandItemState {
	static create(opts) {
		const group = CommandGroupContainerContext.getOr(null);
		return new CommandItemState({
			...opts,
			group
		}, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	#group = null;
	#trueForceMount = derived(() => {
		return this.opts.forceMount.current || this.#group?.opts.forceMount.current === true;
	});
	#shouldRender = derived(() => {
		this.opts.ref.current;
		if (this.#trueForceMount() || this.root.opts.shouldFilter.current === false || !this.root.commandState.search) return true;
		const currentScore = this.root.commandState.filtered.items.get(this.trueValue);
		if (currentScore === void 0) return false;
		return currentScore > 0;
	});
	get shouldRender() {
		return this.#shouldRender();
	}
	set shouldRender($$value) {
		return this.#shouldRender($$value);
	}
	#isSelected = derived(() => this.root.opts.value.current === this.trueValue && this.trueValue !== "");
	get isSelected() {
		return this.#isSelected();
	}
	set isSelected($$value) {
		return this.#isSelected($$value);
	}
	trueValue = "";
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.#group = CommandGroupContainerContext.getOr(null);
		this.trueValue = opts.value.current;
		this.attachment = attachRef(this.opts.ref);
		watch([
			() => this.trueValue,
			() => this.#group?.trueValue,
			() => this.opts.forceMount.current
		], () => {
			if (this.opts.forceMount.current || !this.trueValue) return;
			return this.root.registerItem(this.trueValue, this.#group?.trueValue);
		});
		watch([() => this.opts.value.current, () => this.opts.ref.current], () => {
			if (this.opts.value.current) this.trueValue = this.opts.value.current;
			else if (this.opts.ref.current?.textContent) this.trueValue = this.opts.ref.current.textContent.trim();
			if (this.trueValue) {
				this.root.registerValue(this.trueValue, opts.keywords.current.map((kw) => kw.trim()));
				this.opts.ref.current?.setAttribute(COMMAND_VALUE_ATTR, this.trueValue);
			}
		});
		this.onclick = this.onclick.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
	}
	#onSelect() {
		if (this.opts.disabled.current) return;
		this.#select();
		this.opts.onSelect?.current();
	}
	#select() {
		if (this.opts.disabled.current) return;
		this.root.setValue(this.trueValue, true);
	}
	onpointermove(_) {
		if (this.opts.disabled.current || this.root.opts.disablePointerSelection.current) return;
		this.#select();
	}
	onclick(_) {
		if (this.opts.disabled.current) return;
		this.#onSelect();
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"aria-disabled": boolToStr(this.opts.disabled.current),
		"aria-selected": boolToStr(this.isSelected),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-selected": boolToEmptyStrOrUndef(this.isSelected),
		"data-value": this.trueValue,
		"data-group": this.#group?.trueValue,
		[commandAttrs.item]: "",
		role: "option",
		onpointermove: this.onpointermove,
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandListState = class CommandListState {
	static create(opts) {
		return CommandListContext.set(new CommandListState(opts, CommandRootContext.get()));
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-label": this.opts.ariaLabel.current,
		[commandAttrs.list]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandLabelState = class CommandLabelState {
	static create(opts) {
		return new CommandLabelState(opts, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.labelNode = v);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[commandAttrs["input-label"]]: "",
		for: this.opts.for?.current,
		style: srOnlyStyles,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/components/_command-label.svelte
function _command_label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, $$slots, $$events, ...restProps } = $$props;
		const labelState = CommandLabelState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, labelState.props));
		$$renderer.push(`<label${attributes({ ...mergedProps() })}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></label>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/components/command.svelte
function Command$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, value = "", onValueChange = noop, onStateChange = noop, loop = false, shouldFilter = true, filter = computeCommandScore, label = "", vimBindings = true, disablePointerSelection = false, disableInitialScroll = false, columns = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const rootState = CommandRootState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			filter: boxWith(() => filter),
			shouldFilter: boxWith(() => shouldFilter),
			loop: boxWith(() => loop),
			value: boxWith(() => value, (v) => {
				if (value !== v) {
					value = v;
					onValueChange(v);
				}
			}),
			vimBindings: boxWith(() => vimBindings),
			disablePointerSelection: boxWith(() => disablePointerSelection),
			disableInitialScroll: boxWith(() => disableInitialScroll),
			onStateChange: boxWith(() => onStateChange),
			columns: boxWith(() => columns)
		});
		/**
		* Sets selection to item at specified index in valid items array.
		* If index is out of bounds, does nothing.
		*
		* @param index - Zero-based index of item to select
		* @remarks
		* Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
		* Access valid items directly via `getValidItems()` to check bounds before calling.
		*
		* @example
		* // get valid items length for bounds check
		* const items = getValidItems()
		* if (index < items.length) {
		*   updateSelectedToIndex(index)
		* }
		*/
		const updateSelectedToIndex = (i) => rootState.updateSelectedToIndex(i);
		/**
		* Moves selection to the first valid item in the next/previous group.
		* If no group is found, falls back to selecting the next/previous item globally.
		*
		* @param change - Direction to move: 1 for next group, -1 for previous group
		* @example
		* // move to first item in next group
		* updateSelectedByGroup(1)
		*
		* // move to first item in previous group
		* updateSelectedByGroup(-1)
		*/
		const updateSelectedByGroup = (c) => rootState.updateSelectedByGroup(c);
		/**
		* Updates selected item by moving up/down relative to current selection.
		* Handles wrapping when loop option is enabled.
		*
		* @param change - Direction to move: 1 for next item, -1 for previous item
		* @remarks
		* The loop behavior wraps:
		* - From last item to first when moving next
		* - From first item to last when moving previous
		*
		* Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
		* You can call `getValidItems()` directly to get the current valid items array.
		*
		* @example
		* // select next item
		* updateSelectedByItem(1)
		*
		* // get all valid items
		* const items = getValidItems()
		*/
		const updateSelectedByItem = (c) => rootState.updateSelectedByItem(c);
		/**
		* Gets all non-disabled, visible command items.
		*
		* @returns Array of valid item elements
		* @remarks Exposed for direct item access and bound checking
		*/
		const getValidItems = () => rootState.getValidItems();
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
		function Label($$renderer) {
			_command_label($$renderer, {
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(label)}`);
				},
				$$slots: { default: true }
			});
		}
		if (child) {
			$$renderer.push("<!--[0-->");
			Label($$renderer);
			$$renderer.push(`<!----> `);
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			Label($$renderer);
			$$renderer.push(`<!----> `);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			ref,
			value,
			updateSelectedToIndex,
			updateSelectedByGroup,
			updateSelectedByItem,
			getValidItems
		});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/components/command-group.svelte
function Command_group$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, value = "", forceMount = false, children, child, $$slots, $$events, ...restProps } = $$props;
		const groupState = CommandGroupContainerState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			forceMount: boxWith(() => forceMount),
			value: boxWith(() => value)
		});
		const mergedProps = derived(() => mergeProps(restProps, groupState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/components/command-group-heading.svelte
function Command_group_heading($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const headingState = CommandGroupHeadingState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, headingState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/components/command-group-items.svelte
function Command_group_items($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const groupItemsState = CommandGroupItemsState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, groupItemsState.props));
		$$renderer.push(`<div style="display: contents;">`);
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/components/command-item.svelte
function Command_item$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, value = "", disabled = false, children, child, onSelect = noop, forceMount = false, keywords = [], $$slots, $$events, ...restProps } = $$props;
		const itemState = CommandItemState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			value: boxWith(() => value),
			disabled: boxWith(() => disabled),
			onSelect: boxWith(() => onSelect),
			forceMount: boxWith(() => forceMount),
			keywords: boxWith(() => keywords)
		});
		const mergedProps = derived(() => mergeProps(restProps, itemState.props));
		$$renderer.push(`<!---->`);
		$$renderer.push(`<div style="display: contents;" data-item-wrapper=""${attr("data-value", itemState.trueValue)}>`);
		if (itemState.shouldRender) {
			$$renderer.push("<!--[0-->");
			if (child) {
				$$renderer.push("<!--[0-->");
				child($$renderer, { props: mergedProps() });
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
				children?.($$renderer);
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		$$renderer.push(`<!---->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/components/command-list.svelte
function Command_list$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, child, children, "aria-label": ariaLabel, $$slots, $$events, ...restProps } = $$props;
		const listState = CommandListState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			ariaLabel: boxWith(() => ariaLabel ?? "Suggestions...")
		});
		const mergedProps = derived(() => mergeProps(restProps, listState.props));
		$$renderer.push(`<!---->`);
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		$$renderer.push(`<!---->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/command/compute-command-score.js
var SCORE_CONTINUE_MATCH = 1;
var SCORE_SPACE_WORD_JUMP = .9;
var SCORE_NON_SPACE_WORD_JUMP = .8;
var SCORE_CHARACTER_JUMP = .17;
var SCORE_TRANSPOSITION = .1;
var PENALTY_SKIPPED = .999;
var PENALTY_CASE_MISMATCH = .9999;
var PENALTY_NOT_COMPLETE = .99;
var IS_GAP_REGEXP = /[\\/_+.#"@[({&]/;
var COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g;
var IS_SPACE_REGEXP = /[\s-]/;
var COUNT_SPACE_REGEXP = /[\s-]/g;
function computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, stringIndex, abbreviationIndex, memoizedResults) {
	if (abbreviationIndex === abbreviation.length) {
		if (stringIndex === string.length) return SCORE_CONTINUE_MATCH;
		return PENALTY_NOT_COMPLETE;
	}
	const memoizeKey = `${stringIndex},${abbreviationIndex}`;
	if (memoizedResults[memoizeKey] !== void 0) return memoizedResults[memoizeKey];
	const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
	let index = lowerString.indexOf(abbreviationChar, stringIndex);
	let highScore = 0;
	let score, transposedScore, wordBreaks, spaceBreaks;
	while (index >= 0) {
		score = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 1, memoizedResults);
		if (score > highScore) {
			if (index === stringIndex) score *= SCORE_CONTINUE_MATCH;
			else if (IS_GAP_REGEXP.test(string.charAt(index - 1))) {
				score *= SCORE_NON_SPACE_WORD_JUMP;
				wordBreaks = string.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
				if (wordBreaks && stringIndex > 0) score *= PENALTY_SKIPPED ** wordBreaks.length;
			} else if (IS_SPACE_REGEXP.test(string.charAt(index - 1))) {
				score *= SCORE_SPACE_WORD_JUMP;
				spaceBreaks = string.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
				if (spaceBreaks && stringIndex > 0) score *= PENALTY_SKIPPED ** spaceBreaks.length;
			} else {
				score *= SCORE_CHARACTER_JUMP;
				if (stringIndex > 0) score *= PENALTY_SKIPPED ** (index - stringIndex);
			}
			if (string.charAt(index) !== abbreviation.charAt(abbreviationIndex)) score *= PENALTY_CASE_MISMATCH;
		}
		if (score < SCORE_TRANSPOSITION && lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1) || lowerAbbreviation.charAt(abbreviationIndex + 1) === lowerAbbreviation.charAt(abbreviationIndex) && lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex)) {
			transposedScore = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 2, memoizedResults);
			if (transposedScore * SCORE_TRANSPOSITION > score) score = transposedScore * SCORE_TRANSPOSITION;
		}
		if (score > highScore) highScore = score;
		index = lowerString.indexOf(abbreviationChar, index + 1);
	}
	memoizedResults[memoizeKey] = highScore;
	return highScore;
}
/**
*
* @param string
* @returns
*/
function formatInput(string) {
	return string.toLowerCase().replace(COUNT_SPACE_REGEXP, " ");
}
/**
* Given a command, a search query, and (optionally) a list of keywords for the command,
* computes a score between 0 and 1 that represents how well the search query matches the
* abbreviation and keywords. 1 is a perfect match, 0 is no match.
*
* The score is calculated based on the following rules:
* - The scores are arranged so that a continuous match of characters will result in a total
* score of 1. The best case, this character is a match, and either this is the start of the string
* or the previous character was also a match.
* - A new match at the start of a word scores better than a new match elsewhere as it's more likely
* that the user will type the starts of fragments.
* - Word jumps between spaces are scored slightly higher than slashes, brackets, hyphens, etc.
* - A continuous match of characters will result in a total score of 1.
* - A new match at the start of a word scores better than a new match elsewhere as it's more likely that the user will type the starts of fragments.
* - Any other match isn't ideal, but we include it for completeness.
* - If the user transposed two letters, it should be significantly penalized.
* - The goodness of a match should decay slightly with each missing character.
* - Match higher for letters closer to the beginning of the word.
*
* @param command - The value to score against the search string (e.g. a command name like "Calculator")
* @param search - The search string to score against the value/aliases
* @param commandKeywords - An optional list of aliases/keywords to score against the search string - e.g. ["math", "add", "divide", "multiply", "subtract"]
* @returns A score between 0 and 1 that represents how well the search string matches the
* command (and keywords)
*/
function computeCommandScore(command, search, commandKeywords) {
	/**
	* NOTE: We used to do lower-casing on each recursive call, but this meant that `toLowerCase()`
	* was the dominating cost in the algorithm. Passing both is a little ugly, but considerably
	* faster.
	*/
	command = commandKeywords && commandKeywords.length > 0 ? `${`${command} ${commandKeywords?.join(" ")}`}` : command;
	return computeCommandScoreInner(command, search, formatInput(command), formatInput(search), 0, 0, {});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/internal/safe-polygon.svelte.js
function isPointInPolygon(point, polygon) {
	const [x, y] = point;
	let isInside = false;
	const length = polygon.length;
	for (let i = 0, j = length - 1; i < length; j = i++) {
		const [xi, yi] = polygon[i] ?? [0, 0];
		const [xj, yj] = polygon[j] ?? [0, 0];
		if (yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi) isInside = !isInside;
	}
	return isInside;
}
function isInsideRect(point, rect) {
	return point[0] >= rect.left && point[0] <= rect.right && point[1] >= rect.top && point[1] <= rect.bottom;
}
function getSide(triggerRect, contentRect) {
	const triggerCenterX = triggerRect.left + triggerRect.width / 2;
	const triggerCenterY = triggerRect.top + triggerRect.height / 2;
	const contentCenterX = contentRect.left + contentRect.width / 2;
	const contentCenterY = contentRect.top + contentRect.height / 2;
	const deltaX = contentCenterX - triggerCenterX;
	const deltaY = contentCenterY - triggerCenterY;
	if (Math.abs(deltaX) > Math.abs(deltaY)) return deltaX > 0 ? "right" : "left";
	return deltaY > 0 ? "bottom" : "top";
}
/**
* Creates a safe polygon area that allows users to move their cursor between
* the trigger and floating content without closing it.
*/
var SafePolygon = class {
	#opts;
	#buffer;
	#transitIntentTimeout;
	#exitPoint = null;
	#exitTarget = null;
	#transitTargets = [];
	#trackedTriggerNode = null;
	#leaveFallbackRafId = null;
	#transitIntentTimeoutId = null;
	#cancelLeaveFallback() {
		if (this.#leaveFallbackRafId !== null) {
			cancelAnimationFrame(this.#leaveFallbackRafId);
			this.#leaveFallbackRafId = null;
		}
	}
	#scheduleLeaveFallback() {
		this.#cancelLeaveFallback();
		this.#leaveFallbackRafId = requestAnimationFrame(() => {
			this.#leaveFallbackRafId = null;
			if (!this.#exitPoint || !this.#exitTarget) return;
			this.#clearTracking();
			this.#opts.onPointerExit();
		});
	}
	#cancelTransitIntentTimeout() {
		if (this.#transitIntentTimeoutId !== null) {
			clearTimeout(this.#transitIntentTimeoutId);
			this.#transitIntentTimeoutId = null;
		}
	}
	#scheduleTransitIntentTimeout() {
		if (this.#transitIntentTimeout === null) return;
		this.#cancelTransitIntentTimeout();
		this.#transitIntentTimeoutId = window.setTimeout(() => {
			this.#transitIntentTimeoutId = null;
			if (!this.#exitPoint || !this.#exitTarget) return;
			this.#clearTracking();
			this.#opts.onPointerExit();
		}, this.#transitIntentTimeout);
	}
	constructor(opts) {
		this.#opts = opts;
		this.#buffer = opts.buffer ?? 1;
		const transitIntentTimeout = opts.transitIntentTimeout;
		this.#transitIntentTimeout = typeof transitIntentTimeout === "number" && transitIntentTimeout > 0 ? transitIntentTimeout : null;
		watch([
			opts.triggerNode,
			opts.contentNode,
			opts.enabled
		], ([triggerNode, contentNode, enabled]) => {
			if (!triggerNode || !contentNode || !enabled) {
				this.#trackedTriggerNode = null;
				this.#clearTracking();
				return;
			}
			if (this.#trackedTriggerNode && this.#trackedTriggerNode !== triggerNode) this.#clearTracking();
			this.#trackedTriggerNode = triggerNode;
			const doc = getDocument(triggerNode);
			const handlePointerMove = (e) => {
				this.#onPointerMove([e.clientX, e.clientY], triggerNode, contentNode);
			};
			const handleTriggerLeave = (e) => {
				const target = e.relatedTarget;
				if (isElement$1(target) && contentNode.contains(target)) return;
				const ignoredTargets = this.#opts.ignoredTargets?.() ?? [];
				if (isElement$1(target) && ignoredTargets.some((n) => n === target || n.contains(target))) return;
				this.#transitTargets = isElement$1(target) && ignoredTargets.length > 0 ? ignoredTargets.filter((n) => target.contains(n)) : [];
				this.#exitPoint = [e.clientX, e.clientY];
				this.#exitTarget = "content";
				this.#scheduleLeaveFallback();
			};
			const handleTriggerEnter = () => {
				this.#clearTracking();
			};
			const handleContentEnter = () => {
				this.#clearTracking();
			};
			const handleContentLeave = (e) => {
				const target = e.relatedTarget;
				if (isElement$1(target) && triggerNode.contains(target)) return;
				this.#exitPoint = [e.clientX, e.clientY];
				this.#exitTarget = "trigger";
				this.#scheduleLeaveFallback();
			};
			return [
				on(doc, "pointermove", handlePointerMove),
				on(triggerNode, "pointerleave", handleTriggerLeave),
				on(triggerNode, "pointerenter", handleTriggerEnter),
				on(contentNode, "pointerenter", handleContentEnter),
				on(contentNode, "pointerleave", handleContentLeave)
			].reduce((acc, cleanup) => () => {
				acc();
				cleanup();
			}, () => {});
		});
	}
	#onPointerMove(clientPoint, triggerNode, contentNode) {
		if (!this.#exitPoint || !this.#exitTarget) return;
		this.#cancelLeaveFallback();
		this.#scheduleTransitIntentTimeout();
		const triggerRect = triggerNode.getBoundingClientRect();
		const contentRect = contentNode.getBoundingClientRect();
		if (this.#exitTarget === "content" && isInsideRect(clientPoint, contentRect)) {
			this.#clearTracking();
			return;
		}
		if (this.#exitTarget === "trigger" && isInsideRect(clientPoint, triggerRect)) {
			this.#clearTracking();
			return;
		}
		if (this.#exitTarget === "content" && this.#transitTargets.length > 0) for (const transitTarget of this.#transitTargets) {
			const transitRect = transitTarget.getBoundingClientRect();
			if (isInsideRect(clientPoint, transitRect)) return;
			const transitSide = getSide(triggerRect, transitRect);
			const transitCorridor = this.#getCorridorPolygon(triggerRect, transitRect, transitSide);
			if (transitCorridor && isPointInPolygon(clientPoint, transitCorridor)) return;
		}
		const side = getSide(triggerRect, contentRect);
		const corridorPoly = this.#getCorridorPolygon(triggerRect, contentRect, side);
		if (corridorPoly && isPointInPolygon(clientPoint, corridorPoly)) return;
		const targetRect = this.#exitTarget === "content" ? contentRect : triggerRect;
		if (isPointInPolygon(clientPoint, this.#getSafePolygon(this.#exitPoint, targetRect, side, this.#exitTarget))) return;
		this.#clearTracking();
		this.#opts.onPointerExit();
	}
	#clearTracking() {
		this.#exitPoint = null;
		this.#exitTarget = null;
		this.#transitTargets = [];
		this.#cancelLeaveFallback();
		this.#cancelTransitIntentTimeout();
	}
	/**
	* Creates a rectangular corridor between trigger and content
	* This prevents closing when cursor is in the gap between them
	*/
	#getCorridorPolygon(triggerRect, contentRect, side) {
		const buffer = this.#buffer;
		switch (side) {
			case "top": return [
				[Math.min(triggerRect.left, contentRect.left) - buffer, triggerRect.top],
				[Math.min(triggerRect.left, contentRect.left) - buffer, contentRect.bottom],
				[Math.max(triggerRect.right, contentRect.right) + buffer, contentRect.bottom],
				[Math.max(triggerRect.right, contentRect.right) + buffer, triggerRect.top]
			];
			case "bottom": return [
				[Math.min(triggerRect.left, contentRect.left) - buffer, triggerRect.bottom],
				[Math.min(triggerRect.left, contentRect.left) - buffer, contentRect.top],
				[Math.max(triggerRect.right, contentRect.right) + buffer, contentRect.top],
				[Math.max(triggerRect.right, contentRect.right) + buffer, triggerRect.bottom]
			];
			case "left": return [
				[triggerRect.left, Math.min(triggerRect.top, contentRect.top) - buffer],
				[contentRect.right, Math.min(triggerRect.top, contentRect.top) - buffer],
				[contentRect.right, Math.max(triggerRect.bottom, contentRect.bottom) + buffer],
				[triggerRect.left, Math.max(triggerRect.bottom, contentRect.bottom) + buffer]
			];
			case "right": return [
				[triggerRect.right, Math.min(triggerRect.top, contentRect.top) - buffer],
				[contentRect.left, Math.min(triggerRect.top, contentRect.top) - buffer],
				[contentRect.left, Math.max(triggerRect.bottom, contentRect.bottom) + buffer],
				[triggerRect.right, Math.max(triggerRect.bottom, contentRect.bottom) + buffer]
			];
		}
	}
	/**
	* Creates a triangular/trapezoidal safe zone from the exit point to the target
	*/
	#getSafePolygon(exitPoint, targetRect, side, exitTarget) {
		const buffer = this.#buffer * 4;
		const [x, y] = exitPoint;
		switch (exitTarget === "trigger" ? this.#flipSide(side) : side) {
			case "top": return [
				[x - buffer, y + buffer],
				[x + buffer, y + buffer],
				[targetRect.right + buffer, targetRect.bottom],
				[targetRect.right + buffer, targetRect.top],
				[targetRect.left - buffer, targetRect.top],
				[targetRect.left - buffer, targetRect.bottom]
			];
			case "bottom": return [
				[x - buffer, y - buffer],
				[x + buffer, y - buffer],
				[targetRect.right + buffer, targetRect.top],
				[targetRect.right + buffer, targetRect.bottom],
				[targetRect.left - buffer, targetRect.bottom],
				[targetRect.left - buffer, targetRect.top]
			];
			case "left": return [
				[x + buffer, y - buffer],
				[x + buffer, y + buffer],
				[targetRect.right, targetRect.bottom + buffer],
				[targetRect.left, targetRect.bottom + buffer],
				[targetRect.left, targetRect.top - buffer],
				[targetRect.right, targetRect.top - buffer]
			];
			case "right": return [
				[x - buffer, y - buffer],
				[x - buffer, y + buffer],
				[targetRect.left, targetRect.bottom + buffer],
				[targetRect.right, targetRect.bottom + buffer],
				[targetRect.right, targetRect.top - buffer],
				[targetRect.left, targetRect.top - buffer]
			];
		}
	}
	#flipSide(side) {
		switch (side) {
			case "top": return "bottom";
			case "bottom": return "top";
			case "left": return "right";
			case "right": return "left";
		}
	}
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/popover/popover.svelte.js
var popoverAttrs = createBitsAttrs({
	component: "popover",
	parts: [
		"root",
		"trigger",
		"content",
		"close",
		"overlay"
	]
});
var PopoverRootContext = new Context("Popover.Root");
var PopoverRootState = class PopoverRootState {
	static create(opts) {
		return PopoverRootContext.set(new PopoverRootState(opts));
	}
	opts;
	contentNode = null;
	contentPresence;
	triggerNode = null;
	overlayNode = null;
	overlayPresence;
	openedViaHover = false;
	hasInteractedWithContent = false;
	hoverCooldown = false;
	closeDelay = 0;
	#closeTimeout = null;
	#domContext = null;
	constructor(opts) {
		this.opts = opts;
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
		this.overlayPresence = new PresenceManager({
			ref: boxWith(() => this.overlayNode),
			open: this.opts.open
		});
		watch(() => this.opts.open.current, (isOpen) => {
			if (!isOpen) {
				this.openedViaHover = false;
				this.hasInteractedWithContent = false;
				this.#clearCloseTimeout();
			}
		});
	}
	setDomContext(ctx) {
		this.#domContext = ctx;
	}
	#clearCloseTimeout() {
		if (this.#closeTimeout !== null && this.#domContext) {
			this.#domContext.clearTimeout(this.#closeTimeout);
			this.#closeTimeout = null;
		}
	}
	toggleOpen() {
		this.#clearCloseTimeout();
		this.opts.open.current = !this.opts.open.current;
	}
	handleClose() {
		this.#clearCloseTimeout();
		if (!this.opts.open.current) return;
		this.opts.open.current = false;
	}
	handleHoverOpen() {
		this.#clearCloseTimeout();
		if (this.opts.open.current) return;
		this.openedViaHover = true;
		this.opts.open.current = true;
	}
	handleHoverClose() {
		if (!this.opts.open.current) return;
		if (this.openedViaHover && !this.hasInteractedWithContent) this.opts.open.current = false;
	}
	handleDelayedHoverClose() {
		if (!this.opts.open.current) return;
		if (!this.openedViaHover || this.hasInteractedWithContent) return;
		this.#clearCloseTimeout();
		if (this.closeDelay <= 0) this.opts.open.current = false;
		else if (this.#domContext) this.#closeTimeout = this.#domContext.setTimeout(() => {
			if (this.openedViaHover && !this.hasInteractedWithContent) this.opts.open.current = false;
			this.#closeTimeout = null;
		}, this.closeDelay);
	}
	cancelDelayedClose() {
		this.#clearCloseTimeout();
	}
	markInteraction() {
		this.hasInteractedWithContent = true;
		this.#clearCloseTimeout();
	}
};
var PopoverTriggerState = class PopoverTriggerState {
	static create(opts) {
		return new PopoverTriggerState(opts, PopoverRootContext.get());
	}
	opts;
	root;
	attachment;
	domContext;
	#openTimeout = null;
	#closeTimeout = null;
	#isHovering = false;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.triggerNode = v);
		this.domContext = new DOMContext(opts.ref);
		this.root.setDomContext(this.domContext);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
		this.onpointerenter = this.onpointerenter.bind(this);
		this.onpointerleave = this.onpointerleave.bind(this);
		watch(() => this.opts.closeDelay.current, (delay) => {
			this.root.closeDelay = delay;
		});
	}
	#clearOpenTimeout() {
		if (this.#openTimeout !== null) {
			this.domContext.clearTimeout(this.#openTimeout);
			this.#openTimeout = null;
		}
	}
	#clearCloseTimeout() {
		if (this.#closeTimeout !== null) {
			this.domContext.clearTimeout(this.#closeTimeout);
			this.#closeTimeout = null;
		}
	}
	#clearAllTimeouts() {
		this.#clearOpenTimeout();
		this.#clearCloseTimeout();
	}
	onpointerenter(e) {
		if (this.opts.disabled.current) return;
		if (!this.opts.openOnHover.current) return;
		if (isTouch(e)) return;
		this.#isHovering = true;
		this.#clearCloseTimeout();
		this.root.cancelDelayedClose();
		if (this.root.opts.open.current || this.root.hoverCooldown) return;
		const delay = this.opts.openDelay.current;
		if (delay <= 0) this.root.handleHoverOpen();
		else this.#openTimeout = this.domContext.setTimeout(() => {
			this.root.handleHoverOpen();
			this.#openTimeout = null;
		}, delay);
	}
	onpointerleave(e) {
		if (this.opts.disabled.current) return;
		if (!this.opts.openOnHover.current) return;
		if (isTouch(e)) return;
		this.#isHovering = false;
		this.#clearOpenTimeout();
		this.root.hoverCooldown = false;
	}
	onclick(e) {
		if (this.opts.disabled.current) return;
		if (e.button !== 0) return;
		this.#clearAllTimeouts();
		if (this.#isHovering && this.root.opts.open.current && this.root.openedViaHover) {
			this.root.openedViaHover = false;
			this.root.hasInteractedWithContent = true;
			return;
		}
		if (this.#isHovering && this.opts.openOnHover.current && this.root.opts.open.current) this.root.hoverCooldown = true;
		if (this.root.hoverCooldown && !this.root.opts.open.current) this.root.hoverCooldown = false;
		this.root.toggleOpen();
	}
	onkeydown(e) {
		if (this.opts.disabled.current) return;
		if (!(e.key === "Enter" || e.key === " ")) return;
		e.preventDefault();
		this.#clearAllTimeouts();
		this.root.toggleOpen();
	}
	#getAriaControls() {
		if (this.root.opts.open.current && this.root.contentNode?.id) return this.root.contentNode?.id;
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": boolToStr(this.root.opts.open.current),
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		"aria-controls": this.#getAriaControls(),
		[popoverAttrs.trigger]: "",
		disabled: this.opts.disabled.current,
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var PopoverContentState = class PopoverContentState {
	static create(opts) {
		return new PopoverContentState(opts, PopoverRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
		this.onpointerdown = this.onpointerdown.bind(this);
		this.onfocusin = this.onfocusin.bind(this);
		this.onpointerenter = this.onpointerenter.bind(this);
		this.onpointerleave = this.onpointerleave.bind(this);
		new SafePolygon({
			triggerNode: () => this.root.triggerNode,
			contentNode: () => this.root.contentNode,
			enabled: () => this.root.opts.open.current && this.root.openedViaHover && !this.root.hasInteractedWithContent,
			onPointerExit: () => {
				this.root.handleDelayedHoverClose();
			}
		});
	}
	onpointerdown(_) {
		this.root.markInteraction();
	}
	onfocusin(e) {
		const target = e.target;
		if (isElement$1(target) && isTabbable(target)) this.root.markInteraction();
	}
	onpointerenter(e) {
		if (isTouch(e)) return;
		this.root.cancelDelayedClose();
	}
	onpointerleave(e) {
		if (isTouch(e)) return;
	}
	onInteractOutside = (e) => {
		this.opts.onInteractOutside.current(e);
		if (e.defaultPrevented) return;
		if (!isElement$1(e.target)) return;
		const closestTrigger = e.target.closest(popoverAttrs.selector("trigger"));
		if (closestTrigger && closestTrigger === this.root.triggerNode) return;
		if (this.opts.customAnchor.current) {
			if (isElement$1(this.opts.customAnchor.current)) {
				if (this.opts.customAnchor.current.contains(e.target)) return;
			} else if (typeof this.opts.customAnchor.current === "string") {
				const el = document.querySelector(this.opts.customAnchor.current);
				if (el && el.contains(e.target)) return;
			}
		}
		this.root.handleClose();
	};
	onEscapeKeydown = (e) => {
		this.opts.onEscapeKeydown.current(e);
		if (e.defaultPrevented) return;
		this.root.handleClose();
	};
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	get shouldTrapFocus() {
		if (this.root.openedViaHover && !this.root.hasInteractedWithContent) return false;
		return true;
	}
	#snippetProps = derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		...getDataTransitionAttrs(this.root.contentPresence.transitionStatus),
		[popoverAttrs.content]: "",
		style: {
			pointerEvents: "auto",
			contain: "layout style"
		},
		onpointerdown: this.onpointerdown,
		onfocusin: this.onfocusin,
		onpointerenter: this.onpointerenter,
		onpointerleave: this.onpointerleave,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
	popperProps = {
		onInteractOutside: this.onInteractOutside,
		onEscapeKeydown: this.onEscapeKeydown
	};
};
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/popover/components/popover-content.svelte
function Popover_content$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { child, children, ref = null, id = createId(uid), forceMount = false, onOpenAutoFocus = noop, onCloseAutoFocus = noop, onEscapeKeydown = noop, onInteractOutside = noop, trapFocus = true, preventScroll = false, customAnchor = null, style, $$slots, $$events, ...restProps } = $$props;
		const contentState = PopoverContentState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			onInteractOutside: boxWith(() => onInteractOutside),
			onEscapeKeydown: boxWith(() => onEscapeKeydown),
			customAnchor: boxWith(() => customAnchor)
		});
		const mergedProps = derived(() => mergeProps(restProps, contentState.props));
		const effectiveTrapFocus = derived(() => trapFocus && contentState.shouldTrapFocus);
		function handleOpenAutoFocus(e) {
			if (!contentState.shouldTrapFocus) e.preventDefault();
			onOpenAutoFocus(e);
		}
		if (forceMount) {
			$$renderer.push("<!--[0-->");
			{
				function popper($$renderer, { props, wrapperProps }) {
					const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") }, { style });
					if (child) {
						$$renderer.push("<!--[0-->");
						child($$renderer, {
							props: finalProps,
							wrapperProps,
							...contentState.snippetProps
						});
						$$renderer.push(`<!---->`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
						children?.($$renderer);
						$$renderer.push(`<!----></div></div>`);
					}
					$$renderer.push(`<!--]-->`);
				}
				Popper_layer_force_mount($$renderer, spread_props([
					mergedProps(),
					contentState.popperProps,
					{
						ref: contentState.opts.ref,
						enabled: contentState.root.opts.open.current,
						id,
						trapFocus: effectiveTrapFocus(),
						preventScroll,
						loop: true,
						forceMount: true,
						customAnchor,
						onOpenAutoFocus: handleOpenAutoFocus,
						onCloseAutoFocus,
						shouldRender: contentState.shouldRender,
						popper,
						$$slots: { popper: true }
					}
				]));
			}
		} else if (!forceMount) {
			$$renderer.push("<!--[1-->");
			{
				function popper($$renderer, { props, wrapperProps }) {
					const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") }, { style });
					if (child) {
						$$renderer.push("<!--[0-->");
						child($$renderer, {
							props: finalProps,
							wrapperProps,
							...contentState.snippetProps
						});
						$$renderer.push(`<!---->`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
						children?.($$renderer);
						$$renderer.push(`<!----></div></div>`);
					}
					$$renderer.push(`<!--]-->`);
				}
				Popper_layer($$renderer, spread_props([
					mergedProps(),
					contentState.popperProps,
					{
						ref: contentState.opts.ref,
						open: contentState.root.opts.open.current,
						id,
						trapFocus: effectiveTrapFocus(),
						preventScroll,
						loop: true,
						forceMount: false,
						customAnchor,
						onOpenAutoFocus: handleOpenAutoFocus,
						onCloseAutoFocus,
						shouldRender: contentState.shouldRender,
						popper,
						$$slots: { popper: true }
					}
				]));
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/popover/components/popover-trigger.svelte
function Popover_trigger$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, type = "button", disabled = false, openOnHover = false, openDelay = 700, closeDelay = 300, $$slots, $$events, ...restProps } = $$props;
		const triggerState = PopoverTriggerState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			disabled: boxWith(() => Boolean(disabled)),
			openOnHover: boxWith(() => openOnHover),
			openDelay: boxWith(() => openDelay),
			closeDelay: boxWith(() => closeDelay)
		});
		const mergedProps = derived(() => mergeProps(restProps, triggerState.props, { type }));
		Floating_layer_anchor($$renderer, {
			id,
			ref: triggerState.opts.ref,
			children: ($$renderer) => {
				if (child) {
					$$renderer.push("<!--[0-->");
					child($$renderer, { props: mergedProps() });
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
					children?.($$renderer);
					$$renderer.push(`<!----></button>`);
				}
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		});
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/components/dialog.svelte
function Dialog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, onOpenChange = noop, onOpenChangeComplete = noop, children } = $$props;
		DialogRootState.create({
			variant: boxWith(() => "dialog"),
			open: boxWith(() => open, (v) => {
				open = v;
				onOpenChange(v);
			}),
			onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
		});
		children?.($$renderer);
		$$renderer.push(`<!---->`);
		bind_props($$props, { open });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/components/dialog-close.svelte
function Dialog_close($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, disabled = false, $$slots, $$events, ...restProps } = $$props;
		const closeState = DialogCloseState.create({
			variant: boxWith(() => "close"),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			disabled: boxWith(() => Boolean(disabled))
		});
		const mergedProps = derived(() => mergeProps(restProps, closeState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/dialog/components/dialog-content.svelte
function Dialog_content$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), children, child, ref = null, forceMount = false, onCloseAutoFocus = noop, onOpenAutoFocus = noop, onEscapeKeydown = noop, onInteractOutside = noop, trapFocus = true, preventScroll = true, restoreScrollDelay = null, $$slots, $$events, ...restProps } = $$props;
		const contentState = DialogContentState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, contentState.props));
		if (contentState.shouldRender || forceMount) {
			$$renderer.push("<!--[0-->");
			{
				function focusScope($$renderer, { props: focusScopeProps }) {
					Escape_layer($$renderer, spread_props([mergedProps(), {
						enabled: contentState.root.opts.open.current,
						ref: contentState.opts.ref,
						onEscapeKeydown: (e) => {
							onEscapeKeydown(e);
							if (e.defaultPrevented) return;
							contentState.root.handleClose();
						},
						children: ($$renderer) => {
							Dismissible_layer($$renderer, spread_props([mergedProps(), {
								ref: contentState.opts.ref,
								enabled: contentState.root.opts.open.current,
								onInteractOutside: (e) => {
									onInteractOutside(e);
									if (e.defaultPrevented) return;
									contentState.root.handleClose();
								},
								children: ($$renderer) => {
									Text_selection_layer($$renderer, spread_props([mergedProps(), {
										ref: contentState.opts.ref,
										enabled: contentState.root.opts.open.current,
										children: ($$renderer) => {
											if (child) {
												$$renderer.push("<!--[0-->");
												if (contentState.root.opts.open.current) {
													$$renderer.push("<!--[0-->");
													Scroll_lock($$renderer, {
														preventScroll,
														restoreScrollDelay
													});
												} else $$renderer.push("<!--[-1-->");
												$$renderer.push(`<!--]--> `);
												child($$renderer, {
													props: mergeProps(mergedProps(), focusScopeProps),
													...contentState.snippetProps
												});
												$$renderer.push(`<!---->`);
											} else {
												$$renderer.push("<!--[-1-->");
												Scroll_lock($$renderer, { preventScroll });
												$$renderer.push(`<!----> <div${attributes({ ...mergeProps(mergedProps(), focusScopeProps) })}>`);
												children?.($$renderer);
												$$renderer.push(`<!----></div>`);
											}
											$$renderer.push(`<!--]-->`);
										},
										$$slots: { default: true }
									}]));
								},
								$$slots: { default: true }
							}]));
						},
						$$slots: { default: true }
					}]));
				}
				Focus_scope($$renderer, {
					ref: contentState.opts.ref,
					loop: true,
					trapFocus,
					enabled: contentState.root.opts.open.current,
					onOpenAutoFocus,
					onCloseAutoFocus,
					focusScope,
					$$slots: { focusScope: true }
				});
			}
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@opentelemetry+api@1_2f1fbc9e1bceb9eb223fb0fd0b0b58ef/node_modules/bits-ui/dist/bits/popover/components/popover.svelte
function Popover($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, onOpenChange = noop, onOpenChangeComplete = noop, children } = $$props;
		PopoverRootState.create({
			open: boxWith(() => open, (v) => {
				open = v;
				onOpenChange(v);
			}),
			onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
		});
		Floating_layer($$renderer, {
			children: ($$renderer) => {
				children?.($$renderer);
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		bind_props($$props, { open });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/chevron-down.svelte
function Chevron_down($$renderer, $$props) {
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
			{ name: "chevron-down" },
			props,
			{
				iconNode: [["path", { "d": "m6 9 6 6 6-6" }]],
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
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/circle-check.svelte
function Circle_check($$renderer, $$props) {
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
			{ name: "circle-check" },
			props,
			{
				iconNode: [["circle", {
					"cx": "12",
					"cy": "12",
					"r": "10"
				}], ["path", { "d": "m9 12 2 2 4-4" }]],
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
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/file-text.svelte
function File_text($$renderer, $$props) {
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
			{ name: "file-text" },
			props,
			{
				iconNode: [
					["path", { "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }],
					["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
					["path", { "d": "M10 9H8" }],
					["path", { "d": "M16 13H8" }],
					["path", { "d": "M16 17H8" }]
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
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/refresh-cw.svelte
function Refresh_cw($$renderer, $$props) {
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
			{ name: "refresh-cw" },
			props,
			{
				iconNode: [
					["path", { "d": "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
					["path", { "d": "M21 3v5h-5" }],
					["path", { "d": "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
					["path", { "d": "M8 16H3v5" }]
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
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/settings.svelte
function Settings($$renderer, $$props) {
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
			{ name: "settings" },
			props,
			{
				iconNode: [["path", { "d": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }], ["circle", {
					"cx": "12",
					"cy": "12",
					"r": "3"
				}]],
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
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/triangle-alert.svelte
function Triangle_alert($$renderer, $$props) {
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
			{ name: "triangle-alert" },
			props,
			{
				iconNode: [
					["path", { "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }],
					["path", { "d": "M12 9v4" }],
					["path", { "d": "M12 17h.01" }]
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
//#region ../../node_modules/.pnpm/@lucide+svelte@0.554.0_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/@lucide/svelte/dist/icons/x.svelte
function X($$renderer, $$props) {
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
			{ name: "x" },
			props,
			{
				iconNode: [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]],
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
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/separator/separator.svelte
function Separator($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, "data-slot": dataSlot = "separator", $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Separator$1) {
				$$renderer.push("<!--[-->");
				Separator$1($$renderer, spread_props([
					{
						"data-slot": dataSlot,
						class: cn$1("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/textarea/textarea.svelte
function Textarea($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, value = void 0, class: className, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<textarea${attributes({
			"data-slot": "textarea",
			class: clsx(cn$1("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)),
			...restProps
		})}>`);
		const $$body = escape_html(value);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea>`);
		bind_props($$props, {
			ref,
			value
		});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/popover/popover-content.svelte
function Popover_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, sideOffset = 4, align = "center", portalProps, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Portal$1) {
				$$renderer.push("<!--[-->");
				Portal$1($$renderer, spread_props([portalProps, {
					children: ($$renderer) => {
						if (Popover_content$1) {
							$$renderer.push("<!--[-->");
							Popover_content$1($$renderer, spread_props([
								{
									"data-slot": "popover-content",
									sideOffset,
									align,
									class: cn$1("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--bits-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
								},
								restProps,
								{
									get ref() {
										return ref;
									},
									set ref($$value) {
										ref = $$value;
										$$settled = false;
									}
								}
							]));
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				}]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/popover/popover-trigger.svelte
function Popover_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Popover_trigger$1) {
				$$renderer.push("<!--[-->");
				Popover_trigger$1($$renderer, spread_props([
					{
						"data-slot": "popover-trigger",
						class: cn$1("", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/popover/index.js
var Root$1 = Popover;
//#endregion
//#region ../../node_modules/.pnpm/svelte-sonner@1.0.7_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/svelte-sonner/dist/internal/helpers.js
function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}
var isBrowser = typeof document !== "undefined";
//#endregion
//#region ../../node_modules/.pnpm/svelte-sonner@1.0.7_svelte@5.55.5_@typescript-eslint+types@8.57.2_/node_modules/svelte-sonner/dist/toast-state.svelte.js
var toastsCounter = 0;
var ToastState = class {
	toasts = [];
	heights = [];
	#findToastIdx = (id) => {
		const idx = this.toasts.findIndex((toast) => toast.id === id);
		if (idx === -1) return null;
		return idx;
	};
	addToast = (data) => {
		if (!isBrowser) return;
		this.toasts.unshift(data);
	};
	updateToast = ({ id, data, type, message }) => {
		const toastIdx = this.toasts.findIndex((toast) => toast.id === id);
		const toastToUpdate = this.toasts[toastIdx];
		this.toasts[toastIdx] = {
			...toastToUpdate,
			...data,
			id,
			title: message,
			type,
			updated: true
		};
	};
	create = (data) => {
		const { message, ...rest } = data;
		const id = typeof data?.id === "number" || data.id && data.id?.length > 0 ? data.id : toastsCounter++;
		const dismissable = data.dismissable === void 0 ? true : data.dismissable;
		const type = data.type === void 0 ? "default" : data.type;
		run(() => {
			if (this.toasts.find((toast) => toast.id === id)) this.updateToast({
				id,
				data,
				type,
				message,
				dismissable
			});
			else this.addToast({
				...rest,
				id,
				title: message,
				dismissable,
				type
			});
		});
		return id;
	};
	dismiss = (id) => {
		run(() => {
			if (id === void 0) {
				this.toasts = this.toasts.map((toast) => ({
					...toast,
					dismiss: true
				}));
				return;
			}
			const toastIdx = this.toasts.findIndex((toast) => toast.id === id);
			if (this.toasts[toastIdx]) this.toasts[toastIdx] = {
				...this.toasts[toastIdx],
				dismiss: true
			};
		});
		return id;
	};
	remove = (id) => {
		if (id === void 0) {
			this.toasts = [];
			return;
		}
		const toastIdx = this.#findToastIdx(id);
		if (toastIdx === null) return;
		this.toasts.splice(toastIdx, 1);
		return id;
	};
	message = (message, data) => {
		return this.create({
			...data,
			type: "default",
			message
		});
	};
	error = (message, data) => {
		return this.create({
			...data,
			type: "error",
			message
		});
	};
	success = (message, data) => {
		return this.create({
			...data,
			type: "success",
			message
		});
	};
	info = (message, data) => {
		return this.create({
			...data,
			type: "info",
			message
		});
	};
	warning = (message, data) => {
		return this.create({
			...data,
			type: "warning",
			message
		});
	};
	loading = (message, data) => {
		return this.create({
			...data,
			type: "loading",
			message
		});
	};
	promise = (promise, data) => {
		if (!data) return;
		let id = void 0;
		if (data.loading !== void 0) id = this.create({
			...data,
			promise,
			type: "loading",
			message: typeof data.loading === "string" ? data.loading : data.loading()
		});
		const p = promise instanceof Promise ? promise : promise();
		let shouldDismiss = id !== void 0;
		p.then((response) => {
			if (typeof response === "object" && response && "ok" in response && typeof response.ok === "boolean" && !response.ok) {
				shouldDismiss = false;
				const message = constructPromiseErrorMessage(response);
				this.create({
					id,
					type: "error",
					message
				});
			} else if (data.success !== void 0) {
				shouldDismiss = false;
				const message = typeof data.success === "function" ? data.success(response) : data.success;
				this.create({
					id,
					type: "success",
					message
				});
			}
		}).catch((error) => {
			if (data.error !== void 0) {
				shouldDismiss = false;
				const message = typeof data.error === "function" ? data.error(error) : data.error;
				this.create({
					id,
					type: "error",
					message
				});
			}
		}).finally(() => {
			if (shouldDismiss) {
				this.dismiss(id);
				id = void 0;
			}
			data.finally?.();
		});
		return id;
	};
	custom = (component, data) => {
		const id = data?.id || toastsCounter++;
		this.create({
			component,
			id,
			...data
		});
		return id;
	};
	removeHeight = (id) => {
		this.heights = this.heights.filter((height) => height.toastId !== id);
	};
	setHeight = (data) => {
		const toastIdx = this.#findToastIdx(data.toastId);
		if (toastIdx === null) {
			this.heights.push(data);
			return;
		}
		this.heights[toastIdx] = data;
	};
	reset = () => {
		this.toasts = [];
		this.heights = [];
	};
};
function constructPromiseErrorMessage(response) {
	if (response && typeof response === "object" && "status" in response) return `HTTP error! Status: ${response.status}`;
	return `Error! ${response}`;
}
var toastState = new ToastState();
function toastFunction(message, data) {
	return toastState.create({
		message,
		...data
	});
}
var SonnerState = class {
	/**
	* A derived state of the toasts that are not dismissed.
	*/
	#activeToasts = derived(() => toastState.toasts.filter((toast) => !toast.dismiss));
	get toasts() {
		return this.#activeToasts();
	}
};
var toast = Object.assign(toastFunction, {
	success: toastState.success,
	info: toastState.info,
	warning: toastState.warning,
	error: toastState.error,
	custom: toastState.custom,
	message: toastState.message,
	promise: toastState.promise,
	dismiss: toastState.dismiss,
	loading: toastState.loading,
	getActiveToasts: () => {
		return toastState.toasts.filter((toast) => !toast.dismiss);
	}
});
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/dialog-title.svelte
function Dialog_title($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_title$1) {
				$$renderer.push("<!--[-->");
				Dialog_title$1($$renderer, spread_props([
					{
						"data-slot": "dialog-title",
						class: cn$1("text-lg leading-none font-semibold", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/dialog-footer.svelte
function Dialog_footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "dialog-footer",
			class: clsx(cn$1("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/dialog-header.svelte
function Dialog_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "dialog-header",
			class: clsx(cn$1("flex flex-col gap-2 text-center sm:text-left", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/dialog-overlay.svelte
function Dialog_overlay($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_overlay$1) {
				$$renderer.push("<!--[-->");
				Dialog_overlay$1($$renderer, spread_props([
					{
						"data-slot": "dialog-overlay",
						class: cn$1("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/dialog-content.svelte
function Dialog_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, overlayClass, portalProps, children, showCloseButton = true, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Portal) {
				$$renderer.push("<!--[-->");
				Portal($$renderer, spread_props([portalProps, {
					children: ($$renderer) => {
						if (Dialog_overlay) {
							$$renderer.push("<!--[-->");
							Dialog_overlay($$renderer, { class: overlayClass });
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						if (Dialog_content$1) {
							$$renderer.push("<!--[-->");
							Dialog_content$1($$renderer, spread_props([
								{
									"data-slot": "dialog-content",
									class: cn$1("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className)
								},
								restProps,
								{
									get ref() {
										return ref;
									},
									set ref($$value) {
										ref = $$value;
										$$settled = false;
									},
									children: ($$renderer) => {
										children?.($$renderer);
										$$renderer.push(`<!----> `);
										if (showCloseButton) {
											$$renderer.push("<!--[0-->");
											if (Dialog_close) {
												$$renderer.push("<!--[-->");
												Dialog_close($$renderer, {
													class: "ring-offset-background focus:ring-ring absolute end-4 top-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
													children: ($$renderer) => {
														X($$renderer, {});
														$$renderer.push(`<!----> <span class="sr-only">Close</span>`);
													},
													$$slots: { default: true }
												});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]-->`);
									},
									$$slots: { default: true }
								}
							]));
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				}]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/dialog-description.svelte
function Dialog_description($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_description$1) {
				$$renderer.push("<!--[-->");
				Dialog_description$1($$renderer, spread_props([
					{
						"data-slot": "dialog-description",
						class: cn$1("text-muted-foreground text-sm", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/dialog-trigger.svelte
function Dialog_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_trigger$1) {
				$$renderer.push("<!--[-->");
				Dialog_trigger$1($$renderer, spread_props([
					{ "data-slot": "dialog-trigger" },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/dialog/index.js
var Root = Dialog;
var Portal = Portal$1;
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/command/command.svelte
function Command($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, value = "", class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command$1) {
				$$renderer.push("<!--[-->");
				Command$1($$renderer, spread_props([
					{
						"data-slot": "command",
						class: cn$1("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", className)
					},
					restProps,
					{
						get value() {
							return value;
						},
						set value($$value) {
							value = $$value;
							$$settled = false;
						},
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			ref,
			value
		});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/command/command-group.svelte
function Command_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, heading, value, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command_group$1) {
				$$renderer.push("<!--[-->");
				Command_group$1($$renderer, spread_props([
					{
						"data-slot": "command-group",
						class: cn$1("text-foreground overflow-hidden p-1", className),
						value: value ?? heading ?? `----${useId()}`
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							if (heading) {
								$$renderer.push("<!--[0-->");
								if (Command_group_heading) {
									$$renderer.push("<!--[-->");
									Command_group_heading($$renderer, {
										class: "text-muted-foreground px-2 py-1.5 text-xs font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(heading)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]--> `);
							if (Command_group_items) {
								$$renderer.push("<!--[-->");
								Command_group_items($$renderer, { children });
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						},
						$$slots: { default: true }
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/command/command-item.svelte
function Command_item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command_item$1) {
				$$renderer.push("<!--[-->");
				Command_item$1($$renderer, spread_props([
					{
						"data-slot": "command-item",
						class: cn$1("aria-selected:bg-accent aria-selected:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region ../../node_modules/.pnpm/@aphexcms+ui@0.8.3_bits-ui@2.18.1_@internationalized+date@3.12.2_@sveltejs+kit@2.59.1_@_edf5374d0cfee3716c8c36a617b516d5/node_modules/@aphexcms/ui/dist/components/ui/command/command-list.svelte
function Command_list($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command_list$1) {
				$$renderer.push("<!--[-->");
				Command_list$1($$renderer, spread_props([
					{
						"data-slot": "command-list",
						class: cn$1("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
export { DOMTypeahead as $, Dialog as A, PAGE_UP as At, Scroll_lock as B, readPath as Bt, Settings as C, CAPS_LOCK as Ct, Chevron_down as D, HOME as Dt, Circle_check as E, ESCAPE as Et, Floating_layer as F, onDestroyEffect as Ft, Dismissible_layer as G, Text_selection_layer as H, resolvePreviewTitle as Ht, FloatingArrowState as I, Previous as It, MenuItemState as J, DropdownMenuTriggerState as K, getFloatingContentCSSVars as L, watch as Lt, Popper_layer_force_mount as M, DOMContext as Mt, Popper_layer as N, afterTick as Nt, Dialog_content$1 as O, META as Ot, Floating_layer_anchor as P, afterSleep as Pt, MenuSubmenuState as Q, Dialog_description$1 as R, Context as Rt, Triangle_alert as S, ARROW_UP as St, File_text as T, ENTER as Tt, Focus_scope as U, useId as V, resolvePreviewSubtitle as Vt, Escape_layer as W, MenuRootState as X, MenuMenuState as Y, MenuSeparatorState as Z, Popover_trigger as _, isHTMLElement$1 as _t, Root as a, prev as at, Separator as b, ARROW_LEFT as bt, Dialog_content as c, AlertDialogCancelState as ct, Dialog_title as d, DialogRootState as dt, boxAutoReset as et, SonnerState as f, noop as ft, Root$1 as g, isFocusVisible as gt, cn as h, isElement$1 as ht, Command as i, next as it, SafePolygon as j, SHIFT as jt, Dialog_close as k, PAGE_DOWN as kt, Dialog_header as l, DialogActionState as lt, toastState as m, RovingFocusGroup as mt, Command_item as n, forward as nt, Dialog_trigger as o, Portal$1 as ot, toast as p, PresenceManager as pt, MenuContentState as q, Command_group as r, getNextMatch as rt, Dialog_description as s, Dialog_title$1 as st, Command_list as t, backward as tt, Dialog_footer as u, DialogContentState as ut, Popover_content as v, isIOS as vt, Refresh_cw as w, CONTROL as wt, X as x, ARROW_RIGHT as xt, Textarea as y, ARROW_DOWN as yt, Dialog_overlay$1 as z, srOnlyStyles as zt };
