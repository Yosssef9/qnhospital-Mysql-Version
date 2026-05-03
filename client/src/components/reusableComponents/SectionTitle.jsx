import { motion } from "framer-motion";

export default function SectionTitle({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2
        className={`mt-4 text-3xl md:text-5xl font-main leading-[1.15] tracking-[-0.03em] text-slate-800 font-main ${className}`}
      >
        {children}
      </h2>
    </motion.div>
  );
}
