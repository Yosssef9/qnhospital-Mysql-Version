import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import { useDepartments } from "../api/strapi";
import SectionSpinner from "../components/sectionSpinner";
import { useDebounce } from "../hooks/useDebounce";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SectionBadge from "../components/reusableComponents/SectionBadge";
import SEO from "../components/SEO";
import { withLang } from "../utils/languageRouting";
export default function MedicalDepartments() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(() => {
    return searchParams.get("search") || "";
  });
  const debouncedSearch = useDebounce(search, 500);

  const collections = useMemo(
    () => ["clinics", "centers", "units", "medical-services"],
    [],
  );
  const tabs = useMemo(
    () => collections.map((c) => t(`departmentTabs.${c}`)),
    [collections, t],
  );
  const tabFromUrl = searchParams.get("tab");

  const activeTab =
    tabFromUrl && collections.includes(tabFromUrl) ? tabFromUrl : "clinics";
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const currentPage = pageFromUrl;
  const departmentsQuery = useDepartments(
    activeTab,
    currentPage,
    debouncedSearch,
  );

  const items = departmentsQuery.data?.data || [];
  const pagination = departmentsQuery.data?.meta;
  const showInitialSkeleton = departmentsQuery.isLoading;

  const showPaginationSkeleton =
    departmentsQuery.isFetching && !departmentsQuery.isLoading;
  return (
    <div className="bg-[#f8fbfe]">
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? "الأقسام الطبية | مستشفى القصيم الوطني"
            : "Medical Departments | Qassim National Hospital"
        }
        description={
          i18n.language?.startsWith("ar")
            ? "استعرض العيادات والمراكز والوحدات والخدمات الطبية المتوفرة في مستشفى القصيم الوطني."
            : "Explore clinics, centers, units, and medical services available at Qassim National Hospital."
        }
      />
      <BreadcrumbArea
        imgUrl="/images/about-us-header.jpg"
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("medicalDepartments.title") },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl justify-center px-6 py-16 text-center md:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <SectionBadge> {t("medicalDepartments.title")}</SectionBadge>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {t("medicalDepartments.description")}{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs + Search */}
      <section className="mx-auto mt-10 max-w-7xl px-6 pb-6 md:px-10 lg:px-16">
        <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:flex-wrap">
              {collections.map((collection, idx) => {
                const tabName = tabs[idx];
                return (
                  <button
                    key={tabName}
                    onClick={() => {
                      setSearch("");
                      setSearchParams((prev) => {
                        const params = new URLSearchParams(prev);
                        params.set("tab", collection);
                        params.set("page", 1);
                        params.delete("search");
                        return params;
                      });
                    }}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-medium transition",
                      activeTab === collection
                        ? "bg-[rgb(21,98,160)] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)]",
                    ].join(" ")}
                  >
                    {tabName}
                  </button>
                );
              })}
            </div>
            <div className="relative w-full lg:w-[320px]">
              <Search
                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                  i18n.language === "ar" ? "right-4" : "left-4"
                }`}
              />
              <input
                type="text"
                placeholder={t("medicalDepartments.search", {
                  tab: t(`departmentTabs.${activeTab}`),
                })}
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);

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
                }}
                className={`h-12 w-full rounded-full border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-[rgba(21,98,160,0.35)] focus:bg-white ${
                  i18n.language === "ar"
                    ? "pr-11 pl-4 text-right"
                    : "pl-11 pr-4 text-left"
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto  relative max-w-7xl px-6 pb-16 md:px-10 lg:px-16">
        <div className="relative">
          {/* Buttons next to Cards */}

          {/*
        
         {items.length > 0 && (
            <>
              <button
                disabled={pagination?.page === 1}
                onClick={() => {
                  const newPage = currentPage - 1;

                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("tab", activeTab);
                    params.set("page", newPage);
                    return params;
                  });
                }}
                className="absolute -left-15 top-1/2 -translate-y-1/2 z-10 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 
                 transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)] 
                disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                disabled={pagination?.page === pagination?.pageCount}
                onClick={() => {
                  const newPage = currentPage + 1;

                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("tab", activeTab);
                    params.set("page", newPage);
                    return params;
                  });
                }}
                className="absolute -right-15 top-1/2 -translate-y-1/2 z-10 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 
                 transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)] 
                disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        */}

          <div
            className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 transition-opacity duration-200 ${
              departmentsQuery.isFetching && !departmentsQuery.isLoading
                ? "opacity-70"
                : "opacity-100"
            }`}
          >
            {showInitialSkeleton || showPaginationSkeleton
              ? [...Array(3)].map((_, i) => <DepartmentCardSkeleton key={i} />)
              : items.length > 0
                ? items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      viewport={{ once: true }}
                      className="group min-h-[420px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {item.cardDesc}
                        </p>

                        <div className="mt-5">
                          <Link
                            to={withLang(item.to, i18n.language || "en")}
                            className={`inline-flex items-center gap-2 text-sm font-semibold text-[rgb(21,98,160)] transition hover:gap-3 
                            
                            `}
                          >
                            {t("common.learnMore")}

                            {i18n.language === "ar" ? (
                              <ArrowLeft className="h-4 w-4" />
                            ) : (
                              <ArrowRight className="h-4 w-4" />
                            )}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))
                : null}
          </div>
        </div>
        {/* Empty state */}
        <AnimatePresence>
          {items.length === 0 && !departmentsQuery.isLoading && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="col-span-full mb-10 rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500"
            >
              {t("common.noResults")}
            </motion.div>
          )}
        </AnimatePresence>
        {pagination && items.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 relative">
            {/* Page Info */}
            <p className="text-sm text-slate-500">
              {t("common.paginationInfo", {
                page: pagination.page,
                pageCount: pagination.pageCount,
              })}
            </p>

            {/* Pagination Controls */}
            <div
              className={`flex flex-wrap items-center justify-center gap-2 ${
                i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Prev */}
              <button
                disabled={pagination.page === 1}
                onClick={() => {
                  const newPage = currentPage - 1;

                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("tab", activeTab);
                    params.set("page", newPage);
                    return params;
                  });
                }}
                className=" px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 
         transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)] 
         disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1)
                .slice(
                  Math.max(0, pagination.page - 3),
                  Math.min(pagination.pageCount, pagination.page + 2),
                )
                .map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => {
                      setSearchParams((prev) => {
                        const params = new URLSearchParams(prev);
                        params.set("tab", activeTab);
                        params.set("page", pageNumber);
                        return params;
                      });
                    }}
                    className={`h-10 w-10 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
       hover:scale-105
       ${
         pagination.page === pageNumber
           ? "bg-[rgb(21,98,160)] text-white shadow-md "
           : "bg-white border border-slate-200 text-slate-600 hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)]"
       }`}
                  >
                    {pageNumber}
                  </button>
                ))}

              {/* Next */}
              <button
                disabled={pagination.page === pagination.pageCount}
                onClick={() => {
                  const newPage = currentPage + 1;

                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("tab", activeTab);
                    params.set("page", newPage);
                    return params;
                  });
                }}
                className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 
        transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)] 
        disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function DepartmentCardSkeleton() {
  return (
    <div className="min-h-[570px]">
      <div className="overflow-hidden  rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="h-56 w-full animate-pulse bg-slate-200" />
        <div className="p-6">
          <div className="h-6 w-2/3 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-2 h-4 w-4/6 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-6 h-4 w-24 animate-pulse rounded-md bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
