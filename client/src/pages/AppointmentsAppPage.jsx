import { motion } from "framer-motion";
import {
  Smartphone,
  CalendarDays,
  Download,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  SmartphoneCharging,
  FileText,
} from "lucide-react";
import { FaGooglePlay, FaApple, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import SectionBadge from "../components/reusableComponents/SectionBadge";
import SectionTitle from "../components/reusableComponents/SectionTitle";
import { CONTACT } from "../data/contact";
import { useWebsiteLinks } from "../api/strapi";
import { trackEvent } from "../utils/analytics";

export default function AppointmentsAppPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { data: websiteLinks, isLoading } = useWebsiteLinks();

  const features = [
    {
      icon: CalendarDays,
      title: t("appointmentsAppPage.features.book.title"),
      desc: t("appointmentsAppPage.features.book.desc"),
    },
    {
      icon: Stethoscope,
      title: t("appointmentsAppPage.features.doctors.title"),
      desc: t("appointmentsAppPage.features.doctors.desc"),
    },

    {
      icon: ShieldCheck,
      title: t("appointmentsAppPage.features.safe.title"),
      desc: t("appointmentsAppPage.features.safe.desc"),
    },
    {
      icon: FileText, // أو ClipboardList أو FileCheck
      title: t("appointmentsAppPage.features.records.title"),
      desc: t("appointmentsAppPage.features.records.desc"),
    },
  ];

  const steps = [
    t("appointmentsAppPage.steps.step1"),
    t("appointmentsAppPage.steps.step2"),
    t("appointmentsAppPage.steps.step3"),
    t("appointmentsAppPage.steps.step4"),
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-[#f8fbfe]">
      {/* <BreadcrumbArea
        imgUrl="/images/about-us-header.jpg"
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("appointmentsAppPage.breadcrumb") },
        ]}
      /> */}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={isRTL ? "text-right" : "text-left"}
          >
            <SectionBadge>{t("appointmentsAppPage.badge")}</SectionBadge>

            <SectionTitle className="font-">
              {t("appointmentsAppPage.title")}
            </SectionTitle>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {t("appointmentsAppPage.description")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={websiteLinks?.mobileAppLinks?.android}
                target="_blank"
                onClick={() =>
                  trackEvent("app_download_android", {
                    location: "appointments_app_page",
                  })
                }
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm transition hover:bg-slate-50 hover:shadow-md ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                {/* <FaGooglePlay className="h-4 w-4" /> */}
                <img
                  src="images\google-play-store-transparent-google-play-icon-11553530990d0xpnylfqx-removebg-preview.png"
                  alt="Google Play"
                  className="h-5 w-5"
                />
                {/* <FaGooglePlay className="h-4 w-4 text-[#34A853]" /> */}

                {t("appointmentsAppPage.buttons.android")}
              </a>

              <a
                href={websiteLinks?.mobileAppLinks?.ios}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("app_download_ios", {
                    location: "appointments_app_page",
                  })
                }
                className={`inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-[rgb(21,98,160)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <FaApple className="h-6 w-6 text-white" />

                {/* <FaApple className="h-6 w-6 text-[rgb(21,98,160)]" /> */}

                {t("appointmentsAppPage.buttons.ios")}
              </a>
              <a
                href={`https://wa.me/966${websiteLinks?.contactInfo?.callCenterPhone}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:shadow-md ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <FaWhatsapp className="h-5 w-5" />

                {isRTL ? "تواصل معنا" : "Contact Us"}
                {/* {isRTL ? "احجز الآن" : "Book Now"} */}
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-[rgb(21,98,160)]">
                  {t("appointmentsAppPage.quickInfo.availableLabel")}
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  {t("appointmentsAppPage.quickInfo.availableValue")}
                </div>
              </div>

              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-[rgb(21,98,160)]">
                  {t("appointmentsAppPage.quickInfo.bookingLabel")}
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  {t("appointmentsAppPage.quickInfo.bookingValue")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative"
          >
            <div className="mx-auto max-w-[360px]">
              <div className="rounded-[38px] border border-slate-200 bg-slate-900 p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
                <div className="overflow-hidden rounded-[30px] bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      {/* QNH App */}
                      <img
                        src="\images\newLogo-removebg-preview.png"
                        alt="Qassim National Hospital"
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                    <SmartphoneCharging className="h-4 w-4 text-[rgb(21,98,160)]" />
                  </div>

                  <div className="p-5">
                    <div className="rounded-3xl bg-[rgba(21,98,160,0.08)] p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                        {t("appointmentsAppPage.mockup.topLabel")}
                      </div>
                      <div className="mt-2 text-lg font-semibold text-slate-900">
                        {t("appointmentsAppPage.mockup.title")}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">
                        {t("appointmentsAppPage.mockup.desc")}
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.10)] text-[rgb(21,98,160)]">
                            <CalendarDays className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-800">
                              {t(
                                `appointmentsAppPage.mockup.cards.card${n}.title`,
                              )}
                            </div>
                            <div className="text-xs text-slate-500">
                              {t(
                                `appointmentsAppPage.mockup.cards.card${n}.desc`,
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl bg-[rgb(21,98,160)] px-4 py-3 text-center text-sm font-semibold text-white">
                      {t("appointmentsAppPage.mockup.button")}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute -bottom-5 ${
                  isRTL ? "-left-6" : "-right-6"
                } rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur`}
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  {t("appointmentsAppPage.floatingCard.label")}
                </div>
                <div className="mt-1 text-lg font-semibold text-[rgb(21,98,160)]">
                  {t("appointmentsAppPage.floatingCard.value")}
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  {t("appointmentsAppPage.floatingCard.desc")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">
        <div className={isRTL ? "text-right" : "text-left"}>
          <SectionBadge>{t("appointmentsAppPage.featuresBadge")}</SectionBadge>
          <SectionTitle className="font-light">
            {t("appointmentsAppPage.featuresTitle")}
          </SectionTitle>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)] text-[rgb(21,98,160)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10 lg:px-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className={isRTL ? "text-right" : "text-left"}>
            <SectionBadge>{t("appointmentsAppPage.stepsBadge")}</SectionBadge>
            <SectionTitle className="font-light">
              {t("appointmentsAppPage.stepsTitle")}
            </SectionTitle>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(21,98,160)] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] p-8 text-white shadow-[0_24px_60px_rgba(21,98,160,0.22)] md:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className={`max-w-2xl ${isRTL ? "text-right" : "text-left"}`}>
              <h3 className="text-2xl font-semibold md:text-3xl">
                {t("appointmentsAppPage.cta.title")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/90 md:text-base">
                {t("appointmentsAppPage.cta.desc")}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <a
                href={websiteLinks?.mobileAppLinks?.android}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[rgb(21,98,160)] transition hover:opacity-95 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <img
                  src="images\google-play-store-transparent-google-play-icon-11553530990d0xpnylfqx-removebg-preview.png"
                  alt="Google Play"
                  className="h-5 w-5"
                />
                {/* <FaGooglePlay className="h-4 w-4" />{" "} */}
                {t("appointmentsAppPage.buttons.android")}
              </a>

              <a
                href={websiteLinks?.mobileAppLinks?.ios}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <FaApple className="h-6 w-6 text-[rgb(255,255,255)]" />
                {t("appointmentsAppPage.buttons.ios")}
              </a>
              {/* <a
                href={`https://wa.me/966${websiteLinks?.contactInfo?.callCenterPhone}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <FaWhatsapp className="h-5 w-5" />

                {isRTL ? "تواصل معنا" : "Contact Us"}
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
