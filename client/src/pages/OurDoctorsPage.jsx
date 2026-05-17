import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Users,
  BriefcaseMedical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWebsiteLinks } from "../api/strapi";
import { withLang } from "../utils/languageRouting";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import SectionBadge from "../components/reusableComponents/SectionBadge";
import SectionTitle from "../components/reusableComponents/SectionTitle";
import SearchableSelect from "../components/SearchableSelect";
import SEO from "../components/SEO";
import { useDoctors, useDoctorParents } from "../api/strapi";
import { useDebounce } from "../hooks/useDebounce";
import { formatArabicYears } from "../helpers/formatArabicYears";
import { t } from "i18next";

export default function OurDoctorsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { data: websiteLinks } = useWebsiteLinks();

  const [searchParams, setSearchParams] = useSearchParams();

  const allParentsValue = "all";
  const allParentsLabel = t("ourDoctorsPage.filters.all");
  const [query, setQuery] = useState(() => searchParams.get("search") || "");
  const debouncedQuery = useDebounce(query, 500);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const activeParent = searchParams.get("parent") || allParentsValue;

  const doctorsQuery = useDoctors(currentPage, debouncedQuery, activeParent, 8);
  console.log("doctorsQuery", doctorsQuery);
  const parentsQuery = useDoctorParents();

  const doctors = doctorsQuery.data?.data || [];
  const pagination = doctorsQuery.data?.meta || null;

  const parentOptions = useMemo(() => {
    const parents = parentsQuery.data || [];

    return [
      {
        value: allParentsValue,
        label: allParentsLabel,
        en: "All",
        ar: "الكل",
      },

      ...parents.map((parent) => ({
        value: parent.slug,

        label:
          parent.type === "clinic"
            ? `🏥 ${parent.title}`
            : parent.type === "unit"
              ? `🚑 ${parent.title}`
              : parent.type === "center"
                ? `🏢 ${parent.title}`
                : `🩺 ${parent.title}`,

        en: parent.title,
        ar: parent.title,

        type: parent.type,
      })),
    ];
  }, [parentsQuery.data, allParentsLabel]);
  const heroStats = [
    {
      icon: Users,
      value: `${pagination?.total || 0}+`,
      label: t("ourDoctorsPage.heroStats.doctors"),
    },
    {
      icon: BriefcaseMedical,
      value: `${(parentsQuery.data || []).length}+`,
      label: t("ourDoctorsPage.heroStats.specialties"),
    },
    {
      icon: ShieldCheck,
      value: "24/7",
      label: t("ourDoctorsPage.heroStats.support"),
    },
  ];

  const showInitialSkeleton = doctorsQuery.isLoading;
  const showFetchingSkeleton =
    doctorsQuery.isFetching && !doctorsQuery.isLoading;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.set("page", 1);
      return params;
    });
  };

  const handleParentChange = (e) => {
    const value = e.target.value;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (!value || value === allParentsValue) {
        params.delete("parent");
      } else {
        params.set("parent", value);
      }

      params.set("page", 1);
      return params;
    });
  };

  const goToPage = (pageNumber) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", pageNumber);
      return params;
    });
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-[#f6fbff]">
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? "الأطباء | مستشفى القصيم الوطني"
            : "Doctors | Qassim National Hospital"
        }
        description={
          i18n.language?.startsWith("ar")
            ? "تعرف على أطباء مستشفى القصيم الوطني حسب التخصص والعيادة واحجز موعدك بسهولة."
            : "Explore Qassim National Hospital doctors by specialty and clinic, and book your appointment easily."
        }
      />
      <BreadcrumbArea
        imgUrl="/images/about-us-header.jpg"
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("navbar.ourDoctors") },
        ]}
      />

      <section className="relative z-30 overflow-visible border-b border-slate-200/70 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-0 h-[360px] w-[360px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-[rgba(30,127,143,0.08)] blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-32 w-32 -translate-x-1/2 rounded-full bg-[rgba(59,130,246,0.06)] blur-2xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className={isRTL ? "text-right" : "text-left"}>
              <SectionBadge>{t("ourDoctorsPage.badge")}</SectionBadge>

              <SectionTitle className="max-w-3xl font-light leading-tight">
                {t("ourDoctorsPage.title")}
              </SectionTitle>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {t("ourDoctorsPage.description")}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={withLang("/appointments-App", i18n.language || "en")}
                  className="inline-flex items-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(21,98,160,0.22)] transition hover:-translate-y-0.5 hover:bg-[rgb(15,75,125)]"
                >
                  <CalendarDays className="h-4 w-4" />
                  {t("ourDoctorsPage.bookButton")}
                </Link>

                <a
                  href={`https://wa.me/966${websiteLinks?.contactInfo?.phone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <HeartPulse className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("ourDoctorsPage.cta.contact")}
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-[32px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(247,251,255,0.92))] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {heroStats.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-xl font-main text-slate-900">
                              {item.value}
                            </div>
                            <div className="text-sm text-slate-500">
                              {item.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[28px] bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] p-6 text-white shadow-[0_20px_50px_rgba(21,98,160,0.25)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {t("ourDoctorsPage.highlightCard.title")}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/90">
                        {t("ourDoctorsPage.highlightCard.desc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1800px] px-6 py-12 md:px-8 xl:px-12 2xl:px-16">
        {" "}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className={isRTL ? "text-right" : "text-left"}>
            <SectionBadge>{t("ourDoctorsPage.gridBadge")}</SectionBadge>
            <SectionTitle className="font-light">
              {t("ourDoctorsPage.gridTitle")}
            </SectionTitle>
          </div>

          <div className="text-sm text-slate-500">
            {pagination?.total || 0} {t("ourDoctorsPage.resultsLabel")}
          </div>
        </div>
        <div className="relative z-40 my-10 rounded-[28px] border border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
            <div className="relative max-w-xl">
              <Search
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                  isRTL ? "right-4" : "left-4"
                }`}
              />
              <input
                value={query}
                onChange={handleSearchChange}
                placeholder={t("ourDoctorsPage.searchPlaceholder")}
                className={`h-13 w-full rounded-2xl border border-slate-200 bg-[#f8fbfe] text-sm text-slate-800 outline-none transition focus:border-[rgba(21,98,160,0.35)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(21,98,160,0.08)] ${
                  isRTL ? "pr-11 pl-4 text-right" : "pl-11 pr-4 text-left"
                }`}
              />
            </div>

            <SearchableSelect
              name="parent"
              value={activeParent}
              onChange={handleParentChange}
              options={parentOptions}
              placeholder={allParentsLabel}
              searchPlaceholder={t("ourDoctorsPage.searchSpecialtyPlaceholder")}
              noResultsText={t("ourDoctorsPage.noSpecialtyResults")}
              inputBaseClass={`h-13 w-full rounded-2xl border border-slate-200 bg-[#f8fbfe] px-4 text-sm font-medium outline-none transition focus:border-[rgba(21,98,160,0.35)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(21,98,160,0.08)] ${
                isRTL ? "text-right" : "text-left"
              }`}
            />
          </div>
        </div>
        {!showInitialSkeleton && doctors.length === 0 ? (
          <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-900">
              {t("ourDoctorsPage.emptyState.title")}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              {t("ourDoctorsPage.emptyState.desc")}
            </p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4 transition-opacity duration-200 ${
              showFetchingSkeleton ? "opacity-70" : "opacity-100"
            }`}
          >
            {(showInitialSkeleton || showFetchingSkeleton
              ? [...Array(8)]
              : doctors
            ).map((doctor, index) =>
              showInitialSkeleton || showFetchingSkeleton ? (
                <DoctorCardSkeleton key={index} />
              ) : (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative z-0 flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(2,32,71,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_65px_rgba(2,32,71,0.11)]"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(21,98,160,0.06),transparent)]" />

                  <div className="relative px-5 pt-5">
                    <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#f4f9fd,#edf5fb)]">
                      <div className="absolute left-4 top-4 z-10">
                        {doctor.doctorRank && (
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-[rgb(21,98,160)] shadow-sm backdrop-blur">
                            <Stethoscope className="h-3 w-3" />
                            {t("ourDoctorsPage.doctorRankBadge", {
                              rank: t(
                                `ourDoctorsPage.doctorRank.${doctor.doctorRank}`,
                                doctor.doctorRank,
                              ),
                              department: doctor.department,
                            })}
                          </div>
                        )}
                      </div>
                      {/* {doctor.experience && (
                        <div
                          className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"}  z-10`}
                        >
                          <ExperienceBadge experience={doctor.experience} />
                        </div>
                      )} */}
                      {doctor.featured && (
                        <div className="absolute right-4 top-4 z-10">
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(21,98,160)] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                            <Sparkles className="h-3 w-3" />
                            {t("ourDoctorsPage.featuredLabel")}
                          </div>
                        </div>
                      )}

                      <img
                        src={
                          doctor.image ||
                          (doctor.gender === "female"
                            ? "/images/female-doctor-default.jpeg"
                            : "/images/doctor-defalut.png")
                        }
                        alt={doctor.name}
                        className="h-[320px] w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 flex translate-y-4 flex-col items-center justify-center gap-4 bg-slate-950/55 px-5 text-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {doctor.experience && (
                          <div className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm">
                            <ExperienceBadge experience={doctor.experience} />
                          </div>
                        )}

                        <Link
                          to={withLang(doctor.to, i18n.language || "en")}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[rgb(21,98,160)] shadow-md transition hover:scale-[1.03]"
                        >
                          {t("ourDoctorsPage.profileButton")}

                          {isRTL ? (
                            <ArrowLeft className="h-4 w-4" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-1 flex-col
                     ${isRTL ? "p-5 pt-4 text-right" : "p-5 pt-4 text-left"}
                    `}
                  >
                    <h3 className="text-xl font-semibold text-slate-900">
                      {t("doctor.prefix")} {doctor.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-[rgb(21,98,160)]">
                      {doctor.specialty}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                      {doctor.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <Link
                        to={withLang(doctor.to, i18n.language || "en")}
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl 
    bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] 
    px-5 py-3 text-sm font-semibold text-white 
   
    transition-all duration-300 hover:-translate-y-0.5 "
                      >
                        {t("ourDoctorsPage.profileButton")}

                        <span
                          className={`transition-transform duration-300 ${
                            isRTL
                              ? "group-hover:-translate-x-1"
                              : "group-hover:translate-x-1"
                          }`}
                        >
                          {isRTL ? (
                            <ArrowLeft className="h-4 w-4" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        )}
        {pagination && doctors.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-sm text-slate-500">
              {t("common.paginationInfo", {
                page: pagination.page,
                pageCount: pagination.pageCount,
              })}
            </p>

            <div
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <button
                disabled={pagination.page === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1)
                .slice(
                  Math.max(0, pagination.page - 3),
                  Math.min(pagination.pageCount, pagination.page + 2),
                )
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`h-10 w-10 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      pagination.page === pageNumber
                        ? "bg-[rgb(21,98,160)] text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

              <button
                disabled={pagination.page === pagination.pageCount}
                onClick={() => goToPage(currentPage + 1)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-600 transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function DoctorCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-sm">
      <div className="px-5 pt-5">
        <div className="h-[320px] w-full animate-pulse rounded-[28px] bg-slate-200" />
      </div>

      <div className="p-5 pt-4">
        <div className="h-6 w-2/3 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-3 h-4 w-1/2 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-3 h-4 w-1/3 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-slate-200" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-2 h-4 w-4/6 animate-pulse rounded-md bg-slate-200" />

        <div className="mt-6 flex gap-3">
          <div className="h-10 w-32 animate-pulse rounded-full bg-slate-200" />
          <div className="h-10 w-28 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function ExperienceBadge({ experience }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  const count = Number(experience || 0);

  const word = isArabic
    ? formatArabicYears(count)
    : count === 1
      ? "Year"
      : "Years";
  const text = t("ourDoctorsPage.experienceMoreThan", {
    count,
    word,
  });
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full 
bg-white/15 backdrop-blur-md 
border border-white/30 
px-3 py-1.5 text-xs font-semibold text-[rgb(21,98,160)] 
shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
    >
      <BriefcaseMedical className="h-3.5 w-3.5 text-[rgb(21,98,160)]" />
      {text}
    </div>
  );
}
