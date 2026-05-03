import { motion } from "framer-motion";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const sections = [
  {
    title: "Clinics",
    icon: "/images/OfferArea/clinics-icon-37x40.png",
    description:
      "Highly-skilled physicians in all clinics to provide the best medical care for patients starting from diagnosis to recovery.",
  },
  {
    title: "Centers",
    icon: "/images/OfferArea/centers-icon-37x40.png",
    description:
      "Our services are characterized by the high quality provided by a team of the best specialists.",
  },
  {
    title: "Units",
    icon: "/images/OfferArea/units-icon-37x40.png",
    description:
      "High readiness and rapid intervention to save different critical cases of all ages.",
  },
  {
    title: "Medical Service",
    icon: "/images/OfferArea/medical-icon-37x40.png",
    description:
      "Medical Services including: Anesthesiology, Infection Control, Laboratory, Operations, and Radiology",
  },
];

export default function OfferArea() {
  return (
    <motion.div
      className="bg-[var(--main-color)] w-full px-6 md:px-40 py-4"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-white">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 p-6 bg-[var(--main-color)] rounded-lg transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg"
          >
            <div className="flex items-center gap-2">
              <img
                src={section.icon}
                alt={section.title}
                className="h-12 w-auto object-contain"
              />
              <h2 className="text-xl font-bold pb-2 relative after:block after:w-1/2 after:border-b-2 after:border-white after:mt-1">
                {section.title}
              </h2>
            </div>
            <p className="text-sm/6 flex-1">{section.description}</p>

            <CustomDropdown title={section.title} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CustomDropdown({ title }) {
  const options = ["Option 1", "Option 2", "Option 3"];
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-[var(--main-color)] text-white w-full flex justify-between items-center px-4 py-2 border border-white/50 rounded transition hover:bg-white/10"
      >
        {`Select ${title}`}
        <IoChevronDown
          className={`text-xl transition-transform duration-300 ease-in-out ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-1 w-full bg-[var(--main-color)] border border-white/50 rounded-lg shadow-lg z-10">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setOpen(false)}
              className="block w-full text-left px-4 py-2 hover:bg-white/10"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
