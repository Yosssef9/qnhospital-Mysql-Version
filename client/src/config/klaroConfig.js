import { initGA } from "../utils/analytics";

export const getKlaroConfig = (language = "en") => {
  const lang = language?.startsWith("ar") ? "ar" : "en";

  return {
    version: 1,

    elementID: "klaro",

    storageMethod: "cookie",

    cookieName: "qnh-klaro",

    htmlTexts: true,

    mustConsent: false,

    acceptAll: true,

    hideDeclineAll: false,

    noticeAsModal: false,

    styling: {
      theme: ["light", "top", "left", "narrow"],
    },

    lang,

    translations: {
      en: {
        consentNotice: {
          description: `
            <p>
              We use cookies to improve your experience and analyze website traffic.
              <a href="/privacy-policy" class="klaro-privacy-link">
                Read our privacy policy
              </a>
            </p>
          `,

          learnMore: "Learn more",
        },

        consentModal: {
          title: "Cookie Preferences",

          description: `
            <p>
              We use cookies to improve your experience and analyze website traffic.
              <a href="/privacy-policy" class="klaro-privacy-link">
                Read our privacy policy
              </a>
            </p>
          `,
        },

        purposeItem: {
          service: "service",

          services: "services",
        },

        purposes: {
          analytics: "Analytics",
        },

        services: {
          "google-analytics": {
            title: "Google Analytics",

            description:
              "Helps us understand website traffic and improve the user experience.",
          },
        },

        poweredBy: " ",

        ok: "Accept All",

        acceptAll: "Accept All",

        acceptSelected: "Accept Selected",

        decline: "Reject",

        save: "Save",

        close: "Close",
      },

      ar: {
        consentNotice: {
          description: `
            <p>
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع.
              <a href="/privacy-policy" class="klaro-privacy-link">
                قراءة سياسة الخصوصية
              </a>
            </p>
          `,

          learnMore: "المزيد",
        },

        consentModal: {
          title: "إعدادات ملفات تعريف الارتباط",

          description: `
            <p>
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع.
              <a href="/privacy-policy" class="klaro-privacy-link">
                قراءة سياسة الخصوصية
              </a>
            </p>
          `,
        },

        purposeItem: {
          service: "خدمة",

          services: "خدمات",
        },

        purposes: {
          analytics: "التحليلات",
        },

        services: {
          "google-analytics": {
            title: "Google Analytics",

            description:
              "يساعدنا على فهم استخدام الموقع وتحسين تجربة المستخدم.",
          },
        },

        service: {
          purpose: "الغرض",
        },

        poweredBy: " ",

        ok: "قبول الكل",

        acceptAll: "قبول الكل",

        acceptSelected: "قبول المحدد",

        decline: "رفض",

        save: "حفظ",

        close: "إغلاق",
      },
    },

    services: [
      {
        name: "google-analytics",

        title: "Google Analytics",

        purposes: ["analytics"],

        cookies: [/^_ga/, /^_gid/],

        required: false,

        default: false,

        onlyOnce: true,

        callback: function (consent, service) {
          // Initialize GA only when accepted
          if (consent) {
            initGA();

            window.gtag?.("event", "cookie_consent_accept", {
              event_category: "privacy",
              event_label: service.name,
            });

            console.log("Cookies Accepted");
          } else {
            window.gtag?.("event", "cookie_consent_reject", {
              event_category: "privacy",
              event_label: service.name,
            });

            console.log("Cookies Rejected");
          }
        },
      },
    ],
  };
};
