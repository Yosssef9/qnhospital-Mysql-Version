// import { motion } from "framer-motion";
// import { ArrowRight, ShieldCheck } from "lucide-react";
// import { Link } from "react-router-dom";
// import SectionTitle from "./reusableComponents/SectionTitle";
// import SectionBadge from "./reusableComponents/SectionBadge";

// const accreditations = [
//   {
//     title: "CBAHI",
//     subtitle:
//       "Saudi Central Board for Accreditation of Healthcare Institutions",
//     image:
//       "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.20.59_852243e0.jpg",
//   },
//   {
//     title: "ACHC",
//     subtitle: "Accreditation Commission for Health Care",
//     image:
//       "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_15b00be8.jpg",
//   },
//   {
//     title: "AABB",
//     subtitle: "Association for the Advancement of Blood & Biotherapies",
//     image:
//       "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_803d8837.jpg",
//   },
//   {
//     title: "JCI",
//     subtitle: "Joint Commission International Accreditation",
//     image:
//       "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_75624687.jpg",
//   },
//   {
//     title: "CAP",
//     subtitle: "College of American Pathologists",
//     image:
//       "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.01_5642488e.jpg",
//   },
// ];

// export default function AccreditationsSection() {
//   return (
//     <section className="relative overflow-hidden bg-[#f8fbfe] py-16 md:py-24">
//       {/* background accents */}
//       {/* <div className="pointer-events-none absolute inset-0">
//         <div className="absolute top-0 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.07)] blur-3xl" />
//         <div className="absolute bottom-[-80px] left-[-60px] h-[280px] w-[280px] rounded-full bg-[rgba(21,98,160,0.05)] blur-3xl" />
//       </div> */}

//       <div className="relative mx-auto px-6 md:px-16 xl:px-24">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.25 }}
//           transition={{ duration: 0.6 }}
//           className="mx-auto max-w-3xl text-center"
//         >
//           <SectionBadge> Accredited Quality</SectionBadge>

//           <SectionTitle>
//             Recognized accreditations that reflect trusted care
//           </SectionTitle>

//           {/* <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.16)] bg-white px-3 py-1.5 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm">
//             <ShieldCheck className="h-4 w-4" />
//             Accredited Quality
//           </div>

//           <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 md:text-5xl">
//             Recognized accreditations that reflect trusted care
//           </h2> */}

//           <p className="mt-5 text-base leading-8 text-slate-600">
//             Our accreditations reflect Qassim National Hospital’s commitment to
//             safe care, clinical quality, patient confidence, and continuous
//             improvement aligned with national and international standards.
//           </p>
//         </motion.div>

//         {/* Cards */}
//         <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
//           {accreditations.map((item, index) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.5, delay: index * 0.08 }}
//               className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(21,98,160,0.12)]"
//             >
//               <div className="flex min-h-[92px] items-center justify-center">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="max-h-[72px] w-auto object-contain transition duration-300 group-hover:scale-[1.03]"
//                 />
//               </div>

//               <div className="mt-6 text-center">
//                 <h3 className="text-lg font-semibold text-slate-900">
//                   {item.title}
//                 </h3>
//                 <p className="mt-2 text-sm leading-7 text-slate-600">
//                   {item.subtitle}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.25 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mt-12 flex justify-center"
//         >
//           <Link
//             to="/hospital-accreditations"
//             className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
//           >
//             Explore All Accreditations
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionTitle from "./reusableComponents/SectionTitle";
import SectionBadge from "./reusableComponents/SectionBadge";
import SectionPrimaryButton from "./SectionPrimaryButton";

export default function AccreditationsSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const accreditations = [
    {
      title: "CBAHI",
      subtitle: t("accreditationsSection.items.cbahi"),
      image:
        "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.20.59_852243e0.jpg",
    },
    {
      title: "ACHC",
      subtitle: t("accreditationsSection.items.achc"),
      image:
        "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_15b00be8.jpg",
    },
    {
      title: "AABB",
      subtitle: t("accreditationsSection.items.aabb"),
      image:
        "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_803d8837.jpg",
    },
    {
      title: "JCI",
      subtitle: t("accreditationsSection.items.jci"),
      image:
        "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_75624687.jpg",
    },
    {
      title: "CAP",
      subtitle: t("accreditationsSection.items.cap"),
      image:
        "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.01_5642488e.jpg",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8fbfe] py-16 md:py-24">
      <div className="relative mx-auto px-6 md:px-16 xl:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
          className={`mx-auto max-w-3xl text-center `}
        >
          <div className={"flex justify-center"}>
            <SectionBadge>{t("accreditationsSection.badge")}</SectionBadge>
          </div>

          <SectionTitle>{t("accreditationsSection.title")}</SectionTitle>

          <p className="mt-5 text-base leading-8 text-slate-600">
            {t("accreditationsSection.description")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {accreditations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(21,98,160,0.12)]"
            >
              <div className="flex min-h-[92px] items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[72px] w-auto object-contain transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className={`mt-6 text-center `}>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-12 flex justify-center `}
        >
          <SectionPrimaryButton to="/hospital-accreditations">
            {t("accreditationsSection.button")}
          </SectionPrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}
