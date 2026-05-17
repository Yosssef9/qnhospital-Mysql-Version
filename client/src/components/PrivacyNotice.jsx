import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

let privacyNoticeClosed = false;

export default function PrivacyNotice() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!privacyNoticeClosed) {
      setShow(true);
    }
  }, []);

  const closeNotice = (e) => {
    e.stopPropagation();
    privacyNoticeClosed = true;
    setShow(false);
  };

  const goToPrivacyPolicy = () => {
    privacyNoticeClosed = true;
    setShow(false);
    navigate(`/${i18n.language || "en"}/privacy-policy`);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          dir={isRTL ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.35 }}
          onClick={goToPrivacyPolicy}
          className={`fixed bottom-6 z-[9999] w-[calc(100%-2rem)] max-w-md cursor-pointer rounded-3xl border border-white/70 bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-md transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(21,98,160,0.22)] ${
            isRTL ? "right-4 md:right-8" : "left-4 md:left-8"
          }`}
        >
          <button
            type="button"
            onClick={closeNotice}
            className={`absolute top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 ${
              isRTL ? "left-4" : "right-4"
            }`}
            aria-label={isRTL ? "إغلاق" : "Close"}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex gap-4 pe-9">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--main-soft)] text-[var(--main-color)]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <h3 className="mb-1 text-base font-bold text-slate-900">
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </h3>

              <p className="text-sm leading-6 text-slate-600">
                {isRTL
                  ? "تعرف على سياسات الموقع وكيفية استخدام الخدمات والمعلومات داخل موقع مستشفى القصيم الوطني."
                  : "Learn more about our website policies, services, and how information is handled on Qassim National Hospital website."}
              </p>

              <span className="mt-3 inline-block text-sm font-bold text-[var(--main-color)]">
                {isRTL ? "عرض التفاصيل" : "View Details"}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
