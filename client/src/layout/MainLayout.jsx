import { Outlet, useLocation } from "react-router-dom";
import NavBarDesignV2 from "../components/NavBarDesignV2";
import FooterDesignV2 from "../components/FooterDesignV2";
import NavBarQNH from "../components/NavBarQNH";
import ScrollToTop from "../helpers/ScrollToTop";
import { Suspense } from "react";
import LoadingOverlay2 from "../components/LoadingOverlay-2";
import AnalyticsTracker from "../components/AnalyticsTracker";
export default function MainLayout() {
  const location = useLocation();

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
