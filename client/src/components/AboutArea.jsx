import { motion } from "framer-motion";
import Button from "./Button";

export default function AboutArea() {
  return (
    <div
      id="about"
      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:px-40 px-6 py-16 bg-white overflow-hidden"
    >
      {/* Left Side */}
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <h1 className="text-3xl w-fit text-[#2e438a] font-bold pb-2 relative after:block after:w-1/12 after:border-b-3 after:border-[#1e7f8f] after:mt-3">
          About Qassim National Hospital
        </h1>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify md:pr-4">
          Al-Qassim National Hospital was officially opened on December 28, 2010
          with a capacity of 100 beds. It includes all outpatient departments,
          ER, dialysis units, ICU unit, and NICU. Al Qassim National Hospital
          looks forward to developing its medical services to achieve the
          highest quality standards by recently obtaining the accreditation
          certificate from the Saudi Central Board for Accreditation of
          Healthcare Institutions (CBAHI), after it succeeded in achieving the
          required accreditation standards that aim to ensure high quality in
          the provision of health care. The achievement is an extension of the
          hospital’s success in achieving the American Health Services Quality
          Certification (JCI).
        </p>

        {/* Logos + Divider */}
        <div className="flex flex-col w-fit gap-6">
          <div className="flex items-center gap-6">
            <img
              src="/images/AboutArea/cbahi.gif"
              alt="CBAHI"
              className="w-auto object-contain bg-transparent"
            />

            {/* Divider */}
            <div className="h-20 w-px bg-[#2e438a]/30" />

            <img
              src="/images/AboutArea/abt-logo01.gif"
              alt="JCI"
              className="w-auto object-contain bg-transparent"
            />
          </div>

          <div className="self-center">
            <Button text={"Read More"} />
          </div>
        </div>
      </motion.div>

      {/* Right Side Image */}
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <img
          src="/images/AboutArea/about-us-image.png"
          alt="About us"
          className=""
        />
      </motion.div>
    </div>
  );
}
