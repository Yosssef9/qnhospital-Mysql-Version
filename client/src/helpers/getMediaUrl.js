// Helper to get media URL
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
export default function getMediaUrl(mediaField) {
  if (!mediaField) return null;

  const url =
    mediaField?.url ||
    mediaField?.data?.attributes?.url ||
    mediaField?.data?.url ||
    null;

  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
