function embedSrc(code) {
  const fromIframe = code.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)?.[1];
  let raw = (fromIframe ?? code).trim();
  if (!raw) return null;
  if (raw.startsWith("//")) raw = `https:${raw}`;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}
function embedRatio(code) {
  const w = Number(code.match(/\swidth=["']?(\d+)/i)?.[1]);
  const h = Number(code.match(/\sheight=["']?(\d+)/i)?.[1]);
  return w > 0 && h > 0 ? `${w} / ${h}` : "16 / 9";
}
export {
  embedRatio as a,
  embedSrc as e
};
