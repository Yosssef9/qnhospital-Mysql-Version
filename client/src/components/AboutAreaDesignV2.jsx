// import { motion } from "framer-motion";
// import {
//   ShieldCheck,
//   Award,
//   HeartPulse,
//   Building2,
//   CheckCircle2,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import SectionTitle from "./reusableComponents/SectionTitle";
// import SectionBadge from "./reusableComponents/SectionBadge";

// export default function AboutAreaDesignV2() {
//   const { t, i18n } = useTranslation();
//   const isRTL = i18n.dir() === "rtl";

//   const highlights = [
//     {
//       icon: HeartPulse,
//       title: t(
//         "aboutQNHsection.highlights.items.comprehensiveMedicalServices.title",
//       ),
//       desc: t(
//         "aboutQNHsection.highlights.items.comprehensiveMedicalServices.desc",
//       ),
//     },
//     {
//       icon: ShieldCheck,
//       title: t(
//         "aboutQNHsection.highlights.items.patientFocusedExperience.title",
//       ),
//       desc: t("aboutQNHsection.highlights.items.patientFocusedExperience.desc"),
//     },
//     {
//       icon: Award,
//       title: t(
//         "aboutQNHsection.highlights.items.accreditedQualityStandards.title",
//       ),
//       desc: t(
//         "aboutQNHsection.highlights.items.accreditedQualityStandards.desc",
//       ),
//     },
//   ];

//   const featurePoints = [
//     t("aboutQNHsection.featurePoints.point1"),
//     t("aboutQNHsection.featurePoints.point2"),
//     t("aboutQNHsection.featurePoints.point3"),
//     t("aboutQNHsection.featurePoints.point4"),
//   ];

//   return (
//     <section
//       dir={isRTL ? "rtl" : "ltr"}
//       className="relative overflow-hidden bg-[#f8fbfe] px-6 py-16 md:px-16 xl:px-24 md:py-24"
//     >
//       <div className="relative grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
//         {/* LEFT VISUAL */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.0, delay: 0.1 }}
//           viewport={{ once: true, amount: 0.25 }}
//           className="relative"
//         >
//           <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-3 shadow-[0_18px_60px_rgba(2,32,71,0.08)]">
//             <div className="relative overflow-hidden rounded-[26px]">
//               <img
//                 src="/images/about.jpeg"
//                 alt={t("aboutQNHsection.imageAlt")}
//                 className="h-[360px] w-full object-cover md:h-[560px]"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />

//               <div className={`absolute top-5 ${isRTL ? "right-5" : "left-5"}`}>
//                 <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
//                   <Building2 className="h-4 w-4" />
//                   {t("aboutQNHsection.hospitalName")}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div
//             className={`absolute bottom-6 w-[250px] rounded-[24px] border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur md:w-[250px] ${
//               isRTL
//                 ? "left-[-8px] md:left-[-32px]"
//                 : "right-[-8px] md:right-[-32px]"
//             }`}
//           >
//             <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
//               {t("aboutQNHsection.establishedLabel")}
//             </div>

//             <div className="mt-2 text-3xl font-semibold text-[rgb(21,98,160)]">
//               {t("aboutQNHsection.establishedYear")}
//             </div>

//             <p className="mt-2 text-sm leading-6 text-slate-600">
//               {t("aboutQNHsection.establishedDescription")}
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <div className="rounded-2xl bg-slate-50 p-3 text-center">
//                 <div className="text-lg font-semibold text-slate-800">
//                   {t("aboutQNHsection.stats.beds.value")}
//                 </div>
//                 <div className="text-xs text-slate-500">
//                   {t("aboutQNHsection.stats.beds.label")}
//                 </div>
//               </div>

//               <div className="rounded-2xl bg-slate-50 p-3 text-center">
//                 <div className="text-lg font-semibold text-slate-800">
//                   {t("aboutQNHsection.stats.emergency.value")}
//                 </div>
//                 <div className="text-xs text-slate-500">
//                   {t("aboutQNHsection.stats.emergency.label")}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div> */}
//         <motion.div
//           initial={{ opacity: 0, y: 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.0, delay: 0.1 }}
//           viewport={{ once: true, amount: 0.25 }}
//           className="relative"
//         >
//           {/* Background shapes */}
//           <div className="pointer-events-none absolute inset-0 -z-10">
//             {/* Main glows */}
//             <div className="absolute -top-10 left-[-30px] h-40 w-40 rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />
//             <div className="absolute bottom-[8%] right-[-25px] h-44 w-44 rounded-full bg-[rgba(30,127,143,0.12)] blur-3xl" />
//             <div className="absolute top-[45%] left-[-10px] h-24 w-24 rounded-full bg-[rgba(59,130,246,0.10)] blur-2xl" />

//             {/* Ring accents */}
//             <div className="absolute top-[18%] right-[8%] h-16 w-16 rounded-full border border-[rgba(21,98,160,0.16)]" />
//             <div className="absolute bottom-[20%] left-[6%] h-12 w-12 rounded-full border border-[rgba(30,127,143,0.20)]" />

//             {/* Glass shapes */}
//             <div className="absolute top-[28%] left-[0%] h-20 w-20 rounded-[26px] border border-white/50 bg-white/35 shadow-lg backdrop-blur-md" />
//             <div className="absolute bottom-[14%] right-[10%] h-14 w-14 rounded-2xl border border-white/40 bg-[rgba(21,98,160,0.10)] shadow-md backdrop-blur-sm" />
//             <div className="absolute top-[10%] left-[18%] h-10 w-10 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-sm" />

//             {/* Dots */}
//             <div className="absolute top-[22%] left-[16%] h-2.5 w-2.5 rounded-full bg-[rgb(21,98,160)]/45" />
//             <div className="absolute top-[26%] left-[20%] h-1.5 w-1.5 rounded-full bg-[rgb(30,127,143)]/50" />
//             <div className="absolute bottom-[26%] right-[18%] h-2 w-2 rounded-full bg-[rgb(21,98,160)]/40" />
//           </div>

//           <motion.div
//             whileHover={{ y: -6, scale: 1.01 }}
//             transition={{ duration: 0.35, ease: "easeOut" }}
//             className="relative"
//           >
//             {/* Outer glow */}
//             <div className="absolute -inset-3 rounded-[40px] bg-[rgba(21,98,160,0.10)] blur-2xl" />

//             {/* Gradient frame */}
//             <div className="relative rounded-[34px] bg-gradient-to-br from-[rgba(21,98,160,0.22)] via-white to-[rgba(30,127,143,0.16)] p-[2px] shadow-[0_24px_70px_rgba(2,32,71,0.12)]">
//               {/* Main card */}
//               <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/95 p-3 backdrop-blur-sm">
//                 <div className="relative overflow-hidden rounded-[26px]">
//                   <img
//                     src="/images/about.jpeg"
//                     alt={t("aboutQNHsection.imageAlt")}
//                     className="h-[360px] w-full object-cover transition duration-700 hover:scale-[1.03] md:h-[560px]"
//                   />

//                   {/* Depth overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />

//                   {/* Shine effect */}
//                   <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_24%,transparent_42%,transparent_100%)]" />

//                   {/* Inner border */}
//                   <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-white/20" />

//                   {/* Top badge */}
//                   <div
//                     className={`absolute top-5 ${isRTL ? "right-5" : "left-5"}`}
//                   >
//                     <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md shadow-lg">
//                       <Building2 className="h-4 w-4" />
//                       {t("aboutQNHsection.hospitalName")}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Floating stats card */}
//           <div
//             className={`absolute bottom-6 w-[250px] rounded-[26px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl ${
//               isRTL
//                 ? "left-[-8px] md:left-[-32px]"
//                 : "right-[-8px] md:right-[-32px]"
//             }`}
//           >
//             {/* top accent line */}
//             <div className="absolute inset-x-6 top-2 h-[2px] rounded-full bg-[rgb(21,98,160)]/70" />

//             <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
//               {t("aboutQNHsection.establishedLabel")}
//             </div>

//             <div className="mt-2 text-3xl font-semibold text-[rgb(21,98,160)]">
//               {t("aboutQNHsection.establishedYear")}
//             </div>

//             <p className="mt-2 text-sm leading-6 text-slate-600">
//               {t("aboutQNHsection.establishedDescription")}
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center shadow-sm">
//                 <div className="text-lg font-semibold text-slate-800">
//                   {t("aboutQNHsection.stats.beds.value")}
//                 </div>
//                 <div className="text-xs text-slate-500">
//                   {t("aboutQNHsection.stats.beds.label")}
//                 </div>
//               </div>

//               <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center shadow-sm">
//                 <div className="text-lg font-semibold text-slate-800">
//                   {t("aboutQNHsection.stats.emergency.value")}
//                 </div>
//                 <div className="text-xs text-slate-500">
//                   {t("aboutQNHsection.stats.emergency.label")}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* RIGHT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, y: 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.1 }}
//           viewport={{ once: true, amount: 0.65 }}
//           className={isRTL ? "lg:pr-6 text-right" : "lg:pl-6 text-left"}
//         >
//           <SectionBadge>{t("aboutQNHsection.badge")}</SectionBadge>

//           <SectionTitle className="">{t("aboutQNHsection.title")}</SectionTitle>

//           <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
//             {t("aboutQNHsection.description.beforeDate")}{" "}
//             <span className="font-semibold text-slate-800">
//               {t("aboutQNHsection.description.openDate")}
//             </span>
//             {t("aboutQNHsection.description.afterDate")}{" "}
//             <span className="font-semibold text-slate-800">
//               {t("aboutQNHsection.description.beds")}
//             </span>
//             {t("aboutQNHsection.description.afterBeds")}
//           </p>

//           <div className="mt-8 space-y-5">
//             {highlights.map((item, index) => {
//               const Icon = item.icon;

//               return (
//                 <div key={index} className="flex gap-4">
//                   <div className="flex flex-col items-center">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)]">
//                       <Icon className="h-5 w-5 text-[rgb(21,98,160)]" />
//                     </div>

//                     {index !== highlights.length - 1 && (
//                       <div className="mt-2 h-full w-px bg-slate-200" />
//                     )}
//                   </div>

//                   <div className="pb-2">
//                     <div className="text-base font-semibold text-slate-800">
//                       {item.title}
//                     </div>
//                     <div className="mt-1 text-sm leading-7 text-slate-600">
//                       {item.desc}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-8 grid gap-3 sm:grid-cols-2">
//             {featurePoints.map((item, index) => (
//               <div key={index} className="flex items-start gap-2">
//                 <CheckCircle2 className="mt-0.5 h-4 w-4 text-[rgb(21,98,160)]" />
//                 <span className="text-sm text-slate-700">{item}</span>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  HeartPulse,
  Building2,
  CheckCircle2,
  Stethoscope,
  Hospital,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./reusableComponents/SectionTitle";
import SectionBadge from "./reusableComponents/SectionBadge";
import { useAboutQnhSection } from "../api/strapi";
import SectionSpinner from "./SectionSpinner";
import { iconMap } from "../constants/iconMap";

export default function AboutAreaDesignV2() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { data, isLoading, isError } = useAboutQnhSection();


  if (isLoading) {
    return (
      <section className="bg-[#f8fbfe] px-6 py-16 md:px-16 xl:px-24 md:py-24">
        <div className="mx-auto flex max-w-7xl justify-center">
          <SectionSpinner />
        </div>
      </section>
    );
  }

  if (isError) {
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

  const highlights = data.highlights.map((item) => ({
    ...item,
    icon: iconMap[item.iconKey] || HeartPulse,
  }));

  const featurePoints = data.featurePoints || [];

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f8fbfe] px-6 py-16 md:px-16 xl:px-24 md:py-24"
    >
      <div className="relative grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT VISUAL */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative"
        >
          {/* Background shapes */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-10 left-[-30px] h-40 w-40 rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />
            <div className="absolute bottom-[8%] right-[-25px] h-44 w-44 rounded-full bg-[rgba(30,127,143,0.12)] blur-3xl" />
            <div className="absolute top-[45%] left-[-10px] h-24 w-24 rounded-full bg-[rgba(59,130,246,0.10)] blur-2xl" />

            <div className="absolute top-[18%] right-[8%] h-16 w-16 rounded-full border border-[rgba(21,98,160,0.16)]" />
            <div className="absolute bottom-[20%] left-[6%] h-12 w-12 rounded-full border border-[rgba(30,127,143,0.20)]" />

            <div className="absolute top-[28%] left-[0%] h-20 w-20 rounded-[26px] border border-white/50 bg-white/35 shadow-lg backdrop-blur-md" />
            <div className="absolute bottom-[14%] right-[10%] h-14 w-14 rounded-2xl border border-white/40 bg-[rgba(21,98,160,0.10)] shadow-md backdrop-blur-sm" />
            <div className="absolute top-[10%] left-[18%] h-10 w-10 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-sm" />

            <div className="absolute top-[22%] left-[16%] h-2.5 w-2.5 rounded-full bg-[rgb(21,98,160)]/45" />
            <div className="absolute top-[26%] left-[20%] h-1.5 w-1.5 rounded-full bg-[rgb(30,127,143)]/50" />
            <div className="absolute bottom-[26%] right-[18%] h-2 w-2 rounded-full bg-[rgb(21,98,160)]/40" />
          </div>

          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[40px] bg-[rgba(21,98,160,0.10)] blur-2xl" />

            <div className="relative rounded-[34px] bg-gradient-to-br from-[rgba(21,98,160,0.22)] via-white to-[rgba(30,127,143,0.16)] p-[2px] shadow-[0_24px_70px_rgba(2,32,71,0.12)]">
              <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/95 p-3 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-[26px]">
                  <img
                    src={data.image || "/images/about.jpeg"}
                    alt={data.imageAlt}
                    className="h-[360px] w-full object-cover transition duration-700 hover:scale-[1.03] md:h-[560px]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_24%,transparent_42%,transparent_100%)]" />

                  <div className="pointer-events-none absolute inset-3 rounded-[22px] border border-white/20" />

                  <div
                    className={`absolute top-5 ${isRTL ? "right-5" : "left-5"}`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-sm font-medium text-white shadow-lg backdrop-blur-md">
                      <Building2 className="h-4 w-4" />
                      {data.hospitalName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating stats card */}
          <div
            className={`absolute bottom-6 w-[250px] rounded-[26px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-xl ${
              isRTL
                ? "left-[-8px] md:left-[-32px]"
                : "right-[-8px] md:right-[-32px]"
            }`}
          >
            <div className="absolute inset-x-6 top-2 h-[2px] rounded-full bg-[rgb(21,98,160)]/70" />

            <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
              {data.establishedLabel}
            </div>

            <div className="mt-2 text-3xl font-semibold text-[rgb(21,98,160)]">
              {data.establishedYear}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {data.establishedDescription}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center shadow-sm">
                <div className="text-lg font-semibold text-slate-800">
                  {data.bedValue}
                </div>
                <div className="text-xs text-slate-500">{data.bedLabel}</div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center shadow-sm">
                <div className="text-lg font-semibold text-slate-800">
                  {data.emergencyValue}
                </div>
                <div className="text-xs text-slate-500">
                  {data.emergencyLabel}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.65 }}
          className={isRTL ? "text-right lg:pr-6" : "text-left lg:pl-6"}
        >
          <SectionBadge>{data.badge}</SectionBadge>

          <SectionTitle className="">{data.title}</SectionTitle>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            {data.description}
          </p>

          <div className="mt-8 space-y-5">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.id || index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)]">
                      <Icon className="h-5 w-5 text-[rgb(21,98,160)]" />
                    </div>

                    {index !== highlights.length - 1 && (
                      <div className="mt-2 h-full w-px bg-slate-200" />
                    )}
                  </div>

                  <div className="pb-2">
                    <div className="text-base font-semibold text-slate-800">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm leading-7 text-slate-600">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {featurePoints.map((item, index) => (
              <div key={item.id || index} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[rgb(21,98,160)]" />
                <span className="text-sm text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
