import { Outlet, useLocation, Navigate, useParams } from "react-router-dom";
import NavBarDesignV2 from "../components/NavBarDesignV2";
import FooterDesignV2 from "../components/FooterDesignV2";
import NavBarQNH from "../components/NavBarQNH";
import ScrollToTop from "../helpers/ScrollToTop";
import { Suspense } from "react";
import LoadingOverlay2 from "../components/LoadingOverlay-2";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isSupportedLang } from "../utils/languageRouting";
export default function MainLayout() {
  const location = useLocation();
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isSupportedLang(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    }
  }, [lang, i18n]);

  if (!isSupportedLang(lang)) {
    return <Navigate to="/en" replace />;
  }
  const isHomePage = location.pathname === "/";

  return (
    <div className="overflow-x-hidden">
      <AnalyticsTracker />

      <ScrollToTop />
      <NavBarQNH />

      {/* {!isHomePage && <NavBarDesignV2 />} */}

      <div className="min-h-screen bg-white flex flex-col">
        <Suspense fallback={<LoadingOverlay2 />}>
          <Outlet />
        </Suspense>
      </div>

      <FooterDesignV2 />
    </div>
  );
}
