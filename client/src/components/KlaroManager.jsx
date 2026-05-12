import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getKlaroConfig } from "../config/klaroConfig";

export default function KlaroManager() {
  const { i18n } = useTranslation();

  useEffect(() => {
    import("klaro").then((klaroModule) => {
      const klaro = klaroModule.default || klaroModule;

      const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

      klaro.setup(getKlaroConfig(lang));

      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    });
  }, [i18n.language]);

  return null;
}
