const medicalServicesData = [
  {
    slug: "radiology",
    category: "medical-services",
    title: "Radiology",
    shortTitle: "Radiology",
    badge: "Medical Services",
    image: "/images/MedicalDepartmentsPage/MedicalServices/Radiology.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Radiology Department",
    cardDesc:
      "Advanced diagnostic imaging services using modern radiology equipment.",

    hero: {
      description:
        "The Department of Radiology employs advanced technology for diagnostic, interventional, and therapeutic imaging-based medical procedures.",
      tag: "Advanced Medical Imaging",
      schedule: "Available Throughout the Day",
      emergencySupport: "Emergency Imaging Services",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Advanced Diagnostic Imaging",
      paragraphs: [
        "The Radiology Department at Al-Qassim National Hospital provides advanced imaging services to support accurate diagnosis and treatment planning.",
        "Our team uses modern imaging technologies while maintaining a safe and patient-friendly environment.",
        "Radiology services are available throughout the day with emergency coverage after working hours.",
      ],
    },

    services: {
      sectionLabel: "Services",
      title: "Radiology Services Provided",
      description:
        "The department offers a wide range of diagnostic and interventional radiology services.",
      items: [
        "Interventional Radiology",
        "Abdominal Radiology",
        "CT Radiology",
        "Ultrasound Radiology",
        "MRI Radiology",
        "General Radiology",
      ],
    },

    technology: {
      sectionLabel: "Technology",
      title: "Imaging Technology & Equipment",
      description:
        "The department uses advanced imaging systems to support precise diagnosis and effective treatment planning.",
      items: [
        "Computed Tomography (CT)",
        "Magnetic Resonance Imaging (MRI)",
        "Diagnostic Ultrasound",
        "Digital X-Ray Systems",
      ],
    },

    cta: {
      title: "Advanced Radiology Services",
      description:
        "Our radiology specialists use modern imaging technology to support accurate diagnosis and patient care.",
      primaryButton: {
        text: "View Doctors",
        to: "/doctors?department=Radiology",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "laboratory",
    category: "medical-services",
    title: "Laboratory",
    shortTitle: "Laboratory",
    badge: "Medical Services",
    image: "/images/MedicalDepartmentsPage/MedicalServices/Laboratory.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Medical Laboratory",
    cardDesc:
      "Accurate laboratory tests and diagnostics supporting fast and reliable clinical decisions.",

    hero: {
      description:
        "The Laboratory Department provides comprehensive diagnostic testing services using modern laboratory technology.",
      tag: "Diagnostic Laboratory Services",
      schedule: "Daily Laboratory Services",
      emergencySupport: "Emergency Lab Tests",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Comprehensive Laboratory Diagnostics",
      paragraphs: [
        "The laboratory department provides accurate and reliable medical testing to support diagnosis and treatment decisions.",
        "Our experienced laboratory specialists ensure high standards of quality and safety in all diagnostic procedures.",
      ],
    },

    services: {
      sectionLabel: "Services",
      title: "Laboratory Services",
      description: "The laboratory provides a wide range of diagnostic tests.",
      items: [
        "Blood analysis",
        "Biochemistry tests",
        "Hematology tests",
        "Microbiology testing",
        "Hormonal analysis",
        "Clinical pathology diagnostics",
      ],
    },

    technology: {
      sectionLabel: "Technology",
      title: "Laboratory Technology",
      description:
        "The laboratory uses advanced diagnostic equipment to ensure precise test results.",
      items: [
        "Automated blood analyzers",
        "Biochemistry analyzers",
        "Microbiology diagnostic systems",
        "Advanced laboratory diagnostic equipment",
      ],
    },

    cta: {
      title: "Reliable Laboratory Testing",
      description:
        "Our laboratory specialists provide accurate testing to support effective medical care.",
      primaryButton: {
        text: "Contact Hospital",
        to: "/contact",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "anesthesiology",
    category: "medical-services",
    title: "Anesthesiology",
    shortTitle: "Anesthesia",
    badge: "Medical Services",
    image: "/images/MedicalDepartmentsPage/MedicalServices/Anesthesiology.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Anesthesiology Department",
    cardDesc:
      "Specialized anesthesia services ensuring patient safety and comfort during surgical procedures.",

    hero: {
      description:
        "The Department of Anesthesiology provides safe anesthesia and pain management services for surgical and medical procedures.",
      tag: "Safe Surgical Care",
      schedule: "Available for Surgical Procedures",
      emergencySupport: "Emergency Anesthesia Support",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Advanced Anesthesia Care",
      paragraphs: [
        "The anesthesiology department ensures patient safety and comfort before, during, and after surgical procedures.",
        "Our anesthesiology specialists use modern anesthesia techniques and monitoring systems to provide safe care.",
      ],
    },

    services: {
      sectionLabel: "Services",
      title: "Anesthesia Services",
      description:
        "The department provides anesthesia support for various medical and surgical procedures.",
      items: [
        "General anesthesia",
        "Regional anesthesia",
        "Sedation for procedures",
        "Pain management services",
        "Pre-operative anesthesia evaluation",
      ],
    },

    technology: {
      sectionLabel: "Technology",
      title: "Anesthesia Equipment",
      description:
        "Modern anesthesia systems are used to ensure patient safety and monitoring.",
      items: [
        "Advanced anesthesia machines",
        "Patient monitoring systems",
        "Ventilators for anesthesia care",
        "Pain management technology",
      ],
    },

    cta: {
      title: "Safe Surgical Care",
      description:
        "Our anesthesiology team ensures patient comfort and safety during medical procedures.",
      primaryButton: {
        text: "Contact Hospital",
        to: "/contact",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "infection-control",
    category: "medical-services",
    title: "Infection Control",
    shortTitle: "Infection Control",
    badge: "Medical Services",
    image:
      "/images/MedicalDepartmentsPage/MedicalServices/Infection Control.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Infection Control Department",
    cardDesc:
      "Ensuring patient safety through infection prevention and control measures.",

    hero: {
      description:
        "The Infection Control Department focuses on preventing and controlling infections within the hospital environment.",
      tag: "Patient Safety & Prevention",
      schedule: "Hospital-wide Monitoring",
      emergencySupport: "Infection Prevention Support",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Infection Prevention & Control",
      paragraphs: [
        "The infection control department works to prevent healthcare-associated infections.",
        "Our team implements strict protocols and monitoring systems to ensure patient and staff safety.",
      ],
    },

    services: {
      sectionLabel: "Services",
      title: "Infection Control Services",
      description:
        "The department implements infection prevention programs across the hospital.",
      items: [
        "Hospital infection surveillance",
        "Infection prevention protocols",
        "Sterilization and disinfection monitoring",
        "Staff infection control training",
      ],
    },

    technology: {
      sectionLabel: "Technology",
      title: "Safety & Monitoring Systems",
      description:
        "Advanced monitoring systems help track and control infections.",
      items: [
        "Sterilization monitoring systems",
        "Hospital infection surveillance tools",
        "Safety compliance monitoring",
      ],
    },

    cta: {
      title: "Safe Hospital Environment",
      description:
        "Our infection control team ensures a safe and hygienic healthcare environment.",
      primaryButton: {
        text: "Contact Hospital",
        to: "/contact",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "operations",
    category: "medical-services",
    title: "Operations",
    shortTitle: "Operations",
    badge: "Medical Services",
    image: "/images/MedicalDepartmentsPage/MedicalServices/Operations.webp",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Operations Department",
    cardDesc:
      "Advanced surgical operations supported by modern operating rooms and technology.",

    hero: {
      description:
        "The Operations Department provides modern operating rooms equipped with advanced surgical technology.",
      tag: "Advanced Surgical Services",
      schedule: "Scheduled Surgical Procedures",
      emergencySupport: "Emergency Surgical Support",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Modern Surgical Facilities",
      paragraphs: [
        "The operations department provides modern surgical facilities for various medical specialties.",
        "Our operating rooms are equipped with advanced surgical technology and supported by experienced surgical teams.",
      ],
    },

    services: {
      sectionLabel: "Services",
      title: "Surgical Services",
      description:
        "The operations department supports surgical procedures across multiple specialties.",
      items: [
        "General surgery procedures",
        "Specialized surgical procedures",
        "Emergency surgical operations",
        "Minimally invasive surgeries",
      ],
    },

    technology: {
      sectionLabel: "Technology",
      title: "Operating Room Technology",
      description:
        "The department uses modern surgical technology to ensure safe procedures.",
      items: [
        "Advanced surgical operating rooms",
        "Modern surgical instruments",
        "Anesthesia and monitoring equipment",
      ],
    },

    cta: {
      title: "Advanced Surgical Care",
      description:
        "Our surgical team provides safe and advanced surgical procedures.",
      primaryButton: {
        text: "View Doctors",
        to: "/doctors",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },
];

export default medicalServicesData;
