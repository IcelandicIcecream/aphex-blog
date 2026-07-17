//#region src/lib/components/embed.ts
/**
* Shared parsing for the `embed` block, used by both the site renderer (render/Embed) and
* the editor's inline preview (studio/EmbedPreview) — one implementation, so the two can't drift.
*
* We never render the pasted HTML. We pull the iframe's `src` out of the snippet and emit
* our own iframe: that works for every provider (the snippet's src is already an
* embeddable URL) while making it impossible for an editor to inject script.
*/
/** Extract a safe http(s) embed URL from a pasted `<iframe>` snippet (or a bare URL). */
function embedSrc(code) {
	let raw = (code.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)?.[1] ?? code).trim();
	if (!raw) return null;
	if (raw.startsWith("//")) raw = `https:${raw}`;
	try {
		const url = new URL(raw);
		return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
	} catch {
		return null;
	}
}
/** Aspect ratio declared by the snippet's width/height, defaulting to 16/9. */
function embedRatio(code) {
	const w = Number(code.match(/\swidth=["']?(\d+)/i)?.[1]);
	const h = Number(code.match(/\sheight=["']?(\d+)/i)?.[1]);
	return w > 0 && h > 0 ? `${w} / ${h}` : "16 / 9";
}
//#endregion
export { embedSrc as n, embedRatio as t };
