import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPinned } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useWebsiteLinks } from "../api/strapi";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingSocialLogo() {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [open, setOpen] = useState(false);

  const { data: websiteLinks } = useWebsiteLinks();

  const socialLinks = [
    {
      key: "facebook",
      label: isRTL ? "فيسبوك" : "Facebook",
      icon: FaFacebookF,
      url: websiteLinks?.socialMediaLinks?.facebook,
      className: "bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      key: "instagram",
      label: isRTL ? "إنستغرام" : "Instagram",
      icon: FaInstagram,
      url: websiteLinks?.socialMediaLinks?.instagram,
      className:
        "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white border-[#DD2A7B]",
    },
    {
      key: "twitter",
      label: isRTL ? "إكس" : "X",
      icon: FaXTwitter,
      url: websiteLinks?.socialMediaLinks?.twitter,
      className: "bg-black text-white border-black hover:bg-slate-900",
    },
    {
      key: "youtube",
      label: isRTL ? "يوتيوب" : "YouTube",
      icon: FaYoutube,
      url: websiteLinks?.socialMediaLinks?.youtube,
      className: "bg-[#FF0000] text-white border-[#FF0000] hover:bg-[#E60000]",
    },
    {
      key: "whatsapp",
      label: isRTL ? "واتساب" : "WhatsApp",
      icon: FaWhatsapp,
      url: websiteLinks?.contactInfo?.phone
        ? `https://wa.me/${websiteLinks.contactInfo.phone.replace(/\D/g, "")}`
        : null,
      className: "bg-[#25D366] text-white border-[#25D366] hover:bg-[#1ebe5d]",
    },
    {
      key: "map",
      label: isRTL ? "الموقع" : "Location",
      icon: MapPinned,
      url: "https://maps.app.goo.gl/F279GqtqjZyDoXJk9",
      className:
        "bg-[var(--main-color)] text-white border-[var(--main-color)] hover:opacity-90",
    },
  ].filter((item) => item.url);

  return (
    <>
      <div
        className={`group fixed bottom-6 z-[9998] ${
          isRTL ? "left-6" : "right-6"
        }`}
      >
        <motion.button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -4, 0],
            rotate: open ? 360 : 0,
          }}
          transition={{
            y: {
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 0.7,
              ease: "easeInOut",
            },
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 15,
            },
          }}
          className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full p-[2px] shadow-[0_0_0_3px_rgba(21,98,160,0.10),0_14px_40px_rgba(15,23,42,0.18),0_0_28px_rgba(21,98,160,0.22)] transition-all duration-500 ease-out hover:shadow-[0_0_0_6px_rgba(21,98,160,0.12),0_22px_55px_rgba(15,23,42,0.26),0_0_45px_rgba(21,98,160,0.32)]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-8px] rounded-full bg-[conic-gradient(from_0deg,var(--main-color),#67e8f9,var(--main-light),var(--main-color))] opacity-80"
          />

          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white">
            <motion.div
              animate={{
                scale: [1, 1.18, 1],
                opacity: [0.35, 0, 0.35],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-[var(--main-color)]"
            />

            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-y-0 -left-full w-1/2 rotate-12 bg-white/40 blur-md transition-all duration-700 group-hover:left-[140%]" />
            </div>

            <img
              src="/Logo.png"
              alt="Qassim National Hospital"
              className="relative z-10 h-12 w-12 rounded-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </motion.button>

        <div
          className={`pointer-events-none absolute bottom-[78px] z-[9999] whitespace-nowrap rounded-full border border-white/60 bg-white/85 px-4 py-2 text-xs font-bold tracking-[0.08em] text-[var(--main-color)] shadow-[0_12px_35px_rgba(15,23,42,0.14)] backdrop-blur-md opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ${
            isRTL
              ? "left-1/2 -translate-x-1/2 translate-y-1"
              : "right-1/2 translate-x-1/2 translate-y-1"
          }`}
        >
          {isRTL ? "تواصل معنا" : "Connect With Us"}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[9998] bg-slate-900/20 backdrop-blur-[3px]"
            />

            <motion.div
              dir={isRTL ? "rtl" : "ltr"}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.94 }}
              transition={{ duration: 0.28 }}
              className={`fixed bottom-24 z-[9999] w-[calc(100%-2rem)] max-w-[360px] overflow-hidden rounded-[32px] border border-white/80 bg-white/85 shadow-[0_28px_80px_rgba(15,23,42,0.26)] backdrop-blur-xl ${
                isRTL ? "left-6" : "right-6"
              }`}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-[var(--main-color)] to-[var(--main-light)] px-5 pb-12 pt-5 text-white">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <motion.span
                    animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute left-10 top-10 h-2 w-2 rounded-full bg-white/40"
                  />
                  <motion.span
                    animate={{ y: [0, -18, 0], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute right-16 top-16 h-3 w-3 rounded-full bg-white/30"
                  />
                  <motion.span
                    animate={{ y: [0, -10, 0], opacity: [0.12, 0.35, 0.12] }}
                    transition={{ duration: 4.5, repeat: Infinity }}
                    className="absolute bottom-8 left-24 h-2.5 w-2.5 rounded-full bg-white/30"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`absolute top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95 ${
                    isRTL ? "left-4" : "right-4"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative z-10 flex items-center gap-4 pe-10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white shadow-sm">
                    <img
                      src="/Logo.png"
                      alt="Qassim National Hospital"
                      className="h-11 w-11 rounded-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold">
                      {isRTL ? "تواصل معنا" : "Connect with us"}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-white/85">
                      {isRTL
                        ? "اختر المنصة المناسبة لمتابعة أخبار وخدمات المستشفى."
                        : "Choose your preferred platform to follow hospital updates."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-4">
                <div className="rounded-[26px] border border-slate-100 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.a
                          key={item.key}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.25 }}
                          className={`group/social relative flex min-h-[78px] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-4 py-3 text-sm font-bold shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-xl hover:ring-4 hover:ring-white/20 active:scale-[0.98] ${item.className}`}
                        >
                          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/social:opacity-100">
                            <span className="absolute inset-y-0 -left-full w-1/2 rotate-12 bg-white/35 blur-md transition-all duration-700 group-hover/social:left-[140%]" />
                          </span>

                          <Icon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/social:scale-125 group-hover/social:-rotate-6" />

                          <span className="relative z-10">{item.label}</span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
