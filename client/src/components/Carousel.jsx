import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel({ images = [] }) {
  return (
    <div className="px-2 md:px-12">
      <div className="relative w-full h-[280px] md:h-[550px] rounded-2xl shadow-lg overflow-hidden group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          slidesPerView={1}
          speed={700}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          // تحسين تجربة اللمس والسحب للموبايل
          touchRatio={1.4} // حساسية السحب (قُم بتعديلها للي يناسبك)
          threshold={8} // px لازم يسحبها عشان يعتبر swipe
          grabCursor={true}
          allowTouchMove={true}
          className="h-full"
          breakpoints={{
            640: {
              // >= 640px (sm)
              speed: 700,
            },
            1024: {
              // >= 1024px (lg)
              speed: 800,
            },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows - hide on small screens */}
        <button
          className="swiper-prev hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition opacity-0 group-hover:opacity-100 z-10"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>

        <button
          className="swiper-next hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition opacity-0 group-hover:opacity-100 z-10"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
