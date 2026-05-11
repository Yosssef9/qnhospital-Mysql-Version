import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  Stethoscope,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionBadge from "../../components/reusableComponents/SectionBadge";
import BreadcrumbArea from "../../components/reusableComponents/BreadcrumbArea";
import LoadingOverlay2 from "../../components/LoadingOverlay-2";

import { useEntityBySlug } from "../../api/strapi";
import getMediaUrl from "../../helpers/getMediaUrl";
import getItems from "../../helpers/getItems";
import { useTranslation } from "react-i18next";
import MedicalDepartmentsDetailsSkeletonPage from "../../components/reusableComponents/MedicalDepartmentsDetailsSkeletonPage";
import { trackEvent } from "../../utils/analytics";
import { useEffect } from "react";

export default function ClinicDetailsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { slug } = useParams();

  // ✅ Fetch clinic via React Query
  const { data, isLoading, isError } = useEntityBySlug("clinics", slug, [
    "image",
    "breadcrumbImage",
    "hero",
    "overview",
    "overview.paragraphs",
    "treatedCases",
    "treatedCases.items",
    "highlights",
    "highlights.items",
    "cta",
  ]);
  console.log("data", data);

  const clinic = data;

  useEffect(() => {
    if (!clinic) return;

    trackEvent("clinic_view", {
      clinic_name: clinic.title,
      slug: clinic.slug,
    });
  }, [clinic]);

  if (isLoading) {
    return <MedicalDepartmentsDetailsSkeletonPage />;
  }

  if (isError || !data) {
    return <Navigate to="/medical-departments?tab=Clinics" replace />;
  }
  const mainImage =
    getMediaUrl(clinic.image) ||
    getMediaUrl(clinic?.attributes?.image) ||
    "/images/MedicalDepartmentsPage/Centers/Physiotherapy.jpg";

  const breadcrumbImage =
    getMediaUrl(clinic.breadcrumbImage) ||
    getMediaUrl(clinic?.attributes?.breadcrumbImage) ||
    "/images/about-us-header.jpg";

  const overviewParagraphs = getItems(
    clinic?.overview?.paragraphs,
    "paragraph",
  );
  const highlightsItems = getItems(clinic?.highlights?.items, "paragraph");
  console.log("highlightsItems", highlightsItems);
  const treatedCasesItems = getItems(clinic?.treatedCases?.items, "item");

  return (
    <div className="bg-[#f8fbfe]">
      {/* Breadcrumb */}
      <BreadcrumbArea
        imgUrl={breadcrumbImage}
        items={[
          { label: t("navbar.home"), to: "/" },
          {
            label: t("medicalDepartments.title"),
            to: "/medical-departments?tab=Clinics",
          },
          { label: clinic.title },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <div>
            <SectionBadge> {clinic.badge}</SectionBadge>

            <h1 className="mt-5 text-3xl font-light leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
              {clinic.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {clinic?.hero?.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {clinic?.hero?.schedule && (
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <Clock3 className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {clinic.hero.schedule}
                </div>
              )}

              {clinic?.hero?.emergencySupport && (
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {clinic.hero.emergencySupport}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div
              className={`mt-8 flex flex-wrap gap-3 ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <Link
                to={`/our-doctors?page=1&clinic=${clinic.slug}`}
                className="inline-flex min-w-max items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgb(21,98,160)] px-6 py-3 text-sm font-main text-white shadow-[0_10px_30px_rgba(21,98,160,0.22)] transition hover:scale-[1.02] hover:border-white/40 hover:bg-[rgb(17,84,138)]"
              >
                {t("medicalDepartments.viewDoctors", {
                  clinic: clinic.title,
                })}

                {/* {isRTL ? (
                  <ArrowLeft className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )} */}
              </Link>

              {clinic?.whatsAppNumber && (
                <a
                  href={`https://wa.me/966${clinic?.whatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      location: "clinic_details_page",
                      clinic: clinic.title,
                    })
                  }
                  className="inline-flex min-w-max items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-[#25D366] px-6 py-3 text-sm font-main text-white shadow-[0_10px_30px_rgba(37,211,102,0.28)] transition hover:scale-[1.02] hover:border-white/40 hover:bg-[#20bd5a]"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
          >
            <img
              src={mainImage}
              alt={clinic.title}
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
            {clinic?.hero?.tag && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-main text-[rgb(21,98,160)] backdrop-blur">
                  <Stethoscope className="h-4 w-4" />
                  {clinic.hero.tag}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
            {clinic?.overview?.sectionLabel}
          </p>

          <h2 className="mt-3 text-3xl font-main tracking-[-0.03em] text-slate-900">
            {clinic?.overview?.title}
          </h2>

          {overviewParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-base leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Highlights / Treated Cases */}
      <section className="mx-auto mb-8 max-w-7xl px-6 py-2 md:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Treated Cases */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-3xl">
              <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                {clinic?.treatedCases?.sectionLabel}
              </p>

              <h2 className="mt-2 text-3xl font-main tracking-[-0.03em] text-slate-900">
                {clinic?.treatedCases?.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {clinic?.treatedCases?.description}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {treatedCasesItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.02 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-3xl">
              <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                {clinic?.highlights?.sectionLabel}
              </p>

              <h2 className="mt-2 text-3xl font-main tracking-[-0.03em] text-slate-900">
                {clinic?.highlights?.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {clinic?.highlights?.description}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {highlightsItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.02 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] p-8 text-white shadow-[0_24px_60px_rgba(21,98,160,0.22)] md:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-main md:text-3xl">
                {clinic?.cta?.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/90 md:text-base">
                {clinic?.cta?.description}
              </p>
            </div>

            <div
              className={`flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto ${
                isRTL ? "lg:justify-start" : "lg:justify-end"
              }`}
            >
              <Link
                to={`/our-doctors?page=1&clinic=${clinic.slug}`}
                className="inline-flex w-full min-w-max items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-main text-[rgb(21,98,160)] transition hover:opacity-95 sm:w-auto"
              >
                {t("medicalDepartments.viewDoctors", { clinic: clinic.title })}
                {isRTL ? (
                  <ArrowLeft className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Link>

              {clinic?.whatsAppNumber && (
                <a
                  href={`https://wa.me/966${clinic?.whatsAppNumber}`}
                  target="_blank"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      location: "clinic_details_page",
                      clinic: clinic.title,
                    })
                  }
                  rel="noopener noreferrer"
className="inline-flex w-full min-w-max items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#25D366]/40 bg-[#25D366] px-6 py-3 text-sm font-main text-white shadow-[0_10px_30px_rgba(37,211,102,0.28)] transition hover:scale-[1.02] hover:bg-[#20bd5a] sm:w-auto"                >
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
