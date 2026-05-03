import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  HeartPulse,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutArea3() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-16 md:py-20 px-6 md:px-40"
    >
      {/* soft hospital accents */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-40 h-[560px] w-[560px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Title block */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.18)] bg-[rgba(21,98,160,0.06)] px-3 py-1 text-sm font-semibold text-[rgb(21,98,160)]">
              <Building2 className="h-4 w-4" />
              About Us
            </div>

            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Qassim National Hospital
            </h2>

            <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base max-w-xl">
              Since its official opening on{" "}
              <span className="font-semibold text-slate-800">
                December 28, 2010
              </span>
              , Al-Qassim National Hospital has grown into a trusted healthcare
              provider with a capacity of{" "}
              <span className="font-semibold text-slate-800">100 beds</span>,
              serving patients across the region.
            </p>
          </div>

          {/* Key points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Feature
              icon={HeartPulse}
              title="Comprehensive Services"
              desc="Outpatient clinics, ER, dialysis, ICU, and NICU under one roof."
            />
            <Feature
              icon={ShieldCheck}
              title="Patient-First Experience"
              desc="Clear guidance, smooth appointments, and compassionate care."
            />
            <Feature
              icon={Award}
              title="Quality Standards"
              desc="Continuous improvement aligned with recognized healthcare benchmarks."
            />
            <Feature
              icon={ShieldCheck}
              title="Safety & Reliability"
              desc="Processes designed to support safe, consistent clinical outcomes."
            />
          </div>

          {/* Accreditation + CTA row */}
          <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Certifications */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/AboutArea/cbahi.gif"
                    alt="CBAHI"
                    className="h-12 w-auto object-contain"
                  />
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">CBAHI</div>
                    <div className="text-slate-600">Accredited</div>
                  </div>
                </div>

                <div className="hidden sm:block h-10 w-px bg-slate-200" />

                <div className="flex items-center gap-3">
                  <img
                    src="/images/AboutArea/abt-logo01.gif"
                    alt="JCI"
                    className="h-12 w-auto object-contain"
                  />
                  <div className="text-sm">
                    <div className="font-semibold text-slate-900">JCI</div>
                    <div className="text-slate-600">
                      International Standards
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(21,98,160)] px-5 py-3 text-white font-semibold shadow-sm hover:opacity-95 transition"
              >
                Read More
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.35 }}
          className="relative"
        >
          {/* glow */}
          <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[rgba(21,98,160,0.10)] blur-2xl" />

          <div className="relative rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden">
            <img
              src="/images/about.jpeg"
              alt="About Qassim National Hospital"
              className="h-[320px] md:h-[460px] w-full object-cover"
            />

            {/* subtle overlay + badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4">
              <div className="rounded-2xl bg-white/90 backdrop-blur border border-white/60 p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Modern Facilities • Dedicated Teams
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Supporting patients with advanced services and consistent
                    quality.
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 rounded-xl bg-[rgba(21,98,160,0.08)] px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                  <span className="text-xs font-semibold text-[rgb(21,98,160)]">
                    Quality Care
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* small stats row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat value="2010" label="Established" />
            <Stat value="100" label="Beds" />
            <Stat value="24/7" label="Emergency" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
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

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
      <div className="text-lg font-extrabold text-slate-900">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}
