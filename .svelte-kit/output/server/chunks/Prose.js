import "clsx";
import { f as derived, b as attr, k as element, ae as fallback, e as escape_html, a as ensure_array_like, c as attr_class, d as stringify, t as attr_style } from "./renderer.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./root.js";
import "./state.svelte.js";
import "./index5.js";
import { u as usePreview, s as stegaClean, a as setPortableTextField } from "./use-preview.svelte.js";
import { e as embedSrc, a as embedRatio } from "./embed.js";
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function isPortableTextSpan(node) {
  return node._type === "span" && "text" in node && typeof node.text == "string" && (typeof node.marks > "u" || Array.isArray(node.marks) && node.marks.every((mark) => typeof mark == "string"));
}
function isPortableTextBlock(node) {
  return (
    // A block doesn't _have_ to be named 'block' - to differentiate between
    // allowed child types and marks, one might name them differently
    typeof node._type == "string" && // Toolkit-types like nested spans are @-prefixed
    node._type[0] !== "@" && // `markDefs` isn't _required_ per say, but if it's there, it needs to be an array
    (!("markDefs" in node) || !node.markDefs || Array.isArray(node.markDefs) && // Every mark definition needs to have an `_key` to be mappable in child spans
    node.markDefs.every((def) => typeof def._key == "string")) && // `children` is required and needs to be an array
    "children" in node && Array.isArray(node.children) && // All children are objects with `_type` (usually spans, but can contain other stuff)
    node.children.every((child) => typeof child == "object" && "_type" in child)
  );
}
function isPortableTextListItemBlock(block) {
  return isPortableTextBlock(block) && "listItem" in block && typeof block.listItem == "string" && (typeof block.level > "u" || typeof block.level == "number");
}
function isPortableTextToolkitList(block) {
  return block._type === "@list";
}
function isPortableTextToolkitSpan(span) {
  return span._type === "@span";
}
function isPortableTextToolkitTextNode(node) {
  return node._type === "@text";
}
const knownDecorators = ["strong", "em", "code", "underline", "strike-through"];
function sortMarksByOccurences(span, index, blockChildren) {
  if (!isPortableTextSpan(span) || !span.marks) return [];
  if (!span.marks.length) return [];
  const marks = span.marks.slice(), occurences = {};
  return marks.forEach((mark) => {
    occurences[mark] = 1;
    for (let siblingIndex = index + 1; siblingIndex < blockChildren.length; siblingIndex++) {
      const sibling = blockChildren[siblingIndex];
      if (sibling && isPortableTextSpan(sibling) && Array.isArray(sibling.marks) && sibling.marks.indexOf(mark) !== -1) occurences[mark]++;
      else break;
    }
  }), marks.sort((markA, markB) => sortMarks(occurences, markA, markB));
}
function sortMarks(occurences, markA, markB) {
  const aOccurences = occurences[markA], bOccurences = occurences[markB];
  if (aOccurences !== bOccurences) return bOccurences - aOccurences;
  const aKnownPos = knownDecorators.indexOf(markA), bKnownPos = knownDecorators.indexOf(markB);
  return aKnownPos !== bKnownPos ? aKnownPos - bKnownPos : markA.localeCompare(markB);
}
function buildMarksTree(block) {
  var _a, _b;
  const {
    children
  } = block, markDefs = (_a = block.markDefs) != null ? _a : [];
  if (!children || !children.length) return [];
  const sortedMarks = children.map(sortMarksByOccurences), rootNode = {
    _type: "@span",
    children: [],
    markType: "<unknown>"
  };
  let nodeStack = [rootNode];
  for (let i = 0; i < children.length; i++) {
    const span = children[i];
    if (!span) continue;
    const marksNeeded = sortedMarks[i] || [];
    let pos = 1;
    if (nodeStack.length > 1) for (pos; pos < nodeStack.length; pos++) {
      const mark = ((_b = nodeStack[pos]) == null ? void 0 : _b.markKey) || "", index = marksNeeded.indexOf(mark);
      if (index === -1) break;
      marksNeeded.splice(index, 1);
    }
    nodeStack = nodeStack.slice(0, pos);
    let currentNode = nodeStack[nodeStack.length - 1];
    if (currentNode) {
      for (const markKey of marksNeeded) {
        const markDef = markDefs == null ? void 0 : markDefs.find((def) => def._key === markKey), markType = markDef ? markDef._type : markKey, node = {
          _type: "@span",
          _key: span._key,
          children: [],
          markDef,
          markType,
          markKey
        };
        currentNode.children.push(node), nodeStack.push(node), currentNode = node;
      }
      if (isPortableTextSpan(span)) {
        const lines = span.text.split(`
`);
        for (let line = lines.length; line-- > 1; ) lines.splice(line, 0, `
`);
        currentNode.children = currentNode.children.concat(lines.map((text) => ({
          _type: "@text",
          text
        })));
      } else currentNode.children = currentNode.children.concat(span);
    }
  }
  return rootNode.children;
}
function nestLists(blocks, mode) {
  const tree = [];
  let currentList;
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block) {
      if (!isPortableTextListItemBlock(block)) {
        tree.push(block), currentList = void 0;
        continue;
      }
      if (!currentList) {
        currentList = listFromBlock(block, i, mode), tree.push(currentList);
        continue;
      }
      if (blockMatchesList(block, currentList)) {
        currentList.children.push(block);
        continue;
      }
      if ((block.level || 1) > currentList.level) {
        const newList = listFromBlock(block, i, mode);
        {
          const lastListItem = currentList.children[currentList.children.length - 1], newLastChild = _objectSpread(_objectSpread({}, lastListItem), {}, {
            children: [...lastListItem.children, newList]
          });
          currentList.children[currentList.children.length - 1] = newLastChild;
        }
        currentList = newList;
        continue;
      }
      if ((block.level || 1) < currentList.level) {
        const matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, block);
        if (match) {
          currentList = match, currentList.children.push(block);
          continue;
        }
        currentList = listFromBlock(block, i, mode), tree.push(currentList);
        continue;
      }
      if (block.listItem !== currentList.listItem) {
        const matchingBranch = tree[tree.length - 1], match = matchingBranch && findListMatching(matchingBranch, {
          level: block.level || 1
        });
        if (match && match.listItem === block.listItem) {
          currentList = match, currentList.children.push(block);
          continue;
        } else {
          currentList = listFromBlock(block, i, mode), tree.push(currentList);
          continue;
        }
      }
      console.warn("Unknown state encountered for block", block), tree.push(block);
    }
  }
  return tree;
}
function blockMatchesList(block, list) {
  return (block.level || 1) === list.level && block.listItem === list.listItem;
}
function listFromBlock(block, index, mode) {
  return {
    _type: "@list",
    _key: `${block._key || `${index}`}-parent`,
    mode,
    level: block.level || 1,
    listItem: block.listItem,
    children: [block]
  };
}
function findListMatching(rootNode, matching) {
  const level = matching.level || 1, style = matching.listItem || "normal", filterOnType = typeof matching.listItem == "string";
  if (isPortableTextToolkitList(rootNode) && (rootNode.level || 1) === level && filterOnType && (rootNode.listItem || "normal") === style) return rootNode;
  if (!("children" in rootNode)) return;
  const node = rootNode.children[rootNode.children.length - 1];
  return node && !isPortableTextSpan(node) ? findListMatching(node, matching) : void 0;
}
function spanToPlainText(span) {
  let text = "";
  return span.children.forEach((current) => {
    isPortableTextToolkitTextNode(current) ? text += current.text : isPortableTextToolkitSpan(current) && (text += spanToPlainText(current));
  }), text;
}
const LIST_NEST_MODE_HTML = "html";
function getRandomKey() {
  return Math.random().toFixed(5).split(".")[1];
}
function assertSpanKey(span) {
  return {
    _key: span._key || getRandomKey(),
    ...span
  };
}
function assertBlockKey(block) {
  return {
    _key: block._key || getRandomKey(),
    ...block,
    ...block._type === "block" && Array.isArray(block.children) ? {
      children: block.children.map(assertSpanKey)
    } : {}
  };
}
function DefaultMark($$renderer, $$props) {
  let { portableText, children } = $$props;
  let markType = derived(() => portableText.markType);
  if (markType() === "strong") {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<strong>`);
    children?.($$renderer);
    $$renderer.push(`<!----></strong>`);
  } else if (markType() === "em") {
    $$renderer.push("<!--[1-->");
    $$renderer.push(`<em>`);
    children?.($$renderer);
    $$renderer.push(`<!----></em>`);
  } else if (markType() === "code") {
    $$renderer.push("<!--[2-->");
    $$renderer.push(`<code>`);
    children?.($$renderer);
    $$renderer.push(`<!----></code>`);
  } else if (markType() === "underline") {
    $$renderer.push("<!--[3-->");
    $$renderer.push(`<span style="text-decoration:underline;">`);
    children?.($$renderer);
    $$renderer.push(`<!----></span>`);
  } else if (markType() === "strike-through") {
    $$renderer.push("<!--[4-->");
    $$renderer.push(`<del>`);
    children?.($$renderer);
    $$renderer.push(`<!----></del>`);
  } else {
    $$renderer.push("<!--[-1-->");
    children?.($$renderer);
    $$renderer.push(`<!---->`);
  }
  $$renderer.push(`<!--]-->`);
}
function DefaultLink($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText, children } = $$props;
    let href = derived(() => {
      const { href: href2, url, link, value } = portableText.value;
      return href2 || url || link || value;
    });
    if (typeof href() === "string") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", href())}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function DefaultBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText, children } = $$props;
    let style = derived(() => portableText.value.style || "normal");
    if (["h1", "h2", "h3", "h4", "h5", "h6", "blockquote"].includes(style())) {
      $$renderer2.push("<!--[0-->");
      element($$renderer2, style(), void 0, () => {
        children?.($$renderer2);
        $$renderer2.push(`<!---->`);
      });
    } else if (style() === "normal") {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<p>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function DefaultList($$renderer, $$props) {
  let { portableText, children } = $$props;
  let value = derived(() => portableText.value);
  let listItem = derived(() => value().listItem);
  if (listItem() === "number") {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<ol>`);
    children?.($$renderer);
    $$renderer.push(`<!----></ol>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<ul>`);
    children?.($$renderer);
    $$renderer.push(`<!----></ul>`);
  }
  $$renderer.push(`<!--]-->`);
}
function DefaultListItem($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<li>`);
  children?.($$renderer);
  $$renderer.push(`<!----></li>`);
}
function DefaultHardBreak($$renderer) {
  $$renderer.push(`<br/>`);
}
function UnknownType($$renderer, $$props) {
  let { children } = $$props;
  children?.($$renderer);
  $$renderer.push(`<!---->`);
}
const defaultComponents = {
  marks: {
    "strike-through": DefaultMark,
    code: DefaultMark,
    em: DefaultMark,
    strong: DefaultMark,
    underline: DefaultMark,
    link: DefaultLink
  },
  block: {
    blockquote: DefaultBlock,
    h1: DefaultBlock,
    h2: DefaultBlock,
    h3: DefaultBlock,
    h4: DefaultBlock,
    h5: DefaultBlock,
    h6: DefaultBlock,
    normal: DefaultBlock
  },
  list: {
    bullet: DefaultList,
    number: DefaultList
  },
  listItem: {
    bullet: DefaultListItem,
    number: DefaultListItem
  },
  types: {},
  hardBreak: DefaultHardBreak,
  unknownBlockStyle: DefaultBlock,
  unknownList: DefaultList,
  unknownListItem: DefaultListItem,
  unknownMark: DefaultMark,
  unknownType: UnknownType
};
function mergeComponents(parent, overrides = {}) {
  return {
    ...parent,
    ...overrides,
    block: mergeDeeply(parent, overrides, "block"),
    list: mergeDeeply(parent, overrides, "list"),
    listItem: mergeDeeply(parent, overrides, "listItem"),
    marks: mergeDeeply(parent, overrides, "marks"),
    types: mergeDeeply(parent, overrides, "types")
  };
}
function mergeDeeply(parent, overrides, key) {
  const override = overrides[key];
  const parentVal = parent[key];
  if (typeof override === "function") {
    return override;
  }
  if (override && typeof parentVal === "function") {
    return override;
  }
  if (override) {
    return { ...parentVal, ...override };
  }
  return parentVal;
}
function RenderBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, node, indexInParent, children } = $$props;
    let components = derived(() => global.components);
    let style = derived(() => fallback(node.style, "normal"));
    let blockComponent = derived(() => typeof components().block === "function" ? components().block : components().block[style()]);
    let blockProps = derived(() => {
      return { global, indexInParent, value: node };
    });
    let BlockComponent = derived(() => blockComponent() || components().unknownBlockStyle);
    if (BlockComponent()) {
      $$renderer2.push("<!--[-->");
      BlockComponent()($$renderer2, {
        portableText: blockProps(),
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderCustomBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, node, parentBlock, indexInParent, isInline = false } = $$props;
    let components = derived(() => global.components);
    let _type = derived(() => node._type);
    let customComponent = derived(() => components().types[_type()]);
    let componentProps = derived(() => /* @__PURE__ */ (() => {
      return { global, value: node, indexInParent, parentBlock, isInline };
    })());
    let CustomComponent = derived(() => customComponent() || components().unknownType);
    if (CustomComponent()) {
      $$renderer2.push("<!--[-->");
      CustomComponent()($$renderer2, { portableText: componentProps() });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, indexInParent, node, children } = $$props;
    let listComponent = derived(() => {
      const { list } = global.components;
      return typeof list === "function" ? list : list[node.listItem];
    });
    let listProps = derived(() => ({ global, value: node, indexInParent }));
    let ListComponent = derived(() => listComponent() || global.components.unknownList);
    if (ListComponent()) {
      $$renderer2.push("<!--[-->");
      ListComponent()($$renderer2, {
        portableText: listProps(),
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderListItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, indexInParent, node, children } = $$props;
    let components = derived(() => global.components);
    let style = derived(() => node.style ?? "normal");
    let listItemComponent = derived(() => typeof components().listItem === "function" ? components().listItem : components().listItem[style()]);
    let StyleComponent = derived(() => style() !== "normal" ? components().block[style()] : void 0);
    let listItemProps = derived(() => ({ global, value: node, indexInParent }));
    let ListItemComponent = derived(() => listItemComponent() || components().unknownListItem);
    if (ListItemComponent()) {
      $$renderer2.push("<!--[-->");
      ListItemComponent()($$renderer2, {
        portableText: listItemProps(),
        children: ($$renderer3) => {
          if (StyleComponent()) {
            $$renderer3.push("<!--[0-->");
            if (StyleComponent()) {
              $$renderer3.push("<!--[-->");
              StyleComponent()($$renderer3, {
                portableText: { ...listItemProps(), value: { ...node, listItem: void 0 } },
                children: ($$renderer4) => {
                  children?.($$renderer4);
                  $$renderer4.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer3.push("<!--]-->");
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push("<!--]-->");
            }
          } else {
            $$renderer3.push("<!--[-1-->");
            children?.($$renderer3);
            $$renderer3.push(`<!---->`);
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderSpan($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, node, parentBlock, children } = $$props;
    let markComponent = derived(() => global.components.marks[node.markType]);
    let markProps = derived(() => ({
      global,
      parentBlock,
      markType: node.markType,
      // @ts-expect-error @TODO
      value: node.markDef,
      markKey: node.markKey,
      plainTextContent: spanToPlainText(node)
    }));
    let MarkComponent = derived(() => markComponent() || global.components.unknownMark);
    if (MarkComponent()) {
      $$renderer2.push("<!--[-->");
      MarkComponent()($$renderer2, {
        portableText: markProps(),
        children: ($$renderer3) => {
          children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push("<!--]-->");
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push("<!--]-->");
    }
  });
}
function RenderText($$renderer, $$props) {
  let { global, node } = $$props;
  let components = derived(() => global.components);
  let text = derived(() => node.text);
  if (text() === "\n") {
    $$renderer.push("<!--[0-->");
    if (typeof components().hardBreak === "function") {
      $$renderer.push("<!--[0-->");
      if (components.hardBreak) {
        $$renderer.push("<!--[-->");
        components.hardBreak($$renderer, {});
        $$renderer.push("<!--]-->");
      } else {
        $$renderer.push("<!--[!-->");
        $$renderer.push("<!--]-->");
      }
    } else {
      $$renderer.push("<!--[-1-->");
      $$renderer.push(`${escape_html(text())}`);
    }
    $$renderer.push(`<!--]-->`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`${escape_html(text())}`);
  }
  $$renderer.push(`<!--]-->`);
}
function RenderNode_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { global, options } = $$props;
    let node = derived(() => options.node), indexInParent = derived(() => options.indexInParent), parentBlock = derived(() => options.parentBlock), isInline = derived(() => options.isInline);
    if (isPortableTextToolkitList(node())) {
      $$renderer2.push("<!--[0-->");
      RenderList($$renderer2, {
        node: node(),
        indexInParent: indexInParent(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(node().children);
          for (let childIndex = 0, $$length = each_array.length; childIndex < $$length; childIndex++) {
            let child = each_array[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                node: child,
                indexInParent: childIndex,
                parentBlock: void 0,
                isInline: void 0
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextListItemBlock(node())) {
      $$renderer2.push("<!--[1-->");
      RenderListItem($$renderer2, {
        node: node(),
        indexInParent: indexInParent(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(buildMarksTree(node()));
          for (let childIndex = 0, $$length = each_array_1.length; childIndex < $$length; childIndex++) {
            let child = each_array_1[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                parentBlock: node(),
                node: child,
                isInline: true,
                indexInParent: childIndex
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextToolkitSpan(node())) {
      $$renderer2.push("<!--[2-->");
      RenderSpan($$renderer2, {
        node: node(),
        parentBlock: parentBlock(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_2 = ensure_array_like(node().children);
          for (let childIndex = 0, $$length = each_array_2.length; childIndex < $$length; childIndex++) {
            let child = each_array_2[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                parentBlock: parentBlock(),
                node: child,
                isInline: true,
                indexInParent: childIndex
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextBlock(node())) {
      $$renderer2.push("<!--[3-->");
      RenderBlock($$renderer2, {
        node: node(),
        indexInParent: indexInParent(),
        global,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_3 = ensure_array_like(buildMarksTree(node()));
          for (let childIndex = 0, $$length = each_array_3.length; childIndex < $$length; childIndex++) {
            let child = each_array_3[childIndex];
            RenderNode_1($$renderer3, {
              options: {
                parentBlock: node(),
                node: child,
                isInline: true,
                indexInParent: childIndex
              },
              global
            });
          }
          $$renderer3.push(`<!--]-->`);
        }
      });
    } else if (isPortableTextToolkitTextNode(node())) {
      $$renderer2.push("<!--[4-->");
      RenderText($$renderer2, { node: node(), global });
    } else if (node()) {
      $$renderer2.push("<!--[5-->");
      RenderCustomBlock($$renderer2, {
        node: node(),
        parentBlock: parentBlock(),
        indexInParent: indexInParent(),
        isInline: isInline(),
        global
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
const getTemplate = (type, prop) => `Unknown ${type}, specify a component for it in the \`components${prop ? "." : ""}${prop}\` prop`;
const getWarningMessage = (type, nodeType) => {
  switch (nodeType) {
    case "block":
      return getTemplate(`block type "${type}"`, "types");
    case "blockStyle":
      return getTemplate(`block style "${type}"`, "block");
    case "listItemStyle":
      return getTemplate(`list item style "${type}"`, "listItem");
    case "listStyle":
      return getTemplate(`list style "${type}"`, "list");
    case "mark":
      return getTemplate(`mark type "${type}"`, "marks");
    default:
      return getTemplate("type");
  }
};
function printWarning(message) {
  console.warn(message);
}
function PortableText($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = [],
      components,
      context = {},
      onMissingComponent = true
    } = $$props;
    let mergedComponents = derived(() => mergeComponents(defaultComponents, components));
    let keyedBlocks = derived(() => (Array.isArray(value) ? value : [value]).map(assertBlockKey));
    let blocks = derived(() => nestLists(keyedBlocks(), LIST_NEST_MODE_HTML));
    let missingComponentHandler = derived(() => (type, nodeType) => {
      if (onMissingComponent === false) {
        return;
      }
      const message = getWarningMessage(type, nodeType);
      if (typeof onMissingComponent === "function") {
        onMissingComponent(message, { type, nodeType });
        return;
      }
      printWarning(message);
    });
    $$renderer2.push(`<!--[-->`);
    const each_array = ensure_array_like(blocks());
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let node = each_array[index];
      RenderNode_1($$renderer2, {
        global: {
          components: mergedComponents(),
          missingComponentHandler: missingComponentHandler(),
          context,
          ptBlocks: blocks(),
          ptRawValue: value
        },
        options: { node, isInline: false, indexInParent: index }
      });
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Image($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const ve = usePreview();
    const assetRef = derived(() => portableText.value.asset?._ref);
    const $$d = derived(() => ve.image(portableText.value)), src = derived(() => $$d().src), alt = derived(() => $$d().alt);
    if (src()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<figure class="blog-figure svelte-1cifzn6"><img${attr("src", src())}${attr("alt", ve.encode(alt(), { blockKey: portableText.value._key }))} loading="lazy" class="svelte-1cifzn6"/></figure>`);
    } else if (assetRef()) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="blog-figure blog-figure--missing svelte-1cifzn6">Image not found</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Callout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const tone = derived(() => stegaClean(portableText.value.tone ?? "info"));
    const label = derived(() => tone() === "warning" ? "Heads up" : tone() === "error" ? "Important" : "Note");
    $$renderer2.push(`<aside${attr_class(`callout callout--${stringify(tone())}`, "svelte-14wpigl")}><span class="callout__label svelte-14wpigl">${escape_html(label())}</span> <p class="svelte-14wpigl">${escape_html(portableText.value.text ?? "")}</p></aside>`);
  });
}
function CodeBlock($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const source = derived(() => portableText.value.code ?? "");
    const language = derived(() => stegaClean(portableText.value.language ?? "text").trim().toLowerCase() || "text");
    const languageLabel = derived(() => language() === "text" ? "Plain text" : language());
    $$renderer2.push(`<figure class="codeblock svelte-gpuaij"><div class="codeblock__bar svelte-gpuaij"><span class="codeblock__dots svelte-gpuaij"><i class="svelte-gpuaij"></i><i class="svelte-gpuaij"></i><i class="svelte-gpuaij"></i></span> <span class="codeblock__lang svelte-gpuaij">${escape_html(languageLabel())}</span> <button class="codeblock__copy svelte-gpuaij" type="button" aria-label="Copy code to clipboard">${escape_html("Copy")}</button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<pre class="svelte-gpuaij"><code>${escape_html(source())}</code></pre>`);
    }
    $$renderer2.push(`<!--]--></figure>`);
  });
}
function Embed($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const code = derived(() => stegaClean(portableText.value.embedCode ?? "").trim());
    const src = derived(() => embedSrc(code()));
    const ratio = derived(() => embedRatio(code()));
    const caption = derived(() => portableText.value.caption ?? "");
    if (src()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<figure class="embed svelte-2kcbem"><div class="embed__frame svelte-2kcbem"${attr_style("", { "aspect-ratio": ratio() })}><iframe${attr("src", src())}${attr("title", caption() || "Embedded content")} loading="lazy" allowfullscreen="" referrerpolicy="strict-origin-when-cross-origin" class="svelte-2kcbem"></iframe></div> `);
      if (caption()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<figcaption class="svelte-2kcbem">${escape_html(caption())}</figcaption>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></figure>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="embed__empty svelte-2kcbem">Embed: paste an &lt;iframe> snippet or a direct embed URL.</p>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Toggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const heading = derived(() => portableText.value.heading ?? "");
    const content = derived(() => portableText.value.content ?? "");
    $$renderer2.push(`<details class="toggle svelte-1bxd0r5"><summary class="toggle__summary svelte-1bxd0r5"><span>${escape_html(heading())}</span> <svg class="toggle__chevron svelte-1bxd0r5" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2"></path></svg></summary> <div class="toggle__content svelte-1bxd0r5">${escape_html(content())}</div></details>`);
  });
}
function Divider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const style = derived(() => stegaClean(portableText.value.style ?? "line"));
    if (style() === "dots") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="divider divider--dots svelte-17n4yo6" role="separator" aria-orientation="horizontal"><span class="svelte-17n4yo6"></span><span class="svelte-17n4yo6"></span><span class="svelte-17n4yo6"></span></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<hr class="divider divider--line svelte-17n4yo6"/>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const style = derived(() => stegaClean(portableText.value.style ?? "primary"));
    const align = derived(() => stegaClean(portableText.value.align ?? "center"));
    const url = derived(() => stegaClean(portableText.value.url ?? ""));
    const label = derived(() => portableText.value.label ?? "");
    const href = derived(() => {
      if (!url()) return null;
      if (url().startsWith("/") && !url().startsWith("//")) return url();
      try {
        const parsed = new URL(url());
        return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : null;
      } catch {
        return null;
      }
    });
    const external = derived(() => href() ? !href().startsWith("/") : false);
    if (href() && label()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class(`btn-wrap btn-wrap--${stringify(align())}`, "svelte-8ko8nl")}><a${attr_class(`btn btn--${stringify(style())}`, "svelte-8ko8nl")}${attr("href", href())}${attr("rel", external() ? "noopener noreferrer" : void 0)}${attr("target", external() ? "_blank" : void 0)}>${escape_html(label())}</a></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Gallery($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText } = $$props;
    const ve = usePreview();
    const items = derived(() => (portableText.value.images ?? []).map((img, i) => ({ key: img._key ?? String(i), ...ve.image(img) })).filter((img) => Boolean(img.src)));
    const caption = derived(() => portableText.value.caption ?? "");
    const columns = derived(() => Math.min(items().length, 3));
    if (items().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<figure class="gallery svelte-1tjrv3b"><div class="gallery__grid svelte-1tjrv3b"${attr_style("", { "--cols": columns() })}><!--[-->`);
      const each_array = ensure_array_like(items());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let img = each_array[$$index];
        $$renderer2.push(`<img${attr("src", img.src)}${attr("alt", img.alt ?? "")} loading="lazy" class="svelte-1tjrv3b"/>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (caption()) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<figcaption class="svelte-1tjrv3b">${escape_html(caption())}</figcaption>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></figure>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function CodeStyle($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<pre class="codestyle svelte-3jqzev"><code>`);
  children($$renderer);
  $$renderer.push(`<!----></code></pre>`);
}
function LinkMark($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { portableText, children } = $$props;
    $$renderer2.push(`<a class="blog-link svelte-13aaw0k"${attr("href", portableText.value?.href ?? "#")}${attr("target", portableText.value?.blank ? "_blank" : void 0)}${attr("rel", portableText.value?.blank ? "noopener noreferrer" : void 0)}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></a>`);
  });
}
function Prose($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value, field = "content" } = $$props;
    setPortableTextField(() => field);
    const components = {
      types: {
        image: Image,
        callout: Callout,
        codeBlock: CodeBlock,
        embed: Embed,
        toggle: Toggle,
        divider: Divider,
        button: Button,
        gallery: Gallery
      },
      block: { code: CodeStyle },
      marks: { link: LinkMark }
    };
    $$renderer2.push(`<div class="prose svelte-qz3o3k">`);
    PortableText($$renderer2, { value, components, onMissingComponent: false });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  Prose as P
};
