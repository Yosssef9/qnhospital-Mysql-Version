import { motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseMedical,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./reusableComponents/SectionTitle";
import SectionBadge from "./reusableComponents/SectionBadge";
import { useOurDoctorsSection } from "../api/strapi";
import SectionSpinner from "./SectionSpinner";
import { formatArabicYears } from "../helpers/formatArabicYears";
import SectionPrimaryButton from "./SectionPrimaryButton";
import getDoctorPrefix from "../utils/getDoctorPrefix";

export default function OurDoctorsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const isArabic = i18n.language.startsWith("ar");

  const { data, isLoading, error } = useOurDoctorsSection();

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
            Something went wrong
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Unable to load doctors section.
          </p>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const count = Number(data.doctorExperience || 0);

  const word = isArabic
    ? formatArabicYears(count)
    : count === 1
      ? "Year"
      : "Years";

  const experienceCardText = t("ourDoctorsSection.experienceCard", {
    count,
    word,
  });

  const doctorExperienceText = t("ourDoctorsSection.doctorExperience", {
    count,
    word,
  });

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbfe_0%,#eef6fb_100%)] px-6 py-16 md:px-16 xl:px-24 md:py-24"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[8%] h-[280px] w-[280px] rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />
        <div className="absolute top-[25%] right-[8%] h-[340px] w-[340px] rounded-full bg-[rgba(30,127,143,0.12)] blur-3xl" />
        <div className="absolute -bottom-20 left-[25%] h-[260px] w-[260px] rounded-full bg-[rgba(59,130,246,0.10)] blur-3xl" />

        {/* subtle lines/grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08 }}
            viewport={{ once: true, amount: 0.25 }}
            className="relative order-2 lg:order-1"
          >
            {/* Decorative shapes behind image */}
            <div className="pointer-events-none absolute -top-6 -left-6 h-24 w-24 rounded-[28px] border border-white/60 bg-white/30 backdrop-blur-md shadow-lg" />
            <div className="pointer-events-none absolute -bottom-6 right-6 h-20 w-20 rounded-full border border-white/60 bg-[rgba(21,98,160,0.15)] blur-sm" />
            <div className="pointer-events-none absolute top-[18%] -right-5 h-14 w-14 rounded-2xl rotate-12 bg-[rgba(30,127,143,0.18)]" />

            {/* Main image frame */}
            <div className="relative rounded-[34px] bg-gradient-to-br from-white via-white to-[rgba(21,98,160,0.08)] p-[1.5px] shadow-[0_25px_80px_rgba(15,23,42,0.14)]">
              <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/85 p-3 backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[26px]">
                  <img
                    src={data.doctorImage || "/images/placeholder-doctor.jpg"}
                    alt={data.doctorName}
                    className="h-[400px] w-full bg-slate-200 object-cover md:h-[560px]"
                  />

                  {/* image overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-900/8 to-white/10" />
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/12 to-transparent" />

                  {/* Featured badge */}
                  <div
                    className={`absolute top-5 ${isRTL ? "right-5" : "left-5"}`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-[rgb(21,98,160)] shadow-lg backdrop-blur-md">
                      <Sparkles className="h-4 w-4" />
                      {t("ourDoctorsSection.featuredDoctor")}
                    </div>
                  </div>

                  {/* Doctor quick caption */}
                  <div
                    className={`absolute bottom-5 ${
                      isRTL ? "right-5" : "left-5"
                    }`}
                  >
                    <div className="rounded-2xl border border-white/20 bg-slate-900/35 px-4 py-3 text-white backdrop-blur-md">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                        {t("ourDoctorsSection.badge")}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold md:text-xl">
                        {getDoctorPrefix(data.doctorRank, i18n.language)}{" "}
                        {data.doctorName}
                      </h3>
                      <p className="mt-1 text-sm text-white/80">
                        {data.doctorSpecialty}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating experience card */}
            {/* <div
              className={`hidden md:block absolute bottom-6 z-10 w-[260px] rounded-[26px] border border-white/60 bg-white/75 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl ${
                isRTL ? "-left-2 md:-left-10" : "-right-2 md:-right-10"
              }`}
            >
              <div className="flex items-center gap-2 text-[rgb(21,98,160)]">
                <BadgeCheck className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {t("ourDoctorsSection.experienceLabel")}
                </span>
              </div>

              <div className="mt-3 text-3xl font-light leading-none text-[rgb(21,98,160)]">
                {experienceCardText}
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {data.experienceDescription}
              </p>
            </div> */}
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`${isRTL ? "text-right" : "text-left"} order-1 lg:order-2`}
          >
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8 xl:p-10">
              <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[rgba(30,127,143,0.10)] blur-3xl" />

              <div className="relative">
                <SectionBadge>{t("ourDoctorsSection.badge")}</SectionBadge>

                <SectionTitle>{data.title}</SectionTitle>

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.12)] bg-[rgba(21,98,160,0.08)] px-4 py-2 text-sm font-semibold text-[rgb(21,98,160)]">
                    <Stethoscope className="h-4 w-4" />
                    {data.doctorSpecialty}
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    <BadgeCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                    {doctorExperienceText}
                  </div>
                </div>

                <h3 className="mt-5 text-2xl font-light leading-tight text-slate-900 md:text-3xl xl:text-[2.1rem]">
                  {getDoctorPrefix(data.doctorRank, i18n.language)}{" "}
                  {data.doctorName}
                </h3>

                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                  {data.doctorDescription}
                </p>

                {/* <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="group rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-2 text-[rgb(21,98,160)]">
                      <BriefcaseMedical className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        {t("ourDoctorsSection.departmentLabel")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {data.doctorDepartment}
                    </p>
                  </div>

                  <div className="group rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-2 text-[rgb(21,98,160)]">
                      <BadgeCheck className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        {t("ourDoctorsSection.experienceLabel")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {doctorExperienceText}
                    </p>
                  </div>
                </div> */}

                <div className="mt-8">
                  <SectionPrimaryButton to="/our-doctors">
                    {t("ourDoctorsSection.button")}
                  </SectionPrimaryButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
