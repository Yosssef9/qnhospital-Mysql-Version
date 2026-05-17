// import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
// import { useEffect, useMemo, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useParams } from "react-router-dom";

// export default function HospitalAccreditations() {
//   return (
//     <div>
//       <BreadcrumbArea imgUrl="/images/HospitalAccreditations/awards-header.jpg" />

//       <div className="mb-12">
//         <PictureSelector />
//       </div>
//     </div>
//   );
// }

// function PictureSelector() {
//   const { certificateKey } = useParams();
//   const navigate = useNavigate();
//   const certificateRef = useRef(null);
//   const pictures = useMemo(
//     () => [
//       {
//         id: 1,
//         key: "CBAHI",
//         certificate:
//           "/images/HospitalAccreditations/Certificates/WhatsApp Image 2025-11-02 at 19.40.52_063d495d.jpg",
//         icon: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.20.59_852243e0.jpg",
//         text: `Al-Qassim National Hospital has obtained Joint Commission International (JCI) accreditation...

// 🏅 JCI Accreditation
// 📋 Evidence of Quality
// 🌍 Other Accreditations`,
//       },
//       {
//         id: 2,
//         key: "ACHC",
//         certificate:
//           "/images/HospitalAccreditations/Certificates/WhatsApp Image 2025-11-02 at 19.40.53_94fc8d7a.jpg",
//         icon: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_15b00be8.jpg",
//         text: "We are recognized for our continuous improvement and dedication to patient safety and quality service.",
//       },
//       {
//         id: 3,
//         key: "AABB",
//         certificate:
//           "/images/HospitalAccreditations/Certificates/WhatsApp Image 2025-11-02 at 19.40.53_660e7702.jpg",
//         icon: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_803d8837.jpg",
//         text: "Our advanced medical departments maintain high international standards across all specialties.",
//       },
//       {
//         id: 4,
//         key: "JCI",
//         certificate:
//           "/images/HospitalAccreditations/Certificates/WhatsApp Image 2025-11-02 at 19.40.53_68dcc20f.jpg",
//         icon: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_75624687.jpg",
//         text: "We are proud to be a trusted healthcare provider, serving the community with compassion and innovation.",
//       },
//       {
//         id: 5,
//         key: "CAP",
//         certificate:
//           "/images/HospitalAccreditations/Certificates/WhatsApp Image 2025-11-02 at 19.40.53_04f9607b.jpg",
//         icon: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.01_5642488e.jpg",
//         text: "Our hospital continues to uphold excellence in clinical outcomes, patient satisfaction, and quality management.",
//       },
//     ],
//     [],
//   );

//   const defaultPicture = pictures[0];
//   const matchedPicture =
//     pictures.find((pic) => pic.key === certificateKey) || defaultPicture;

//   const [selected, setSelected] = useState(matchedPicture);

//   const firstLoad = useRef(true);

//   useEffect(() => {
//     setSelected(matchedPicture);

//     if (firstLoad.current) {
//       certificateRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//       firstLoad.current = false;
//     }
//   }, [matchedPicture]);
//   const handleSelect = (pic) => {
//     setSelected(pic);
//     // navigate(`/hospital-accreditations/${pic.key}`);
//   };

//   return (
//     <div className="flex h-[1000px] flex-col items-center gap-10 px-4 py-10">
//       {/* ICONS */}
//       <div
//         className="
//           flex w-full justify-start gap-4 overflow-x-auto snap-x snap-mandatory
//           scrollbar-hide px-2 py-4
//           md:flex-wrap md:justify-center md:overflow-visible
//         "
//       >
//         {pictures.map((pic) => (
//           <motion.img
//             key={pic.id}
//             src={pic.icon}
//             alt={`icon-${pic.id}`}
//             onClick={(e) => {
//               handleSelect(pic);
//               e.currentTarget.scrollIntoView({
//                 behavior: "smooth",
//                 inline: "center",
//               });
//             }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className={`
//               aspect-square w-24 flex-shrink-0 cursor-pointer snap-center rounded-full
//               border-4 bg-white p-2 object-contain shadow-sm transition-all duration-300 ease-in-out
//               sm:w-28 md:w-32 lg:w-36
//               ${
//                 selected.id === pic.id
//                   ? "scale-105 border-blue-500 shadow-md"
//                   : "border-transparent hover:border-blue-300"
//               }
//             `}
//           />
//         ))}
//       </div>

//       {/* CERTIFICATE SECTION */}
//       <div ref={certificateRef} className="relative w-full max-w-5xl">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selected.id}
//             layout
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -100 }}
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//             className="flex flex-col items-center gap-10 md:flex-row"
//           >
//             <motion.img
//               layout
//               src={selected.certificate}
//               alt="Accreditation Certificate"
//               className="w-full rounded-xl border shadow-lg md:w-1/2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             />

//             <motion.div
//               layout
//               className="space-y-4 text-center md:w-1/2 md:text-left"
//             >
//               <h3 className="text-2xl font-semibold text-[var(--main-color)]">
//                 Accreditation Achievement
//               </h3>
//               <p className="whitespace-pre-line leading-relaxed text-gray-600">
//                 {selected.text}
//               </p>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import SectionSpinner from "../components/SectionSpinner";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHospitalAccreditations } from "../api/strapi";
import SEO from "../components/SEO";
import { withLang } from "../utils/languageRouting";
export default function HospitalAccreditations() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? "الاعتمادات والشهادات | مستشفى القصيم الوطني"
            : "Accreditations and Certificates | Qassim National Hospital"
        }
        description={
          i18n.language?.startsWith("ar")
            ? "تعرف على الاعتمادات والشهادات التي حصل عليها مستشفى القصيم الوطني في الجودة والرعاية الصحية."
            : "Explore Qassim National Hospital accreditations and certificates in healthcare quality and patient care."
        }
      />

      <BreadcrumbArea
        imgUrl="/images/HospitalAccreditations/awards-header.jpg"
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("navbar.hospitalAccreditations") },
        ]}
      />

      <div className="mb-12">
        <PictureSelector />
      </div>
    </div>
  );
}

function PictureSelector() {
  const { certificateKey } = useParams();
  const navigate = useNavigate();
  const certificateRef = useRef(null);
  const firstLoad = useRef(true);

  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { data: pictures = [], isLoading, error } = useHospitalAccreditations();

  const defaultPicture = pictures[0] || null;

  const matchedPicture = useMemo(() => {
    if (!pictures.length) return null;

    return (
      pictures.find((pic) => pic.slug === certificateKey) || defaultPicture
    );
  }, [pictures, certificateKey, defaultPicture]);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!matchedPicture) return;

    setSelected(matchedPicture);
    firstLoad.current = false;
  }, [matchedPicture]);
  const handleSelect = (pic) => {
    setSelected(pic);

    if (pic?.slug) {
      navigate(
        withLang(`/hospital-accreditations/${pic.slug}`, i18n.language || "en"),
        {
          replace: true,
          preventScrollReset: true,
        },
      );
    }

    window.requestAnimationFrame(() => {
      certificateRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <SectionSpinner />
      </div>
    );
  }

  if (error || pictures.length === 0 || !selected) {
    return null;
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="flex min-h-[900px] flex-col items-center gap-10 px-4 py-10"
    >
      <div
        className="
          flex w-full snap-x snap-mandatory justify-start gap-4 overflow-x-auto
          px-2 py-4 scrollbar-hide
          md:flex-wrap md:justify-center md:overflow-visible
        "
      >
        {pictures.map((pic) => (
          <motion.img
            key={pic.id}
            src={pic.iconImage || "/images/defalutImageNews.jpg"}
            alt={pic.title || "Accreditation Icon"}
            onClick={() => {
              handleSelect(pic);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              aspect-square w-24 flex-shrink-0 cursor-pointer snap-center rounded-full
              border-4 bg-white p-2 object-contain shadow-sm transition-all duration-300 ease-in-out
              sm:w-28 md:w-32 lg:w-36
              ${
                selected.id === pic.id
                  ? "scale-105 border-blue-500 shadow-md"
                  : "border-transparent hover:border-blue-300"
              }
            `}
          />
        ))}
      </div>

      <div ref={certificateRef} className="relative w-full max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            layout
            initial={{ opacity: 0, x: isRTL ? -80 : 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 80 : -80 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col-reverse items-center gap-10 md:flex-row"
          >
            <motion.img
              layout
              src={selected.certificateImage || "/images/defalutImageNews.jpg"}
              alt={selected.title || "Accreditation Certificate"}
              className="w-full rounded-xl border bg-white object-contain shadow-lg md:w-1/2"
            />

            <motion.div
              layout
              className={`space-y-4 text-center md:w-1/2 ${
                isRTL ? "md:text-right" : "md:text-left"
              }`}
            >
              <h3 className="text-2xl font-semibold text-[var(--main-color)]">
                {selected.title}
              </h3>

              <p className="whitespace-pre-line leading-relaxed text-gray-600">
                {selected.description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
