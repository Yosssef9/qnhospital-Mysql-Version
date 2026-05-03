import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function Map2() {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto px-6 md:px-40">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-[rgb(21,98,160)] font-semibold">
            <MapPin className="h-5 w-5" />
            Our Location
          </div>

          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-900">
            Visit Qassim National Hospital
          </h2>

          <div className="mt-3 h-[3px] w-16 bg-[rgb(21,98,160)] mx-auto rounded-full" />
        </motion.div>

        {/* Map Card */}
        <motion.div
          className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <iframe
            title="Qassim National Hospital Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.5706190793094!2d43.94303082456606!3d26.374345483019294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157f5781db4ce29d%3A0x7a1c1021da464611!2z2YXYs9iq2LTZgdmJINin2YTZgti12YrZhSDYp9mE2YjYt9mG2Yo!5e1!3m2!1sar!2seg!4v1762031405434!5m2!1sar!2seg"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
