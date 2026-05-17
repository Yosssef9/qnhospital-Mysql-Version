import { motion } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionTitle from "./reusableComponents/SectionTitle";
import SectionBadge from "./reusableComponents/SectionBadge";
import SectionPrimaryButton from "./SectionPrimaryButton";

export default function HospitalStorySection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const features = [
    t("hospitalStorySection.features.item1"),
    t("hospitalStorySection.features.item2"),
    t("hospitalStorySection.features.item3"),
  ];

  const stats = [
    {
      value: t("hospitalStorySection.stats.emergency.value"),
      label: t("hospitalStorySection.stats.emergency.label"),
    },
    {
      value: t("hospitalStorySection.stats.specialties.value"),
      label: t("hospitalStorySection.stats.specialties.label"),
    },
    {
      value: t("hospitalStorySection.stats.beds.value"),
      label: t("hospitalStorySection.stats.beds.label"),
    },
  ];

  return (
    <section dir={isRTL ? "rtl" : "ltr"} className="bg-[#f8fbfe]">
      <div className="mx-auto px-6 py-16 md:px-16 md:py-24 xl:px-24">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.1 }}
            viewport={{ once: true, amount: 0.25 }}
            className="relative order-2 lg:order-1"
          >
            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100 shadow-sm">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-[340px] w-full object-cover md:h-[500px]"
              >
                <source src="/videos/qnh-drone.mp4" type="video/mp4" />
              </video>
            </div>

            <div
              className={`absolute bottom-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur ${
                isRTL ? "left-4" : "right-4"
              }`}
            >
              <div className="text-xs uppercase tracking-[0.25em] text-slate-500">
                {t("hospitalStorySection.locationLabel")}
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <MapPin className="h-4 w-4 text-[rgb(21,98,160)]" />
                {t("hospitalStorySection.locationValue")}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.1 }}
            viewport={{ once: true, amount: 0.25 }}
            className={`${isRTL ? "text-right" : "text-left"} order-1 lg:order-2`}
          >
            <SectionBadge>{t("hospitalStorySection.badge")}</SectionBadge>

            <SectionTitle className="">
              {t("hospitalStorySection.title")}
            </SectionTitle>

            <p className="mt-5 leading-8 text-slate-600">
              {t("hospitalStorySection.description")}
            </p>

            <div className="mt-8 space-y-4">
              {features.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.10)]">
                    <ShieldCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                  </div>
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-2xl font-bold text-[rgb(21,98,160)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <SectionPrimaryButton to="/qnh-history">
                {t("hospitalStorySection.button")}
              </SectionPrimaryButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
