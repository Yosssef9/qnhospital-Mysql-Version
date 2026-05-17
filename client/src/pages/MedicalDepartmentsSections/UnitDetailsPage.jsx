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
  Stethoscope,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../../components/SEO";
import { withLang } from "../../utils/languageRouting";
import { trackEvent } from "../../utils/analytics";
import SectionBadge from "../../components/reusableComponents/SectionBadge";

import BreadcrumbArea from "../../components/reusableComponents/BreadcrumbArea";
import LoadingOverlay2 from "../../components/LoadingOverlay-2";

import { useEntityBySlug } from "../../api/strapi";
import getMediaUrl from "../../helpers/getMediaUrl";
import getItems from "../../helpers/getItems";
import { useTranslation } from "react-i18next";
import MedicalDepartmentsDetailsSkeletonPage from "../../components/reusableComponents/MedicalDepartmentsDetailsSkeletonPage";

export default function UnitDetailsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { slug } = useParams();

  // ✅ Fetch UNITS instead of clinics
  const { data, isLoading, isError } = useEntityBySlug("units", slug, [
    "image",
    "breadcrumbImage",
    "hero",
    "overview",
    "overview.paragraphs",
    "services",
    "services.items",
    "highlights",
    "highlights.items",
    "cta",
  ]);

  if (isLoading) {
    return <MedicalDepartmentsDetailsSkeletonPage />;
  }
  if (isError || !data) {
    return (
      <Navigate
        to={withLang("/medical-departments?tab=Units", i18n.language || "en")}
        replace
      />
    );
  }
  const unit = data;

  const mainImage =
    getMediaUrl(unit.image) ||
    getMediaUrl(unit?.attributes?.image) ||
    "/images/MedicalDepartmentsPage/Units/default.jpg";

  const breadcrumbImage =
    getMediaUrl(unit.breadcrumbImage) ||
    getMediaUrl(unit?.attributes?.breadcrumbImage) ||
    "/images/about-us-header.jpg";

  const overviewParagraphs = getItems(unit?.overview?.paragraphs, "paragraph");
  const highlightsItems = getItems(unit?.highlights?.items, "paragraph");
  const servicesItems = getItems(unit?.services?.items, "item");

  return (
    <div className="bg-[#f8fbfe]">
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? `${unit.title} | وحدة طبية | مستشفى القصيم الوطني`
            : `${unit.title} | Medical Unit | Qassim National Hospital`
        }
        description={
          unit?.hero?.description || "Qassim National Hospital medical unit."
        }
        image={mainImage}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: unit.title,
          image: mainImage,
          url: `https://qnhospital.com.sa/${i18n.language || "en"}/units/${unit.slug}`,
          medicalSpecialty: unit.title,
          hospitalAffiliation: {
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
            to: "/medical-departments?tab=Units",
          },
          { label: unit.title },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionBadge> {unit.badge}</SectionBadge>

            <h1 className="mt-5 font-light text-3xl md:text-5xl">
              {unit.title}
            </h1>

            <p className="mt-5 text-slate-600">{unit?.hero?.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {unit?.hero?.schedule && (
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <Clock3 className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {unit.hero.schedule}
                </div>
              )}

              {unit?.hero?.emergencySupport && (
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {unit.hero.emergencySupport}
                </div>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={withLang(
                  `/our-doctors?page=1&parent=${unit.slug}`,
                  i18n.language || "en",
                )}
                className="inline-flex min-w-max items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgb(21,98,160)] px-6 py-3 text-sm font-main text-white shadow-[0_10px_30px_rgba(21,98,160,0.22)] transition hover:scale-[1.02] hover:border-white/40 hover:bg-[rgb(17,84,138)]"
              >
                {t("medicalDepartments.viewDoctors", {
                  clinic: unit.title,
                })}
              </Link>

              {unit?.whatsAppNumber && (
                <a
                  href={`https://wa.me/966${unit?.whatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      location: "unit_details_hero",
                      unit: unit.title,
                      slug: unit.slug,
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
              alt={unit.title}
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
            {unit?.hero?.tag && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/60 to-transparent p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-main text-[rgb(21,98,160)] backdrop-blur">
                  <Stethoscope className="h-4 w-4" />
                  {unit.hero.tag}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm">
          <p className="text-sm text-[rgb(21,98,160)] uppercase">
            {unit?.overview?.sectionLabel}
          </p>

          <h2 className="mt-3 text-3xl">{unit?.overview?.title}</h2>

          {overviewParagraphs.map((p, i) => (
            <p key={i} className="mt-4 text-slate-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Services + Highlights */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Services (instead of treatedCases) */}
          <div className="bg-white p-8 rounded-3xl">
            <p className="text-sm text-[rgb(21,98,160)] uppercase">
              {unit?.services?.sectionLabel}
            </p>

            <h2 className="mt-2 text-3xl">{unit?.services?.title}</h2>

            <p className="mt-4 text-slate-600">{unit?.services?.description}</p>

            <div className="mt-6 space-y-3">
              {servicesItems.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white p-8 rounded-3xl">
            <p className="text-sm text-[rgb(21,98,160)] uppercase">
              {unit?.highlights?.sectionLabel}
            </p>

            <h2 className="mt-2 text-3xl">{unit?.highlights?.title}</h2>

            <div className="mt-6 space-y-3">
              {highlightsItems.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Activity className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
