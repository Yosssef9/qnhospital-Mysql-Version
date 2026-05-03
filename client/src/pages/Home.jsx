import Carousel from "../components/Carousel";
import OfferArea from "../components/OfferArea";
import AboutArea from "../components/AboutArea";
import BluePanel from "../components/BluePanel";
import NewsArea from "../components/NewsArea";
import Map from "../components/Map";
import HeroSection from "../components/HeroSection";
import SimpleServices from "../components/SimpleServices";
import AboutArea2 from "../components/AboutArea-2";
import BluePanel2 from "../components/BluePanel-2";
import NewsArea2 from "../components/NewsArea2";
import Map2 from "../components/Map-2";
import DepartmentsSection from "../components/DepartmentsSection";
import AboutArea3 from "../components/AboutArea-3";
import AboutArea4 from "../components/AboutArea-4";
import HospitalDroneSection from "../components/HospitalDroneSection";
import AboutAreaDesignV2 from "../components/AboutAreaDesignV2";
import DepartmentsSectionDesignV2 from "../components/DepartmentsSectionDesignV2";
import NewsAreaDesignV2 from "../components/NewsAreaDesignV2";
import MapDesignV2 from "../components/MapDesignV2";
import HeroWithNvabar from "../components/HeroWithNvabar";
import AccreditationsSection from "../components/AccreditationsSection";
import DepartmentsSectionDesignV2_edits1 from "../components/DepartmentsSectionDesignV2_edits1";
import DepartmentsSectionDesignV2_edits2 from "../components/DepartmentsSectionDesignV2_edits2";
import MapDesignV2_edits1 from "../components/MapDesignV2_edits1";
import NavBarQNH from "../components/NavBarQNH";
import OurDoctorsSection from "../components/OurDoctorsSection";
import MobileAppHomeSection from "../components/MobileAppHomeSection";

export default function Home() {
  const images = [
    "/images/Carousel/WhatsApp Image 2025-11-01 at 17.41.58_f8fa0789.jpg",
    "/images/Carousel/WhatsApp Image 2025-11-01 at 17.41.58_2d9ec9d3.jpg",
    "/images/Carousel/WhatsApp Image 2025-11-01 at 17.41.58_db7198c2.jpg",
    "/images/Carousel/WhatsApp Image 2025-11-01 at 17.41.58_3901e3cb.jpg",
    "/images/Carousel/WhatsApp Image 2025-11-01 at 17.41.58_f3000e90.jpg",
  ];

  return (
    <div className=" ">
      <HeroWithNvabar />
      <OurDoctorsSection />
      <MobileAppHomeSection />
      <DepartmentsSection />
      <AboutAreaDesignV2 />
      <AccreditationsSection />
      <HospitalDroneSection />
      <NewsAreaDesignV2 />
      <MapDesignV2_edits1 />
    </div>
  );
}
