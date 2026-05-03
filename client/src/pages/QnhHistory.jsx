import { motion } from "framer-motion";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import { useTranslation } from "react-i18next";

export default function QnhHistory() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const sections = [
    {
      date: t("qnhHistoryPage.sections.year1993.date"),
      imgUrl: "/images/QnhHistory/Picture2.jpg",
      paragraph: t("qnhHistoryPage.sections.year1993.paragraph"),
    },
    {
      date: t("qnhHistoryPage.sections.year1998.date"),
      imgUrl: "/images/QnhHistory/prince sultan.png",
      paragraph: t("qnhHistoryPage.sections.year1998.paragraph"),
    },
    {
      date: t("qnhHistoryPage.sections.year1999_2008.date"),
      imgUrl: "/images/QnhHistory/Picture3.jpg",
      paragraph: t("qnhHistoryPage.sections.year1999_2008.paragraph"),
    },
    {
      date: t("qnhHistoryPage.sections.year2009.date"),
      imgUrl: "/images/QnhHistory/SZN_9637.jpg",
      paragraph: t("qnhHistoryPage.sections.year2009.paragraph"),
    },
    {
      date: t("qnhHistoryPage.sections.year2010Now.date"),
      imgUrl: "/images/QnhHistory/DSC_1078.jpg",
      paragraph: t("qnhHistoryPage.sections.year2010Now.paragraphs", {
        returnObjects: true,
      }),
    },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <BreadcrumbArea
        imgUrl={"/images/about-us-header.jpg"}
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("qnhHistoryPage.breadcrumbTitle") },
        ]}
      />

      <div className="mt-20 mb-20 flex flex-col space-y-20 px-5 md:px-20 lg:px-40">
        {sections.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              className={`flex flex-col items-start gap-10 md:flex-row ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={section.imgUrl}
                alt={section.date}
                className="h-[200px] w-full rounded-2xl object-cover shadow-lg md:w-[400px] md:h-[250px] lg:h-[300px]"
              />

              <div
                className={`max-w-[700px] text-gray-800 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                <h1 className="mb-3 text-2xl font-bold text-[#2e438a]">
                  {section.date}
                </h1>

                {Array.isArray(section.paragraph) ? (
                  section.paragraph.map((p, i) => (
                    <p
                      key={i}
                      className="mb-3 text-lg leading-relaxed tracking-wide"
                    >
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="text-lg leading-relaxed tracking-wide">
                    {section.paragraph}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
