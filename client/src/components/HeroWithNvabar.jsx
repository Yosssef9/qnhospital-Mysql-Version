import { Link, NavLink } from "react-router-dom";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useHeroSlides } from "../api/strapi";
import SectionSpinner from "./SectionSpinner";
import LoadingOverlay2 from "./LoadingOverlay-2";
import { useTranslation } from "react-i18next";
const slides = [
  {
    type: "video",
    title: "Welcome to Qassim National Hospital",
    subtitle: "Trusted healthcare for the community",
    video: "/videos/qnh-drone.mp4", // put your real video path here
    tab: "Welcome",
  },
  {
    type: "image",
    title: "Recognized Medical Excellence",
    subtitle: "Dedicated teams and advanced clinical services",
    image: "/images/about.jpeg",
    tab: "Achievements",
  },
  {
    type: "image",
    title: "International Quality Standards",
    subtitle: "Patient-focused care aligned with best practices",
    image: "/images/WhatsApp Image 2026-03-08 at 14.05.06 (2).jpeg",
    tab: "International",
  },
  {
    type: "image",
    title: "Support Our Mission",
    subtitle: "Together for better care and healthier lives",
    image: "/images/WhatsApp Image 2026-03-08 at 14.05.06 (1).jpeg",
    tab: "Support",
  },
];

export default function HeroSwiperStyle() {
  const swiperRef = useRef(null);
  const videoRefs = useRef({});
  const [active, setActive] = useState(0);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: slides = [], isLoading, error } = useHeroSlides();

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;

      const index = Number(key);

      if (index === active) {
        const playPromise = video.play();
        if (playPromise?.catch) playPromise.catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [active]);

  if (error) {
    return (
      <section className="h-[85vh] flex flex-col items-center justify-center bg-slate-900 text-center px-6">
        <h2 className="text-xl font-semibold text-white">
          Something went wrong
        </h2>

        <p className="mt-2 text-white/70 text-sm">
          Unable to load homepage content.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm text-[rgb(99,179,237)] hover:underline"
        >
          Try again
        </button>
      </section>
    );
  }

  if (!isLoading && !slides.length) return null;

  return (
    <>
      {/* {isLoading && <LoadingOverlay2 />} */}

      <section className="relative h-[85vh] overflow-hidden bg-slate-900">
        {!isLoading && slides.length > 0 && (
          <>
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              speed={1200}
              loop
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActive(swiper.realIndex);
              }}
              className="h-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative h-full w-full">
                    {slide.isVideo ? (
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        poster="/images/Screenshot%202026-04-05%20101101.png"
                        className="absolute inset-0 h-full w-full object-cover"
                      >
                        <source src={slide.media} type={slide.mime} />
                      </video>
                    ) : (
                      <motion.img
                        src={slide.media}
                        alt={slide.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        animate={
                          active === index
                            ? { scale: [1.15, 1.05] }
                            : { scale: 1.12 }
                        }
                        transition={
                          active === index
                            ? {
                                duration: 18,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "mirror",
                              }
                            : {
                                duration: 0.6,
                                ease: "easeOut",
                              }
                        }
                      />
                    )}

                    <div
                      className={`relative z-10 flex h-full items-center px-6 md:px-12 xl:px-20 ${
                        isArabic ? "" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[620px] text-white ${
                          isArabic ? "ml-auto text-right" : "mr-auto text-left"
                        }`}
                      >
                        {" "}
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md md:text-xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(99,179,237)]"></span>
                          Qassim National Hospital
                        </div>
                        <h2 className="mt-5 text-4xl font-main leading-[1] tracking-[-0.04em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:text-6xl xl:text-7xl">
                          <span className="block">{slide.title}</span>
                        </h2>
                        <div
                          className={`mt-4 h-[3px] w-24 rounded-full ${
                            isArabic
                              ? "ml-auto bg-gradient-to-l"
                              : "mr-auto bg-gradient-to-r"
                          } from-[rgb(21,98,160)] via-[rgb(99,179,237)] to-white/70`}
                        />{" "}
                        <p
                          className={`mt-6 max-w-[470px] text-sm leading-7 text-white/78 drop-shadow-[0_4px_18px_rgba(0,0,0,0.2)] md:text-base ${
                            isArabic
                              ? "ml-auto text-right"
                              : "mr-auto text-left"
                          }`}
                        >
                          {" "}
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <FloatingCircleImages />

            <div className="absolute inset-x-0 bottom-0 z-20">
              <div className="mx-auto px-6 pb-8 md:px-12 xl:px-20">
                <div className="border-b border-white/45">
                  <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
                    {slides.map((slide, index) => {
                      const isActive = active === index;

                      return (
                        <button
                          key={slide.id}
                          onClick={() => swiperRef.current?.slideToLoop(index)}
                          className="group relative pb-4 text-left"
                        >
                          <span
                            className={[
                              "text-lg font-semibold transition",
                              isActive
                                ? "text-white"
                                : "text-white/65 group-hover:text-white",
                            ].join(" ")}
                          >
                            {slide.tab}
                          </span>

                          <span
                            className={[
                              "absolute left-0 bottom-[-1px] h-[2px] bg-white transition-all duration-300",
                              isActive
                                ? "w-full opacity-100"
                                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70",
                            ].join(" ")}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
function NavBarOverlay() {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Home", to: "/" },
    {
      label: "About",
      children: [
        { label: "QNH History", to: "/qnh-history" },
        { label: "Mission & Vision", to: "/mission-vision" },
        { label: "Patients Rights", to: "/patients-rights" },
        { label: "Hospital Accreditations", to: "/hospital-accreditations" },
        { label: "Staff Portal", to: "https://www.qnhospital.com/portal/" },
      ],
    },
    { label: "Departments", to: "/medical-departments" },
    { label: "Doctors", to: "/doctors" },
    { label: "E-Services", to: "/e-services" },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 z-50 w-full">
        <div className="mx-auto flex h-[96px] items-center justify-between px-6 md:px-12 xl:px-20">
          {/* Left side */}
          <div className="flex items-center gap-5 xl:gap-8">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center text-white/90 transition hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="h-8 w-8 stroke-[1.75]" />
            </button>

            <button
              type="button"
              className="hidden sm:inline-flex items-center justify-center text-white/90 transition hover:text-white"
              aria-label="Search"
            >
              <Search className="h-7 w-7 stroke-[1.75]" />
            </button>

            <nav className="hidden lg:flex items-center gap-10">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative group">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[17px] font-semibold tracking-wide text-white/90 transition hover:text-white"
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    <div className="invisible absolute left-0 top-full z-50 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="min-w-[250px] rounded-2xl border border-white/15 bg-white/10 p-2 text-white shadow-2xl backdrop-blur-xl">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.label}
                            to={child.to}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className="text-[17px] font-semibold tracking-wide text-white/90 transition hover:text-white"
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>
          </div>

          {/* Right side */}
          <Link to="/" className="flex items-center gap-4 text-right">
            <img
              src="/images/newLogo-removebg-preview.png"
              alt="Qassim National Hospital"
              className="h-16 w-auto object-contain"
            />

            <div className="hidden md:block">
              <div className="text-xl font-semibold leading-tight text-white">
                Qassim National Hospital
              </div>
              <div className="mt-1 text-sm font-medium text-white/75">
                Trusted care since 2010
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Mobile / side menu */}
      <div
        className={[
          "fixed inset-0 z-[100] transition-all duration-300",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        <div
          className={[
            "absolute left-0 top-0 h-full w-[320px] bg-white shadow-2xl transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-[88px] items-center justify-between border-b border-slate-200 px-6">
            <div className="text-lg font-semibold text-slate-900">Menu</div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col p-4">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="mb-2 rounded-2xl border border-slate-200"
                >
                  <div className="px-4 py-3 text-sm font-semibold text-slate-900">
                    {item.label}
                  </div>

                  <div className="border-t border-slate-200 p-2">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.label}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-[rgb(21,98,160)]"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="mb-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[rgb(21,98,160)]"
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FloatingCircleImages() {
  const items = [
    {
      img: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.20.59_852243e0.jpg",
      link: "/hospital-accreditations/cbahi-accreditation",
    },
    {
      img: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.01_5642488e.jpg",
      link: "/hospital-accreditations/cap-accreditation",
    },
    {
      img: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_75624687.jpg",
      link: "/hospital-accreditations/jci-accreditation",
    },
  ];

  return (
    <div className="absolute right-2 top-1/4 z-30 hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {items.map((item, i) => {
        const content = (
          <motion.div
            initial={{ x: 40 }}
            whileHover={{ x: 12, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative cursor-pointer"
          >
            {/* Glow */}
            <div className="absolute -inset-1 rounded-l-full bg-[rgb(21,98,160)]/20 blur-md" />

            {/* Gradient border */}
            <div className="relative rounded-l-full bg-gradient-to-l from-[rgb(21,98,160)] via-[rgb(99,179,237)] to-white/70 p-[3.5px] shadow-xl">
              {/* Inner container */}
              <div className="flex h-[64px] w-[64px] items-center justify-center rounded-l-full bg-white backdrop-blur-md">
                {/* Icon circle */}
                <img src={item.img} alt="" className="h-9 w-9 object-contain" />
              </div>
            </div>
          </motion.div>
        );

        return (
          <Link key={i} to={item.link}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}

// ===============================================================================

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import { ArrowRight, ShieldCheck, Stethoscope, Award } from "lucide-react";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import { useHeroSlides } from "../api/strapi";

// export default function HeroSwiperStyle() {
//   const swiperRef = useRef(null);
//   const videoRefs = useRef({});
//   const [active, setActive] = useState(0);

//   const { data: slides = [], isLoading, error } = useHeroSlides();

//   useEffect(() => {
//     Object.entries(videoRefs.current).forEach(([key, video]) => {
//       if (!video) return;

//       const index = Number(key);

//       if (index === active) {
//         const playPromise = video.play();
//         if (playPromise?.catch) playPromise.catch(() => {});
//       } else {
//         video.pause();
//         video.currentTime = 0;
//       }
//     });
//   }, [active]);

//   if (error) {
//     return (
//       <section className="flex h-[88vh] items-center justify-center bg-slate-950 px-6 text-center">
//         <div>
//           <h2 className="text-2xl font-semibold text-white">
//             Something went wrong
//           </h2>
//           <p className="mt-3 text-sm text-white/70">
//             Unable to load homepage content.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-5 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/15"
//           >
//             Try again
//           </button>
//         </div>
//       </section>
//     );
//   }

//   if (!isLoading && !slides.length) return null;

//   return (
//     <section className="relative overflow-hidden bg-[#edf5fb] px-4 pb-4 pt-4 md:px-6 md:pb-6 md:pt-6">
//       {!isLoading && slides.length > 0 && (
//         <div className="relative mx-auto grid min-h-[88vh] max-w-[1700px] overflow-hidden rounded-[34px] border border-slate-200/70 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[520px_minmax(0,1fr)]">
//           {/* Left panel */}
//           <div className="relative z-20 flex flex-col justify-between border-b border-slate-200 bg-white px-6 py-7 md:px-8 md:py-8 lg:border-b-0 lg:border-r">
//             <div>
//               <motion.div
//                 key={`content-${active}`}
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.55 }}
//               >
//                 <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[rgb(21,98,160)] md:text-xs">
//                   <span className="h-2 w-2 rounded-full bg-[rgb(21,98,160)]" />
//                   Qassim National Hospital
//                 </div>

//                 <h1 className="mt-6 max-w-[14ch] text-4xl font-main leading-[0.94] tracking-[-0.05em] text-slate-950 md:text-5xl xl:text-6xl">
//                   {slides[active]?.title}
//                 </h1>

//                 <div className="mt-5 h-[3px] w-20 rounded-full bg-[rgb(21,98,160)]" />

//                 <p className="mt-6 max-w-[46ch] text-sm leading-7 text-slate-600 md:text-base">
//                   {slides[active]?.subtitle}
//                 </p>

//                 <div className="mt-8 flex flex-wrap gap-3">
//                   <Link
//                     to="/doctors"
//                     className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                   >
//                     Explore Our Doctors
//                     <ArrowRight className="h-4 w-4" />
//                   </Link>

//                   <Link
//                     to="/medical-departments"
//                     className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
//                   >
//                     View Departments
//                   </Link>
//                 </div>
//               </motion.div>

//               {/* stats / values */}
//               <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
//                 <InfoCard
//                   icon={<ShieldCheck className="h-4 w-4" />}
//                   title="Safe Care"
//                   text="Patient-centered standards and trusted care pathways."
//                 />
//                 <InfoCard
//                   icon={<Stethoscope className="h-4 w-4" />}
//                   title="Expert Teams"
//                   text="Skilled specialists across multiple medical disciplines."
//                 />
//                 <InfoCard
//                   icon={<Award className="h-4 w-4" />}
//                   title="Accredited"
//                   text="Recognized quality and continuous improvement."
//                 />
//               </div>
//             </div>

//             {/* bottom nav */}
//             <div className="mt-10">
//               <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
//                 {slides.map((slide, index) => {
//                   const isActive = active === index;

//                   return (
//                     <button
//                       key={slide.id}
//                       onClick={() => swiperRef.current?.slideToLoop(index)}
//                       className={[
//                         "rounded-2xl border px-4 py-3 text-left transition",
//                         isActive
//                           ? "border-[rgb(21,98,160)] bg-[rgb(21,98,160)]/5"
//                           : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
//                       ].join(" ")}
//                     >
//                       <div
//                         className={[
//                           "text-[11px] font-semibold uppercase tracking-[0.2em]",
//                           isActive ? "text-[rgb(21,98,160)]" : "text-slate-400",
//                         ].join(" ")}
//                       >
//                         0{index + 1}
//                       </div>

//                       <div
//                         className={[
//                           "mt-2 text-sm font-semibold",
//                           isActive ? "text-slate-950" : "text-slate-700",
//                         ].join(" ")}
//                       >
//                         {slide.tab}
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right media area */}
//           <div className="relative min-h-[420px] lg:min-h-full">
//             {/* decorative background */}
//             <div className="pointer-events-none absolute inset-0 z-10">
//               <div className="absolute right-[8%] top-[10%] h-32 w-32 rounded-full bg-white/14 blur-3xl" />
//               <div className="absolute bottom-[12%] left-[8%] h-40 w-40 rounded-full bg-[rgb(99,179,237)]/15 blur-3xl" />
//               <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.40)_0%,rgba(2,6,23,0.08)_40%,rgba(255,255,255,0.04)_100%)]" />
//             </div>

//             {/* vertical rail */}
//             <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 lg:flex">
//               <div className="rounded-full border border-white/15 bg-slate-950/30 p-2 backdrop-blur-md">
//                 <div className="flex flex-col gap-2">
//                   {slides.map((_, index) => {
//                     const isActive = active === index;
//                     return (
//                       <button
//                         key={index}
//                         onClick={() => swiperRef.current?.slideToLoop(index)}
//                         className={[
//                           "h-10 w-10 rounded-full text-xs font-semibold transition",
//                           isActive
//                             ? "bg-white text-slate-900"
//                             : "bg-white/10 text-white hover:bg-white/20",
//                         ].join(" ")}
//                       >
//                         0{index + 1}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <Swiper
//               modules={[Autoplay, EffectFade]}
//               effect="fade"
//               speed={1100}
//               loop
//               autoplay={{
//                 delay: 6500,
//                 disableOnInteraction: false,
//               }}
//               onSwiper={(swiper) => {
//                 swiperRef.current = swiper;
//               }}
//               onSlideChange={(swiper) => {
//                 setActive(swiper.realIndex);
//               }}
//               className="h-full"
//             >
//               {slides.map((slide, index) => (
//                 <SwiperSlide key={slide.id}>
//                   <div className="relative h-full min-h-[420px] w-full lg:min-h-[88vh]">
//                     {slide.isVideo ? (
//                       <video
//                         ref={(el) => {
//                           videoRefs.current[index] = el;
//                         }}
//                         muted
//                         loop
//                         playsInline
//                         autoPlay
//                         preload="auto"
//                         className="absolute inset-0 h-full w-full object-cover"
//                       >
//                         <source src={slide.media} type={slide.mime} />
//                       </video>
//                     ) : (
//                       <motion.img
//                         src={slide.media}
//                         alt={slide.title}
//                         className="absolute inset-0 h-full w-full object-cover"
//                         animate={
//                           active === index
//                             ? { scale: [1.08, 1.02] }
//                             : { scale: 1.05 }
//                         }
//                         transition={
//                           active === index
//                             ? {
//                                 duration: 14,
//                                 ease: "easeInOut",
//                                 repeat: Infinity,
//                                 repeatType: "mirror",
//                               }
//                             : {
//                                 duration: 0.5,
//                               }
//                         }
//                       />
//                     )}

//                     {/* bottom floating strip */}
//                     <div className="absolute bottom-4 left-4 right-4 z-20 md:bottom-6 md:left-6 md:right-6">
//                       <motion.div
//                         key={`media-card-${active}`}
//                         initial={{ opacity: 0, y: 24 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.55 }}
//                         className="ml-auto max-w-[440px] rounded-[28px] border border-white/15 bg-slate-950/45 p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md md:p-6"
//                       >
//                         <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
//                           Featured Slide
//                         </div>
//                         <h3 className="mt-2 text-2xl font-semibold leading-tight md:text-3xl">
//                           {slide.tab}
//                         </h3>
//                         <p className="mt-3 text-sm leading-7 text-white/78">
//                           {slide.subtitle}
//                         </p>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <AccreditationCards />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// function InfoCard({ icon, title, text }) {
//   return (
//     <div className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
//       <div className="flex items-center gap-2 text-[rgb(21,98,160)]">
//         {icon}
//         <span className="text-sm font-semibold">{title}</span>
//       </div>
//       <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
//     </div>
//   );
// }

// function AccreditationCards() {
//   const items = [
//     {
//       img: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.20.59_852243e0.jpg",
//       link: "/hospital-accreditations/CBAHI",
//       label: "CBAHI",
//     },
//     {
//       img: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.01_5642488e.jpg",
//       link: "/hospital-accreditations/CAP",
//       label: "CAP",
//     },
//     {
//       img: "/images/HospitalAccreditations/Icons/WhatsApp Image 2025-11-02 at 19.21.00_75624687.jpg",
//       link: "/hospital-accreditations/JCI",
//       label: "JCI",
//     },
//   ];

//   return (
//     <div className="absolute right-4 top-4 z-30 hidden gap-3 md:flex lg:right-6 lg:top-6">
//       {items.map((item, i) => (
//         <Link key={i} to={item.link}>
//           <motion.div
//             initial={{ opacity: 0, y: -16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.12 * i, duration: 0.45 }}
//             whileHover={{ y: -4 }}
//             className="rounded-2xl border border-white/14 bg-white/12 p-2 shadow-lg backdrop-blur-md"
//           >
//             <div className="flex items-center gap-3 rounded-[14px] bg-white px-3 py-2">
//               <img
//                 src={item.img}
//                 alt={item.label}
//                 className="h-8 w-8 object-contain"
//               />
//               <span className="text-xs font-semibold tracking-[0.12em] text-slate-700">
//                 {item.label}
//               </span>
//             </div>
//           </motion.div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// ================================================================================

// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ArrowRight,
//   ShieldCheck,
// } from "lucide-react";
// import { useHeroSlides } from "../api/strapi";

// export default function HeroSwiperStyle() {
//   const videoRefs = useRef({});
//   const [active, setActive] = useState(0);

//   const { data: slides = [], isLoading, error } = useHeroSlides();

//   useEffect(() => {
//     Object.entries(videoRefs.current).forEach(([key, video]) => {
//       if (!video) return;

//       const index = Number(key);

//       if (index === active) {
//         const playPromise = video.play();
//         if (playPromise?.catch) playPromise.catch(() => {});
//       } else {
//         video.pause();
//         video.currentTime = 0;
//       }
//     });
//   }, [active]);

//   useEffect(() => {
//     if (!slides.length) return;

//     const timer = setInterval(() => {
//       setActive((prev) => (prev + 1) % slides.length);
//     }, 7000);

//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const goNext = () => {
//     if (!slides.length) return;
//     setActive((prev) => (prev + 1) % slides.length);
//   };

//   const goPrev = () => {
//     if (!slides.length) return;
//     setActive((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   if (error) {
//     return (
//       <section className="flex h-[88vh] items-center justify-center bg-[#edf5fb] px-6 text-center">
//         <div>
//           <h2 className="text-2xl font-semibold text-slate-900">
//             Something went wrong
//           </h2>
//           <p className="mt-3 text-sm text-slate-600">
//             Unable to load homepage content.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-5 rounded-full bg-[rgb(21,98,160)] px-5 py-2 text-sm font-medium text-white transition hover:opacity-95"
//           >
//             Try again
//           </button>
//         </div>
//       </section>
//     );
//   }

//   if (isLoading) {
//     return (
//       <section className="flex h-[88vh] items-center justify-center bg-[#edf5fb] px-6">
//         <div className="text-sm text-slate-500">Loading...</div>
//       </section>
//     );
//   }

//   if (!slides.length) return null;

//   const current = slides[active];
//   const sideSlides = slides.filter((_, i) => i !== active).slice(0, 3);

//   return (
//     <section className="relative overflow-hidden bg-[linear-gradient(180deg,#eef6fb_0%,#f8fbfe_100%)] px-4 py-4 md:px-6 md:py-6 xl:px-8">
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute left-[8%] top-[10%] h-[280px] w-[280px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
//         <div className="absolute right-[10%] bottom-[8%] h-[320px] w-[320px] rounded-full bg-[rgba(30,127,143,0.10)] blur-3xl" />
//       </div>

//       <div className="relative mx-auto grid max-w-[1600px] gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
//         {/* Main stage */}
//         <div className="relative min-h-[88vh] overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)]">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={current.id}
//               initial={{ opacity: 0, scale: 1.02 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 1.01 }}
//               transition={{ duration: 0.7, ease: "easeOut" }}
//               className="absolute inset-0"
//             >
//               <div className="absolute inset-0">
//                 {current.isVideo ? (
//                   <video
//                     ref={(el) => {
//                       videoRefs.current[active] = el;
//                     }}
//                     muted
//                     loop
//                     playsInline
//                     autoPlay
//                     preload="auto"
//                     className="h-full w-full object-cover"
//                   >
//                     <source src={current.media} type={current.mime} />
//                   </video>
//                 ) : (
//                   <img
//                     src={current.media}
//                     alt={current.title}
//                     className="h-full w-full object-cover"
//                   />
//                 )}
//               </div>

//               <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.22)_0%,rgba(2,6,23,0.08)_30%,rgba(2,6,23,0.45)_100%)]" />
//               <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.55)_0%,rgba(2,6,23,0.12)_42%,rgba(255,255,255,0.03)_100%)]" />
//             </motion.div>
//           </AnimatePresence>

//           {/* Top floating label */}
//           <div className="absolute left-5 top-5 z-20 md:left-8 md:top-8">
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgb(21,98,160)] shadow-lg backdrop-blur-md md:text-xs">
//               <ShieldCheck className="h-4 w-4" />
//               Qassim National Hospital
//             </div>
//           </div>

//           {/* Bottom overlap content card */}
//           <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-8 xl:p-10">
//             <motion.div
//               key={`content-${current.id}`}
//               initial={{ opacity: 0, y: 26 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="max-w-[760px] rounded-[30px] border border-white/70 bg-white/92 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl md:p-8 xl:p-10"
//             >
//               <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[rgb(21,98,160)] md:text-xs">
//                 {current.tab}
//               </div>

//               <h1 className="mt-3 text-3xl font-main leading-[0.95] tracking-[-0.04em] text-slate-950 md:text-5xl xl:text-6xl">
//                 {current.title}
//               </h1>

//               <p className="mt-5 max-w-[52ch] text-sm leading-7 text-slate-600 md:text-base">
//                 {current.subtitle}
//               </p>

//               <div className="mt-7 flex flex-wrap gap-3">
//                 <Link
//                   to="/doctors"
//                   className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//                 >
//                   Explore Our Doctors
//                   <ArrowRight className="h-4 w-4" />
//                 </Link>

//                 <Link
//                   to="/medical-departments"
//                   className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
//                 >
//                   View Departments
//                 </Link>
//               </div>
//             </motion.div>
//           </div>

//           {/* Arrows */}
//           <div className="absolute right-5 top-5 z-20 flex gap-2 md:right-8 md:top-8">
//             <button
//               onClick={goPrev}
//               className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/85 text-slate-800 shadow-lg backdrop-blur-md transition hover:scale-[1.03]"
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>

//             <button
//               onClick={goNext}
//               className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/85 text-slate-800 shadow-lg backdrop-blur-md transition hover:scale-[1.03]"
//               aria-label="Next slide"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Side stacked cards */}
//         <div className="hidden xl:flex xl:min-h-[88vh] xl:flex-col xl:gap-4">
//           {sideSlides.map((slide, idx) => {
//             const realIndex = slides.findIndex((s) => s.id === slide.id);

//             return (
//               <button
//                 key={slide.id}
//                 onClick={() => setActive(realIndex)}
//                 className="group relative flex-1 overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
//               >
//                 <div className="absolute inset-0">
//                   {slide.isVideo ? (
//                     <video
//                       muted
//                       loop
//                       playsInline
//                       className="h-full w-full object-cover"
//                     >
//                       <source src={slide.media} type={slide.mime} />
//                     </video>
//                   ) : (
//                     <img
//                       src={slide.media}
//                       alt={slide.title}
//                       className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
//                     />
//                   )}
//                 </div>

//                 <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.15)_55%,rgba(255,255,255,0.02)_100%)]" />

//                 <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white">
//                   <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
//                     0{idx + 1}
//                   </div>
//                   <div className="mt-2 text-lg font-semibold leading-tight">
//                     {slide.tab}
//                   </div>
//                   <div className="mt-1 line-clamp-2 text-sm text-white/78">
//                     {slide.title}
//                   </div>
//                 </div>
//               </button>
//             );
//           })}

//           {/* progress / indicators */}
//           <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
//             <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
//               Slides
//             </div>

//             <div className="mt-4 flex gap-2">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActive(index)}
//                   className={[
//                     "h-2 rounded-full transition-all duration-300",
//                     index === active
//                       ? "w-12 bg-[rgb(21,98,160)]"
//                       : "w-2 bg-slate-300 hover:bg-slate-400",
//                   ].join(" ")}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// ====================================================================================
