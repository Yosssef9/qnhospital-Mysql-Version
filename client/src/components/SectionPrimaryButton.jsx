import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withLang } from "../utils/languageRouting";
export default function SectionPrimaryButton({ to = "/", children }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
const localizedTo = withLang(to, i18n.language || "en");
  return (
    <Link
     to={localizedTo}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[rgb(15,75,125)] ${
        isRTL ? "flex-row" : ""
      }`}
    >
      {children}

      <span
        className={`transition-transform duration-300 ${
          isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
      >
        {isRTL ? (
          <ArrowLeft className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </span>
    </Link>
  );
}
