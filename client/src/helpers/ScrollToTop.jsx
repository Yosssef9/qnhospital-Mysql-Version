import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Skip scroll reset for hospital accreditation internal navigation
    if (location.pathname.startsWith("/hospital-accreditations/")) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return null;
}
