import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css/grid";
const departments = [
  {
    title: "Radiology",
    desc: "Advanced imaging and diagnostics using modern radiology equipment.",
    image: "/images/departments/radiology.jpg",
    href: "/departments/radiology",
  },
  {
    title: "Dermatology",
    desc: "Comprehensive care for skin and hair with modern treatments.",
    image: "/images/departments/dermatology.jpg",
    href: "/departments/dermatology",
  },
  {
    title: "Obstetrics & Gynecology",
    desc: "Pregnancy care, childbirth services, and women’s health support.",
    image: "/images/departments/obgyn.jpeg",
    href: "/departments/obgyn",
  },
  {
    title: "Laboratory",
    desc: "Accurate medical tests and diagnostics using advanced technology.",
    image: "/images/departments/laboratory.jpg",
    href: "/departments/laboratory",
  },
  {
    title: "Pharmacy",
    desc: "Safe medication services with professional pharmaceutical guidance.",
    image: "/images/departments/pharmacy.png",
    href: "/departments/pharmacy",
  },
  {
    title: "Emergency",
    desc: "24/7 emergency care for urgent and critical medical cases.",
    image: "/images/departments/emergency.webp",
    href: "/departments/emergency",
  },
  {
    title: "Pediatrics",
    desc: "Comprehensive healthcare services dedicated to children.",
    image: "/images/departments/pediatrics.jpg",
    href: "/departments/pediatrics",
  },
  {
    title: "Cardiology",
    desc: "Diagnosis and treatment of heart diseases with modern technology.",
    image: "/images/departments/cardiology.jpg",
    href: "/departments/cardiology",
  },
  {
    title: "Orthopedics",
    desc: "Treatment of bone and joint injuries using advanced techniques.",
    image: "/images/departments/orthopedics.webp",
    href: "/departments/orthopedics",
  },
  {
    title: "ENT",
    desc: "Comprehensive diagnosis and treatment for ear, nose, and throat disorders using advanced medical care.",
    image: "/images/departments/ent.jpg",
    href: "/departments/ent",
  },
  {
    title: "Ophthalmology",
    desc: "Eye examinations and treatments to maintain healthy vision.",
    image: "/images/departments/ophthalmology.jpg",
    href: "/departments/ophthalmology",
  },
  {
    title: "Dentistry",
    desc: "Dental care and cosmetic treatments using modern techniques.",
    image: "/images/departments/dentistry.webp",
    href: "/departments/dentistry",
  },
  //   {
  //     title: "Surgery",
  //     desc: "Various surgical procedures performed by experienced specialists.",
  //     image: "/images/departments/surgery.jpg",
  //     href: "/departments/surgery",
  //   },
  //   {
  //     title: "Neurology",
  //     desc: "Diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system.",
  //     image: "/images/departments/neurology.jpg",
  //     href: "/departments/neurology",
  //   },
];

export default function DepartmentsSectionDesignV2_edits() {
  const [active, setActive] = useState(departments[0]);

  return (
    <section className="relative overflow-hidden bg-[#f8fbfe] px-6 py-16 md:px-16 md:py-24 xl:px-24">
      <div className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-[rgba(21,98,160,0.07)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-80px] h-[340px] w-[340px] rounded-full bg-[rgba(21,98,160,0.05)] blur-3xl" />

      <div className="relative grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* LEFT INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="lg:sticky "
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.25)] bg-[rgba(21,98,160,0.08)] px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(21,98,160)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(21,98,160)]"></span>
            Medical Departments
          </motion.div>

          <h2 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900 md:text-3xl">
            Specialized care across key medical services.
          </h2>

          <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
            Explore a range of hospital departments supported by experienced
            teams, advanced facilities, and a patient-first healthcare approach.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { value: "24/7", label: "Emergency" },
              { value: "100", label: "Beds" },
              { value: "Multi", label: "Specialties" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              >
                <div className="text-lg font-semibold text-[rgb(21,98,160)]">
                  {item.value}
                </div>
                <div className="text-xs text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {[
              "Dedicated medical teams",
              "Modern clinical facilities",
              "Patient-focused treatment pathways",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.10)]">
                  <ShieldCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                </div>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <Link
            to="/departments"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            View All Departments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* RIGHT SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="min-w-0 space-y-5"
        >
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(2,32,71,0.08)]">
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px] overflow-hidden md:min-h-[460px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${active.title}-image`}
                    src={active.image}
                    alt={active.title}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/5" />

                <div className="absolute left-5 top-5 z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
                    <Building2 className="h-4 w-4" />
                    Featured Department
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col justify-between overflow-hidden p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active.title}-content`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex h-full flex-col justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                        Department
                      </div>

                      <h3 className="mt-3 text-2xl font-extralight text-slate-700 md:text-3xl">
                        {active.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                        {active.desc}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link
                        to={active.href}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-[rgba(21,98,160,0.35)] hover:text-[rgb(21,98,160)]"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* SWIPER CARDS */}
          <div className="relative px-12 sm:px-14">
            <button className="dept-swiper-prev absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:border-[rgba(21,98,160,0.35)] hover:text-[rgb(21,98,160)]">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button className="dept-swiper-next absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:border-[rgba(21,98,160,0.35)] hover:text-[rgb(21,98,160)]">
              <ChevronRight className="h-5 w-5" />
            </button>

            <Swiper
              modules={[Navigation, Grid]}
              navigation={{
                prevEl: ".dept-swiper-prev",
                nextEl: ".dept-swiper-next",
              }}
              rewind={true}
              spaceBetween={12}
              slidesPerView={2}
              grid={{
                rows: 2,
                fill: "row",
              }}
              slidesPerGroup={4}
              className="w-full"
            >
              {departments.map((item) => {
                const isActive = active.title === item.title;

                return (
                  <SwiperSlide key={item.title}>
                    <DeptCard
                      item={item}
                      isActive={isActive}
                      setActive={setActive}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DeptCard({ item, isActive, setActive }) {
  return (
    <motion.button
      layout
      whileTap={{ scale: 0.98 }}
      onClick={() => setActive(item)}
      className={[
        "group h-full w-full cursor-pointer rounded-[24px] border p-4 text-left transition-all duration-300",
        isActive
          ? "border-[rgba(21,98,160,0.28)] bg-white shadow-md"
          : "border-slate-200 bg-white/85 hover:border-[rgba(21,98,160,0.22)] hover:bg-white",
      ].join(" ")}
    >
      <div className="flex items-start gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="h-16 w-16 rounded-2xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <div
            className={[
              "text-base font-semibold transition",
              isActive
                ? "text-[rgb(21,98,160)]"
                : "text-slate-800 group-hover:text-[rgb(21,98,160)]",
            ].join(" ")}
          >
            {item.title}
          </div>

          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
            {item.desc}
          </p>
        </div>

        <ChevronRight
          className={[
            "h-5 w-5 shrink-0 transition",
            isActive
              ? "text-[rgb(21,98,160)]"
              : "text-slate-400 group-hover:text-[rgb(21,98,160)]",
          ].join(" ")}
        />
      </div>
    </motion.button>
  );
}
