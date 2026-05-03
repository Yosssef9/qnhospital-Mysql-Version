import { motion } from "framer-motion";
import Button from "./Button";

export default function AboutArea2() {
  return (
    <section
      id="about"
      className="bg-white py-16 md:py-20 px-6 md:px-40 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-sm font-semibold text-[rgb(21,98,160)]">
              About Us
            </p>

            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
              Qassim National Hospital
            </h2>

            <div className="mt-3 h-[3px] w-16 bg-[rgb(21,98,160)] rounded-full" />
          </div>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Al-Qassim National Hospital was officially opened on December 28,
            2010 with a capacity of 100 beds. It includes all outpatient
            departments, ER, dialysis units, ICU unit, and NICU.
          </p>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            The hospital continuously develops its services to achieve the
            highest healthcare standards. It obtained accreditation from the
            Saudi Central Board for Accreditation of Healthcare Institutions
            (CBAHI) and the international Joint Commission International (JCI).
          </p>

          {/* Certifications */}
          <div className="flex items-center gap-8 pt-4">
            <img
              src="/images/AboutArea/cbahi.gif"
              alt="CBAHI"
              className="h-16 object-contain"
            />

            <div className="h-14 w-px bg-slate-200" />

            <img
              src="/images/AboutArea/abt-logo01.gif"
              alt="JCI"
              className="h-16 object-contain"
            />
          </div>

          <div className="pt-4">
            <Button text="Read More" />
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-[rgba(21,98,160,0.10)] blur-2xl"></div>

          <img
            src="/images/qnh-image.webp"
            alt="About Qassim National Hospital"
            className="relative rounded-3xl shadow-lg border border-slate-200"
          />
        </motion.div>
      </div>
    </section>
  );
}
