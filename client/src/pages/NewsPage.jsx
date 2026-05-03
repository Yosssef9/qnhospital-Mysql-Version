import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import { useNews } from "../api/strapi";

export default function NewsPage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const page = parseInt(searchParams.get("page")) || 1;
  const newsQuery = useNews(page, search);

  const items = newsQuery.data?.data || [];
  const pagination = newsQuery.data?.meta;

  return (
    <div className="bg-[#f8fbfe]">
      <BreadcrumbArea
        imgUrl="/images/about-us-header.jpg"
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("newsPage.title") },
        ]}
      />

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.18)] bg-[rgba(21,98,160,0.07)] px-4 py-1.5 text-sm font-semibold text-[rgb(21,98,160)]">
              <span className="h-2 w-2 rounded-full bg-[rgb(21,98,160)]" />
              {t("newsPage.badge")}
            </div>

            <h1 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
              {t("newsPage.title")}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600 leading-7">
              {t("newsPage.description")}
            </p>
          </div>

          <div className="relative w-full lg:w-[320px]">
            <Search
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                i18n.language === "ar" ? "right-4" : "left-4"
              }`}
            />
            <input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                setSearchParams((prev) => {
                  const params = new URLSearchParams(prev);
                  if (value) params.set("search", value);
                  else params.delete("search");
                  params.set("page", "1");
                  return params;
                });
              }}
              placeholder={t("newsPage.search")}
              className={`h-12 w-full rounded-full border border-slate-200 bg-white ${
                i18n.language === "ar"
                  ? "pr-11 pl-4 text-right"
                  : "pl-11 pr-4 text-left"
              }`}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="text-sm font-medium text-[rgb(21,98,160)]">
                  {item.publishedDate}
                </div>

                <h3 className="mt-3 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.excerpt}
                </p>

                <Link
                  to={`/news/${item.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(21,98,160)] transition hover:gap-3"
                >
                  {t("common.readMore")}
                  {i18n.language === "ar" ? (
                    <ArrowLeft className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
