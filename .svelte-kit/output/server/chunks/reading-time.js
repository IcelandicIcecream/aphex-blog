const WORDS_PER_MINUTE = 220;
function countWords(content) {
  if (!Array.isArray(content)) return 0;
  let words = 0;
  for (const block of content) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (typeof child.text === "string") {
        words += child.text.trim().split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return words;
}
function readingTime(content) {
  const minutes = Math.max(1, Math.round(countWords(content) / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
export {
  readingTime as r
};
