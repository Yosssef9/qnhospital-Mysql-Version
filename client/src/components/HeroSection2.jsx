// HardCoded

// import {
//   ArrowRight,
//   PhoneCall,
//   ShieldCheck,
//   Clock,
//   Stethoscope,
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function HeroSection2() {
//   const trustChips = [
//     {
//       icon: Clock,
//       label: "24/7 Emergency",
//     },
//     {
//       icon: Stethoscope,
//       label: "Specialized Clinics",
//     },
//     {
//       icon: ShieldCheck,
//       label: "Patient-first Care",
//     },
//   ];

//   const stats = [
//     {
//       value: "24/7",
//       label: "Emergency",
//     },
//     {
//       value: "30+",
//       label: "Specialties",
//     },
//     {
//       value: "Fast",
//       label: "Appointments",
//     },
//   ];

//   return (
//     <section className="relative z-0 overflow-hidden bg-white">
//       {/* Background accents */}
//       <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-48 -left-40 h-[560px] w-[560px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

//       {/* subtle grid */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.06]"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right, rgba(15, 23, 42, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 1) 1px, transparent 1px)",
//           backgroundSize: "44px 44px",
//         }}
//       />

//       <div className="relative mx-auto px-6 md:px-40 py-14 md:py-20">
//         <div className="grid items-center gap-10 md:grid-cols-2">
//           {/* LEFT */}
//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//           >
//             <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.18)] bg-[rgba(21,98,160,0.06)] px-3 py-1 text-sm font-semibold text-[rgb(21,98,160)]">
//               <ShieldCheck className="h-4 w-4" />
//               Qassim National Hospital
//             </div>

//             <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-slate-600 leading-snug">
//               Compassionate Care <br />
//               You Can Trust
//             </h1>
//             <div className="mt-3 h-[4px] w-16 bg-[rgb(21,98,160)] rounded-full" />
//             <p className="mt-4 max-w-[450px] text-base leading-relaxed text-slate-600 md:text-lg">
//               Modern facilities, expert doctors, and a smooth patient journey —
//               from booking to recovery.
//             </p>

//             <div className="mt-7 flex flex-col gap-3 sm:flex-row">
//               <a
//                 href="/appointments"
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(21,98,160)] px-5 py-3 font-semibold text-white shadow-sm transition hover:opacity-95"
//               >
//                 Book Appointment
//                 <ArrowRight className="h-5 w-5" />
//               </a>

//               <a
//                 href="tel:0163836100"
//                 className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
//               >
//                 <PhoneCall className="h-5 w-5 text-[rgb(21,98,160)]" />
//                 0163836100
//               </a>
//             </div>

//             {/* Trust chips */}
//             <div className="mt-6 flex flex-wrap gap-2">
//               {trustChips.map((chip) => {
//                 const Icon = chip.icon;

//                 return (
//                   <span
//                     key={chip.label}
//                     className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 backdrop-blur-sm"
//                   >
//                     <Icon className="h-4 w-4 text-[rgb(21,98,160)]" />
//                     {chip.label}
//                   </span>
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* RIGHT */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: 60 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//           >
//             <div className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-[rgba(21,98,160,0.35)] via-white/70 to-[rgba(21,98,160,0.25)]">
//               <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[rgba(21,98,160,0.12)] blur-2xl" />
//               {/* Corner accents */}
//               <div className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 rounded-tl-[22px] border-l-2 border-t-2 border-[rgba(21,98,160,0.45)]" />
//               <div className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-br-[22px] border-b-2 border-r-2 border-[rgba(21,98,160,0.35)]" />

//               <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
//                 <img
//                   src="/images/qnh-image.webp"
//                   alt="Hospital care"
//                   className="h-[340px] w-full object-cover md:h-[460px] transition duration-700 group-hover:scale-[1.03]"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

//                 <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
//                   <div className="flex items-end justify-between gap-4">
//                     <div>
//                       <div className="text-base font-semibold     text-white md:text-lg">
//                         Compassionate • Professional • Efficient
//                       </div>
//                       <div className="mt-1 text-xs text-white/85">
//                         Easy appointments, clear guidance, and quality
//                         treatment.
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <motion.div
//               className="mt-4 grid grid-cols-3 gap-3"
//               initial={{ opacity: 0, y: 30, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//             >
//               {stats.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="rounded-2xl mt-2  bg-white/90 backdrop-blur border border-slate-200 p-4 text-center shadow-md"
//                 >
//                   <div className="text-xl font-semibold text-[rgb(21,98,160)]">
//                     {stat.value}
//                   </div>
//                   <div className="text-xs tracking-wide text-slate-500">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Clock,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";
import { useHeroSection2, useWebsiteLinks } from "../api/strapi";
import { useTranslation } from "react-i18next";
const iconMap = {
  clock: Clock,
  stethoscope: Stethoscope,
  shield: ShieldCheck,
};

export default function HeroSection2() {
  const { data, error } = useHeroSection2();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: websiteLinks } = useWebsiteLinks();

  const phone = websiteLinks?.contactInfo?.phone || "0163836100";

  const hero = data || {
    badgeText: "Qassim National Hospital",
    title: "Compassionate Care You Can Trust",
    description:
      "Modern facilities, expert doctors, and a smooth patient journey — from booking to recovery.",
    primaryButtonText: "Book Appointment",
    primaryButtonLink: "/appointments",
    image: "/images/qnh-image.webp",
    bottomTitle: "Compassionate • Professional • Efficient",
    bottomSubtitle: "Easy appointments, clear guidance, and quality treatment.",
    trustChips: [
      { icon: "clock", label: "24/7 Emergency" },
      { icon: "stethoscope", label: "Specialized Clinics" },
      { icon: "shield", label: "Patient-first Care" },
    ],
    stats: [
      { value: "24/7", label: "Emergency" },
      { value: "30+", label: "Specialties" },
      { value: "Fast", label: "Appointments" },
    ],
  };

  if (error) {
    console.error("HeroSection2 error:", error);
  }
  return (
    <section className="relative z-0 overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 h-[560px] w-[560px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15, 23, 42, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="relative mx-auto px-6 py-14 md:px-40 md:py-20"
      >
        {" "}
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.18)] bg-[rgba(21,98,160,0.06)] px-3 py-1 text-sm font-semibold text-[rgb(21,98,160)]">
              <ShieldCheck className="h-4 w-4" />
              {hero.badgeText}
            </div>

            <h1 className="mt-4 text-4xl font-semibold leading-snug tracking-[-0.01em] text-slate-600 md:text-5xl">
              {hero.title}
            </h1>

            <div className="mt-3 h-[4px] w-16 rounded-full bg-[rgb(21,98,160)]" />

            <p className="mt-4 max-w-[450px] text-base leading-relaxed text-slate-600 md:text-lg">
              {hero.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={hero.primaryButtonLink}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(21,98,160)] px-5 py-3 font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                {hero.primaryButtonText}
                <ArrowRight
                  className={[
                    "h-5 w-5 transition-transform",
                    isArabic ? "rotate-180" : "",
                  ].join(" ")}
                />{" "}
              </a>

              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                <PhoneCall className="h-5 w-5 text-[rgb(21,98,160)]" />
                {phone}
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {hero.trustChips.map((chip) => {
                const Icon = iconMap[chip.icon] || ShieldCheck;

                return (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4 text-[rgb(21,98,160)]" />
                    {chip.label}
                  </span>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="group relative rounded-3xl bg-gradient-to-br from-[rgba(21,98,160,0.35)] via-white/70 to-[rgba(21,98,160,0.25)] p-[1px]">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[rgba(21,98,160,0.12)] blur-2xl" />

              <div className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 rounded-tl-[22px] border-l-2 border-t-2 border-[rgba(21,98,160,0.45)]" />
              <div className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-br-[22px] border-b-2 border-r-2 border-[rgba(21,98,160,0.35)]" />

              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">
                <img
                  src={hero.image || "/images/qnh-image.webp"}
                  alt={hero.title}
                  className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-[1.03] md:h-[460px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="text-base font-semibold text-white md:text-lg">
                    {hero.bottomTitle}
                  </div>

                  <div className="mt-1 text-xs text-white/85">
                    {hero.bottomSubtitle}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="mt-4 grid grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="mt-2 rounded-2xl border border-slate-200 bg-white/90 p-4 text-center shadow-md backdrop-blur"
                >
                  <div className="text-xl font-semibold text-[rgb(21,98,160)]">
                    {stat.value}
                  </div>

                  <div className="text-xs tracking-wide text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
