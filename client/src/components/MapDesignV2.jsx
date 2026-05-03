import { motion } from "framer-motion";
import {
  MapPin,
  PhoneCall,
  ArrowRight,
  Clock3,
  Navigation,
} from "lucide-react";
import { CONTACT } from "../data/contact";

export default function MapDesignV2() {
  return (
    <section className="relative overflow-hidden bg-[#f8fbfe] py-16 md:py-24">
      {/* soft accents */}
      <div className="pointer-events-none absolute top-0 left-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.07)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] h-[300px] w-[300px] rounded-full bg-[rgba(21,98,160,0.05)] blur-3xl" />

      <div className="relative mx-auto px-6 md:px-16 xl:px-24">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="max-w-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.25)] bg-[rgba(21,98,160,0.08)] px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(21,98,160)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[rgb(21,98,160)]"></span>
              Our Location
            </motion.div>
            <h2 className="mt-4 text-3xl md:text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900">
              Visit Qassim National Hospital in Al-Qassim.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Find us بسهولة in Buraydah, with convenient access to hospital
              services, emergency care, and outpatient departments.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)]">
                  <MapPin className="h-5 w-5 text-[rgb(21,98,160)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Address
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">
                    Buraydah, Al-Qassim, Saudi Arabia
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)]">
                  <PhoneCall className="h-5 w-5 text-[rgb(21,98,160)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Contact
                  </div>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="mt-1 block text-sm leading-6 text-slate-600 hover:text-[rgb(21,98,160)] transition"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.10)]">
                  <Clock3 className="h-5 w-5 text-[rgb(21,98,160)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Availability
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">
                    Emergency services available 24/7
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
              >
                Get Directions
                <Navigation className="h-4 w-4" />
              </a>

              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-[rgba(21,98,160,0.35)] hover:text-[rgb(21,98,160)] transition"
              >
                Call Hospital
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_18px_50px_rgba(2,32,71,0.08)]">
              <div className="overflow-hidden rounded-[26px]">
                <iframe
                  title="Qassim National Hospital Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.5706190793094!2d43.94303082456606!3d26.374345483019294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157f5781db4ce29d%3A0x7a1c1021da464611!2z2YXYs9iq2LTZgdmJINin2YTZgti12YrZhSDYp9mE2YjYt9mG2Yo!5e1!3m2!1sar!2seg!4v1762031405434!5m2!1sar!2seg"
                  width="100%"
                  height="520"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </div>

            {/* floating location card */}
            <div className="absolute left-4 bottom-4 md:left-6 md:bottom-6 max-w-[260px] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.10)]">
                  <MapPin className="h-4 w-4 text-[rgb(21,98,160)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    QNH Location
                  </div>
                  <div className="mt-1 text-xs leading-5 text-slate-600">
                    Buraydah, Al-Qassim
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
