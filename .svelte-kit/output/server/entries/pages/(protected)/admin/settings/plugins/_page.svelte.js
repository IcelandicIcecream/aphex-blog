import { m as head } from "../../../../../../chunks/renderer.js";
import "../../../../../../chunks/date-utils.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/root.js";
import "../../../../../../chunks/state.svelte.js";
import "../../../../../../chunks/client.js";
import "../../../../../../chunks/button.js";
import "../../../../../../chunks/badge.js";
import "../../../../../../chunks/instance2.js";
import "clsx";
import "../../../../../../chunks/sheet-content.js";
import "../../../../../../chunks/index5.js";
import "../../../../../../chunks/mode-states.svelte.js";
import "../../../../../../chunks/plugins.js";
function PluginSettingsPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="space-y-6">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="text-muted-foreground text-sm">Loading…</p>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  head("11j18xl", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Aphex CMS - Plugin settings</title>`);
    });
  });
  $$renderer.push(`<div class="grid gap-5">`);
  PluginSettingsPanel($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _page as default
};
