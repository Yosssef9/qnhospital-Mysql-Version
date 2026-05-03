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
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
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
    title: "Emergency",
    desc: "24/7 emergency care for urgent and critical medical cases.",
    image: "/images/departments/emergency.webp",
    href: "/departments/emergency",
  },
  {
    title: "Cardiology",
    desc: "Diagnosis and treatment of heart diseases with modern technology.",
    image: "/images/departments/cardiology.jpg",
    href: "/departments/cardiology",
  },
];

export default function DepartmentsSectionDesignV2() {
  const [active, setActive] = useState(departments[0]);

  return (
    <section className="relative overflow-hidden bg-[#f8fbfe] px-6 py-16 md:px-16 xl:px-24 md:py-24">
      <div className="pointer-events-none absolute top-0 left-0 h-[360px] w-[360px] rounded-full bg-[rgba(21,98,160,0.07)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-80px] h-[340px] w-[340px] rounded-full bg-[rgba(21,98,160,0.05)] blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-start">
        {/* LEFT INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-28"
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

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900">
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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
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
          className="space-y-5"
        >
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(2,32,71,0.08)]">
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[320px] md:min-h-[460px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active.title + "-image"}
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

              <div className="relative flex flex-col justify-between p-6 md:p-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title + "-content"}
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

                      <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-slate-900">
                        {active.title}
                      </h3>

                      <p className="mt-4 text-sm md:text-base leading-7 text-slate-600">
                        {active.desc}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link
                        to={active.href}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-[rgba(21,98,160,0.35)] hover:text-[rgb(21,98,160)] transition"
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

          <div className="grid gap-3 sm:grid-cols-2">
            {departments.map((item) => {
              const isActive = active.title === item.title;
              return (
                <DeptCard
                  item={item}
                  isActive={isActive}
                  setActive={setActive}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DeptCard({ item, isActive, setActive }) {
  return (
    <motion.button
      key={item.title}
      layout
      whileTap={{ scale: 0.98 }}
      onClick={() => setActive(item)}
      // onMouseEnter={() => setActive(item)}
      className={[
        "group rounded-[24px] cursor-pointer border p-4 text-left transition-all duration-300",
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

          <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-2">
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
