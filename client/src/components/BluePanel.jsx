import { motion } from "framer-motion";

const sections = [
  {
    title: "Qualified Doctors",
    icon: "/images/BluePanel/qualified-doctors.png",
  },
  {
    title: "Outdoor Checkup",
    icon: "/images/BluePanel/outdoor-checkup.png",
  },
  {
    title: "Emergency 24 hours",
    icon: "/images/BluePanel/emergency-care.png",
  },
  {
    title: "Reliable Nursing Staff",
    icon: "/images/BluePanel/nursing-staff.png",
  },
];

export default function BluePanel() {
  return (
    <div className="bg-[#c5edfe] w-full px-6 md:px-40 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-white">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 50 }} // start hidden & slightly below
            whileInView={{ opacity: 1, y: 0 }} // animate to visible & original position
            transition={{
              duration: 0.6,
              delay: idx * 0.2, // small staggered delay
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }} // trigger when 20% visible, only once
          >
            <img
              src={section.icon}
              alt={section.title}
              className="w-auto object-contain"
            />
            <h2 className="text-xl text-[#2e438a] font-semibold relative whitespace-normal max-w-[120px]">
              {section.title}
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
