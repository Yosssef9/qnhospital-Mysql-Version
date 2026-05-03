import { motion } from "framer-motion";
import {
  Stethoscope,
  HeartPulse,
  Microscope,
  Ambulance,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Clinics",
    icon: Stethoscope,
    desc: "Specialty clinics with experienced physicians from diagnosis to recovery.",
    to: "/departments",
  },
  {
    title: "Centers",
    icon: HeartPulse,
    desc: "Dedicated centers providing advanced care with modern protocols and equipment.",
    to: "/centers",
  },
  {
    title: "Laboratory & Imaging",
    icon: Microscope,
    desc: "Accurate lab tests and diagnostic imaging to support fast, correct decisions.",
    to: "/services",
  },
  {
    title: "Emergency",
    icon: Ambulance,
    desc: "24/7 emergency readiness with rapid intervention for critical cases.",
    to: "/emergency",
  },
];

export default function SimpleServices() {
  return (
    <section className="bg-white">
      <div className="mx-auto px-6 md:px-40 py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[rgb(21,98,160)]">
              Our Services
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-slate-900">
              Everything you need in one place
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              Explore our departments and key medical services designed to
              deliver safe, modern, and patient-first care.
            </p>
          </div>

          <a
            href="/departments"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition w-fit"
          >
            View all departments <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, idx) => (
            <motion.a
              key={s.title}
              href={s.to}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
            >
              <div className="h-11 w-11 rounded-xl bg-[rgba(21,98,160,0.10)] flex items-center justify-center">
                <s.icon className="h-6 w-6 text-[rgb(21,98,160)]" />
              </div>

              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-6">{s.desc}</p>

              <div className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(21,98,160)]">
                Learn more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom soft strip (optional, looks nice after hero) */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Need help choosing the right service?
            </div>
            <div className="text-sm text-slate-600">
              Contact us and we’ll guide you to the correct department.
            </div>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-[rgb(21,98,160)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition w-fit"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
