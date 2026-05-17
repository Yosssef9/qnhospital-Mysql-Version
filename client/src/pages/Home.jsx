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
import HeroSection2 from "../components/HeroSection2";
import PrivacyNotice from "../components/PrivacyNotice";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
export default function Home() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  const homeTitle = isArabic
    ? "مستشفى القصيم الوطني | رعاية طبية متخصصة في القصيم"
    : "Qassim National Hospital | Specialized Healthcare in Qassim";

  const homeDescription = isArabic
    ? "مستشفى القصيم الوطني يقدم خدمات طبية متخصصة، عيادات متعددة، أطباء مؤهلين، ورعاية صحية متكاملة في منطقة القصيم."
    : "Qassim National Hospital provides specialized healthcare services, clinics, experienced doctors, and patient-centered medical care in Qassim, Saudi Arabia.";

  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: "Qassim National Hospital",
    alternateName: "مستشفى القصيم الوطني",
    url: "https://qnhospital.com.sa",
    logo: "https://qnhospital.com.sa/Logo.png",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: "Qassim",
    },
  };

  return (
    <div className=" ">
      <SEO
        title={homeTitle}
        description={homeDescription}
        structuredData={hospitalSchema}
      />
      <PrivacyNotice />

      <HeroWithNvabar />

      {/* <HeroSection />
      <HeroSection2 /> */}
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
