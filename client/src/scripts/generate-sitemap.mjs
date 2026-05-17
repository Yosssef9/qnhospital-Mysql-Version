const SITE_URL = "https://qnhospital.com.sa";
const STRAPI_URL = process.env.VITE_STRAPI_URL;

if (!STRAPI_URL) {
  console.error("Missing VITE_STRAPI_URL in environment variables.");
  process.exit(1);
}

const staticRoutes = [
  "",
  "qnh-history",
  "mission-vision",
  "patients-rights",
  "hospital-accreditations",
  "medical-departments",
  "our-doctors",
  "News&Achievements",
  "privacy-policy",
  "join-us",
  "appointments-App",
];

const dynamicCollections = [
  { collection: "doctors", route: "our-doctors" },
  { collection: "clinics", route: "clinics" },
  { collection: "units", route: "units" },
  { collection: "centers", route: "centers" },
  { collection: "medical-services", route: "medical-services" },
];

async function fetchAllSlugs(collection, locale) {
  const slugs = [];
  let page = 1;
  let pageCount = 1;

  do {
    const params = new URLSearchParams({
      locale,
      "fields[0]": "slug",
      "pagination[page]": String(page),
      "pagination[pageSize]": "100",
    });

    const res = await fetch(`${STRAPI_URL}/api/${collection}?${params}`);

    if (!res.ok) {
      console.warn(`Failed to fetch ${collection} ${locale}: ${res.status}`);
      return slugs;
    }

    const json = await res.json();

    json.data?.forEach((item) => {
      if (item.slug) slugs.push(item.slug);
    });

    pageCount = json.meta?.pagination?.pageCount || 1;
    page += 1;
  } while (page <= pageCount);

  return slugs;
}

function urlXml(loc) {
  return `  <url>
    <loc>${loc}</loc>
  </url>`;
}

async function generateSitemap() {
  const urls = [];

  for (const lang of ["en", "ar"]) {
    for (const route of staticRoutes) {
      urls.push(`${SITE_URL}/${lang}${route ? `/${route}` : ""}`);
    }

    for (const item of dynamicCollections) {
      const slugs = await fetchAllSlugs(item.collection, lang);

      for (const slug of slugs) {
        urls.push(`${SITE_URL}/${lang}/${item.route}/${slug}`);
      }
    }
  }

  const uniqueUrls = [...new Set(urls)];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map(urlXml).join("\n")}
</urlset>
`;

  const fs = await import("fs/promises");
  await fs.mkdir("public", { recursive: true });
  await fs.writeFile("public/sitemap.xml", xml, "utf8");

  console.log(`Generated public/sitemap.xml with ${uniqueUrls.length} URLs`);
}

generateSitemap().catch((error) => {
  console.error(error);
  process.exit(1);
});
