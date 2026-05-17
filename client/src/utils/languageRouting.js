export const SUPPORTED_LANGS = ["en", "ar"];

export function isSupportedLang(lang) {
  return SUPPORTED_LANGS.includes(lang);
}

export function getLangFromPath(pathname) {
  const first = pathname.split("/").filter(Boolean)[0];
  return isSupportedLang(first) ? first : null;
}

export function stripLangFromPath(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  if (isSupportedLang(parts[0])) {
    return `/${parts.slice(1).join("/")}`;
  }

  return pathname === "/" ? "" : pathname;
}

export function withLang(path, lang) {
  if (!path) return `/${lang}`;
  if (path.startsWith("http")) return path;
  if (path === "#") return "#";

  const cleanPath = stripLangFromPath(path);
  return `/${lang}${cleanPath === "/" ? "" : cleanPath}`;
}

export function switchPathLanguage(pathname, newLang) {
  const cleanPath = stripLangFromPath(pathname);
  return `/${newLang}${cleanPath === "/" ? "" : cleanPath}`;
}
