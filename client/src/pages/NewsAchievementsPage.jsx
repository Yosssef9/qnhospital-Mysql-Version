import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Newspaper,
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SectionBadge from "../components/reusableComponents/SectionBadge";
import SectionTitle from "../components/reusableComponents/SectionTitle";
import { useDebounce } from "../hooks/useDebounce";
import { useNews, useAchievements } from "../api/strapi";
import SEO from "../components/SEO";
export default function NewsAchievementsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("search") || "");
  const [selectedItem, setSelectedItem] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const activeTab = searchParams.get("tab") || "news";

  const newsQuery = useNews(currentPage, debouncedQuery, 9);
  const achievementsQuery = useAchievements(currentPage, debouncedQuery, 9);
  const activeQuery =
    activeTab === "achievements" ? achievementsQuery : newsQuery;

  const items = activeQuery.data?.data || [];
  const pagination = activeQuery.data?.meta || null;

  const showInitialSkeleton = activeQuery.isLoading;
  const showFetchingSkeleton = activeQuery.isFetching && !activeQuery.isLoading;

  const handleTabChange = (tab) => {
    setSelectedItem(null);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", tab);
      params.set("page", "1");
      return params;
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedItem(null);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.set("page", "1");
      return params;
    });
  };

  const goToPage = (pageNumber) => {
    setSelectedItem(null);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(pageNumber));
      return params;
    });
  };

  useEffect(() => {
    if (!selectedItem) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-[#f6fbff]">
      <SEO
        title={
          activeTab === "achievements"
            ? i18n.language?.startsWith("ar")
              ? "الإنجازات | مستشفى القصيم الوطني"
              : "Achievements | Qassim National Hospital"
            : i18n.language?.startsWith("ar")
              ? "الأخبار | مستشفى القصيم الوطني"
              : "News | Qassim National Hospital"
        }
        description={
          activeTab === "achievements"
            ? i18n.language?.startsWith("ar")
              ? "تابع أحدث إنجازات مستشفى القصيم الوطني في الرعاية الصحية والخدمات الطبية."
              : "Follow the latest achievements of Qassim National Hospital in healthcare and medical services."
            : i18n.language?.startsWith("ar")
              ? "تابع آخر أخبار مستشفى القصيم الوطني والتحديثات الطبية والمجتمعية."
              : "Read the latest news, updates, and healthcare announcements from Qassim National Hospital."
        }
      />
      <section className="relative z-30 overflow-hidden border-b border-slate-200/70 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 right-0 h-[360px] w-[360px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-[rgba(30,127,143,0.08)] blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-32 w-32 -translate-x-1/2 rounded-full bg-[rgba(59,130,246,0.06)] blur-2xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className={isRTL ? "text-right" : "text-left"}>
              <SectionBadge>
                {t("newsAchievementsPage.badge", "Media Center")}
              </SectionBadge>

              <SectionTitle className="max-w-3xl font-light leading-tight">
                {t("newsAchievementsPage.title", "News & Achievements")}
              </SectionTitle>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {t(
                  "newsAchievementsPage.description",
                  "Browse the latest hospital news, announcements, and achievements.",
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => handleTabChange("news")}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                    activeTab === "news"
                      ? "bg-[rgb(21,98,160)] text-white shadow-[0_14px_30px_rgba(21,98,160,0.22)]"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Newspaper className="h-4 w-4" />
                  {t("newsAreaSection.tabs.news")}
                </button>

                <button
                  onClick={() => handleTabChange("achievements")}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                    activeTab === "achievements"
                      ? "bg-[rgb(21,98,160)] text-white shadow-[0_14px_30px_rgba(21,98,160,0.22)]"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Trophy className="h-4 w-4" />
                  {t("newsAreaSection.tabs.achievements")}
                </button>
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
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                        <Newspaper className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xl font-main text-slate-900">
                          {newsQuery.data?.meta?.total || 0}
                        </div>
                        <div className="text-sm text-slate-500">
                          {t("newsAreaSection.tabs.news")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xl font-main text-slate-900">
                          {achievementsQuery.data?.meta?.total || 0}
                        </div>
                        <div className="text-sm text-slate-500">
                          {t("newsAreaSection.tabs.achievements")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[28px] bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] p-6 text-white shadow-[0_20px_50px_rgba(21,98,160,0.25)]">
                  <h3 className="text-lg font-semibold">
                    {activeTab === "news"
                      ? t("newsAchievementsPage.panel.newsTitle", "Latest News")
                      : t(
                          "newsAchievementsPage.panel.achievementsTitle",
                          "Hospital Achievements",
                        )}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/90">
                    {activeTab === "news"
                      ? t(
                          "newsAchievementsPage.panel.newsDescription",
                          "Stay updated with hospital announcements, events, and latest updates.",
                        )
                      : t(
                          "newsAchievementsPage.panel.achievementsDescription",
                          "Explore medical successes, milestones, and institutional achievements.",
                        )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className={isRTL ? "text-right" : "text-left"}>
            <SectionBadge>
              {activeTab === "news"
                ? t("newsAreaSection.tabs.news")
                : t("newsAreaSection.tabs.achievements")}
            </SectionBadge>

            <SectionTitle className="font-light">
              {activeTab === "news"
                ? t("newsAchievementsPage.grid.newsTitle", "All News")
                : t(
                    "newsAchievementsPage.grid.achievementsTitle",
                    "All Achievements",
                  )}
            </SectionTitle>
          </div>

          <div className="text-sm text-slate-500">
            {pagination?.total || 0}{" "}
            {t("newsAchievementsPage.resultsLabel", "results")}
          </div>
        </div>

        <div className="relative z-40 my-10 rounded-[28px] border border-slate-200/70 bg-white/90 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="relative max-w-xl">
            <Search
              className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                isRTL ? "right-4" : "left-4"
              }`}
            />
            <input
              value={query}
              onChange={handleSearchChange}
              placeholder={t(
                "newsAchievementsPage.searchPlaceholder",
                "Search by title",
              )}
              className={`h-13 w-full rounded-2xl border border-slate-200 bg-[#f8fbfe] text-sm text-slate-800 outline-none transition focus:border-[rgba(21,98,160,0.35)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(21,98,160,0.08)] ${
                isRTL ? "pr-11 pl-4 text-right" : "pl-11 pr-4 text-left"
              }`}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showInitialSkeleton && items.length === 0 ? (
            <motion.div
              key={`empty-${activeTab}-${debouncedQuery}-${currentPage}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                <Search className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {t("newsAchievementsPage.emptyState.title", "No items found")}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                {t(
                  "newsAchievementsPage.emptyState.desc",
                  "Try another search term or switch to the other tab.",
                )}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${activeTab}-${debouncedQuery}-${currentPage}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
              className={`grid min-h-[520px] gap-6 md:grid-cols-2 xl:grid-cols-3 ${
                showFetchingSkeleton ? "opacity-70" : "opacity-100"
              }`}
            >
              {(showInitialSkeleton || showFetchingSkeleton
                ? [...Array(9)]
                : items
              ).map((item, index) =>
                showInitialSkeleton || showFetchingSkeleton ? (
                  <NewsAchievementCardSkeleton key={index} />
                ) : (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.985 }}
                    transition={{ duration: 0.28, delay: index * 0.03 }}
                    className="group relative z-0 flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(2,32,71,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_65px_rgba(2,32,71,0.11)]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(21,98,160,0.06),transparent)]" />

                    <div className="relative px-5 pt-5">
                      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#f4f9fd,#edf5fb)]">
                        <div
                          className={`absolute top-4 z-10 ${
                            isRTL ? "right-4" : "left-4"
                          }`}
                        >
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[rgb(21,98,160)] shadow-sm backdrop-blur">
                            {activeTab === "news" ? (
                              <Newspaper className="h-3.5 w-3.5" />
                            ) : (
                              <Trophy className="h-3.5 w-3.5" />
                            )}
                            {activeTab === "news"
                              ? t("newsAreaSection.tabs.news")
                              : t("newsAreaSection.tabs.achievements")}
                          </div>
                        </div>

                        <img
                          src={
                            item.coverImage || "/images/defalutImageNews.jpg"
                          }
                          alt={item.title}
                          className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    <div
                      className={`flex flex-1 flex-col p-5 pt-4 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <p className="text-sm font-medium text-[rgb(21,98,160)]">
                        {item.publishedDate}
                      </p>

                      <h3 className="mt-3 line-clamp-2 text-xl font-main text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>

                      <div className="mt-auto pt-6">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,rgba(21,98,160,1),rgba(36,124,194,1))] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                        >
                          {t(
                            "newsAchievementsPage.viewDetails",
                            "View Details",
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ),
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {pagination && items.length > 0 && (
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

      <AnimatePresence>
        {selectedItem && (
          <NewsAchievementModal
            item={selectedItem}
            activeTab={activeTab}
            isRTL={isRTL}
            t={t}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
function NewsAchievementModal({ item, activeTab, isRTL, t, onClose }) {
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showFullImage) {
          setShowFullImage(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, showFullImage]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          dir={isRTL ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[34px] border border-white/60 bg-white shadow-[0_30px_100px_rgba(2,32,71,0.24)]"
        >
          <button
            onClick={onClose}
            className={`absolute top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:bg-white ${
              isRTL ? "left-4" : "right-4"
            }`}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-h-[90vh] overflow-y-auto">
            <div className="relative h-[320px] overflow-hidden bg-white md:h-[460px]">
              <img
                src={item.coverImage || "/images/defalutImageNews.jpg"}
                alt={item.title}
                onClick={() => setShowFullImage(true)}
                className="h-full w-full cursor-zoom-in object-contain transition duration-300 hover:scale-[1.02]"
              />

              <div className={`absolute top-5 ${isRTL ? "right-5" : "left-5"}`}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/85 px-4 py-2 text-sm font-semibold text-[rgb(21,98,160)] shadow-lg backdrop-blur">
                  {activeTab === "news" ? (
                    <Newspaper className="h-4 w-4" />
                  ) : (
                    <Trophy className="h-4 w-4" />
                  )}
                  {activeTab === "news"
                    ? t("newsAreaSection.tabs.news")
                    : t("newsAreaSection.tabs.achievements")}
                </div>
              </div>

              <button
                onClick={() => setShowFullImage(true)}
                className={`absolute bottom-4 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow transition hover:bg-white ${
                  isRTL ? "left-4" : "right-4"
                }`}
              >
                {t("newsAchievementsPage.zoomImage", "Click to zoom")}
              </button>
            </div>

            <div className={`p-6 md:p-8 ${isRTL ? "text-right" : "text-left"}`}>
              <p className="text-sm font-semibold text-[rgb(21,98,160)]">
                {item.publishedDate}
              </p>

              <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
                {item.title}
              </h2>

              <div className="mt-6 rounded-[24px] border border-slate-200 bg-[#f8fbfe] p-5">
                <p className="whitespace-pre-line text-sm leading-8 text-slate-700 md:text-base">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {t("common.close", "Close")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showFullImage && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowFullImage(false);
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullImage(false);
              }}
              className={`absolute top-5 z-[510] flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white ${
                isRTL ? "left-5" : "right-5"
              }`}
              aria-label="Close zoomed image"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              src={item.coverImage || "/images/defalutImageNews.jpg"}
              alt={item.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-h-[95vh] max-w-[95vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NewsAchievementCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-sm">
      <div className="px-5 pt-5">
        <div className="h-[260px] w-full animate-pulse rounded-[28px] bg-slate-200" />
      </div>

      <div className="p-5 pt-4">
        <div className="h-4 w-1/3 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-3 h-6 w-2/3 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-slate-200" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded-md bg-slate-200" />
        <div className="mt-6 h-11 w-full animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
