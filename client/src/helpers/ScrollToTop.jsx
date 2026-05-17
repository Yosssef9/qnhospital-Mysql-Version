import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { stripLangFromPath } from "../utils/languageRouting";

export default function ScrollToTop() {
  const location = useLocation();
  const previousCleanPathRef = useRef(null);

  useEffect(() => {
    const cleanPath = stripLangFromPath(location.pathname);
    const previousCleanPath = previousCleanPathRef.current;

    previousCleanPathRef.current = cleanPath;

    // Do not scroll when only language changes:
    // /en/our-doctors -> /ar/our-doctors
    if (previousCleanPath === cleanPath) {
      return;
    }

    // Do not scroll to top when changing accreditation certificate:
    // /en/hospital-accreditations/cbahi
    if (cleanPath.startsWith("/hospital-accreditations/")) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return null;
}
