import { motion } from "framer-motion";

export default function Map() {
  return (
    <motion.section
      className="w-full flex flex-col items-center pb-16"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--main-color)] mb-8 text-center relative">
        Our Location
        <span className="block w-16 h-[3px] bg-[var(--main-color)] mx-auto mt-3 rounded-full"></span>
      </h2>

      {/* Google Map */}
      <motion.div
        className="w-full flex justify-center px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <iframe
          title="Qassim National Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.5706190793094!2d43.94303082456606!3d26.374345483019294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157f5781db4ce29d%3A0x7a1c1021da464611!2z2YXYs9iq2LTZgdmJINin2YTZgti12YrZhSDYp9mE2YjYt9mG2Yo!5e1!3m2!1sar!2seg!4v1762031405434!5m2!1sar!2seg"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-2xl shadow-md max-w-5xl w-full"
        ></iframe>
      </motion.div>
    </motion.section>
  );
}
