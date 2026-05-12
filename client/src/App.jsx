import router from "./routes/router";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import { RouterProvider } from "react-router-dom";
import GlobalSpinner from "./components/GlobalSpinner";
import { useTranslation } from "react-i18next";
import FloatingSocialLogo from "./components/FloatingSocialLogo";
import KlaroManager from "./components/KlaroManager";

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    return !hasSeenSplash;
  });
  // const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    // Only show splash for the first time in this tab
    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, []);

  const handleFinish = () => setShowSplash(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language === "ar";

    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [i18n.language]);
  return (
    <>
      {/* {!showSplash && <GlobalSpinner />} */}
      {showSplash ? (
        <SplashScreen onFinish={handleFinish} />
      ) : (
        <>
          <RouterProvider router={router} />
          <FloatingSocialLogo />
          <KlaroManager />
        </>
      )}
    </>
  );
}
