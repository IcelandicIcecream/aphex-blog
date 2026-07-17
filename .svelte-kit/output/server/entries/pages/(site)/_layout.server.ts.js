import { redirect } from "@sveltejs/kit";
import { s as siteContext } from "../../../chunks/site.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import "../../../chunks/index5.js";
function isPreviewMode(url) {
  return url.searchParams.has("aphex-preview");
}
const load = async ({ locals, url }) => {
  const isAuthed = locals.auth?.type === "session";
  if (!isAuthed && isPreviewMode(url)) {
    const clean = new URL(url);
    clean.searchParams.delete("aphex-preview");
    redirect(307, clean.pathname + clean.search + clean.hash);
  }
  try {
    const { orgId, context } = await siteContext(locals);
    const settings = await locals.aphexCMS.localAPI.collections.siteSettings.get(
      context
    );
    await locals.aphexCMS.assetService.injectAssetUrls(orgId, settings);
    const logoUrl = settings?.logo?.asset?.url ?? null;
    const faviconUrl = settings?.favicon?.asset?.url ?? null;
    return {
      settings,
      isAuthed,
      logoUrl,
      faviconUrl
    };
  } catch {
    return {
      settings: null,
      isAuthed,
      logoUrl: null,
      faviconUrl: null
    };
  }
};
export {
  load
};
