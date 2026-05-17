import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stripLangFromPath } from "../utils/languageRouting";

const SITE_URL = "https://qnhospital.com.sa";
const DEFAULT_IMAGE = "/Logo.png";

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  structuredData,
}) {
  const location = useLocation();
  const { i18n } = useTranslation();

  const isArabic = i18n.language?.startsWith("ar");
  const currentLang = isArabic ? "ar" : "en";

  const cleanPath = stripLangFromPath(location.pathname);

  const canonicalUrl = `${SITE_URL}/${currentLang}${cleanPath}`;
  const enUrl = `${SITE_URL}/en${cleanPath}`;
  const arUrl = `${SITE_URL}/ar${cleanPath}`;

  const imageUrl = image?.startsWith("http")
    ? image
    : `${SITE_URL}${image?.startsWith("/") ? image : `/${image}`}`;

  const finalTitle = title || "Qassim National Hospital | مستشفى القصيم الوطني";

  const finalDescription =
    description ||
    "Qassim National Hospital provides advanced healthcare services, specialized clinics, experienced doctors, and patient-centered medical care in Qassim, Saudi Arabia.";

  return (
    <Helmet
      htmlAttributes={{
        lang: currentLang,
        dir: isArabic ? "rtl" : "ltr",
      }}
    >
      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ar" href={arUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Qassim National Hospital" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
