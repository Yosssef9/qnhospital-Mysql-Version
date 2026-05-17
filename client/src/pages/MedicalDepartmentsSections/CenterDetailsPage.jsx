import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  Activity,
  Stethoscope,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import BreadcrumbArea from "../../components/reusableComponents/BreadcrumbArea";
import LoadingOverlay2 from "../../components/LoadingOverlay-2";

import { useQuery } from "@tanstack/react-query";
import { useEntityBySlug } from "../../api/strapi";
import getMediaUrl from "../../helpers/getMediaUrl";
import getItems from "../../helpers/getItems";
import { useTranslation } from "react-i18next";
import SectionBadge from "../../components/reusableComponents/SectionBadge";
import MedicalDepartmentsDetailsSkeletonPage from "../../components/reusableComponents/MedicalDepartmentsDetailsSkeletonPage";
import SEO from "../../components/SEO";
import { withLang } from "../../utils/languageRouting";
export default function CenterDetailsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { slug } = useParams();

  // ✅ Use React Query
  const { data, isLoading, isError } = useEntityBySlug("centers", slug, [
    "image",
    "breadcrumbImage",
    "hero",
    "overview",
    "overview.paragraphs",
    "treatedCases",
    "treatedCases.items",
    "technology",
    "technology.items",
    "cta",
  ]);
  console.log("data :", data);
  // Handle loading
  if (isLoading) {
    return <MedicalDepartmentsDetailsSkeletonPage />;
    // return <LoadingOverlay2 />;
  }

  // Handle not found or error
  if (isError || !data) {
    return (
      <Navigate
        to={withLang("/medical-departments?tab=Centers", i18n.language || "en")}
        replace
      />
    );
  }

  const center = data;

  const mainImage =
    getMediaUrl(center.image) ||
    getMediaUrl(center?.attributes?.image) ||
    "/images/MedicalDepartmentsPage/Centers/Physiotherapy.jpg";

  const breadcrumbImage =
    getMediaUrl(center.breadcrumbImage) ||
    getMediaUrl(center?.attributes?.breadcrumbImage) ||
    "/images/about-us-header.jpg";

  const overviewParagraphs = getItems(
    center?.overview?.paragraphs,
    "paragraph",
  );
  const treatedCasesItems = getItems(center?.treatedCases?.items, "item");
  const technologyItems = getItems(center?.technology?.items, "item");
  return (
    <div className="bg-[#f8fbfe]">
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? `${center.title} | مركز طبي | مستشفى القصيم الوطني`
            : `${center.title} | Medical Center | Qassim National Hospital`
        }
        description={
          center?.hero?.description ||
          "Qassim National Hospital specialized medical center."
        }
        image={mainImage}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: center.title,
          image: mainImage,
          url: `https://qnhospital.com.sa/${i18n.language || "en"}/centers/${center.slug}`,
          medicalSpecialty: center.title,
          hospitalAffiliation: {
            "@type": "Hospital",
            name: "Qassim National Hospital",
            url: "https://qnhospital.com.sa",
          },
        }}
      />
      <BreadcrumbArea
        imgUrl={breadcrumbImage}
        items={[
          { label: t("navbar.home"), to: "/" },
          {
            label: t("medicalDepartments.title"),
            to: "/medical-departments?tab=Centers",
          },
          { label: center.title },
        ]}
      />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
          <div>
            <SectionBadge> {center.badge}</SectionBadge>

            <h1 className="mt-5 text-3xl font-light leading-tight tracking-[-0.02em] text-slate-900 md:text-5xl">
              {center.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {center?.hero?.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {center?.hero?.schedule && (
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <Clock3 className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {center.hero.schedule}
                </div>
              )}

              {center?.hero?.emergencySupport && (
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {center.hero.emergencySupport}
                </div>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={withLang(
                  `/our-doctors?page=1&parent=${center.slug}`,
                  i18n.language || "en",
                )}
                className="inline-flex min-w-max items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgb(21,98,160)] px-6 py-3 text-sm font-main text-white shadow-[0_10px_30px_rgba(21,98,160,0.22)] transition hover:scale-[1.02] hover:border-white/40 hover:bg-[rgb(17,84,138)]"
              >
                {t("medicalDepartments.viewDoctors", {
                  clinic: center.title,
                })}
              </Link>

              {center?.whatsAppNumber && (
                <a
                  href={`https://wa.me/966${center?.whatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
              alt={center.title}
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
            {center?.hero?.tag && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-main text-[rgb(21,98,160)] backdrop-blur">
                  <Activity className="h-4 w-4" />
                  {center.hero.tag}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
            {center?.overview?.sectionLabel}
          </p>

          <h2 className="mt-3 text-3xl font-main tracking-[-0.03em] text-slate-900">
            {center?.overview?.title}
          </h2>

          {overviewParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-base leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-8 max-w-7xl px-6 py-2 md:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-3xl">
              <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                {center?.treatedCases?.sectionLabel}
              </p>

              <h2 className="mt-2 text-3xl font-main tracking-[-0.03em] text-slate-900">
                {center?.treatedCases?.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {center?.treatedCases?.description}
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

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="max-w-3xl">
              <p className="text-sm font-main uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                {center?.technology?.sectionLabel}
              </p>

              <h2 className="mt-2 text-3xl font-main tracking-[-0.03em] text-slate-900">
                {center?.technology?.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600">
                {center?.technology?.description}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {technologyItems.map((item, index) => (
                <motion.div
                  key={item}
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
    </div>
  );
}
