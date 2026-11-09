import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const site = 'https://research.vyde.dev';
  const papers = await getCollection('preprints');
  const pages = [
    { loc: `${site}/`, lastmod: undefined as string | undefined },
    ...papers.map((p) => ({
      loc: `${site}/preprints/${p.data.id}`,
      lastmod: new Date(p.data.date).toISOString().slice(0, 10),
    })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${p.loc}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}<changefreq>weekly</changefreq><priority>${p.loc === site + '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
