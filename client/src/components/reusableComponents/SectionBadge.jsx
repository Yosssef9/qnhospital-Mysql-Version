import { motion } from "framer-motion";

export default function SectionBadge({ children, className = "" }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.25)] bg-[rgba(21,98,160,0.08)] px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(21,98,160)]  ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(21,98,160)]"></span>
        {children}
      </motion.div>
    </>
  );
}
