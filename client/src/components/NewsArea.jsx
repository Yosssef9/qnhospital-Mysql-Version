import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./Button";

const sections = [
  {
    p: "Announcement for Board of Directors Nomination",
    image: "/images/NewsArea/WhatsApp Image 2025-04-21 at 2.16.30 PM.jpeg",
    date: "20 Apr 2025",
  },
  {
    p: "دعوة الجمعية العامة العادية لشركة القصيم للخدمات الطبية",
    image: "/images/NewsArea/24-04.jpg",
    date: "27 May 2025",
  },
  {
    p: "دعوة الجمعية العامة غير العادية لشركة القصيم الطبية",
    image: "/images/NewsArea/logomedium.jpg",
    date: "30 Aug 2023",
  },
];

const slides = [
  {
    title: "Achievements of the Kidney department (second achievement)",
    image: "/images/NewsArea/thumbnail_DSC_0277.jpg",
    date: "16 Oct 2022",
  },
  {
    title: "Spleen removal ends the suffering of a 34 year old patient",
    image: "/images/NewsArea/default.png",
    date: "27 Jan 2025",
  },
  {
    title: "A complicated surgery saves an eighty woman at QNH",
    image: "/images/NewsArea/default.png",
    date: "10 Oct 2019",
    p: "Finished, Praise to Allah, the medical team at Al-Qassim National Hospital succeeded in saving th",
  },
  {
    title: "A lady gives birth to three twins",
    image: "/images/NewsArea/default.png",
    date: "18 Oct 2023",
  },
  {
    title: "A painkiller after caesarean section a tab block",
    image: "/images/NewsArea/default.png",
    date: "11 Nov 2022",
  },
];

export default function NewsArea() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 md:px-40 py-8">
      {/* Latest News */}
      <motion.div
        className="flex flex-col p-6 md:w-1/3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h1 className="text-3xl w-fit text-[#2e438a] mb-10 font-bold pb-2 relative after:block after:w-1/12 after:border-b-3 after:border-[#1e7f8f] after:mt-3">
          LATEST NEWS
        </h1>
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            className="flex gap-32 md:gap-4 mb-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              className="h-28 w-28 object-contain"
              src={section.image}
              alt={section.p}
            />
            <div className="flex flex-col">
              <h2 className="text-[#2e438a]">{section.date}</h2>
              <p className="max-w-[135px]">{section.p}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Latest Achievement */}
      <motion.div
        className="flex flex-col p-6 md:w-2/3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h1 className="text-3xl w-fit text-[#2e438a] font-bold pb-2 relative after:block after:w-1/12 after:border-b-3 after:border-[#1e7f8f] after:mt-3">
          LATEST ACHIEVEMENT
        </h1>
        <div className="w-full mt-4">
          <Carousel slides={slides} />
        </div>
      </motion.div>
    </div>
  );
}

function Carousel({ slides }) {
  const [index, setIndex] = useState(0);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[350px] overflow-hidden group">
      <motion.div
        className="flex w-full h-full"
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            className="flex w-full h-full flex-shrink-0 bg-white gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1/2 h-full flex-shrink-0 flex items-start">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full object-contain rounded-l-2xl"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between p-6">
              <div>
                <h1 className="text-2xl font-bold text-[#2e438a] mb-2">
                  {slide.title}
                </h1>
                <h2 className="text-[#2e438a] mb-4">{slide.date}</h2>
                {slide.p && <p className="text-gray-700">{slide.p}</p>}
                <div className="mt-6">
                  <Button text={"Read More"} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition opacity-0 group-hover:opacity-100"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition opacity-0 group-hover:opacity-100"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-gray-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
