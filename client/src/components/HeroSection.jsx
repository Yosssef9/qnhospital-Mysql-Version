import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Clock3,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT } from "../data/contact";

export default function HeroSection() {
  const points = [
    "24/7 Emergency Support",
    "Experienced Medical Teams",
    "Patient-Centered Care",
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8fbfe]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[520px] w-[520px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        {/* <div className="absolute bottom-[-100px] left-[-120px] h-[380px] w-[380px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" /> */}
      </div>

      <div className="relative mx-auto px-6 md:px-16 xl:px-24 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.18)] bg-white px-3 py-1.5 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Qassim National Hospital
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div className="mt-2 hidden md:block h-24 w-[4px] rounded-full bg-[rgb(21,98,160)]" />
              <div>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-slate-900 leading-[1.05]">
                  Healthcare Built
                  <span className="block text-[rgb(21,98,160)]">
                    Around Trust
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base md:text-lg leading-8 text-slate-600">
                  Delivering compassionate, efficient, and modern healthcare
                  services for families across Al-Qassim with a strong focus on
                  safety, comfort, and clinical excellence.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/appointments"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3.5 text-white font-semibold shadow-sm hover:opacity-95 transition"
              >
                Book Appointment
                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-slate-800 font-semibold hover:border-[rgba(21,98,160,0.35)] hover:text-[rgb(21,98,160)] transition"
              >
                <PhoneCall className="h-5 w-5" />
                Call Hospital
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {points.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4 shadow-sm"
                >
                  <div className="text-sm font-medium text-slate-700">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-3 shadow-[0_20px_70px_rgba(2,32,71,0.08)]">
              <div className="relative overflow-hidden rounded-[26px]">
                <img
                  src="/images/qnh-image.webp"
                  alt="Qassim National Hospital"
                  className="h-[420px] md:h-[560px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />
              </div>
            </div>

            <div className="absolute -left-2 md:-left-10 bottom-6 w-[250px] rounded-[24px] border border-slate-200 bg-white/95 backdrop-blur p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)]">
                  <Clock3 className="h-5 w-5 text-[rgb(21,98,160)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Fast Access
                  </div>
                  <div className="text-xs text-slate-500">
                    Quick appointments & support
                  </div>
                </div>
              </div>

              <div className="mt-4 h-px bg-slate-200" />

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-[rgb(21,98,160)]">
                    24/7
                  </div>
                  <div className="text-xs text-slate-500">Emergency Care</div>
                </div>
                <HeartPulse className="h-9 w-9 text-[rgb(21,98,160)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
