import { motion } from "framer-motion";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
export default function MssionVision() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const sections = [
    {
      imgUrl: "/images/MssionVsion/WhatsApp Image 2018-11-05 at 11.31.24.jpeg",
      h1: t("missionVisionPage.sections.mission.title"),
      p: t("missionVisionPage.sections.mission.description"),
    },
    {
      imgUrl:
        "/images/MssionVsion/WhatsApp Image 2018-11-05 at 11.31.24(1).jpeg",
      h1: t("missionVisionPage.sections.vision.title"),
      p: t("missionVisionPage.sections.vision.description"),
    },
  ];

  return (
    <div>
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? "الرؤية والرسالة | مستشفى القصيم الوطني"
            : "Mission and Vision | Qassim National Hospital"
        }
        description={
          i18n.language?.startsWith("ar")
            ? "تعرف على رؤية ورسالة مستشفى القصيم الوطني وقيمه في تقديم رعاية صحية متميزة."
            : "Learn about the mission, vision, and values of Qassim National Hospital."
        }
      />
      <BreadcrumbArea
        imgUrl={"/images/about-us-header.jpg"}
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("missionVisionPage.breadcrumbTitle") },
        ]}
      />

      <div className="mb-20 flex flex-col px-6 md:px-20 lg:px-40">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`my-20 flex flex-col items-center gap-10 md:mb-8 md:flex-row md:gap-20 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, x: index % 2 === 1 ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={section.imgUrl}
              alt={section.h1}
              className="w-full max-w-[400px] flex-shrink-0 rounded-2xl shadow-md md:h-[350px] md:w-[400px]"
            />

            <div
              className={`mt-10 flex flex-col ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <h1 className="mb-5 text-2xl font-bold text-[#2e438a]">
                {section.h1}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed tracking-wide text-gray-700">
                {section.p}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
