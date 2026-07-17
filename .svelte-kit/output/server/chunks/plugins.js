import "./date-utils.js";
import { d as documents } from "./instance2.js";
import { f as derived, u as props_id, h as attributes, j as bind_props, e as escape_html, b as attr, l as spread_props, d as stringify, a as ensure_array_like, c as attr_class, i as clsx, t as attr_style } from "./renderer.js";
import { B as Button } from "./button.js";
import { C as Context, h as afterTick, I as getFirstNonCommentChild, E as ENTER, q as END, H as HOME, J as ARROW_LEFT, A as ARROW_UP, K as h, L as k, M as p, N as ARROW_RIGHT, l as ARROW_DOWN, O as l, Q as j, U as n, w as watch, n as noop, j as PresenceManager, D as DOMContext, V as isTouch, S as SPACE, W as SafePolygon, X as isElement, Y as isTabbable, y as Popper_layer_force_mount, z as Popper_layer, v as getFloatingContentCSSVars, B as Floating_layer, P as Portal, Z as useId, _ as resolvePreviewSubtitle, $ as readPath } from "./safe-polygon.svelte.js";
import { I as Icon } from "./Icon.js";
import { t as toast } from "./toast-state.svelte.js";
import { I as Input } from "./input.js";
import { s as snapshot, T as Textarea } from "./textarea.js";
import { c as cn } from "./utils2.js";
import "clsx";
import { a as attachRef, f as boolToEmptyStrOrUndef, g as boolToStr, d as createBitsAttrs, e as createId, b as boxWith, m as mergeProps, k as getDataOpenClosed, l as getDataTransitionAttrs } from "./create-id.js";
import { s as srOnlyStyles } from "./sr-only-styles.js";
import { tv } from "tailwind-variants";
import { F as Floating_layer_anchor, C as Chevron_down } from "./chevron-down.js";
function preserveAuthored(authored, built, sugarKeys) {
  const rest = { ...authored };
  delete rest.type;
  for (const key of sugarKeys)
    delete rest[key];
  const builtRecord = built;
  const merged = {
    ...builtRecord,
    ...rest,
    // Re-assert what the desugaring defines: the author wrote `type: 'color'`,
    // not the object it expands to.
    type: builtRecord.type,
    // An author who explicitly asked for a different widget still wins; otherwise
    // the builder's widget is the whole point of the field type.
    input: rest.input ?? builtRecord.input,
    // Merged, not replaced: the builder derives options from the sugar keys
    // (color's `alpha` → `inputOptions.alpha`), so letting an authored
    // `inputOptions` win wholesale would silently drop them. Authored keys still
    // win individually.
    inputOptions: mergeInputOptions(builtRecord.inputOptions, rest.inputOptions)
  };
  if ("fields" in builtRecord)
    merged.fields = builtRecord.fields;
  return merged;
}
function mergeInputOptions(built, authored) {
  const isRecord = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
  if (!isRecord(built))
    return isRecord(authored) ? authored : void 0;
  if (!isRecord(authored))
    return built;
  return { ...built, ...authored };
}
function expandFields(fields, options) {
  const sugarKeys = options.sugarKeys ?? [];
  return fields.map((field) => {
    if (field.type === options.type) {
      return preserveAuthored(field, options.build(field), sugarKeys);
    }
    if (field.type === "object" && Array.isArray(field.fields)) {
      return { ...field, fields: expandFields(field.fields, options) };
    }
    if (field.type === "array" && Array.isArray(field.of)) {
      return { ...field, of: field.of.map((member) => expandMember(member, options)) };
    }
    return field;
  });
}
function expandMember(member, options) {
  if (member.type === options.type) {
    const authored = { ...member, name: member.name ?? options.type };
    const built = options.build(authored);
    return preserveAuthored(authored, built, options.sugarKeys ?? []);
  }
  if (Array.isArray(member.fields)) {
    return { ...member, fields: expandFields(member.fields, options) };
  }
  return member;
}
function desugarFieldType(schemas, options) {
  return schemas.map((schema) => "fields" in schema && Array.isArray(schema.fields) ? { ...schema, fields: expandFields(schema.fields, options) } : schema);
}
function definePlugin(plugin) {
  return plugin;
}
function findNextSibling(el, selector) {
  let sibling = el.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector))
      return sibling;
    sibling = sibling.nextElementSibling;
  }
}
function findPreviousSibling(el, selector) {
  let sibling = el.previousElementSibling;
  while (sibling) {
    if (sibling.matches(selector))
      return sibling;
    sibling = sibling.previousElementSibling;
  }
}
function cssEscape(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }
  const length = value.length;
  let index = -1;
  let codeUnit;
  let result = "";
  const firstCodeUnit = value.charCodeAt(0);
  if (length === 1 && firstCodeUnit === 45)
    return "\\" + value;
  while (++index < length) {
    codeUnit = value.charCodeAt(index);
    if (codeUnit === 0) {
      result += "�";
      continue;
    }
    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is U+007F
      codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || // If the character is the first character and is in the range [0-9] (U+0030 to U+0039)
      index === 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9] (U+0030 to U+0039)
      // and the first character is a `-` (U+002D)
      index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45
    ) {
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
const COMMAND_VALUE_ATTR = "data-value";
const commandAttrs = createBitsAttrs({
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
const COMMAND_GROUP_SELECTOR = commandAttrs.selector("group");
const COMMAND_GROUP_ITEMS_SELECTOR = commandAttrs.selector("group-items");
const COMMAND_GROUP_HEADING_SELECTOR = commandAttrs.selector("group-heading");
const COMMAND_ITEM_SELECTOR = commandAttrs.selector("item");
const COMMAND_VALID_ITEM_SELECTOR = `${commandAttrs.selector("item")}:not([aria-disabled="true"])`;
const CommandRootContext = new Context("Command.Root");
const CommandListContext = new Context("Command.List");
const CommandGroupContainerContext = new Context("Command.Group");
const defaultState = {
  search: "",
  value: "",
  filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() }
};
class CommandRootState {
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
  // attempt to prevent the harsh delay when user is typing fast
  key = 0;
  viewportNode = null;
  inputNode = null;
  labelNode = null;
  // published state that the components and other things can react to
  commandState = defaultState;
  // internal state that we mutate in batches and publish to the `state` at once
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
      const hasStateChanged = !Object.is(this.commandState, currentState);
      if (hasStateChanged) {
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
    const defaults2 = { ...this._commandState, value: this.opts.value.current ?? "" };
    this._commandState = defaults2;
    this.commandState = defaults2;
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
    const score = value ? filter(value, this._commandState.search, keywords) : 0;
    return score;
  }
  /**
   * Sorts items and groups based on search scores.
   * Groups are sorted by their highest scoring item.
   * When no search active, selects first item.
   */
  #sort() {
    if (!this._commandState.search || this.opts.shouldFilter.current === false) {
      if (!this._commandState.value || !this.#isInitialMount) {
        this.#selectFirstItem();
      } else if (this.#isInitialMount && this._commandState.value) {
        this.#scrollInitialValue();
      }
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
      const scoresB = scores.get(valueB) ?? 0;
      return scoresB - scoresA;
    });
    for (const item of sorted) {
      const group = item.closest(COMMAND_GROUP_ITEMS_SELECTOR);
      if (group) {
        const itemToAppend = item.parentElement === group ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
        if (itemToAppend) {
          group.appendChild(itemToAppend);
        }
      } else {
        const itemToAppend = item.parentElement === listInsertionElement ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
        if (itemToAppend) {
          listInsertionElement?.appendChild(itemToAppend);
        }
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
    if (value !== this.opts.value.current && value === "") {
      afterTick(() => {
        this.key++;
      });
    }
    this.setState("value", value, opts);
    this.opts.value.current = value;
  }
  /**
   * Selects first non-disabled item on next tick.
   */
  #selectFirstItem() {
    afterTick(() => {
      const item = this.getValidItems().find((item2) => item2.getAttribute("aria-disabled") !== "true");
      const value = item?.getAttribute(COMMAND_VALUE_ATTR);
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
      const shouldPreventScroll = this.opts.disableInitialScroll.current;
      if (!shouldPreventScroll) {
        this.#scrollSelectedIntoView();
      }
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
    for (const [groupId, group] of this.allGroups) {
      for (const itemId of group) {
        const currItem = this._commandState.filtered.items.get(itemId);
        if (currItem && currItem > 0) {
          this._commandState.filtered.groups.add(groupId);
          break;
        }
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
    const validItems = Array.from(node.querySelectorAll(COMMAND_VALID_ITEM_SELECTOR)).filter((el) => !!el);
    return validItems;
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
    const visibleItems = Array.from(node.querySelectorAll(COMMAND_ITEM_SELECTOR)).filter((el) => !!el);
    return visibleItems;
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
        grid.push([{ index: i, firstRowOfGroup: true, ref: item }]);
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
          const closestGroupHeader = item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR);
          closestGroupHeader?.scrollIntoView({ block: "nearest" });
          return;
        }
      } else {
        const firstChildOfParent = getFirstNonCommentChild(grandparent);
        if (firstChildOfParent && firstChildOfParent.dataset?.value === item.dataset?.value) {
          const closestGroupHeader = item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR);
          closestGroupHeader?.scrollIntoView({ block: "nearest" });
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
    if (this.opts.loop.current) {
      newSelected = index + change < 0 ? items[items.length - 1] : index + change === items.length ? items[0] : items[index + change];
    }
    if (newSelected) {
      this.setValue(newSelected.getAttribute(COMMAND_VALUE_ATTR) ?? "");
    }
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
    const selected = this.#getSelectedItem();
    let group = selected?.closest(COMMAND_GROUP_SELECTOR);
    let item;
    while (group && !item) {
      group = change > 0 ? findNextSibling(group, COMMAND_GROUP_SELECTOR) : findPreviousSibling(group, COMMAND_GROUP_SELECTOR);
      item = group?.querySelector(COMMAND_VALID_ITEM_SELECTOR);
    }
    if (item) {
      this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
    } else {
      this.updateSelectedByItem(change);
    }
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
    if (!(value && value === this.allIds.get(value)?.value)) {
      this.allIds.set(value, { value, keywords });
    }
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
    if (groupId) {
      if (!this.allGroups.has(groupId)) {
        this.allGroups.set(groupId, /* @__PURE__ */ new Set([id]));
      } else {
        this.allGroups.get(groupId).add(id);
      }
    }
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
      if (selectedItem?.getAttribute("id") === id) {
        this.#selectFirstItem();
      }
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
    if (!this.allGroups.has(id)) {
      this.allGroups.set(id, /* @__PURE__ */ new Set());
    }
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
    if (e.metaKey) {
      this.#last();
    } else if (e.altKey) {
      this.updateSelectedByGroup(1);
    } else {
      this.updateSelectedByItem(1);
    }
  }
  #down(e) {
    if (this.opts.columns.current === null) return;
    e.preventDefault();
    if (e.metaKey) {
      this.updateSelectedByGroup(1);
    } else {
      this.updateSelectedByItem(this.#nextRowColumnOffset(e));
    }
  }
  #getColumn(item, grid) {
    if (grid.length === 0) return null;
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r];
      if (row === void 0) continue;
      for (let c = 0; c < row.length; c++) {
        const column = row[c];
        if (column === void 0 || column.ref !== item) continue;
        return { columnIndex: c, rowIndex: r };
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
    if (e.altKey && column.rowIndex === grid.length - 2 && !this.opts.loop.current) {
      newItem = this.#findNextNonDisabledItem({
        start: grid.length - 1,
        end: grid.length,
        expectedColumnIndex: column.columnIndex,
        grid
      });
    } else if (column.rowIndex === grid.length - 1) {
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
      if (newItem === null && this.opts.loop.current) {
        newItem = this.#findNextNonDisabledItem({
          start: 0,
          end: column.rowIndex,
          expectedColumnIndex: column.columnIndex,
          grid
        });
      }
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
      if (newItem === null) {
        for (let i = row.length - 1; i >= 0; i--) {
          const item = row[row.length - 1];
          if (item === void 0 || itemIsDisabled(item.ref)) continue;
          newItem = item.ref;
          break;
        }
      }
      break;
    }
    return newItem;
  }
  #calculateOffset(selected, newSelected) {
    if (newSelected === null) return 0;
    const items = this.getValidItems();
    const ogIndex = items.findIndex((item) => item === selected);
    const newIndex = items.findIndex((item) => item === newSelected);
    return newIndex - ogIndex;
  }
  #up(e) {
    if (this.opts.columns.current === null) return;
    e.preventDefault();
    if (e.metaKey) {
      this.updateSelectedByGroup(-1);
    } else {
      this.updateSelectedByItem(this.#previousRowColumnOffset(e));
    }
  }
  #previousRowColumnOffset(e) {
    const grid = this.itemsGrid;
    const selected = this.#getSelectedItem();
    if (selected === void 0) return 0;
    const column = this.#getColumn(selected, grid);
    if (column === null) return 0;
    let newItem = null;
    const skipRows = e.altKey ? 1 : 0;
    if (e.altKey && column.rowIndex === 1 && this.opts.loop.current === false) {
      newItem = this.#findNextNonDisabledItemDesc({
        start: 0,
        end: 0,
        expectedColumnIndex: column.columnIndex,
        grid
      });
    } else if (column.rowIndex === 0) {
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
      if (newItem === null && this.opts.loop.current) {
        newItem = this.#findNextNonDisabledItemDesc({
          start: grid.length - 1,
          end: column.rowIndex + 1,
          expectedColumnIndex: column.columnIndex,
          grid
        });
      }
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
      if (newItem === null) {
        for (let i = row.length - 1; i >= 0; i--) {
          const item = row[row.length - 1];
          if (item === void 0 || itemIsDisabled(item.ref)) continue;
          newItem = item.ref;
          break;
        }
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
    if (e.metaKey) {
      this.updateSelectedToIndex(0);
    } else if (e.altKey) {
      this.updateSelectedByGroup(-1);
    } else {
      this.updateSelectedByItem(-1);
    }
  }
  onkeydown(e) {
    const isVim = this.opts.vimBindings.current && e.ctrlKey;
    switch (e.key) {
      case n:
      case j: {
        if (isVim) {
          if (this.isGrid) {
            this.#down(e);
          } else {
            this.#next(e);
          }
        }
        break;
      }
      case l: {
        if (isVim) {
          if (this.isGrid) {
            this.#next(e);
          }
        }
        break;
      }
      case ARROW_DOWN:
        if (this.isGrid) {
          this.#down(e);
        } else {
          this.#next(e);
        }
        break;
      case ARROW_RIGHT:
        if (!this.isGrid) break;
        this.#next(e);
        break;
      case p:
      case k: {
        if (isVim) {
          if (this.isGrid) {
            this.#up(e);
          } else {
            this.#prev(e);
          }
        }
        break;
      }
      case h: {
        if (isVim && this.isGrid) {
          this.#prev(e);
        }
        break;
      }
      case ARROW_UP:
        if (this.isGrid) {
          this.#up(e);
        } else {
          this.#prev(e);
        }
        break;
      case ARROW_LEFT:
        if (!this.isGrid) break;
        this.#prev(e);
        break;
      case HOME:
        e.preventDefault();
        this.updateSelectedToIndex(0);
        break;
      case END:
        e.preventDefault();
        this.#last();
        break;
      case ENTER: {
        if (!e.isComposing && e.keyCode !== 229) {
          e.preventDefault();
          const item = this.#getSelectedItem();
          if (item) {
            item?.click();
          }
        }
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
}
function itemIsDisabled(item) {
  return item.getAttribute("aria-disabled") === "true";
}
class CommandGroupContainerState {
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
}
class CommandGroupHeadingState {
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
}
class CommandGroupItemsState {
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
}
class CommandItemState {
  static create(opts) {
    const group = CommandGroupContainerContext.getOr(null);
    return new CommandItemState({ ...opts, group }, CommandRootContext.get());
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
    if (this.#trueForceMount() || this.root.opts.shouldFilter.current === false || !this.root.commandState.search) {
      return true;
    }
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
    watch(
      [
        () => this.trueValue,
        () => this.#group?.trueValue,
        () => this.opts.forceMount.current
      ],
      () => {
        if (this.opts.forceMount.current || !this.trueValue) return;
        return this.root.registerItem(this.trueValue, this.#group?.trueValue);
      }
    );
    watch([() => this.opts.value.current, () => this.opts.ref.current], () => {
      if (this.opts.value.current) {
        this.trueValue = this.opts.value.current;
      } else if (this.opts.ref.current?.textContent) {
        this.trueValue = this.opts.ref.current.textContent.trim();
      }
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
}
class CommandListState {
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
}
class CommandLabelState {
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
}
function _command_label($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const labelState = CommandLabelState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, labelState.props));
    $$renderer2.push(`<label${attributes({ ...mergedProps() })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></label>`);
    bind_props($$props, { ref });
  });
}
function Command$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      value = "",
      onValueChange = noop,
      onStateChange = noop,
      loop = false,
      shouldFilter = true,
      filter = computeCommandScore,
      label = "",
      vimBindings = true,
      disablePointerSelection = false,
      disableInitialScroll = false,
      columns = null,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
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
    const updateSelectedToIndex = (i) => rootState.updateSelectedToIndex(i);
    const updateSelectedByGroup = (c) => rootState.updateSelectedByGroup(c);
    const updateSelectedByItem = (c) => rootState.updateSelectedByItem(c);
    const getValidItems = () => rootState.getValidItems();
    const mergedProps = derived(() => mergeProps(restProps, rootState.props));
    function Label($$renderer3) {
      _command_label($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html(label)}`);
        },
        $$slots: { default: true }
      });
    }
    if (child) {
      $$renderer2.push("<!--[0-->");
      Label($$renderer2);
      $$renderer2.push(`<!----> `);
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      Label($$renderer2);
      $$renderer2.push(`<!----> `);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
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
function Command_group$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      value = "",
      forceMount = false,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const groupState = CommandGroupContainerState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      forceMount: boxWith(() => forceMount),
      value: boxWith(() => value)
    });
    const mergedProps = derived(() => mergeProps(restProps, groupState.props));
    if (child) {
      $$renderer2.push("<!--[0-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Command_group_heading($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const headingState = CommandGroupHeadingState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, headingState.props));
    if (child) {
      $$renderer2.push("<!--[0-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Command_group_items($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const groupItemsState = CommandGroupItemsState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = derived(() => mergeProps(restProps, groupItemsState.props));
    $$renderer2.push(`<div style="display: contents;">`);
    if (child) {
      $$renderer2.push("<!--[0-->");
      child($$renderer2, { props: mergedProps() });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { ref });
  });
}
function Command_item$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      value = "",
      disabled = false,
      children,
      child,
      onSelect = noop,
      forceMount = false,
      keywords = [],
      $$slots,
      $$events,
      ...restProps
    } = $$props;
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
    $$renderer2.push(`<!---->`);
    {
      $$renderer2.push(`<div style="display: contents;" data-item-wrapper=""${attr("data-value", itemState.trueValue)}>`);
      if (itemState.shouldRender) {
        $$renderer2.push("<!--[0-->");
        if (child) {
          $$renderer2.push("<!--[0-->");
          child($$renderer2, { props: mergedProps() });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
          children?.($$renderer2);
          $$renderer2.push(`<!----></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!---->`);
    bind_props($$props, { ref });
  });
}
function Command_list$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      child,
      children,
      "aria-label": ariaLabel,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const listState = CommandListState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      ariaLabel: boxWith(() => ariaLabel ?? "Suggestions...")
    });
    const mergedProps = derived(() => mergeProps(restProps, listState.props));
    $$renderer2.push(`<!---->`);
    {
      if (child) {
        $$renderer2.push("<!--[0-->");
        child($$renderer2, { props: mergedProps() });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div${attributes({ ...mergedProps() })}>`);
        children?.($$renderer2);
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!---->`);
    bind_props($$props, { ref });
  });
}
const SCORE_CONTINUE_MATCH = 1;
const SCORE_SPACE_WORD_JUMP = 0.9;
const SCORE_NON_SPACE_WORD_JUMP = 0.8;
const SCORE_CHARACTER_JUMP = 0.17;
const SCORE_TRANSPOSITION = 0.1;
const PENALTY_SKIPPED = 0.999;
const PENALTY_CASE_MISMATCH = 0.9999;
const PENALTY_NOT_COMPLETE = 0.99;
const IS_GAP_REGEXP = /[\\/_+.#"@[({&]/;
const COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g;
const IS_SPACE_REGEXP = /[\s-]/;
const COUNT_SPACE_REGEXP = /[\s-]/g;
function computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, stringIndex, abbreviationIndex, memoizedResults) {
  if (abbreviationIndex === abbreviation.length) {
    if (stringIndex === string.length)
      return SCORE_CONTINUE_MATCH;
    return PENALTY_NOT_COMPLETE;
  }
  const memoizeKey = `${stringIndex},${abbreviationIndex}`;
  if (memoizedResults[memoizeKey] !== void 0)
    return memoizedResults[memoizeKey];
  const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
  let index = lowerString.indexOf(abbreviationChar, stringIndex);
  let highScore = 0;
  let score, transposedScore, wordBreaks, spaceBreaks;
  while (index >= 0) {
    score = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 1, memoizedResults);
    if (score > highScore) {
      if (index === stringIndex) {
        score *= SCORE_CONTINUE_MATCH;
      } else if (IS_GAP_REGEXP.test(string.charAt(index - 1))) {
        score *= SCORE_NON_SPACE_WORD_JUMP;
        wordBreaks = string.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
        if (wordBreaks && stringIndex > 0) {
          score *= PENALTY_SKIPPED ** wordBreaks.length;
        }
      } else if (IS_SPACE_REGEXP.test(string.charAt(index - 1))) {
        score *= SCORE_SPACE_WORD_JUMP;
        spaceBreaks = string.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
        if (spaceBreaks && stringIndex > 0) {
          score *= PENALTY_SKIPPED ** spaceBreaks.length;
        }
      } else {
        score *= SCORE_CHARACTER_JUMP;
        if (stringIndex > 0) {
          score *= PENALTY_SKIPPED ** (index - stringIndex);
        }
      }
      if (string.charAt(index) !== abbreviation.charAt(abbreviationIndex)) {
        score *= PENALTY_CASE_MISMATCH;
      }
    }
    if (score < SCORE_TRANSPOSITION && lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1) || lowerAbbreviation.charAt(abbreviationIndex + 1) === lowerAbbreviation.charAt(abbreviationIndex) && lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex)) {
      transposedScore = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 2, memoizedResults);
      if (transposedScore * SCORE_TRANSPOSITION > score) {
        score = transposedScore * SCORE_TRANSPOSITION;
      }
    }
    if (score > highScore) {
      highScore = score;
    }
    index = lowerString.indexOf(abbreviationChar, index + 1);
  }
  memoizedResults[memoizeKey] = highScore;
  return highScore;
}
function formatInput(string) {
  return string.toLowerCase().replace(COUNT_SPACE_REGEXP, " ");
}
function computeCommandScore(command, search, commandKeywords) {
  command = commandKeywords && commandKeywords.length > 0 ? `${`${command} ${commandKeywords?.join(" ")}`}` : command;
  return computeCommandScoreInner(command, search, formatInput(command), formatInput(search), 0, 0, {});
}
const popoverAttrs = createBitsAttrs({
  component: "popover",
  parts: ["root", "trigger", "content", "close", "overlay"]
});
const PopoverRootContext = new Context("Popover.Root");
class PopoverRootState {
  static create(opts) {
    return PopoverRootContext.set(new PopoverRootState(opts));
  }
  opts;
  contentNode = null;
  contentPresence;
  triggerNode = null;
  overlayNode = null;
  overlayPresence;
  // hover tracking state
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
    this.overlayPresence = new PresenceManager({ ref: boxWith(() => this.overlayNode), open: this.opts.open });
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
    if (this.openedViaHover && !this.hasInteractedWithContent) {
      this.opts.open.current = false;
    }
  }
  handleDelayedHoverClose() {
    if (!this.opts.open.current) return;
    if (!this.openedViaHover || this.hasInteractedWithContent) return;
    this.#clearCloseTimeout();
    if (this.closeDelay <= 0) {
      this.opts.open.current = false;
    } else if (this.#domContext) {
      this.#closeTimeout = this.#domContext.setTimeout(
        () => {
          if (this.openedViaHover && !this.hasInteractedWithContent) {
            this.opts.open.current = false;
          }
          this.#closeTimeout = null;
        },
        this.closeDelay
      );
    }
  }
  cancelDelayedClose() {
    this.#clearCloseTimeout();
  }
  markInteraction() {
    this.hasInteractedWithContent = true;
    this.#clearCloseTimeout();
  }
}
class PopoverTriggerState {
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
    if (delay <= 0) {
      this.root.handleHoverOpen();
    } else {
      this.#openTimeout = this.domContext.setTimeout(
        () => {
          this.root.handleHoverOpen();
          this.#openTimeout = null;
        },
        delay
      );
    }
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
    if (this.#isHovering && this.opts.openOnHover.current && this.root.opts.open.current) {
      this.root.hoverCooldown = true;
    }
    if (this.root.hoverCooldown && !this.root.opts.open.current) {
      this.root.hoverCooldown = false;
    }
    this.root.toggleOpen();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (!(e.key === ENTER || e.key === SPACE)) return;
    e.preventDefault();
    this.#clearAllTimeouts();
    this.root.toggleOpen();
  }
  #getAriaControls() {
    if (this.root.opts.open.current && this.root.contentNode?.id) {
      return this.root.contentNode?.id;
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": boolToStr(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "aria-controls": this.#getAriaControls(),
    [popoverAttrs.trigger]: "",
    disabled: this.opts.disabled.current,
    //
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
}
class PopoverContentState {
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
    if (isElement(target) && isTabbable(target)) {
      this.root.markInteraction();
    }
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
    if (!isElement(e.target)) return;
    const closestTrigger = e.target.closest(popoverAttrs.selector("trigger"));
    if (closestTrigger && closestTrigger === this.root.triggerNode) return;
    if (this.opts.customAnchor.current) {
      if (isElement(this.opts.customAnchor.current)) {
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
    style: { pointerEvents: "auto", contain: "layout style" },
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
}
function Popover_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      ref = null,
      id = createId(uid),
      forceMount = false,
      onOpenAutoFocus = noop,
      onCloseAutoFocus = noop,
      onEscapeKeydown = noop,
      onInteractOutside = noop,
      trapFocus = true,
      preventScroll = false,
      customAnchor = null,
      style,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
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
      if (!contentState.shouldTrapFocus) {
        e.preventDefault();
      }
      onOpenAutoFocus(e);
    }
    if (forceMount) {
      $$renderer2.push("<!--[0-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") }, { style });
          if (child) {
            $$renderer3.push("<!--[0-->");
            child($$renderer3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer_force_mount($$renderer2, spread_props([
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
      $$renderer2.push("<!--[1-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") }, { style });
          if (child) {
            $$renderer3.push("<!--[0-->");
            child($$renderer3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[-1-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer($$renderer2, spread_props([
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
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Popover_trigger$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      children,
      child,
      id = createId(uid),
      ref = null,
      type = "button",
      disabled = false,
      openOnHover = false,
      openDelay = 700,
      closeDelay = 300,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = PopoverTriggerState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      disabled: boxWith(() => Boolean(disabled)),
      openOnHover: boxWith(() => openOnHover),
      openDelay: boxWith(() => openDelay),
      closeDelay: boxWith(() => closeDelay)
    });
    const mergedProps = derived(() => mergeProps(restProps, triggerState.props, { type }));
    Floating_layer_anchor($$renderer2, {
      id,
      ref: triggerState.opts.ref,
      children: ($$renderer3) => {
        if (child) {
          $$renderer3.push("<!--[0-->");
          child($$renderer3, { props: mergedProps() });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<button${attributes({ ...mergedProps() })}>`);
          children?.($$renderer3);
          $$renderer3.push(`<!----></button>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    bind_props($$props, { ref });
  });
}
function Popover($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      onOpenChange = noop,
      onOpenChangeComplete = noop,
      children
    } = $$props;
    PopoverRootState.create({
      open: boxWith(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
    });
    Floating_layer($$renderer2, {
      children: ($$renderer3) => {
        children?.($$renderer3);
        $$renderer3.push(`<!---->`);
      }
    });
    bind_props($$props, { open });
  });
}
function Arrow_right($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M5 12h14" }],
      ["path", { "d": "m12 5 7 7-7 7" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "arrow-right" },
      /**
       * @component @name ArrowRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJtMTIgNSA3IDctNyA3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/arrow-right
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
function Circle_check($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["circle", { "cx": "12", "cy": "12", "r": "10" }],
      ["path", { "d": "m9 12 2 2 4-4" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-check" },
      /**
       * @component @name CircleCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJtOSAxMiAyIDIgNC00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/circle-check
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
function Circle_x($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["circle", { "cx": "12", "cy": "12", "r": "10" }],
      ["path", { "d": "m15 9-6 6" }],
      ["path", { "d": "m9 9 6 6" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-x" },
      /**
       * @component @name CircleX
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJtMTUgOS02IDYiIC8+CiAgPHBhdGggZD0ibTkgOSA2IDYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/circle-x
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
function Refresh_cw($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      [
        "path",
        { "d": "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }
      ],
      ["path", { "d": "M21 3v5h-5" }],
      [
        "path",
        { "d": "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }
      ],
      ["path", { "d": "M8 16H3v5" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "refresh-cw" },
      /**
       * @component @name RefreshCw
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAxMmE5IDkgMCAwIDEgOS05IDkuNzUgOS43NSAwIDAgMSA2Ljc0IDIuNzRMMjEgOCIgLz4KICA8cGF0aCBkPSJNMjEgM3Y1aC01IiAvPgogIDxwYXRoIGQ9Ik0yMSAxMmE5IDkgMCAwIDEtOSA5IDkuNzUgOS43NSAwIDAgMS02Ljc0LTIuNzRMMyAxNiIgLz4KICA8cGF0aCBkPSJNOCAxNkgzdjUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/refresh-cw
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
function Sparkles($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      [
        "path",
        {
          "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        }
      ],
      ["path", { "d": "M20 2v4" }],
      ["path", { "d": "M22 4h-4" }],
      ["circle", { "cx": "4", "cy": "20", "r": "2" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "sparkles" },
      /**
       * @component @name Sparkles
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEuMDE3IDIuODE0YTEgMSAwIDAgMSAxLjk2NiAwbDEuMDUxIDUuNTU4YTIgMiAwIDAgMCAxLjU5NCAxLjU5NGw1LjU1OCAxLjA1MWExIDEgMCAwIDEgMCAxLjk2NmwtNS41NTggMS4wNTFhMiAyIDAgMCAwLTEuNTk0IDEuNTk0bC0xLjA1MSA1LjU1OGExIDEgMCAwIDEtMS45NjYgMGwtMS4wNTEtNS41NThhMiAyIDAgMCAwLTEuNTk0LTEuNTk0bC01LjU1OC0xLjA1MWExIDEgMCAwIDEgMC0xLjk2Nmw1LjU1OC0xLjA1MWEyIDIgMCAwIDAgMS41OTQtMS41OTR6IiAvPgogIDxwYXRoIGQ9Ik0yMCAydjQiIC8+CiAgPHBhdGggZD0iTTIyIDRoLTQiIC8+CiAgPGNpcmNsZSBjeD0iNCIgY3k9IjIwIiByPSIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/sparkles
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
function Triangle_alert($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      [
        "path",
        {
          "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
        }
      ],
      ["path", { "d": "M12 9v4" }],
      ["path", { "d": "M12 17h.01" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "triangle-alert" },
      /**
       * @component @name TriangleAlert
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMjEuNzMgMTgtOC0xNGEyIDIgMCAwIDAtMy40OCAwbC04IDE0QTIgMiAwIDAgMCA0IDIxaDE2YTIgMiAwIDAgMCAxLjczLTMiIC8+CiAgPHBhdGggZD0iTTEyIDl2NCIgLz4KICA8cGF0aCBkPSJNMTIgMTdoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/triangle-alert
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
function Popover_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      sideOffset = 4,
      align = "center",
      portalProps,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Portal) {
        $$renderer3.push("<!--[-->");
        Portal($$renderer3, spread_props([
          portalProps,
          {
            children: ($$renderer4) => {
              if (Popover_content$1) {
                $$renderer4.push("<!--[-->");
                Popover_content$1($$renderer4, spread_props([
                  {
                    "data-slot": "popover-content",
                    sideOffset,
                    align,
                    class: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--bits-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className)
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
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Popover_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Popover_trigger$1) {
        $$renderer3.push("<!--[-->");
        Popover_trigger$1($$renderer3, spread_props([
          { "data-slot": "popover-trigger", class: cn("", className) },
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
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
const Root = Popover;
function Command($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      value = "",
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Command$1) {
        $$renderer3.push("<!--[-->");
        Command$1($$renderer3, spread_props([
          {
            "data-slot": "command",
            class: cn("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", className)
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
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref, value });
  });
}
function Command_group($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      heading,
      value,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Command_group$1) {
        $$renderer3.push("<!--[-->");
        Command_group$1($$renderer3, spread_props([
          {
            "data-slot": "command-group",
            class: cn("text-foreground overflow-hidden p-1", className),
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
            children: ($$renderer4) => {
              if (heading) {
                $$renderer4.push("<!--[0-->");
                if (Command_group_heading) {
                  $$renderer4.push("<!--[-->");
                  Command_group_heading($$renderer4, {
                    class: "text-muted-foreground px-2 py-1.5 text-xs font-medium",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(heading)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push("<!--]-->");
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push("<!--]-->");
                }
              } else {
                $$renderer4.push("<!--[-1-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (Command_group_items) {
                $$renderer4.push("<!--[-->");
                Command_group_items($$renderer4, { children });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            },
            $$slots: { default: true }
          }
        ]));
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Command_item($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Command_item$1) {
        $$renderer3.push("<!--[-->");
        Command_item$1($$renderer3, spread_props([
          {
            "data-slot": "command-item",
            class: cn("aria-selected:bg-accent aria-selected:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
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
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Command_list($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (Command_list$1) {
        $$renderer3.push("<!--[-->");
        Command_list$1($$renderer3, spread_props([
          {
            "data-slot": "command-list",
            class: cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className)
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
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
const TITLE_FIELDS = ["title", "heading", "name", "label"];
const DESCRIPTION_FIELDS = ["excerpt", "description", "summary", "bio", "tagline", "abstract"];
const IMAGE_FIELDS = ["coverImage", "mainImage", "image", "avatar", "photo"];
function str(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}
function resolveTitle(doc, schema) {
  const path = schema?.preview?.select?.title;
  if (path) {
    const fromPreview = str(readPath(doc, path));
    if (fromPreview)
      return fromPreview;
  }
  for (const name of TITLE_FIELDS) {
    const value = str(doc[name]);
    if (value)
      return value;
  }
  return "";
}
function resolveDescription(doc, schema) {
  for (const name of DESCRIPTION_FIELDS) {
    const value = str(doc[name]);
    if (value)
      return value;
  }
  const subtitle = schema ? resolvePreviewSubtitle(doc, schema) : null;
  return subtitle ?? "";
}
function hasSocialImage(doc, schema) {
  const seo = doc.seo ?? {};
  if (seo.ogImage?.asset)
    return true;
  const path = schema?.preview?.select?.media;
  if (path) {
    const media = readPath(doc, path);
    if (media?.asset)
      return true;
  }
  return IMAGE_FIELDS.some((name) => doc[name]?.asset);
}
const defaults = {
  generateTitle: (doc, ctx) => resolveTitle(doc, ctx?.schema),
  generateDescription: (doc, ctx) => resolveDescription(doc, ctx?.schema),
  generateURL: (doc) => typeof doc.slug === "string" ? `/${doc.slug}` : "/"
};
let current = defaults;
function configureSeo(overrides) {
  current = { ...defaults, ...overrides };
}
function seoGenerators() {
  return current;
}
function GenerateSeoAction($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { action } = $$props;
    let busy = false;
    async function generate() {
      if (busy) return;
      busy = true;
      try {
        const data = action.data;
        const existing = data.seo ?? {};
        const gen = seoGenerators();
        const ctx = { schema: action.schema, typeName: action.schema.name };
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
    Button($$renderer2, {
      variant: "ghost",
      size: "icon",
      onclick: generate,
      disabled: busy,
      class: "h-8 w-8 hover:cursor-pointer",
      title: "Generate SEO meta",
      children: ($$renderer3) => {
        Sparkles($$renderer3, { class: `h-4 w-4 ${stringify(busy ? "animate-pulse" : "")}` });
      },
      $$slots: { default: true }
    });
  });
}
function SeoTool($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { tool } = $$props;
    const targetTypes = derived(() => tool.schemas.filter((s) => s.type === "document" && s.fields.some((f) => f.name === "seo")));
    let audits = [];
    let loading = true;
    let error = null;
    const str2 = (v) => typeof v === "string" && v.trim() ? v.trim() : "";
    function auditDoc(doc, schema) {
      const data = doc;
      const seo = data.seo ?? {};
      const issues = [];
      const metaTitle = str2(seo.metaTitle) || resolveTitle(data, schema);
      if (!metaTitle) issues.push("No title");
      const metaDesc = str2(seo.metaDescription) || resolveDescription(data, schema);
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
        const perType = await Promise.all(targetTypes().map(async (t) => {
          const res = await documents.list({ type: t.name, perspective: "draft", pageSize: 100 });
          const docs = res.success && res.data ? res.data : [];
          return docs.map((d) => auditDoc(d, t));
        }));
        audits = perType.flat();
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
    $$renderer2.push(`<div class="mx-auto max-w-4xl px-6 py-10"><div class="flex items-start justify-between gap-4"><div class="flex items-center gap-3"><div class="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">`);
    Sparkles($$renderer2, { class: "h-5 w-5" });
    $$renderer2.push(`<!----></div> <div><h1 class="text-xl font-semibold tracking-tight">SEO Audit</h1> <p class="text-muted-foreground text-sm">${escape_html(stats().total)} item${escape_html(stats().total === 1 ? "" : "s")} across ${escape_html(targetTypes().length)} type${escape_html(targetTypes().length === 1 ? "" : "s")}</p></div></div> `);
    Button($$renderer2, {
      variant: "outline",
      size: "sm",
      onclick: load,
      disabled: loading,
      class: "gap-2",
      children: ($$renderer3) => {
        Refresh_cw($$renderer3, {
          class: `h-3.5 w-3.5 ${stringify(loading ? "animate-spin" : "")}`
        });
        $$renderer3.push(`<!----> Refresh`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="mt-6 grid grid-cols-3 gap-3"><div class="border-border bg-card rounded-lg border p-4"><div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">`);
    Circle_check($$renderer2, { class: "h-4 w-4" });
    $$renderer2.push(`<!----> <span class="text-2xl font-semibold tabular-nums">${escape_html(stats().good)}</span></div> <p class="text-muted-foreground mt-1 text-xs">Optimized</p></div> <div class="border-border bg-card rounded-lg border p-4"><div class="flex items-center gap-2 text-amber-600 dark:text-amber-500">`);
    Triangle_alert($$renderer2, { class: "h-4 w-4" });
    $$renderer2.push(`<!----> <span class="text-2xl font-semibold tabular-nums">${escape_html(stats().warn)}</span></div> <p class="text-muted-foreground mt-1 text-xs">Warnings</p></div> <div class="border-border bg-card rounded-lg border p-4"><div class="text-destructive flex items-center gap-2">`);
    Circle_x($$renderer2, { class: "h-4 w-4" });
    $$renderer2.push(`<!----> <span class="text-2xl font-semibold tabular-nums">${escape_html(stats().missing)}</span></div> <p class="text-muted-foreground mt-1 text-xs">Needs work</p></div></div> <div class="border-border bg-card mt-6 overflow-hidden rounded-xl border">`);
    if (loading) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="text-muted-foreground p-8 text-center text-sm">Auditing content…</div>`);
    } else if (error) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="text-destructive p-8 text-center text-sm">${escape_html(error)}</div>`);
    } else if (audits.length === 0) {
      $$renderer2.push("<!--[2-->");
      $$renderer2.push(`<div class="text-muted-foreground p-8 text-center text-sm">No posts or pages to audit yet.</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<ul class="divide-border divide-y"><!--[-->`);
      const each_array = ensure_array_like(audits);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let a = each_array[$$index];
        $$renderer2.push(`<li class="flex items-center gap-3 px-4 py-3">`);
        if (a.status === "good") {
          $$renderer2.push("<!--[0-->");
          Circle_check($$renderer2, {
            class: "h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500"
          });
        } else if (a.status === "warn") {
          $$renderer2.push("<!--[1-->");
          Triangle_alert($$renderer2, { class: "h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" });
        } else {
          $$renderer2.push("<!--[-1-->");
          Circle_x($$renderer2, { class: "text-destructive h-4 w-4 shrink-0" });
        }
        $$renderer2.push(`<!--]--> <div class="min-w-0 flex-1"><div class="flex items-center gap-2"><span class="truncate text-sm font-medium">${escape_html(a.title)}</span> <span class="bg-muted text-muted-foreground shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">${escape_html(a.typeTitle)}</span></div> `);
        if (a.issues.length > 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<p class="text-muted-foreground mt-0.5 truncate text-xs">${escape_html(a.issues.join(" · "))}</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<p class="mt-0.5 text-xs text-emerald-600 dark:text-emerald-500">All checks passed</p>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        Button($$renderer2, {
          variant: "ghost",
          size: "sm",
          class: "shrink-0 gap-1 hover:cursor-pointer",
          onclick: () => tool.openDocument(a.type, a.id),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->Fix `);
            Arrow_right($$renderer3, { class: "h-3.5 w-3.5" });
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!----></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></div> <p class="text-muted-foreground mt-4 text-xs leading-relaxed">This dashboard is a plugin admin tool (<code>aphex/admin/tool</code>). It fetches content
		through the session-authenticated REST client, scores each item, and routes you into the editor
		via <code>tool.openDocument()</code> — no core files touched.</p></div>`);
  });
}
function MetaLengthInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { field, value, onUpdate, readonly = false, validationClasses } = $$props;
    const text = derived(() => typeof value === "string" ? value : "");
    const len = derived(() => text().length);
    const isDescription = derived(() => field.type === "text");
    const ideal = derived(() => isDescription() ? 155 : 60);
    const max = derived(() => isDescription() ? 165 : 70);
    const tone = derived(() => len() === 0 ? "idle" : len() <= ideal() ? "good" : len() <= max() ? "warn" : "over");
    const toneClass = derived(() => tone() === "good" ? "text-emerald-600 dark:text-emerald-500" : tone() === "warn" ? "text-amber-600 dark:text-amber-500" : tone() === "over" ? "text-destructive" : "text-muted-foreground");
    $$renderer2.push(`<div class="relative">`);
    if (isDescription()) {
      $$renderer2.push("<!--[0-->");
      Textarea($$renderer2, {
        value: text(),
        oninput: (e) => onUpdate(e.currentTarget.value),
        disabled: readonly,
        rows: 3,
        class: `pr-14 ${stringify(validationClasses ?? "")}`
      });
    } else {
      $$renderer2.push("<!--[-1-->");
      Input($$renderer2, {
        type: "text",
        value: text(),
        oninput: (e) => onUpdate(e.currentTarget.value),
        disabled: readonly,
        class: `pr-14 ${stringify(validationClasses ?? "")}`
      });
    }
    $$renderer2.push(`<!--]--> <span${attr_class(`pointer-events-none absolute right-3 font-mono text-[11px] tabular-nums ${stringify(toneClass())} ${stringify(isDescription() ? "top-2.5" : "top-1/2 -translate-y-1/2")}`)}${attr("title", `Ideal ≤ ${stringify(ideal())} characters`)}>${escape_html(len())}/${escape_html(ideal())}</span></div>`);
  });
}
function SeoPreview($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { documentData, schemaType } = $$props;
    const doc = derived(() => documentData ?? {});
    const seo = derived(() => doc().seo ?? {});
    const gen = seoGenerators();
    const ctx = derived(() => ({ typeName: schemaType }));
    const title = derived(() => seo().metaTitle || gen.generateTitle(doc(), ctx()) || "Untitled");
    const description = derived(() => seo().metaDescription || gen.generateDescription(doc(), ctx()) || "");
    const url = derived(() => gen.generateURL(doc(), ctx()));
    const displayUrl = derived(() => url().replace(/^https?:\/\//, "").replace(/\/$/, "") || "example.com");
    $$renderer2.push(`<div class="border-border bg-card rounded-lg border p-4"><div class="text-[11px] leading-none text-emerald-700 dark:text-emerald-500">${escape_html(displayUrl())}</div> <div class="mt-1 truncate text-lg leading-snug text-[#1a0dab] dark:text-[#8ab4f8]">${escape_html(title())}</div> <p class="text-muted-foreground mt-0.5 line-clamp-2 text-sm leading-snug">${escape_html(description() || "Add a meta description, or one is generated from the excerpt.")}</p> `);
    if (seo().noIndex) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="text-destructive mt-2 text-[11px] font-medium">Hidden from search engines</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
const SEO_TYPE = "seo";
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
        // Render with this plugin's length-metered input (aphex/field/component).
        input: "seo-length",
        validation: (Rule) => Rule.max(70)
      },
      {
        name: "metaDescription",
        type: "text",
        title: "Meta description",
        rows: 3,
        description: "The snippet shown under the title in search results. ~155 characters. Falls back to the excerpt.",
        // Length-metered textarea (aphex/field/component).
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
        // UI-only: renders a live Google-style search-result preview.
        name: "seoPreview",
        type: "string",
        title: "Search preview",
        input: "seo-preview"
      }
    ]
  };
}
function seoField(group) {
  return buildSeoField({ group });
}
function expandSeoTypes(schemas) {
  return desugarFieldType(schemas, {
    type: SEO_TYPE,
    build: (f) => buildSeoField({ name: f.name, title: f.title })
  });
}
function injectSeoField(schema, group = "seo") {
  if (schema.type !== "document")
    return schema;
  if (schema.fields.some((f) => f.name === "seo"))
    return schema;
  const groups = schema.groups ?? [];
  const withGroup = groups.some((g) => g.name === group) ? groups : [...groups, { name: group, title: "SEO" }];
  return { ...schema, groups: withGroup, fields: [...schema.fields, seoField(group)] };
}
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
    { implements: "aphex/field/component", input: "seo-length", component: MetaLengthInput },
    { implements: "aphex/field/component", input: "seo-preview", component: SeoPreview },
    // Desugar the `{ type: 'seo' }` literal into the SEO object, everywhere.
    { implements: "aphex/schema/transform", transform: expandSeoTypes }
  ];
  if (collections && collections.length > 0) {
    parts.push({
      implements: "aphex/schema/transform",
      transform: (schemas) => schemas.map((s) => collections.includes(s.name) ? injectSeoField(s, group) : s)
    });
  }
  return definePlugin({ name: "@aphexcms/plugin-seo", version: "0.1.0", parts });
}
const buttonGroupVariants = tv({
  base: "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  variants: {
    orientation: {
      horizontal: "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]]:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
      vertical: "[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! flex-col [&>[data-slot]]:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0"
    }
  },
  defaultVariants: { orientation: "horizontal" }
});
function Button_group($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      orientation = "horizontal",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      role: "group",
      "data-slot": "button-group",
      "data-orientation": orientation,
      class: clsx(cn(buttonGroupVariants({ orientation }), className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}
function ColorPicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "#000000",
      class: className,
      allowOpacity = false,
      defaultFormat = "hex",
      formats = ["hex", "rgb", "hsl", "oklch"],
      onChange
    } = $$props;
    let h2 = 0;
    let s = 0;
    let v = 0;
    let a = 1;
    let activeFormat = defaultFormat;
    const hueGradient = "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)";
    let formatOpen = false;
    function updateExternal() {
      value = formatOutput(h2, s, v, a, activeFormat);
      onChange?.(value);
    }
    function setFormat(fmt) {
      activeFormat = fmt;
      updateExternal();
      formatOpen = false;
    }
    function parseColor(str2) {
      str2 = str2.trim().toLowerCase();
      if (str2.startsWith("#")) {
        const hex = str2.replace("#", "");
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
        } else {
          return null;
        }
        return { ...rgbToHsv2(r, g, b), a: alpha };
      }
      if (str2.startsWith("rgb")) {
        const values = str2.match(/[\d.]+/g)?.map(Number);
        if (values && values.length >= 3) {
          const [r = 0, g = 0, b = 0, alpha = 1] = values;
          return { ...rgbToHsv2(r, g, b), a: alpha };
        }
      }
      if (str2.startsWith("hsl")) {
        const values = str2.match(/[\d.]+/g)?.map(Number);
        if (values && values.length >= 3) {
          const [hue = 0, sat = 0, light = 0, alpha = 1] = values;
          const sNorm = sat / 100, lNorm = light / 100;
          const vNorm = lNorm + sNorm * Math.min(lNorm, 1 - lNorm);
          const sHsv = vNorm === 0 ? 0 : 2 * (1 - lNorm / vNorm);
          return { h: hue, s: sHsv * 100, v: vNorm * 100, a: alpha };
        }
      }
      if (str2.startsWith("oklch")) {
        const values = str2.match(/[\d.%]+/g)?.map((s2) => s2.includes("%") ? parseFloat(s2) / 100 : parseFloat(s2));
        if (values && values.length >= 3) {
          const [l2 = 0, c = 0, hue = 0, alpha = 1] = values;
          const rgb = oklchToRgb(l2, c, hue);
          return { ...rgbToHsv2(rgb.r, rgb.g, rgb.b), a: alpha };
        }
      }
      return null;
    }
    function formatOutput(h3, s2, v2, a2, format) {
      if (format === "hex") return hsvToHex(h3, s2, v2, a2);
      if (format === "rgb") return hsvToRgbString(h3, s2, v2, a2);
      if (format === "hsl") return hsvToHslString(h3, s2, v2, a2);
      if (format === "oklch") return hsvToOklchString(h3, s2, v2, a2);
      return "";
    }
    function rgbToHsv2(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h3 = 0, s2 = 0, v2 = max;
      const d = max - min;
      s2 = max === 0 ? 0 : d / max;
      if (max !== min) {
        switch (max) {
          case r:
            h3 = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h3 = (b - r) / d + 2;
            break;
          case b:
            h3 = (r - g) / d + 4;
            break;
        }
        h3 /= 6;
      }
      return { h: h3 * 360, s: s2 * 100, v: v2 * 100 };
    }
    function hsvToRgb(h3, s2, v2) {
      let sNorm = s2 / 100, vNorm = v2 / 100;
      let r = 0, g = 0, b = 0;
      const i = Math.floor(h3 / 60), f = h3 / 60 - i, p2 = vNorm * (1 - sNorm), q = vNorm * (1 - f * sNorm), t = vNorm * (1 - (1 - f) * sNorm);
      switch (i % 6) {
        case 0:
          r = vNorm;
          g = t;
          b = p2;
          break;
        case 1:
          r = q;
          g = vNorm;
          b = p2;
          break;
        case 2:
          r = p2;
          g = vNorm;
          b = t;
          break;
        case 3:
          r = p2;
          g = q;
          b = vNorm;
          break;
        case 4:
          r = t;
          g = p2;
          b = vNorm;
          break;
        case 5:
          r = vNorm;
          g = p2;
          b = q;
          break;
      }
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      };
    }
    function hsvToOklchString(h3, s2, v2, a2) {
      const rgb = hsvToRgb(h3, s2, v2);
      const oklch = rgbToOklch(rgb.r, rgb.g, rgb.b);
      const L = (oklch.l * 100).toFixed(1) + "%";
      const C = oklch.c.toFixed(3);
      const H = (oklch.h || 0).toFixed(1);
      if (allowOpacity && a2 < 1) return `oklch(${L} ${C} ${H} / ${parseFloat(a2.toFixed(2))})`;
      return `oklch(${L} ${C} ${H})`;
    }
    function rgbToOklch(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      const l2 = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
      const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
      const s2 = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
      const l_ = Math.cbrt(l2), m_ = Math.cbrt(m), s_ = Math.cbrt(s2);
      const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
      const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
      const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
      const C = Math.sqrt(A * A + B * B);
      let H = Math.atan2(B, A) * 180 / Math.PI;
      if (H < 0) H += 360;
      return { l: L, c: C, h: H };
    }
    function oklchToRgb(l2, c, h3) {
      const hRad = h3 * (Math.PI / 180);
      const A = c * Math.cos(hRad);
      const B = c * Math.sin(hRad);
      const L = l2;
      const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
      const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
      const s_ = L - 0.0894841775 * A - 1.291485548 * B;
      const lLin = l_ * l_ * l_;
      const mLin = m_ * m_ * m_;
      const sLin = s_ * s_ * s_;
      let r = 4.0767416621 * lLin - 3.3077115913 * mLin + 0.2309699292 * sLin;
      let g = -1.2684380046 * lLin + 2.6097574011 * mLin - 0.3413193965 * sLin;
      let b = -0.0041960863 * lLin - 0.7034186147 * mLin + 1.707614701 * sLin;
      r = r >= 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
      g = g >= 31308e-7 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
      b = b >= 31308e-7 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
      r = Math.min(Math.max(0, r), 1) * 255;
      g = Math.min(Math.max(0, g), 1) * 255;
      b = Math.min(Math.max(0, b), 1) * 255;
      return { r, g, b };
    }
    function hsvToHex(h3, s2, v2, a2) {
      const { r, g, b } = hsvToRgb(h3, s2, v2);
      const toHex = (x) => {
        const hex2 = x.toString(16);
        return hex2.length === 1 ? "0" + hex2 : hex2;
      };
      let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      if (allowOpacity && a2 < 1) hex += toHex(Math.round(a2 * 255));
      return hex.toUpperCase();
    }
    function hsvToRgbString(h3, s2, v2, a2) {
      const { r, g, b } = hsvToRgb(h3, s2, v2);
      if (allowOpacity && a2 < 1) return `rgba(${r}, ${g}, ${b}, ${parseFloat(a2.toFixed(2))})`;
      return `rgb(${r}, ${g}, ${b})`;
    }
    function hsvToHslString(h3, s2, v2, a2) {
      const sNorm = s2 / 100, vNorm = v2 / 100;
      let l2 = (2 - sNorm) * vNorm / 2;
      let sHsl = l2 && l2 < 1 ? sNorm * vNorm / (l2 < 0.5 ? l2 * 2 : 2 - l2 * 2) : sNorm;
      if (allowOpacity && a2 < 1) return `hsla(${Math.round(h3)}, ${Math.round(sHsl * 100)}%, ${Math.round(l2 * 100)}%, ${parseFloat(a2.toFixed(2))})`;
      return `hsl(${Math.round(h3)}, ${Math.round(sHsl * 100)}%, ${Math.round(l2 * 100)}%)`;
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
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr_class(clsx(cn("bg-popover flex w-[350px] flex-col gap-3 rounded-lg border p-3 shadow-sm", className)))}><div class="relative h-56 w-full cursor-crosshair touch-none rounded-md shadow-sm" role="slider" aria-label="Saturation and brightness"${attr("aria-valuenow", s)} tabindex="0"${attr_style("", { "background-color": `hsl(${h2}, 100%, 50%)` })}><div class="pointer-events-none absolute inset-0 overflow-hidden rounded-md"><div class="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div> <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div></div> <svg class="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true"${attr_style("", { overflow: "visible" })}><circle${attr("cx", `${s}%`)}${attr("cy", `${100 - v}%`)} r="6" fill="none" stroke="rgba(0, 0, 0, 0.25)"></circle><circle${attr("cx", `${s}%`)}${attr("cy", `${100 - v}%`)} r="5" fill="none" stroke="white" stroke-width="2"></circle></svg></div> <div class="flex items-center gap-3"><div class="relative mt-1 h-8 w-8 shrink-0 overflow-hidden rounded-md border bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')] shadow-sm"><div class="absolute inset-0"${attr_style("", { "background-color": hsvToHex(h2, s, v, a) })}></div></div> <div class="flex flex-1 flex-col justify-center gap-3"><div class="relative h-3 w-full cursor-pointer touch-none rounded-full shadow-sm ring-1 ring-black/5" role="slider" aria-label="Hue"${attr("aria-valuenow", h2)} tabindex="0"${attr_style("", { background: hueGradient })}><div class="pointer-events-none absolute top-1/2 z-10 h-3 w-3 rounded-full bg-white"${attr_style("", {
        left: `min(max(6px, ${h2 / 360 * 100}%), calc(100% - 6px))`,
        transform: "translate(-50%, -50%)"
      })}></div></div> `);
      if (allowOpacity) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="relative h-3 w-full cursor-pointer touch-none rounded-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')] shadow-sm ring-1 ring-black/5" role="slider" aria-label="Opacity"${attr("aria-valuenow", a)} tabindex="0"><div class="absolute inset-0 rounded-full"${attr_style("", {
          background: `linear-gradient(to right, transparent, ${hsvToHex(h2, s, v, 1)})`
        })}></div> <div class="pointer-events-none absolute top-1/2 z-10 h-3 w-3 rounded-full bg-white"${attr_style("", {
          left: `min(max(6px, ${a * 100}%), calc(100% - 6px))`,
          transform: "translate(-50%, -50%)"
        })}></div></div>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div></div> `);
      if (Button_group) {
        $$renderer3.push("<!--[-->");
        Button_group($$renderer3, {
          class: "w-full",
          children: ($$renderer4) => {
            if (formats.length > 1) {
              $$renderer4.push("<!--[0-->");
              if (Root) {
                $$renderer4.push("<!--[-->");
                Root($$renderer4, {
                  get open() {
                    return formatOpen;
                  },
                  set open($$value) {
                    formatOpen = $$value;
                    $$settled = false;
                  },
                  children: ($$renderer5) => {
                    {
                      let child = function($$renderer6, { props }) {
                        Button($$renderer6, spread_props([
                          props,
                          {
                            variant: "outline",
                            class: "h-9 max-w-[5rem] justify-between px-2 text-[10px]",
                            children: ($$renderer7) => {
                              $$renderer7.push(`<!---->${escape_html(activeFormat.toUpperCase())} `);
                              Chevron_down($$renderer7, { class: "h-3 w-3 opacity-50" });
                              $$renderer7.push(`<!---->`);
                            },
                            $$slots: { default: true }
                          }
                        ]));
                      };
                      if (Popover_trigger) {
                        $$renderer5.push("<!--[-->");
                        Popover_trigger($$renderer5, { child, $$slots: { child: true } });
                        $$renderer5.push("<!--]-->");
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push("<!--]-->");
                      }
                    }
                    $$renderer5.push(` `);
                    if (Popover_content) {
                      $$renderer5.push("<!--[-->");
                      Popover_content($$renderer5, {
                        class: "w-[4.5rem] p-0",
                        align: "start",
                        children: ($$renderer6) => {
                          if (Command) {
                            $$renderer6.push("<!--[-->");
                            Command($$renderer6, {
                              children: ($$renderer7) => {
                                if (Command_list) {
                                  $$renderer7.push("<!--[-->");
                                  Command_list($$renderer7, {
                                    children: ($$renderer8) => {
                                      if (Command_group) {
                                        $$renderer8.push("<!--[-->");
                                        Command_group($$renderer8, {
                                          children: ($$renderer9) => {
                                            $$renderer9.push(`<!--[-->`);
                                            const each_array = ensure_array_like(formats);
                                            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                                              let fmt = each_array[$$index];
                                              if (Command_item) {
                                                $$renderer9.push("<!--[-->");
                                                Command_item($$renderer9, {
                                                  value: fmt,
                                                  onSelect: () => setFormat(fmt),
                                                  class: "flex h-7 justify-center text-[10px]",
                                                  children: ($$renderer10) => {
                                                    $$renderer10.push(`<!---->${escape_html(fmt.toUpperCase())}`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer9.push("<!--]-->");
                                              } else {
                                                $$renderer9.push("<!--[!-->");
                                                $$renderer9.push("<!--]-->");
                                              }
                                            }
                                            $$renderer9.push(`<!--]-->`);
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer8.push("<!--]-->");
                                      } else {
                                        $$renderer8.push("<!--[!-->");
                                        $$renderer8.push("<!--]-->");
                                      }
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer7.push("<!--]-->");
                                } else {
                                  $$renderer7.push("<!--[!-->");
                                  $$renderer7.push("<!--]-->");
                                }
                              },
                              $$slots: { default: true }
                            });
                            $$renderer6.push("<!--]-->");
                          } else {
                            $$renderer6.push("<!--[!-->");
                            $$renderer6.push("<!--]-->");
                          }
                        },
                        $$slots: { default: true }
                      });
                      $$renderer5.push("<!--]-->");
                    } else {
                      $$renderer5.push("<!--[!-->");
                      $$renderer5.push("<!--]-->");
                    }
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
            } else {
              $$renderer4.push("<!--[-1-->");
              Button($$renderer4, {
                variant: "outline",
                class: "h-9 max-w-[5rem] justify-between px-2 text-[10px]",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->${escape_html(activeFormat.toUpperCase())}`);
                },
                $$slots: { default: true }
              });
            }
            $$renderer4.push(`<!--]--> `);
            Input($$renderer4, {
              class: "h-9 flex-1 font-mono text-[10px] uppercase",
              value,
              oninput: (e) => {
                const parsed = parseColor(e.currentTarget.value);
                if (parsed) {
                  h2 = parsed.h;
                  s = parsed.s;
                  v = parsed.v;
                  a = parsed.a;
                  updateExternal();
                }
              }
            });
            $$renderer4.push(`<!----> `);
            if (allowOpacity) {
              $$renderer4.push("<!--[0-->");
              Input($$renderer4, {
                class: "h-9 max-w-[4.2rem] text-right font-mono text-[10px]",
                value: Math.round(a * 100) + "%",
                oninput: handleAlphaInput,
                maxlength: 3
              });
            } else {
              $$renderer4.push("<!--[-1-->");
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push("<!--]-->");
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push("<!--]-->");
      }
      $$renderer3.push(`</div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value });
  });
}
const clamp = (n2, lo, hi) => Math.max(lo, Math.min(hi, n2));
const round = (n2, dp = 0) => {
  const f = 10 ** dp;
  return Math.round(n2 * f) / f;
};
function hexToRgb(hex) {
  let h2 = hex.replace("#", "").trim();
  if (h2.length === 3 || h2.length === 4)
    h2 = h2.split("").map((c) => c + c).join("");
  if (h2.length === 6)
    h2 += "ff";
  if (h2.length !== 8 || /[^0-9a-f]/i.test(h2))
    return null;
  return {
    r: parseInt(h2.slice(0, 2), 16),
    g: parseInt(h2.slice(2, 4), 16),
    b: parseInt(h2.slice(4, 6), 16),
    a: round(parseInt(h2.slice(6, 8), 16) / 255, 2)
  };
}
function rgbToHsv({ r, g, b, a }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  let h2 = 0;
  if (d !== 0) {
    if (max === rn)
      h2 = (gn - bn) / d % 6;
    else if (max === gn)
      h2 = (bn - rn) / d + 2;
    else
      h2 = (rn - gn) / d + 4;
    h2 *= 60;
    if (h2 < 0)
      h2 += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h: round(h2, 1), s: round(s * 100, 1), v: round(max * 100, 1), a };
}
function rgbToHsl({ r, g, b, a }) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  const l2 = (max + min) / 2;
  let h2 = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l2 - 1));
    if (max === rn)
      h2 = (gn - bn) / d % 6;
    else if (max === gn)
      h2 = (bn - rn) / d + 2;
    else
      h2 = (rn - gn) / d + 4;
    h2 *= 60;
    if (h2 < 0)
      h2 += 360;
  }
  return { h: round(h2, 1), s: round(s * 100, 1), l: round(l2 * 100, 1), a };
}
const toHex2 = (n2) => clamp(Math.round(n2), 0, 255).toString(16).padStart(2, "0");
function rgbToHex({ r, g, b, a }) {
  const base = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
  return a < 1 ? `${base}${toHex2(a * 255)}` : base.toUpperCase();
}
function parseCssToRgb(css) {
  const s = css.trim().toLowerCase();
  if (s.startsWith("#"))
    return hexToRgb(s);
  if (s.startsWith("rgb")) {
    const n2 = s.match(/[\d.]+/g)?.map(Number);
    if (n2 && n2.length >= 3) {
      const [r = 0, g = 0, b = 0, a = 1] = n2;
      return { r, g, b, a };
    }
  }
  if (s.startsWith("hsl")) {
    const n2 = s.match(/[\d.]+/g)?.map(Number);
    if (n2 && n2.length >= 3) {
      const [hh = 0, ss = 0, ll = 0, a = 1] = n2;
      const h2 = hh / 360, sl = ss / 100, l2 = ll / 100;
      const q = l2 < 0.5 ? l2 * (1 + sl) : l2 + sl - l2 * sl;
      const p2 = 2 * l2 - q;
      const hue = (t) => {
        let tt = t;
        if (tt < 0)
          tt += 1;
        if (tt > 1)
          tt -= 1;
        if (tt < 1 / 6)
          return p2 + (q - p2) * 6 * tt;
        if (tt < 1 / 2)
          return q;
        if (tt < 2 / 3)
          return p2 + (q - p2) * (2 / 3 - tt) * 6;
        return p2;
      };
      return {
        r: round(hue(h2 + 1 / 3) * 255),
        g: round(hue(h2) * 255),
        b: round(hue(h2 - 1 / 3) * 255),
        a
      };
    }
  }
  return null;
}
function parseColorToValue(css) {
  const rgb = parseCssToRgb(css);
  if (!rgb)
    return null;
  return {
    hex: rgbToHex(rgb),
    alpha: rgb.a,
    rgb,
    hsl: rgbToHsl(rgb),
    hsv: rgbToHsv(rgb)
  };
}
function ColorInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { field, value, onUpdate, validationClasses, readonly = false } = $$props;
    const isObject = derived(() => field.type === "object");
    const allowOpacity = derived(() => field.inputOptions?.alpha === true);
    const formats = derived(() => isObject() ? ["hex", "rgb", "hsl"] : field.inputOptions?.hexOnly === true ? ["hex"] : void 0);
    let picked = "";
    function emit(css) {
      if (isObject()) {
        onUpdate(css ? parseColorToValue(css) : void 0);
      } else {
        onUpdate(css);
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr("aria-disabled", readonly)}${attr_class("", void 0, { "pointer-events-none": readonly, "opacity-50": readonly })}>`);
      ColorPicker($$renderer3, {
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
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
const COLOR_INPUT = "color";
const COLOR_TYPE = "color";
const numberSub = (name) => ({ name, type: "number", title: name });
function color(config) {
  const { name, title, alpha, ...rest } = config;
  return {
    // `rest` carries whatever else the caller declared (access, validation, group,
    // description, …) so the builder stays equivalent to the `type: 'color'` literal.
    ...rest,
    name,
    type: "object",
    title: title ?? name,
    input: COLOR_INPUT,
    inputOptions: { alpha: alpha === true },
    fields: [
      { name: "hex", type: "string", title: "Hex" },
      { name: "alpha", type: "number", title: "Alpha" },
      {
        name: "rgb",
        type: "object",
        title: "RGB",
        fields: ["r", "g", "b", "a"].map(numberSub)
      },
      {
        name: "hsl",
        type: "object",
        title: "HSL",
        fields: ["h", "s", "l", "a"].map(numberSub)
      },
      {
        name: "hsv",
        type: "object",
        title: "HSV",
        fields: ["h", "s", "v", "a"].map(numberSub)
      }
    ]
  };
}
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
function colorPickerPlugin() {
  const parts = [
    // The widget for `input: 'color'` — over a `string` field (plain hex) or the
    // rich `object` field the `type: 'color'` sugar / `color()` helper produce.
    { implements: "aphex/field/component", input: COLOR_INPUT, component: ColorInput },
    // Desugars authored `{ type: 'color' }` into the rich color object before the
    // engine and type generator see it.
    { implements: "aphex/schema/transform", transform: expandColorTypes }
  ];
  return definePlugin({ name: "@aphexcms/plugin-color-picker", version: "0.1.0", parts });
}
const plugins = [
  seoPlugin({
    // Auto-enable SEO on these document types (injects the meta group if absent).
    collections: ["blog_post", "page", "author", "tag"],
    // Title & description are left to the defaults, which read each type's own
    // `preview` config — so blog_post uses title/excerpt, author uses name/bio,
    // and tag uses title/description without per-type wiring here. Only the public
    // URL is route-specific, so that's the one thing we scope by collection.
    generateURL: (doc, { typeName }) => {
      const slug = typeof doc.slug === "string" ? doc.slug : "";
      if (typeName === "author") return `/author/${slug}`;
      if (typeName === "tag") return `/tag/${slug}`;
      if (typeName === "page") return `/${slug}`;
      return `/blog/${slug}`;
    }
  }),
  colorPickerPlugin()
];
export {
  Circle_check as C,
  Refresh_cw as R,
  Triangle_alert as T,
  plugins as p
};
