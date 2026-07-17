const GET = ({ url }) => {
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${url.origin}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400"
    }
  });
};
export {
  GET
};
