import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Users,
  BedDouble,
} from "lucide-react";
import { CONTACT } from "../data/contact";
import { Link } from "react-router-dom";

export default function AboutArea4() {
  return (
    <section
      id="about"
      className="relative bg-white py-16 md:py-20 px-6 md:px-40 overflow-hidden"
    >
      {/* subtle background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="absolute -bottom-52 -left-48 h-[620px] w-[620px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT: stacked cards */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Main image card */}
          <div className="rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden">
            <img
              src="/images/qnh-image.webp"
              alt="Qassim National Hospital"
              className="h-[320px] md:h-[360px] w-full object-cover"
            />
          </div>

          {/* Mini cards */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MiniCard
              icon={MapPin}
              title="Al Qassim, Saudi Arabia"
              desc="Easy access and convenient location."
            />
            <MiniCard
              icon={ShieldCheck}
              title="Quality Focus"
              desc="Committed to safe, reliable care."
            />
          </div>
        </motion.div>

        {/* RIGHT: content + timeline style */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="max-w-2xl">
            {/* Header */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.18)] bg-[rgba(21,98,160,0.06)] px-3 py-1 text-sm font-semibold text-[rgb(21,98,160)]">
              About QNH
            </div>

            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              A hospital built around people.
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">
              Al-Qassim National Hospital opened on{" "}
              <span className="font-semibold text-slate-800">
                December 28, 2010
              </span>{" "}
              with a capacity of{" "}
              <span className="font-semibold text-slate-800">100 beds</span>. We
              provide comprehensive services — outpatient clinics, ER, dialysis,
              ICU, and NICU — with continuous development to meet high
              healthcare standards.
            </p>

            {/* Timeline / steps */}
            <div className="mt-7 space-y-4">
              <Step
                number="01"
                title="Comprehensive Departments"
                desc="Outpatient clinics, emergency, dialysis, ICU, and NICU — integrated services for a smoother patient journey."
              />
              <Step
                number="02"
                title="Continuous Improvement"
                desc="We continuously enhance clinical services and patient experience through structured quality practices."
              />
              <Step
                number="03"
                title="Accreditation & Standards"
                desc="Aligned with recognized healthcare accreditation requirements and quality benchmarks."
              />
            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Stat icon={BedDouble} value="100" label="Beds" />
              <Stat icon={Users} value="Care Teams" label="Dedicated Staff" />
              <Stat icon={ShieldCheck} value="Quality" label="Patient Safety" />
            </div>

            {/* Certifications + CTAs */}
            <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <img
                    src="/images/AboutArea/cbahi.gif"
                    alt="CBAHI"
                    className="h-12 w-auto object-contain"
                  />
                  <div className="h-10 w-px bg-slate-200 hidden md:block" />
                  <img
                    src="/images/AboutArea/abt-logo01.gif"
                    alt="JCI"
                    className="h-12 w-auto object-contain"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(21,98,160)] px-5 py-3 text-white font-semibold shadow-sm hover:opacity-95 transition"
                  >
                    Read More
                    <ArrowRight className="h-5 w-5" />
                  </Link>

                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-800 font-semibold hover:bg-slate-50 transition"
                  >
                    <PhoneCall className="h-5 w-5 text-[rgb(21,98,160)]" />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MiniCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 hover:shadow-sm transition">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.10)]">
          <Icon className="h-5 w-5 text-[rgb(21,98,160)]" />
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm">{title}</div>
          <div className="mt-1 text-slate-600 text-sm leading-relaxed">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0">
        <div className="h-10 w-10 rounded-xl bg-[rgba(21,98,160,0.10)] flex items-center justify-center font-extrabold text-[rgb(21,98,160)]">
          {number}
        </div>
      </div>
      <div className="pt-1">
        <div className="font-bold text-slate-900">{title}</div>
        <div className="mt-1 text-slate-600 text-sm leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.10)]">
        <Icon className="h-5 w-5 text-[rgb(21,98,160)]" />
      </div>
      <div>
        <div className="text-sm font-extrabold text-slate-900">{value}</div>
        <div className="text-xs text-slate-600">{label}</div>
      </div>
    </div>
  );
}
