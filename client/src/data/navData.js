import { HeartPulse, Building2, Stethoscope, ShieldPlus } from "lucide-react";

export function getSiteNav(t) {
  return [
    { label: t("navbar.home"), to: "/" },

    {
      label: t("navbar.about"),
      children: [
        { label: t("navbar.qnhHistory"), to: "/qnh-history" },
        { label: t("navbar.missionVision"), to: "/mission-vision" },
        { label: t("navbar.patientsRights"), to: "/patients-rights" },
        {
          label: t("navbar.hospitalAccreditations"),
          to: "/hospital-accreditations",
        },
        // {
        //   label: t("navbar.staffPortal"),
        //   to: "https://www.qnhospital.com/portal/",
        // },
      ],
    },

    {
      label: t("navbar.departments"),
      type: "mega",
      intro: {
        eyebrow: t("departments.introEyebrow"),
        title: t("departments.introTitle"),
        desc: t("departments.introDesc"),
        to: "/medical-departments",
      },
      sections: [
        {
          title: t("departments.clinics"),
          icon: Stethoscope,
          links: [
            {
              label: t("departments.items.cardiology"),
              to: "/clinics/cardiology",
            },
            {
              label: t("departments.items.dermatology"),
              to: "/clinics/dermatology",
            },
            {
              label: t("departments.items.pediatrics"),
              to: "/clinics/pediatrics",
            },
            { label: t("departments.items.ent"), to: "/clinics/ent" },
            {
              label: t("departments.items.ophthalmology"),
              to: "/clinics/ophthalmology",
            },
          ],
          moreLink: {
            label: t("departments.viewAllClinics"),
            to: "/medical-departments?tab=clinics",
          },
        },

        {
          title: t("departments.units"),
          icon: ShieldPlus,
          links: [
            {
              label: t("departments.items.cardiacCatheterization"),
              to: "/units/cardiac-catheterization",
            },
            {
              label: t("departments.items.emergency"),
              to: "/units/emergency",
            },
            {
              label: t("departments.items.intensiveCare"),
              to: "/units/intensive-care",
            },
            {
              label: t("departments.items.newbornIntensiveCare"),
              to: "/units/newborn-intensive-care",
            },
            {
              label: t("departments.items.pediatricIntensiveCare"),
              to: "/units/pediatric-intensive-care",
            },
          ],
          moreLink: {
            label: t("departments.viewAllUnits"),
            to: "/medical-departments?tab=units",
          },
        },

        {
          title: t("departments.medicalServices"),
          icon: HeartPulse,
          links: [
            {
              label: t("departments.items.radiology"),
              to: "/medical-services/radiology",
            },
            {
              label: t("departments.items.laboratory"),
              to: "/medical-services/laboratory",
            },
            {
              label: t("departments.items.anesthesiology"),
              to: "/medical-services/anesthesiology",
            },
            {
              label: t("departments.items.operations"),
              to: "/medical-services/operations",
            },
            {
              label: t("departments.items.infectionControl"),
              to: "/medical-services/infection-control",
            },
          ],
          moreLink: {
            label: t("departments.viewAllServices"),
            to: "/medical-departments?tab=medical-services",
          },
        },

        {
          title: t("departments.centers"),
          icon: Building2,
          links: [
            {
              label: t("departments.items.physiotherapyCenter"),
              to: "/centers/physiotherapy",
            },
          ],
          moreLink: {
            label: t("departments.viewAllCenters"),
            to: "/medical-departments?tab=centers",
          },
        },
      ],
    },

    { label: t("navbar.ourDoctors"), to: "/our-doctors" },

    { label: t("navbar.NewsAchievements"), to: "/News&Achievements" },
    { label: t("navbar.JoinUs"), to: "/join-us" },
    // { label: t("navbar.contact"), to: "/contact" },
  ];
}
