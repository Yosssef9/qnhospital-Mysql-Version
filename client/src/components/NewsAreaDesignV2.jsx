import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SectionTitle from "./reusableComponents/SectionTitle";
import SectionBadge from "./reusableComponents/SectionBadge";
import SectionPrimaryButton from "./SectionPrimaryButton";
import SectionSpinner from "./SectionSpinner";
import { useNewsAchievementsHomeSection } from "../api/strapi";
import { withLang } from "../utils/languageRouting";
export default function NewsAreaDesignV2() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const { data, isLoading, error } = useNewsAchievementsHomeSection();
  const [tab, setTab] = useState("achievements");
  const [active, setActive] = useState(0);

  const news = data?.featuredNews || [];
  const achievements = data?.featuredAchievements || [];

  const sideItems = tab === "achievements" ? achievements : news;

  useEffect(() => {
    setActive(0);
  }, [tab]);

  const featured = useMemo(() => {
    const currentItems = tab === "achievements" ? achievements : news;
    const currentItem = currentItems[active] || currentItems[0] || null;

    if (!currentItem) return null;

    const fallbackExcerpt =
      tab === "achievements"
        ? t("newsAreaSection.featuredAchievementExcerpt")
        : t("newsAreaSection.featuredNewsExcerpt");

    return {
      ...currentItem,
      excerpt:
        currentItem.description && currentItem.description.trim()
          ? currentItem.description
          : fallbackExcerpt,
      image: currentItem.coverImage || "/images/defalutImageNews.jpg",
      date: currentItem.publishedDate || "",
    };
  }, [tab, active, achievements, news, t]);

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-[#f8fbfe]">
        <div className="relative mx-auto px-6 py-16 md:px-16 md:py-24 xl:px-24">
          <div className="flex min-h-[420px] items-center justify-center">
            <SectionSpinner />
          </div>
        </div>
      </section>
    );
  }

  if (error || (!news.length && !achievements.length)) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#f8fbfe]">
      <div className="relative mx-auto px-6 py-16 md:px-16 md:py-24 xl:px-24">
        <div
          className={`mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${
            isRTL ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className={isRTL ? "text-right" : "text-left"}>
            <SectionBadge>{t("newsAreaSection.badge")}</SectionBadge>

            <SectionTitle>
              {data?.title || t("newsAreaSection.title")}
            </SectionTitle>

            {(data?.description || "").trim() && (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                {data.description}
              </p>
            )}
          </div>

          <div
            className={`flex flex-col gap-2 ${isRTL ? "items-end" : "items-start"}`}
          >
            <div
              className={`text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 ${
                isRTL ? "text-right" : "text-left"
              }`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {t("newsAreaSection.browseBy")}
            </div>

            <div
              role="tablist"
              aria-label={t("newsAreaSection.tabsAriaLabel")}
              className="inline-flex items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm"
            >
              <motion.button
                role="tab"
                aria-selected={tab === "news"}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setTab("news");
                  setActive(0);
                }}
                className={[
                  "relative rounded-xl px-5 py-2.5 text-sm font-semibold transition",
                  tab === "news"
                    ? "text-white"
                    : "text-slate-700 hover:text-slate-900",
                ].join(" ")}
              >
                {tab === "news" && (
                  <motion.div
                    layoutId="newsTabIndicator"
                    className="absolute inset-0 rounded-xl bg-[rgb(21,98,160)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span>{t("newsAreaSection.tabs.news")}</span>
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-[11px]",
                      tab === "news"
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {news.length}
                  </span>
                </span>
              </motion.button>

              <motion.button
                role="tab"
                aria-selected={tab === "achievements"}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setTab("achievements");
                  setActive(0);
                }}
                className={[
                  "relative rounded-xl px-5 py-2.5 text-sm font-semibold transition",
                  tab === "achievements"
                    ? "text-white"
                    : "text-slate-700 hover:text-slate-900",
                ].join(" ")}
              >
                {tab === "achievements" && (
                  <motion.div
                    layoutId="newsTabIndicator"
                    className="absolute inset-0 rounded-xl bg-[rgb(21,98,160)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span>{t("newsAreaSection.tabs.achievements")}</span>
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 text-[11px]",
                      tab === "achievements"
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {achievements.length}
                  </span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true, amount: 0.25 }}
            className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(2,32,71,0.08)]"
          >
            {featured ? (
              <div className="grid overflow-hidden lg:h-[520px] lg:grid-cols-[1.05fr_0.95fr]">
                {" "}
                <div className="relative order-2 h-[280px] overflow-hidden md:h-[420px] lg:order-1 lg:h-[520px]">
                  {" "}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={featured.title + "-image"}
                      src={featured.image}
                      alt={featured.title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0 h-full w-full object-contain object-center"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/5" />
                </div>
                <div
                  className={`order-1 flex flex-col justify-between overflow-hidden p-6 md:p-8 lg:order-2 lg:h-[520px] ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featured.title + "-content"}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex h-full flex-col justify-between"
                    >
                      <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
                          {tab === "achievements"
                            ? t("newsAreaSection.featuredAchievement")
                            : t("newsAreaSection.featuredNews")}
                        </div>

                        <div className="mt-4 text-sm font-medium text-slate-500">
                          {featured.date}
                        </div>

                        <h3 className="mt-3 line-clamp-3 text-2xl font-main leading-tight text-slate-900 md:text-3xl">
                          {featured.title}
                        </h3>

                        <p className="mt-5 line-clamp-5 text-sm leading-7 text-slate-600 md:text-base">
                          {featured.excerpt}
                        </p>
                      </div>

                      <div className="mt-8">
                        <SectionPrimaryButton to="/news-achievements">
                          {t("newsAreaSection.readMore")}
                        </SectionPrimaryButton>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex h-[520px] items-center justify-center p-8 text-center text-slate-500">
                {t("newsAreaSection.emptyState", "No items available yet.")}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`flex items-center justify-between gap-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="text-lg font-semibold text-slate-900">
                  {tab === "achievements"
                    ? t("newsAreaSection.moreAchievements")
                    : t("newsAreaSection.latestNews")}
                </div>
                <div className="text-sm text-slate-500">
                  {t("newsAreaSection.sideDescription")}
                </div>
              </div>

              <Link
                to={withLang(
                  `/news-achievements?tab=${tab}&page=1`,
                  i18n.language || "en",
                )}
                className="text-sm font-semibold text-[rgb(21,98,160)] hover:underline"
              >
                {t("newsAreaSection.viewAll")}
              </Link>
            </div>

            <div className="mt-5 divide-y divide-slate-200">
              {sideItems.map((item, i) => {
                const isActive = i === active;
                const date = item.publishedDate || "";
                const title = item.title || "";

                return (
                  <button
                    key={item.id || `${title}-${i}`}
                    onClick={() => setActive(i)}
                    className={`group w-full py-4 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-4 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={[
                          "mt-1 h-2.5 w-2.5 rounded-full transition",
                          isActive
                            ? "bg-[rgb(21,98,160)]"
                            : "bg-slate-300 group-hover:bg-[rgb(21,98,160)]",
                        ].join(" ")}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-[rgb(21,98,160)]">
                          {date}
                        </div>

                        <div
                          className={[
                            "mt-1 text-sm font-semibold leading-6 transition",
                            isActive
                              ? "text-slate-900"
                              : "text-slate-700 group-hover:text-slate-900",
                          ].join(" ")}
                        >
                          {title}
                        </div>
                      </div>

                      {isRTL ? (
                        <ArrowLeft
                          className={[
                            "h-4 w-4 shrink-0 transition",
                            isActive
                              ? "text-[rgb(21,98,160)]"
                              : "text-slate-400 group-hover:text-[rgb(21,98,160)]",
                          ].join(" ")}
                        />
                      ) : (
                        <ArrowRight
                          className={[
                            "h-4 w-4 shrink-0 transition",
                            isActive
                              ? "text-[rgb(21,98,160)]"
                              : "text-slate-400 group-hover:text-[rgb(21,98,160)]",
                          ].join(" ")}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
