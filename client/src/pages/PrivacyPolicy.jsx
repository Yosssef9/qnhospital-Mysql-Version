// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ShieldCheck,
//   LockKeyhole,
//   UserRoundCheck,
//   FileText,
//   Mail,
//   Phone,
//   CalendarDays,
//   Database,
//   Eye,
//   RefreshCcw,
//   ChevronDown,
// } from "lucide-react";
// import { useTranslation } from "react-i18next";
// import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";

// export default function PrivacyPolicy() {
//   const { i18n } = useTranslation();
//   const isRTL = i18n.dir() === "rtl";
//   const [openIndex, setOpenIndex] = useState(0);

//   const content = isRTL ? arabicContent : englishContent;

//   return (
//     <div className="bg-white">
//       <BreadcrumbArea
//         imgUrl="/images/about.jpg"
//         items={[
//           { label: isRTL ? "الرئيسية" : "Home", to: "/" },
//           { label: content.breadcrumb },
//         ]}
//       />

//       <section
//         dir={isRTL ? "rtl" : "ltr"}
//         className={`relative overflow-hidden px-6 py-16 ${
//           isRTL ? "text-right" : "text-left"
//         }`}
//       >
//         <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f7fbff] via-white to-white" />

//         <div className="mx-auto max-w-5xl">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="mb-10 rounded-[2rem] border border-[rgba(21,98,160,0.12)] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-10"
//           >
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--main-soft)] px-4 py-2 text-sm font-semibold text-[var(--main-color)]">
//               <ShieldCheck className="h-4 w-4" />
//               {content.lastUpdated}
//             </div>

//             <h1 className="mb-5 text-3xl font-bold text-slate-900 md:text-5xl">
//               {content.title}
//             </h1>

//             <p className="max-w-4xl text-lg font-medium leading-9 text-slate-700">
//               {content.subtitle}
//             </p>

//             <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
//               <p className="text-[17px] leading-8 text-slate-700">
//                 {content.intro}
//               </p>
//             </div>
//           </motion.div>

//           <div className="space-y-4">
//             {content.sections.map((section, index) => {
//               const Icon = section.icon;
//               const isOpen = openIndex === index;

//               return (
//                 <motion.div
//                   key={section.title}
//                   initial={{ opacity: 0, y: 18 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.45, delay: index * 0.04 }}
//                   viewport={{ once: true }}
//                   className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
//                 >
//                   <button
//                     type="button"
//                     onClick={() => setOpenIndex(isOpen ? null : index)}
//                     className="flex w-full items-center justify-between gap-4 p-5 text-start transition hover:bg-slate-50 md:p-6"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--main-soft)] text-[var(--main-color)]">
//                         <Icon className="h-6 w-6" />
//                       </div>

//                       <h2 className="text-lg font-bold text-slate-900 md:text-xl">
//                         {section.title}
//                       </h2>
//                     </div>

//                     <ChevronDown
//                       className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-300 ${
//                         isOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                       >
//                         <div className="border-t border-slate-100 px-5 pb-6 pt-5 md:px-6">
//                           <ul className="space-y-3">
//                             {section.points.map((point) => (
//                               <li
//                                 key={point}
//                                 className="flex gap-3 text-[16px] leading-7 text-slate-700"
//                               >
//                                 <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--main-color)]" />
//                                 <span>{point}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="mt-10 rounded-[1.75rem] bg-gradient-to-r from-[var(--main-color)] to-[var(--main-light)] p-7 text-white shadow-[0_20px_55px_rgba(21,98,160,0.25)]"
//           >
//             <h2 className="mb-3 text-2xl font-bold">{content.contactTitle}</h2>

//             <p className="mb-5 max-w-4xl text-white/90">
//               {content.contactText}
//             </p>

//             <div className="flex flex-wrap gap-3">
//               <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
//                 <Phone className="h-4 w-4" />
//                 9200 12345
//               </div>

//               <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
//                 <Mail className="h-4 w-4" />
//                 info@qnhospital.com
//               </div>

//               <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
//                 <CalendarDays className="h-4 w-4" />
//                 {isRTL
//                   ? "خدمة المواعيد والاستفسارات"
//                   : "Appointments & Inquiries"}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

// const arabicContent = {
//   title: "سياسة الخصوصية",
//   breadcrumb: "سياسة الخصوصية",
//   subtitle:
//     "نلتزم في مستشفى قاسم الوطني بحماية خصوصية زوار الموقع والمرضى ومستخدمي خدماتنا الإلكترونية.",
//   lastUpdated: "آخر تحديث: مايو 2026",
//   intro:
//     "توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي يتم تقديمها من خلال موقع المستشفى الإلكتروني، مثل بيانات التواصل وطلبات المواعيد والاستفسارات العامة.",
//   sections: [
//     {
//       icon: UserRoundCheck,
//       title: "المعلومات التي نقوم بجمعها",
//       points: [
//         "الاسم الكامل عند تعبئة نماذج التواصل أو طلب موعد.",
//         "رقم الجوال والبريد الإلكتروني للتواصل معك بخصوص طلبك.",
//         "تفاصيل الموعد مثل العيادة والطبيب والتاريخ والوقت المطلوب.",
//         "أي معلومات إضافية يقوم المستخدم بإدخالها في خانة الملاحظات أو الرسالة.",
//       ],
//     },
//     {
//       icon: Database,
//       title: "كيفية استخدام المعلومات",
//       points: [
//         "التواصل معك لتأكيد المواعيد أو متابعة الطلبات.",
//         "تحسين جودة الخدمات الإلكترونية وتجربة المستخدم داخل الموقع.",
//         "الرد على الاستفسارات والطلبات المقدمة من خلال الموقع.",
//         "دعم فريق خدمة العملاء أو مركز الاتصال في متابعة الطلبات.",
//       ],
//     },
//     {
//       icon: LockKeyhole,
//       title: "حماية البيانات",
//       points: [
//         "نستخدم إجراءات تنظيمية وتقنية مناسبة للحفاظ على سرية البيانات.",
//         "لا يتم مشاركة بياناتك مع جهات غير مصرح لها إلا عند الحاجة النظامية أو التشغيلية.",
//         "يتم الوصول إلى بيانات الطلبات فقط من قبل الموظفين المخولين.",
//       ],
//     },
//     {
//       icon: Eye,
//       title: "ملفات الارتباط والتحليلات",
//       points: [
//         "قد يستخدم الموقع أدوات تحليل مثل Google Analytics لفهم زيارات الموقع وتحسين الأداء.",
//         "تساعدنا هذه الأدوات في معرفة الصفحات الأكثر زيارة وتحسين تجربة المستخدم.",
//         "لا تهدف بيانات التحليلات إلى تحديد هوية المستخدم بشكل شخصي.",
//       ],
//     },
//     {
//       icon: FileText,
//       title: "دقة المعلومات",
//       points: [
//         "يتحمل المستخدم مسؤولية إدخال بيانات صحيحة عند إرسال النماذج.",
//         "قد يؤدي إدخال بيانات غير دقيقة إلى تأخير التواصل أو تأكيد الموعد.",
//       ],
//     },
//     {
//       icon: RefreshCcw,
//       title: "تحديث سياسة الخصوصية",
//       points: [
//         "قد يتم تحديث هذه السياسة من وقت لآخر بما يتناسب مع تطوير خدمات الموقع.",
//         "سيتم عرض آخر تحديث داخل هذه الصفحة عند إجراء أي تعديل.",
//       ],
//     },
//   ],
//   contactTitle: "للاستفسار عن الخصوصية",
//   contactText:
//     "يمكنك التواصل مع مستشفى قاسم الوطني من خلال بيانات التواصل الرسمية لأي استفسار متعلق بسياسة الخصوصية أو استخدام البيانات.",
// };

// const englishContent = {
//   title: "Privacy Policy",
//   breadcrumb: "Privacy Policy",
//   subtitle:
//     "At Qassim National Hospital, we are committed to protecting the privacy of our website visitors, patients, and users of our digital services.",
//   lastUpdated: "Last updated: May 2026",
//   intro:
//     "This policy explains how we collect, use, and protect information submitted through the hospital website, including contact details, appointment requests, and general inquiries.",
//   sections: [
//     {
//       icon: UserRoundCheck,
//       title: "Information We Collect",
//       points: [
//         "Full name when submitting contact forms or appointment requests.",
//         "Mobile number and email address to contact you regarding your request.",
//         "Appointment details such as clinic, doctor, preferred date, and time.",
//         "Any additional information entered in the message or notes field.",
//       ],
//     },
//     {
//       icon: Database,
//       title: "How We Use Information",
//       points: [
//         "To contact you for appointment confirmation or request follow-up.",
//         "To improve our digital services and website user experience.",
//         "To respond to inquiries and requests submitted through the website.",
//         "To support customer service or call center teams in request handling.",
//       ],
//     },
//     {
//       icon: LockKeyhole,
//       title: "Data Protection",
//       points: [
//         "We use appropriate organizational and technical measures to protect data confidentiality.",
//         "Your information is not shared with unauthorized parties except when legally or operationally required.",
//         "Request data is accessed only by authorized staff members.",
//       ],
//     },
//     {
//       icon: Eye,
//       title: "Cookies and Analytics",
//       points: [
//         "The website may use analytics tools such as Google Analytics to understand visits and improve performance.",
//         "These tools help us identify frequently visited pages and improve the user experience.",
//         "Analytics data is not intended to personally identify users.",
//       ],
//     },
//     {
//       icon: FileText,
//       title: "Information Accuracy",
//       points: [
//         "Users are responsible for entering accurate information when submitting forms.",
//         "Incorrect details may delay communication or appointment confirmation.",
//       ],
//     },
//     {
//       icon: RefreshCcw,
//       title: "Privacy Policy Updates",
//       points: [
//         "This policy may be updated from time to time as website services develop.",
//         "The latest update date will be displayed on this page whenever changes are made.",
//       ],
//     },
//   ],
//   contactTitle: "Privacy Inquiries",
//   contactText:
//     "You can contact Qassim National Hospital through the official contact channels for any inquiry related to privacy or data usage.",
// };
// ============================================================================================
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  LockKeyhole,
  UserRoundCheck,
  FileText,
  Mail,
  Phone,
  CalendarDays,
  Database,
  Eye,
  RefreshCcw,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import { usePrivacyPolicy, useWebsiteLinks } from "../api/strapi";

const iconMap = {
  user: UserRoundCheck,
  database: Database,
  lock: LockKeyhole,
  eye: Eye,
  file: FileText,
  refresh: RefreshCcw,
};

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [openIndex, setOpenIndex] = useState(0);

  const {
    data: content,
    isLoading: isPrivacyLoading,
    isError: isPrivacyError,
  } = usePrivacyPolicy();

  const { data: websiteLinks } = useWebsiteLinks();

  const contactEmail = websiteLinks?.contactInfo?.email || "";

  if (isPrivacyLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--main-color)]" />
      </div>
    );
  }

  if (isPrivacyError || !content) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white px-6 text-center">
        <p className="text-lg font-semibold text-slate-700">
          {isRTL
            ? "تعذر تحميل سياسة الخصوصية حالياً."
            : "Unable to load the privacy policy at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <BreadcrumbArea
        imgUrl={content.breadcrumbImage || "/images/about.jpg"}
        items={[
          { label: isRTL ? "الرئيسية" : "Home", to: "/" },
          {
            label:
              content.title || (isRTL ? "سياسة الخصوصية" : "Privacy Policy"),
          },
        ]}
      />

      <section
        dir={isRTL ? "rtl" : "ltr"}
        className={`relative overflow-hidden px-6 py-16 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f7fbff] via-white to-white" />

        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 rounded-[2rem] border border-[rgba(21,98,160,0.12)] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-10"
          >
            {content.lastUpdated && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--main-soft)] px-4 py-2 text-sm font-semibold text-[var(--main-color)]">
                <ShieldCheck className="h-4 w-4" />
                {content.lastUpdated}
              </div>
            )}

            <h1 className="mb-5 text-3xl font-bold text-slate-900 md:text-5xl">
              {content.title}
            </h1>

            {content.subtitle && (
              <p className="max-w-4xl text-lg font-medium leading-9 text-slate-700">
                {content.subtitle}
              </p>
            )}

            {content.intro && (
              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                <p className="text-[17px] leading-8 text-slate-700">
                  {content.intro}
                </p>
              </div>
            )}
          </motion.div>

          <div className="space-y-4">
            {content.sections.map((section, index) => {
              const Icon = iconMap[section.iconKey] || FileText;
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start transition hover:bg-slate-50 md:p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--main-soft)] text-[var(--main-color)]">
                        <Icon className="h-6 w-6" />
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                        {section.title}
                      </h2>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="border-t border-slate-100 px-5 pb-6 pt-5 md:px-6">
                          <ul className="space-y-3">
                            {section.points.map((point, pointIndex) => (
                              <li
                                key={`${section.id}-${pointIndex}`}
                                className="flex gap-3 text-[16px] leading-7 text-slate-700"
                              >
                                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--main-color)]" />
                                <span>{point.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 rounded-[1.75rem] bg-gradient-to-r from-[var(--main-color)] to-[var(--main-light)] p-7 text-white shadow-[0_20px_55px_rgba(21,98,160,0.25)]"
          >
            <h2 className="mb-3 text-2xl font-bold">{content.contactTitle}</h2>

            {content.contactText && (
              <p className="mb-5 max-w-4xl text-white/90">
                {content.contactText}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {content.contactPhone && (
                <a
                  href={`tel:${content.contactPhone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25"
                >
                  <Phone className="h-4 w-4" />
                  {content.contactPhone}
                </a>
              )}

              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/25"
                >
                  <Mail className="h-4 w-4" />
                  {contactEmail}
                </a>
              )}

              {content.contactServiceLabel && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                  <CalendarDays className="h-4 w-4" />
                  {content.contactServiceLabel}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
