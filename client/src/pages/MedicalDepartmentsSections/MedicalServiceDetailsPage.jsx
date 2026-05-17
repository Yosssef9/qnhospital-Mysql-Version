import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  Activity,
  Settings,
  Stethoscope,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "../../utils/analytics";
import SectionBadge from "../../components/reusableComponents/SectionBadge";

import BreadcrumbArea from "../../components/reusableComponents/BreadcrumbArea";
import LoadingOverlay2 from "../../components/LoadingOverlay-2";
import MedicalDepartmentsDetailsSkeletonPage from "../../components/reusableComponents/MedicalDepartmentsDetailsSkeletonPage";

import { useEntityBySlug } from "../../api/strapi";
import getMediaUrl from "../../helpers/getMediaUrl";
import getItems from "../../helpers/getItems";
import { useTranslation } from "react-i18next";
import SEO from "../../components/SEO";
import { withLang } from "../../utils/languageRouting";
export default function MedicalServiceDetailsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { slug } = useParams();

  const { data, isLoading, isError } = useEntityBySlug(
    "medical-services",
    slug,
    [
      "image",
      "breadcrumbImage",
      "hero",
      "overview",
      "overview.paragraphs",
      "services",
      "services.items",
      "technology",
      "technology.items",
      "cta",
    ],
  );
  console.log("data", data);

  if (isLoading) {
    return <MedicalDepartmentsDetailsSkeletonPage />;
  }
  if (isError || !data) {
    return (
      <Navigate
        to={withLang(
          "/medical-departments?tab=medical-services",
          i18n.language || "en",
        )}
        replace
      />
    );
  }
  const service = data;

  const mainImage =
    getMediaUrl(service.image) ||
    "/images/MedicalDepartmentsPage/MedicalServices/default.jpg";

  const breadcrumbImage =
    getMediaUrl(service.breadcrumbImage) || "/images/about-us-header.jpg";

  const overviewParagraphs = getItems(
    service?.overview?.paragraphs,
    "paragraph",
  );

  const servicesItems = getItems(service?.services?.items, "item");
  const techItems = getItems(service?.technology?.items, "item");

  return (
    <div className="bg-[#f8fbfe]">
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? `${service.title} | خدمة طبية | مستشفى القصيم الوطني`
            : `${service.title} | Medical Service | Qassim National Hospital`
        }
        description={
          service?.hero?.description ||
          "Qassim National Hospital medical services."
        }
        image={mainImage}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          name: service.title,
          image: mainImage,
          url: `https://qnhospital.com.sa/${i18n.language || "en"}/medical-services/${service.slug}`,
          provider: {
            "@type": "Hospital",
            name: "Qassim National Hospital",
            url: "https://qnhospital.com.sa",
          },
        }}
      />
      {/* Breadcrumb */}
      <BreadcrumbArea
        imgUrl={breadcrumbImage}
        items={[
          { label: t("navbar.home"), to: "/" },
          {
            label: t("medicalDepartments.title"),
            to: "/medical-departments?tab=medical-services",
          },
          { label: service.title },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <div>
            <SectionBadge> {service.badge}</SectionBadge>

            <h1 className="mt-5 text-3xl font-light leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
              {service.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {service?.hero?.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {service?.hero?.schedule && (
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <Clock3 className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {service.hero.schedule}
                </div>
              )}

              {service?.hero?.emergencySupport && (
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {service.hero.emergencySupport}
                </div>
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
              alt={service.title}
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
            {service?.hero?.tag && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-main text-[rgb(21,98,160)] backdrop-blur">
                  <Stethoscope className="h-4 w-4" />
                  {service.hero.tag}
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
            {service?.overview?.sectionLabel}
          </p>

          <h2 className="mt-3 text-3xl font-main tracking-[-0.03em] text-slate-900">
            {service?.overview?.title}
          </h2>

          {overviewParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-base leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Services + Technology */}
      <section className="mx-auto mb-8 max-w-7xl px-6 py-2 md:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Services */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-3xl">
              <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                {service?.services?.sectionLabel}
              </p>

              <h2 className="mt-2 text-3xl font-main tracking-[-0.03em] text-slate-900">
                {service?.services?.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {service?.services?.description}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {servicesItems.map((item, index) => (
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

          {/* Technology */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-3xl">
              <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                {service?.technology?.sectionLabel}
              </p>

              <h2 className="mt-2 text-3xl font-main tracking-[-0.03em] text-slate-900">
                {service?.technology?.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {service?.technology?.description}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {techItems.map((item, index) => (
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
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] p-8 text-white shadow-[0_24px_60px_rgba(21,98,160,0.22)] md:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-main md:text-3xl">
                {service?.cta?.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/90 md:text-base">
                {service?.cta?.description}
              </p>
            </div>

            <div className="flex flex-nowrap gap-3">
              {service?.whatsAppNumber && (
                <a
                  href={`https://wa.me/966${service?.whatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      location: "medical_service_details_page",
                      service: service.title,
                      slug: service.slug,
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-main text-white transition hover:bg-white/10 hover:border-blue-400"
                >
                  <FaWhatsapp className="h-4 w-4 " />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
