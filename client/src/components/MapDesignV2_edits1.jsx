import { CONTACT } from "../data/contact";

import { motion } from "framer-motion";
import { PhoneCall, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./reusableComponents/SectionTitle";
import SectionBadge from "./reusableComponents/SectionBadge";
import { useWebsiteLinks } from "../api/strapi";

export default function MapDesignV2_edits1() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { data: websiteLinks, isLoading } = useWebsiteLinks();

  return (
    <section className="relative overflow-hidden bg-[#f8fbfe] py-16 md:py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.07)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] h-[300px] w-[300px] rounded-full bg-[rgba(21,98,160,0.05)] blur-3xl" />

      <div className="relative mx-auto px-6 md:px-16 xl:px-24">
        {/* TOP CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
          className={`mx-auto max-w-3xl text-center `}
        >
          <div className={"flex justify-center"}>
            <SectionBadge>{t("mapSection.badge")}</SectionBadge>
          </div>

          <SectionTitle>{t("mapSection.title")}</SectionTitle>

          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            {t("mapSection.description")}
          </p>
        </motion.div>

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative mt-10"
        >
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(2,32,71,0.08)]">
            <div className="overflow-hidden rounded-[26px]">
              <iframe
                title={t("mapSection.mapTitle")}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.5706190793094!2d43.94303082456606!3d26.374345483019294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157f5781db4ce29d%3A0x7a1c1021da464611!2z2YXYs9iq2LTZgdmJINin2YTZgti12YrZhSDYp9mE2YjYt9mG2Yo!5e1!3m2!1sar!2seg!4v1762031405434!5m2!1sar!2seg"
                width="100%"
                height="560"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-8"
        >
          <div
            className={`flex flex-col items-center justify-center gap-3 sm:flex-row ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              {t("mapSection.buttons.directions")}
              <Navigation className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </a>

            <a
              href={`tel:${websiteLinks?.contactInfo?.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[rgba(21,98,160,0.35)] hover:text-[rgb(21,98,160)]"
            >
              {t("mapSection.buttons.call")}
              <PhoneCall className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
