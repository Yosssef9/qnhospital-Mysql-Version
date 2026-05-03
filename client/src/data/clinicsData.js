const clinicsData = [
  {
    slug: "cardiology",
    category: "clinics",
    title: "Cardiology Clinic",
    shortTitle: "Cardiology",
    badge: "Clinics",
    image: "/images/departments/cardiology.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Cardiology Clinic",
    cardDesc:
      "Comprehensive heart care, diagnosis, and follow-up with experienced specialists.",

    hero: {
      description:
        "The Cardiology Clinic provides specialized care for heart and cardiovascular conditions, offering accurate diagnosis, treatment planning, and long-term follow-up.",
      tag: "Advanced Cardiac Care",
      schedule: "Sat - Thu | 09:00 - 21:00",
      emergencySupport: "Emergency Support 24/7",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Comprehensive Cardiovascular Care",
      paragraphs: [
        "The clinic evaluates and manages a wide range of heart and circulatory system conditions including hypertension, coronary artery disease, arrhythmias, and heart failure.",
        "Our cardiology specialists focus on early detection, prevention, and effective treatment to ensure optimal heart health and improved patient outcomes.",
      ],
    },

    highlights: {
      sectionLabel: "Clinic Highlights",
      title: "Key Areas of Care",
      items: [
        "Diagnosis and treatment of cardiovascular diseases",
        "Hypertension and heart disease management",
        "Cardiac evaluation and monitoring",
        "Preventive cardiology and lifestyle guidance",
      ],
    },

    treatedCases: {
      sectionLabel: "Treated Cases",
      title: "Conditions & Procedures",
      description:
        "Our cardiology clinic manages a wide range of heart conditions through evaluation, monitoring, and specialized treatment plans.",
      items: [
        "Hypertension management",
        "Coronary artery disease",
        "Heart rhythm disorders",
        "Chest pain evaluation",
        "Heart failure monitoring",
        "Preventive heart screenings",
      ],
    },

    cta: {
      title: "Meet Our Cardiology Specialists",
      description:
        "Consult with our experienced cardiology doctors for expert heart care and cardiovascular health management.",
      primaryButton: {
        text: "View Cardiology Doctors",
        to: "/doctors?department=Cardiology",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "dermatology",
    category: "clinics",
    title: "Dermatology Clinic",
    shortTitle: "Dermatology",
    badge: "Clinics",
    image: "/images/departments/dermatology.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Dermatology Clinic",
    cardDesc:
      "Advanced care for skin, hair, and nail conditions with modern treatment options.",

    hero: {
      description:
        "The Dermatology Clinic provides comprehensive diagnosis and treatment for skin, hair, and nail disorders for patients of all ages.",
      tag: "Specialized Skin Care",
      schedule: "Sat - Thu | 09:00 - 21:00",
      emergencySupport: "Emergency Support 24/7",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Comprehensive Skin Care",
      paragraphs: [
        "The dermatology clinic evaluates and treats a wide range of skin conditions including infections, inflammatory diseases, and cosmetic concerns.",
        "Our dermatology specialists focus on accurate diagnosis, effective treatment, and preventive skin care guidance.",
      ],
    },

    highlights: {
      sectionLabel: "Clinic Highlights",
      title: "Key Areas of Care",
      items: [
        "Diagnosis and treatment of skin diseases",
        "Hair and scalp disorders",
        "Acne and pigmentation treatment",
        "Dermatologic consultations and procedures",
      ],
    },

    treatedCases: {
      sectionLabel: "Treated Cases",
      title: "Conditions & Procedures",
      description:
        "Our dermatology clinic manages a wide range of skin, hair, and nail conditions.",
      items: [
        "Acne and skin infections",
        "Eczema and dermatitis",
        "Hair loss disorders",
        "Skin pigmentation conditions",
        "Allergic skin reactions",
        "Minor dermatologic procedures",
      ],
    },

    cta: {
      title: "Meet Our Dermatology Specialists",
      description:
        "Explore our dermatology specialists for professional skin care and treatment.",
      primaryButton: {
        text: "View Dermatology Doctors",
        to: "/doctors?department=Dermatology",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "pediatrics",
    category: "clinics",
    title: "Pediatric Clinic",
    shortTitle: "Pediatrics",
    badge: "Clinics",
    image: "/images/departments/pediatrics.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Pediatric Clinic",
    cardDesc:
      "Dedicated healthcare services for infants, children, and adolescents.",

    hero: {
      description:
        "The Pediatric Clinic provides comprehensive healthcare services for infants, children, and adolescents.",
      tag: "Child Health Care",
      schedule: "Sat - Thu | 09:00 - 21:00",
      emergencySupport: "Emergency Support 24/7",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Comprehensive Pediatric Care",
      paragraphs: [
        "The clinic focuses on the growth, development, and well-being of children from infancy through adolescence.",
        "Our pediatric specialists provide preventive care, diagnosis, and treatment of childhood illnesses.",
      ],
    },

    highlights: {
      sectionLabel: "Clinic Highlights",
      title: "Key Areas of Care",
      items: [
        "Child growth and development monitoring",
        "Diagnosis and treatment of pediatric illnesses",
        "Vaccination and preventive care",
        "Family-centered pediatric consultations",
      ],
    },

    treatedCases: {
      sectionLabel: "Treated Cases",
      title: "Conditions & Procedures",
      description:
        "Our pediatric clinic treats a wide range of childhood health conditions.",
      items: [
        "Respiratory infections",
        "Childhood fever management",
        "Growth and development assessment",
        "Vaccination programs",
        "Pediatric nutrition guidance",
      ],
    },

    cta: {
      title: "Meet Our Pediatric Specialists",
      description:
        "Our pediatric doctors provide compassionate care for infants, children, and adolescents.",
      primaryButton: {
        text: "View Pediatric Doctors",
        to: "/doctors?department=Pediatrics",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "orthopedics",
    category: "clinics",
    title: "Orthopedics Clinic",
    shortTitle: "Orthopedics",
    badge: "Clinics",
    image: "/images/departments/orthopedics.webp",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Orthopedics Clinic",
    cardDesc:
      "Diagnosis and treatment for bone, joint, spine, and sports injuries.",

    hero: {
      description:
        "The Orthopedics Clinic specializes in the diagnosis and treatment of musculoskeletal conditions affecting bones, joints, muscles, and ligaments.",
      tag: "Bone & Joint Care",
      schedule: "Sat - Thu | 09:00 - 21:00",
      emergencySupport: "Emergency Support 24/7",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Comprehensive Orthopedic Care",
      paragraphs: [
        "Our orthopedic specialists diagnose and treat injuries and disorders affecting bones, joints, muscles, and ligaments.",
        "The clinic focuses on restoring mobility, reducing pain, and improving patient quality of life.",
      ],
    },

    highlights: {
      sectionLabel: "Clinic Highlights",
      title: "Key Areas of Care",
      items: [
        "Bone and joint disorder diagnosis",
        "Sports injury treatment",
        "Fracture care and management",
        "Orthopedic consultations and follow-up",
      ],
    },

    treatedCases: {
      sectionLabel: "Treated Cases",
      title: "Conditions & Procedures",
      description:
        "The orthopedic clinic treats various musculoskeletal injuries and disorders.",
      items: [
        "Bone fractures",
        "Joint pain and arthritis",
        "Sports injuries",
        "Ligament and tendon injuries",
        "Back and spine conditions",
      ],
    },

    cta: {
      title: "Meet Our Orthopedic Specialists",
      description:
        "Consult with our orthopedic doctors for specialized bone and joint care.",
      primaryButton: {
        text: "View Orthopedic Doctors",
        to: "/doctors?department=Orthopedics",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "ophthalmology",
    category: "clinics",
    title: "Ophthalmology Clinic",
    shortTitle: "Ophthalmology",
    badge: "Clinics",
    image: "/images/departments/ophthalmology.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "Ophthalmology Clinic",
    cardDesc:
      "Eye care services including vision assessment and treatment planning.",

    hero: {
      description:
        "The Ophthalmology Clinic provides diagnosis and treatment for a wide range of eye conditions and vision problems.",
      tag: "Vision Care Specialists",
      schedule: "Sat - Thu | 09:00 - 21:00",
      emergencySupport: "Emergency Support 24/7",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Comprehensive Eye Care",
      paragraphs: [
        "Our ophthalmology specialists provide evaluation, diagnosis, and treatment for various eye diseases and vision problems.",
        "The clinic focuses on preserving vision, early detection of eye conditions, and effective treatment plans.",
      ],
    },

    highlights: {
      sectionLabel: "Clinic Highlights",
      title: "Key Areas of Care",
      items: [
        "Vision examination and assessment",
        "Diagnosis of eye diseases",
        "Eye health monitoring",
        "Consultation for vision correction",
      ],
    },

    treatedCases: {
      sectionLabel: "Treated Cases",
      title: "Conditions & Procedures",
      description:
        "The ophthalmology clinic treats a wide range of eye conditions and vision disorders.",
      items: [
        "Refractive errors",
        "Dry eye syndrome",
        "Eye infections",
        "Glaucoma screening",
        "Retinal disorders evaluation",
      ],
    },

    cta: {
      title: "Meet Our Ophthalmology Specialists",
      description:
        "Consult with our eye care specialists for professional vision care.",
      primaryButton: {
        text: "View Ophthalmology Doctors",
        to: "/doctors?department=Ophthalmology",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },

  {
    slug: "ent",
    category: "clinics",
    title: "E.N.T Clinic",
    shortTitle: "ENT",
    badge: "Clinics",
    image: "/images/departments/ent.jpg",
    breadcrumbImage: "/images/about-us-header.jpg",
    imageAlt: "ENT Clinic",
    cardDesc:
      "Specialized treatment for ear, nose, and throat disorders for all ages.",

    hero: {
      description:
        "Specialized care for ear, nose, and throat conditions for patients of all ages, with diagnosis and management of both acute and chronic cases.",
      tag: "Specialized ENT Care",
      schedule: "Sat - Thu | 09:00 - 21:00",
      emergencySupport: "Emergency Support 24/7",
    },

    overview: {
      sectionLabel: "Overview",
      title: "Comprehensive Ear, Nose & Throat Care",
      paragraphs: [
        "The clinic evaluates and manages a wide range of ENT conditions, including nose and sinus problems, chronic ear infections, vocal cord issues, laryngeal conditions, and surgical ENT cases.",
        "Our team focuses on accurate diagnosis, effective treatment planning, and patient-centered care for both routine outpatient concerns and more advanced conditions requiring specialized procedures.",
      ],
    },

    highlights: {
      sectionLabel: "Clinic Highlights",
      title: "Key Areas of Care",
      items: [
        "Specialized care for adult and pediatric ENT cases",
        "Evaluation of chronic ear, nose, and throat conditions",
        "Advanced management of sinus and vocal cord disorders",
        "Surgical ENT procedures and endoscopic interventions",
      ],
    },

    treatedCases: {
      sectionLabel: "Treated Cases",
      title: "Conditions & Procedures",
      description:
        "Our ENT clinic manages a wide range of ear, nose, and throat conditions.",
      items: [
        "Nose and sinusitis cases",
        "Nasal obstruction and chronic headache",
        "Ear cases and chronic middle ear infections",
        "Inflammation of vocal cords",
        "Laryngeal cases and vocal polyps",
        "Chronic sinus surgery",
        "Ear operations and eardrum grafts",
        "Endoscopic laryngeal surgery",
      ],
    },

    cta: {
      title: "Meet Our ENT Specialists",
      description:
        "Explore our experienced ENT doctors and schedule your consultation with specialists in ear, nose, and throat care.",
      primaryButton: {
        text: "View ENT Doctors",
        to: "/doctors?department=ENT",
      },
      secondaryButton: {
        text: "Call Now",
        href: "tel:0163836100",
      },
    },
  },
];

export default clinicsData;