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
  console.log("FloatingSocialLogo data", websiteLinks);
  const socialLinks = [
    {
      key: "facebook",
      label: "Facebook",
      icon: FaFacebookF,
      url: websiteLinks?.socialMediaLinks?.facebook,
      className: "bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: FaInstagram,
      url: websiteLinks?.socialMediaLinks?.instagram,
      className:
        "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white border-[#DD2A7B]",
    },
    {
      key: "twitter",
      label: "X",
      icon: FaXTwitter,
      url: websiteLinks?.socialMediaLinks?.twitter,
      className: "bg-black text-white border-black hover:bg-slate-900",
    },
    {
      key: "youtube",
      label: "YouTube",
      icon: FaYoutube,
      url: websiteLinks?.socialMediaLinks?.youtube,
      className: "bg-[#FF0000] text-white border-[#FF0000] hover:bg-[#E60000]",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: FaWhatsapp,
      url: websiteLinks?.contactInfo?.phone
        ? `https://wa.me/${websiteLinks.contactInfo?.phone.replace(/\D/g, "")}`
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
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileTap={{
          scale: 0.9,
        }}
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
        className={`cursor-pointer group fixed bottom-6 z-[9998] flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-white shadow-[0_0_0_3px_rgba(21,98,160,0.10),0_14px_40px_rgba(15,23,42,0.18),0_0_28px_rgba(21,98,160,0.22)] ${
          isRTL ? "left-6" : "right-6"
        }`}
      >
        {/* Glow Ring */}
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

        {/* Logo */}
        <img
          src="/Logo.png"
          alt="Qassim National Hospital"
          className="relative z-10 h-12 w-12 rounded-full object-contain"
        />
      </motion.button>
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
              className={`fixed bottom-24 z-[9999] w-[calc(100%-2rem)] max-w-[360px] overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.26)] ${
                isRTL ? "left-6" : "right-6"
              }`}
            >
              <div className="relative bg-gradient-to-br from-[var(--main-color)] to-[var(--main-light)] px-5 pb-12 pt-5 text-white">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`absolute top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 ${
                    isRTL ? "left-4" : "right-4"
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-4 pe-10">
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
                {" "}
                <div className="rounded-[26px] border border-slate-100 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a
                          key={item.key}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex min-h-[74px] flex-col items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-1 hover:shadow-lg  ${item.className}`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </a>
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
