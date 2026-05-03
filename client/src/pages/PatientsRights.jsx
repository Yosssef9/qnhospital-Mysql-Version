import { motion } from "framer-motion";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import React from "react";
import { CiCircleChevRight, CiCircleChevLeft } from "react-icons/ci";
import { useTranslation } from "react-i18next";

export default function PatientsRightss() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const rights = [
    {
      title: t("patientsRightsPage.sections.patientRights.title"),
      points: t("patientsRightsPage.sections.patientRights.points", {
        returnObjects: true,
      }),
    },
    {
      title: t("patientsRightsPage.sections.duties.title"),
      points: t("patientsRightsPage.sections.duties.points", {
        returnObjects: true,
      }),
    },
  ];

  const DirectionIcon = isRTL ? CiCircleChevLeft : CiCircleChevRight;

  return (
    <div>
      <BreadcrumbArea
        imgUrl={"/images/about.jpg"}
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("patientsRightsPage.breadcrumbTitle") },
        ]}
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 md:flex-row md:gap-10">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-1 justify-start"
        >
          <img
            src="/images/PatientsRightss/mission-img.png"
            alt={t("patientsRightsPage.imageAlt")}
            className="h-[450px] w-full rounded-2xl md:w-[600px]"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          {rights.map((right, i) => (
            <div key={i} className="mb-12">
              <h1
                className={`mb-6 text-xl font-bold text-[var(--main-color)] md:text-2xl relative after:block after:w-1/12 after:border-b-4 after:border-[#1e7f8f] after:mt-3 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {right.title}
              </h1>

              <div className="space-y-6">
                {right.points.map((point, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-start gap-3">
                      <DirectionIcon className="mt-1 h-6 w-6 flex-shrink-0 text-[var(--main-color)]" />
                      <p
                        className={`text-[17px] font-medium leading-8 tracking-wide text-gray-800 md:text-lg ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      >
                        {point.text}
                      </p>
                    </div>

                    {point.subText && (
                      <ul
                        className={`mt-1 space-y-1 ${
                          isRTL ? "pr-10 text-right" : "pl-10 text-left"
                        }`}
                      >
                        {point.subText.map((text, i) => (
                          <li
                            key={i}
                            className="text-[16px] font-medium leading-8 tracking-wide text-gray-800 md:text-[17px]"
                          >
                            {text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
