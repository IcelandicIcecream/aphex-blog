import { m as head, f as derived, e as escape_html, b as attr } from "./renderer.js";
import { p as page } from "./index3.js";
import { h as html } from "./html.js";
function Seo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      description = "",
      image = null,
      type = "website",
      noindex = false,
      publishedTime,
      modifiedTime,
      authorName,
      siteName
    } = $$props;
    const pageData = derived(() => page.data);
    const site = derived(() => siteName || pageData().settings?.title || "Aphex");
    const origin = derived(() => page.url.origin);
    const canonical = derived(() => origin() + page.url.pathname);
    const absImage = derived(() => image ? image.startsWith("http") ? image : origin() + image : null);
    const fullTitle = derived(() => title ? `${title} · ${site()}` : site());
    const jsonLd = derived(() => type === "article" ? JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description || void 0,
      image: absImage() || void 0,
      datePublished: publishedTime || void 0,
      dateModified: modifiedTime || publishedTime || void 0,
      author: authorName ? { "@type": "Person", name: authorName } : void 0,
      publisher: { "@type": "Organization", name: site() },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical() }
    }).replace(/</g, "\\u003c") : null);
    const ldScript = derived(() => jsonLd() ? `<script type="application/ld+json">${jsonLd()}<\/script>` : null);
    head("1ajbkp", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(fullTitle())}</title>`);
      });
      if (description) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta name="description"${attr("content", description)}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <link rel="canonical"${attr("href", canonical())}/> `);
      if (noindex) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta name="robots" content="noindex, nofollow"/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <meta property="og:site_name"${attr("content", site())}/> <meta property="og:type"${attr("content", type)}/> <meta property="og:title"${attr("content", title || site())}/> `);
      if (description) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta property="og:description"${attr("content", description)}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <meta property="og:url"${attr("content", canonical())}/> `);
      if (absImage()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta property="og:image"${attr("content", absImage())}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <meta name="twitter:card"${attr("content", absImage() ? "summary_large_image" : "summary")}/> <meta name="twitter:title"${attr("content", title || site())}/> `);
      if (description) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta name="twitter:description"${attr("content", description)}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (absImage()) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<meta name="twitter:image"${attr("content", absImage())}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (type === "article") {
        $$renderer3.push("<!--[0-->");
        if (publishedTime) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<meta property="article:published_time"${attr("content", publishedTime)}/>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (modifiedTime) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<meta property="article:modified_time"${attr("content", modifiedTime)}/>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (authorName) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<meta property="article:author"${attr("content", authorName)}/>`);
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
    if (ldScript()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`${html(ldScript())}`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  Seo as S
};
