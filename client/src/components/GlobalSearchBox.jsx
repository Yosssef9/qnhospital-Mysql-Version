import { Search, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../hooks/useDebounce";
import { useGlobalSearch } from "../api/strapi";
import { withLang } from "../utils/languageRouting";
export default function GlobalSearchBox({ onSelect }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: results = [], isFetching } = useGlobalSearch(debouncedSearch);

  const handleGo = (item) => {
  navigate(withLang(item.to, i18n.language || "en"));
    setSearch("");
    onSelect?.();
  };

  return (
    <div className="relative w-full">
      <Search
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 ${
          isRTL ? "right-3" : "left-3"
        }`}
      />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t("common.search") || "Search..."}
        className={`h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[rgba(21,98,160,0.35)] ${
          isRTL ? "pr-9 text-right" : "pl-9 text-left"
        }`}
      />

      {search.trim().length >= 2 && (
        <div
          className={`absolute top-full z-[500] mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] ${
            isRTL ? "right-0 text-right" : "left-0 text-left"
          }`}
        >
          {isFetching ? (
            <div className="flex items-center justify-center gap-2 px-4 py-5 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              {isRTL ? "جاري البحث..." : "Searching..."}
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-[360px] overflow-y-auto py-2">
              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleGo(item)}
                  className="group flex w-full items-center justify-between gap-3 px-4 py-3 text-sm transition hover:bg-slate-50"
                >
                  <div>
                    <div className="font-semibold text-slate-800">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs text-[rgb(21,98,160)]">
                      {item.type}
                    </div>
                  </div>

                  {isRTL ? (
                    <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:text-[rgb(21,98,160)]" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[rgb(21,98,160)]" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 text-center text-sm text-slate-500">
              {t("common.noResults") || "No results found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
