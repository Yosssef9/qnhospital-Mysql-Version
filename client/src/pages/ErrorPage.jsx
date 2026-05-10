import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fbfe] px-6 py-16"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(30,127,143,0.10)] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[34px] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(2,32,71,0.08)] md:p-12"
      >
        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[rgb(21,98,160)] via-[rgb(30,127,143)] to-[rgb(21,98,160)]" />

        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-[rgba(21,98,160,0.10)] text-[rgb(21,98,160)] shadow-sm">
          <SearchX className="h-11 w-11" />
        </div>

        {/* 404 */}
        <div className="mt-6 text-6xl font-bold tracking-tight text-[rgb(21,98,160)] md:text-7xl">
          404
        </div>

        {/* Title */}
        <h1 className="mt-5 text-2xl font-semibold text-slate-900 md:text-3xl">
          {isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-slate-600 md:text-base">
          {isRTL
            ? "عذرًا، الصفحة التي تحاول الوصول إليها غير موجودة أو ربما تم نقلها أو حذفها."
            : "Sorry, the page you are trying to access does not exist or may have been moved or deleted."}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:w-auto"
          >
            <Home className="h-4 w-4" />

            {isRTL ? "العودة للرئيسية" : "Back to Home"}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[rgba(21,98,160,0.20)] hover:bg-slate-50 sm:w-auto"
          >
            {isRTL ? (
              <ArrowLeft className="h-4 w-4" />
            ) : (
              <ArrowLeft className="h-4 w-4 rotate-180" />
            )}

            {isRTL ? "الرجوع للخلف" : "Go Back"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
