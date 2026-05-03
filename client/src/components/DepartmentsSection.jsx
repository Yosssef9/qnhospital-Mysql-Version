// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Link } from "react-router-dom";
// import { useDepartments } from "../api/strapi";
// import SectionSpinner from "./sectionSpinner";
// import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import SectionTitle from "./reusableComponents/SectionTitle";
// import { useTranslation } from "react-i18next";
// import SectionBadge from "./reusableComponents/SectionBadge";

// const fadeUp = {
//   hidden: { opacity: 0, y: 18 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
// };

// const containerStagger = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.15,
//     },
//   },
// };

// const cardAnim = {
//   hidden: { opacity: 0, y: 16, scale: 0.98 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { duration: 0.55, ease: "easeOut" },
//   },
// };

// export default function DepartmentsSectionSwiper() {
//   const { t, i18n } = useTranslation();

//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
//   const { data, isLoading, error } = useDepartments("clinics", 1, "", 6);
//   console.log("useDepartments data", data);
//   const departments = data?.data || [];
//   console.log("departments", departments);

//   if (isLoading) return <SectionSpinner />;
//   if (error) return <div>Error loading departments</div>;
//   if (!departments.length) return <div>No departments found</div>;
//   return (
//     <section
//       ref={ref}
//       dir="rtl"
//       className="relative bg-[#f8fbfe] overflow-hidden"
//       style={{
//         WebkitMaskImage:
//           "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
//         maskImage:
//           "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
//       }}
//     >
//       {/* خلفية هادية */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
//         <div className="absolute -bottom-44 -right-40 h-[520px] w-[520px] rounded-full bg-[rgba(26,132,196,0.08)] blur-3xl" />
//         <BgLines className="absolute inset-0 opacity-[0.08]" />
//       </div>

//       <div className="relative mx-auto px-6 md:px-40 py-14 md:py-16">
//         {/* Title */}
//         {/* <motion.div
//           variants={containerStagger}
//           initial="hidden"
//           animate={inView ? "show" : "hidden"}
//           className="text-center"
//         >
//           <motion.p
//             variants={fadeUp}
//             className="text-sm font-semibold text-[rgb(21,98,160)]"
//           >
//             Quality Medical Care
//           </motion.p>

//           <motion.h2
//             variants={fadeUp}
//             className="mt-2 text-3xl md:text-4xl font-light text-slate-700"
//           >
//             Our Specialized Departments
//           </motion.h2>

//           <motion.div
//             variants={fadeUp}
//             className="mt-3 h-[3px] w-16 bg-[rgb(21,98,160)] mx-auto rounded-full"
//           />
//         </motion.div> */}
//         <div className="text-center">
//           <SectionBadge> {t("medicalDepartments.title")}</SectionBadge>

//           <SectionTitle className="font-light">
//             {t("medicalDepartments.introTitle")}
//           </SectionTitle>
//         </div>
//         {/* Swiper */}
//         <div className="mt-10 relative">
//           {/* Custom arrows */}
//           <button
//             className="dept-prev hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition items-center justify-center"
//             aria-label="السابق"
//           >
//             <ChevronRight className="h-5 w-5 text-slate-700" />
//           </button>

//           <button
//             className="dept-next hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition items-center justify-center"
//             aria-label="التالي"
//           >
//             <ChevronLeft className="h-5 w-5 text-slate-700" />
//           </button>

//           <Swiper
//             key={departments.length}
//             observer={true}
//             observeParents={true}
//             modules={[Navigation, Pagination, Autoplay]}
//             spaceBetween={16}
//             loop
//             grabCursor
//             speed={800}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             navigation={{
//               nextEl: ".dept-next",
//               prevEl: ".dept-prev",
//             }}
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               640: { slidesPerView: 1.2 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             className="pb-10"
//           >
//             {departments.map((item, idx) => (
//               <SwiperSlide key={item.title}>
//                 <div>
//                   <DeptCard item={item} />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <style>{`
//             .swiper-pagination-bullet {
//               width: 8px;
//               height: 8px;
//               opacity: 1;
//               background: rgba(15, 23, 42, 0.25);
//             }
//             .swiper-pagination-bullet-active {
//               background: rgb(21,98,160);
//               width: 22px;
//               border-radius: 999px;
//             }
//           `}</style>
//         </div>

//         {/* View all */}
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.25 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mt-12 flex justify-center"
//         >
//           <Link
//             to="/departments"
//             className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
//           >
//             <ArrowRight className="h-4 w-4" />
//             {t("medicalDepartments.viewAllDepartments")}
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// function DeptCard({ item }) {
//   const { t, i18n } = useTranslation();

//   return (
//     <div
//       className="group h-full rounded-3xl border border-slate-200 bg-white
// shadow-sm hover:shadow-[0_10px_35px_rgba(21,98,160,0.15)]
// hover:-translate-y-2 transition-all duration-300
// overflow-hidden flex flex-col"
//     >
//       {" "}
//       <div className="relative">
//         <img
//           src={item.image}
//           alt={item.title}
//           className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//         <div className="absolute top-4 left-4 right-4">
//           <div className="h-1.5 w-14 bg-[rgb(21,98,160)] rounded-full" />
//         </div>
//       </div>
//       <div className="p-6 flex flex-col flex-1">
//         <h3 className="text-xl font-main text-slate-600">{item.title}</h3>
//         <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-2">
//           {" "}
//           {item.cardDesc}
//         </p>
//         <div className="mt-auto pt-5">
//           <Link
//             to={item.to}
//             className="inline-flex items-center justify-center rounded-xl
//     border border-slate-200 bg-white px-4 py-2 text-sm font-main
//     text-slate-500 transition-all duration-300
//     group-hover:bg-[rgb(21,98,160)] group-hover:text-white"
//           >
//             {t("common.learnMore")}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// /** خطوط خلفية خفيفة (بديل لطيف للـ pattern) */
// function BgLines({ className = "" }) {
//   return (
//     <svg
//       viewBox="0 0 1440 520"
//       className={className}
//       fill="none"
//       aria-hidden="true"
//     >
//       <path
//         d="M0 120 C 240 40, 480 200, 720 120 S 1200 200, 1440 120"
//         stroke="rgb(21,98,160)"
//         strokeWidth="2"
//       />
//       <path
//         d="M0 220 C 260 140, 520 300, 780 220 S 1220 300, 1440 220"
//         stroke="rgb(21,98,160)"
//         strokeWidth="2"
//       />
//       <path
//         d="M0 320 C 240 240, 480 400, 720 320 S 1200 400, 1440 320"
//         stroke="rgb(21,98,160)"
//         strokeWidth="2"
//       />
//       <path
//         d="M0 420 C 260 340, 520 500, 780 420 S 1220 500, 1440 420"
//         stroke="rgb(21,98,160)"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useDepartments } from "../api/strapi";
import SectionSpinner from "./sectionSpinner";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "./reusableComponents/SectionTitle";
import { useTranslation } from "react-i18next";
import SectionBadge from "./reusableComponents/SectionBadge";
import SectionPrimaryButton from "./SectionPrimaryButton";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function DepartmentsSectionSwiper() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const { data, isLoading, error } = useDepartments("clinics", 1, "", 6);
  console.log("useDepartments data", data);
  const departments = data?.data || [];
  console.log("departments", departments);

  if (isLoading) return <SectionSpinner />;
  if (error) return <div>Error loading departments</div>;
  if (!departments.length) return <div>No departments found</div>;
  return (
    <section
      ref={ref}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-[#f8fbfe] overflow-hidden"
      // style={{
      //   WebkitMaskImage:
      //     "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      //   maskImage:
      //     "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      // }}
    >
      {/* خلفية هادية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="absolute -bottom-44 -right-40 h-[520px] w-[520px] rounded-full bg-[rgba(26,132,196,0.08)] blur-3xl" />
        <BgLines className="absolute inset-0 opacity-[0.08]" />
      </div>

      <div className="relative mx-auto px-6 md:px-40 py-14 md:py-16">
        {/* Title */}

        <div className="text-center">
          <SectionBadge> {t("medicalDepartments.title")}</SectionBadge>

          <SectionTitle className="font-light">
            {t("medicalDepartments.introTitle")}
          </SectionTitle>
        </div>
        {/* Swiper */}
        <div className="mt-10 relative">
          {/* Custom arrows */}
          <button
            className={`dept-prev hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition items-center justify-center ${
              isRTL ? "-right-4" : "-left-4"
            }`}
            aria-label={isRTL ? "السابق" : "Previous"}
          >
            {isRTL ? (
              <ChevronRight className="h-5 w-5 text-slate-700" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            )}
          </button>

          <button
            className={`dept-next hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition items-center justify-center ${
              isRTL ? "-left-4" : "-right-4"
            }`}
            aria-label={isRTL ? "التالي" : "Next"}
          >
            {isRTL ? (
              <ChevronLeft className="h-5 w-5 text-slate-700" />
            ) : (
              <ChevronRight className="h-5 w-5 text-slate-700" />
            )}
          </button>

          <Swiper
            key={`${i18n.language}-${isRTL}-${departments.length}`}
            observer={true}
            dir={isRTL ? "rtl" : "ltr"}
            observeParents={true}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            loop
            grabCursor
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".dept-next",
              prevEl: ".dept-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {departments.map((item, idx) => (
              <SwiperSlide key={item.title}>
                <div>
                  <DeptCard item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style>{`
            .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              opacity: 1;
              background: rgba(15, 23, 42, 0.25);
            }
            .swiper-pagination-bullet-active {
              background: rgb(21,98,160);
              width: 22px;
              border-radius: 999px;
            }
          `}</style>
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 flex justify-center"
        >
          {/* <Link
            to="/medical-Departments"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            <ArrowRight className="h-4 w-4" />
            {t("medicalDepartments.viewAllDepartments")}
          </Link> */}
          <SectionPrimaryButton to="/medical-Departments">
            {t("medicalDepartments.viewAllDepartments")}
          </SectionPrimaryButton>
        </motion.div>
      </div>
    </section>
  );
}

function DeptCard({ item }) {
  const { t, i18n } = useTranslation();

  return (
    <div
      className="group h-full rounded-3xl border border-slate-200 bg-white
shadow-sm hover:shadow-[0_10px_35px_rgba(21,98,160,0.15)]
hover:-translate-y-2 transition-all duration-300
overflow-hidden flex flex-col"
    >
      {" "}
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 right-4">
          <div className="h-1.5 w-14 bg-[rgb(21,98,160)] rounded-full" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-main text-slate-600">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-2">
          {" "}
          {item.cardDesc}
        </p>
        <div className="mt-auto pt-5">
          <Link
            to={item.to}
            className="inline-flex items-center justify-center rounded-xl
    border border-slate-200 bg-white px-4 py-2 text-sm font-main
    text-slate-500 transition-all duration-300
    group-hover:bg-[rgb(21,98,160)] group-hover:text-white"
          >
            {t("common.learnMore")}
          </Link>
        </div>
      </div>
    </div>
  );
}

/** خطوط خلفية خفيفة (بديل لطيف للـ pattern) */
function BgLines({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1440 520"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 120 C 240 40, 480 200, 720 120 S 1200 200, 1440 120"
        stroke="rgb(21,98,160)"
        strokeWidth="2"
      />
      <path
        d="M0 220 C 260 140, 520 300, 780 220 S 1220 300, 1440 220"
        stroke="rgb(21,98,160)"
        strokeWidth="2"
      />
      <path
        d="M0 320 C 240 240, 480 400, 720 320 S 1200 400, 1440 320"
        stroke="rgb(21,98,160)"
        strokeWidth="2"
      />
      <path
        d="M0 420 C 260 340, 520 500, 780 420 S 1220 500, 1440 420"
        stroke="rgb(21,98,160)"
        strokeWidth="2"
      />
    </svg>
  );
}
