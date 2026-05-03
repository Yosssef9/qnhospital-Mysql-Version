import { motion } from "framer-motion";
import { UserCheck, HeartPulse, Ambulance, ShieldPlus } from "lucide-react";

const sections = [
  {
    title: "Qualified Doctors",
    icon: UserCheck,
  },
  {
    title: "Outdoor Checkup",
    icon: HeartPulse,
  },
  {
    title: "Emergency 24 Hours",
    icon: Ambulance,
  },
  {
    title: "Reliable Nursing Staff",
    icon: ShieldPlus,
  },
];

export default function BluePanel2() {
  return (
    <section className="bg-slate-50 py-12 md:py-14">
      <div className="mx-auto px-6 md:px-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="h-12 w-12 rounded-xl bg-[rgba(21,98,160,0.1)] flex items-center justify-center">
                <section.icon className="h-6 w-6 text-[rgb(21,98,160)]" />
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                {section.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
