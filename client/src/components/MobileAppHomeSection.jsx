import { motion } from "framer-motion";
import {
  Smartphone,
  CalendarDays,
  ShieldCheck,
  Clock3,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionBadge from "./reusableComponents/SectionBadge";
import SectionTitle from "./reusableComponents/SectionTitle";
import SectionSpinner from "./SectionSpinner";
import { useMobileAppHomeSection, useWebsiteLinks } from "../api/strapi";
import SectionPrimaryButton from "./SectionPrimaryButton";
// import { CONTACT } from "../data/contact";

const featureIcons = [CalendarDays, ShieldCheck, Clock3, Smartphone];

export default function MobileAppHomeSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { data: websiteLinks } = useWebsiteLinks();

  const { data, isLoading, error } = useMobileAppHomeSection();

  if (isLoading) {
    return (
      <section className="bg-[#f8fbfe] px-6 py-16 md:px-16 xl:px-24 md:py-24">
        <div className="mx-auto flex max-w-7xl justify-center">
          <SectionSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#f8fbfe] px-6 py-16 md:px-16 xl:px-24 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            {t("mobileAppHome.errorTitle")}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {t("mobileAppHome.errorDesc")}
          </p>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f8fbfe] px-6 py-16 md:px-16 xl:px-24 md:py-24"
    >
      {/* <div className="pointer-events-none absolute -top-16 right-0 h-[280px] w-[280px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[220px] w-[220px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" /> */}

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className={isRTL ? "text-right" : "text-left"}
          >
            <SectionBadge>{t("mobileAppHome.badge")}</SectionBadge>

            <SectionTitle>{data.title}</SectionTitle>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {data.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {data.features?.slice(0, 4).map((item, index) => {
                const Icon = featureIcons[index] || CheckCircle2;

                return (
                  <div
                    key={item.id}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)] text-[rgb(21,98,160)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={websiteLinks?.mobileAppLinks?.android}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm transition hover:bg-slate-50 hover:shadow-md ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                {/* <FaGooglePlay className="h-4 w-4" /> */}
                <img
                  src="/images/google-play-store-transparent-google-play-icon-11553530990d0xpnylfqx-removebg-preview.png"
                  alt="Google Play"
                  className="h-5 w-5"
                />
                {/* <FaGooglePlay className="h-4 w-4 text-[#34A853]" /> */}

                {t("appointmentsAppPage.buttons.android")}
              </a>

              <a
                href={websiteLinks?.mobileAppLinks?.ios}
                target="_blank"
                className={`inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-[rgb(21,98,160)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <FaApple className="h-6 w-6 text-white" />

                {/* <FaApple className="h-6 w-6 text-[rgb(21,98,160)]" /> */}

                {t("appointmentsAppPage.buttons.ios")}
              </a>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="relative flex justify-center"
          >
            {/* Background decorative shapes */}
            <div className="pointer-events-none absolute inset-0">
              {/* Main blur glows */}
              <div className="absolute top-[6%] left-[10%] h-32 w-32 rounded-full bg-[rgba(21,98,160,0.12)] blur-3xl" />
              <div className="absolute bottom-[10%] right-[8%] h-40 w-40 rounded-full bg-[rgba(30,127,143,0.16)] blur-3xl" />
              <div className="absolute top-[38%] left-[0%] h-24 w-24 rounded-full bg-[rgba(59,130,246,0.10)] blur-2xl" />

              {/* Glass cards */}
              <div className="absolute top-[18%] right-[2%] h-20 w-20 rounded-[28px] border border-white/50 bg-white/40 shadow-lg backdrop-blur-md" />
              <div className="absolute bottom-[20%] left-[0%] h-24 w-24 rounded-[30px] border border-white/40 bg-[rgba(21,98,160,0.10)] shadow-md backdrop-blur-md" />
              <div className="absolute top-[62%] right-[12%] h-14 w-14 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-sm" />

              {/* Thin ring accents */}
              <div className="absolute top-[12%] right-[18%] h-16 w-16 rounded-full border border-[rgba(21,98,160,0.18)]" />
              <div className="absolute bottom-[14%] left-[18%] h-12 w-12 rounded-full border border-[rgba(30,127,143,0.20)]" />

              {/* Dots */}
              <div className="absolute top-[28%] left-[14%] h-2.5 w-2.5 rounded-full bg-[rgb(21,98,160)]/50" />
              <div className="absolute top-[32%] left-[18%] h-1.5 w-1.5 rounded-full bg-[rgb(30,127,143)]/50" />
              <div className="absolute bottom-[28%] right-[18%] h-2 w-2 rounded-full bg-[rgb(21,98,160)]/40" />
            </div>

            <motion.div
              whileHover={{ y: -10, rotate: -1.2, scale: 1.015 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[390px]"
            >
              {/* Phone shadow base */}
              <div className="absolute inset-x-10 bottom-[-20px] h-10 rounded-full bg-black/15 blur-2xl" />

              {/* Phone frame */}
              <div className="relative rounded-[44px] border border-slate-300/80 bg-slate-700 p-[10px] shadow-[0_35px_90px_rgba(15,23,42,0.22)]">
                {/* Top notch / speaker */}
                <div className="absolute left-1/2 top-[14px] z-20 h-[22px] w-[120px] -translate-x-1/2 rounded-full bg-slate-900">
                  <div className="absolute left-1/2 top-1/2 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700" />
                </div>

                {/* Screen */}
                <div className="relative h-[755px] overflow-hidden rounded-[36px] bg-white">
                  <img
                    src={data.phoneImage || "/images/placeholder-doctor.jpg"}
                    alt={data.title}
                    className="h-[750px] w-full object-cover"
                  />

                  {/* subtle glass shine */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0.08)_24%,transparent_42%,transparent_100%)]" />

                  {/* bottom fade for premium depth */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <SectionPrimaryButton to="/appointments-App">
            {t("mobileAppHome.learnMoreText")}
          </SectionPrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}
