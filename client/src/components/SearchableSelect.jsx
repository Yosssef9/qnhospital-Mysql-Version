import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SearchableSelect({
  name,
  value,
  onChange,
  options = [],
  error,
  inputBaseClass = "",
  placeholder,
  searchPlaceholder,
  noResultsText,
  getOptionLabel,
  getOptionValue,
  disabled = false,
}) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  const optionLabel = (item) => {
    if (getOptionLabel) return getOptionLabel(item, isArabic);
    return isArabic ? item.ar || item.label || item.en : item.en || item.label;
  };

  const optionValue = (item) => {
    if (getOptionValue) return getOptionValue(item);
    return item.value;
  };

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return options;

    return options.filter((item) => {
      const label = String(optionLabel(item) || "").toLowerCase();
      const val = String(optionValue(item) || "").toLowerCase();
      const en = String(item.en || "").toLowerCase();
      const ar = String(item.ar || "").toLowerCase();

      return (
        label.includes(q) || val.includes(q) || en.includes(q) || ar.includes(q)
      );
    });
  }, [search, options]);

  const selectedOption = useMemo(() => {
    return options.find((item) => optionValue(item) === value);
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  const handleSelect = (selectedValue) => {
    onChange({
      target: {
        name,
        value: selectedValue,
      },
    });

    setOpen(false);
    setSearch("");
  };

  return (
    <div className={`relative ${open ? "z-[200]" : "z-20"}`} ref={wrapperRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={[
          inputBaseClass,
          "flex items-center justify-between text-left",
          !value ? "text-slate-400" : "text-slate-800",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        ].join(" ")}
      >
        <span className="truncate font-light">
          {selectedOption ? optionLabel(selectedOption) : placeholder}
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-[210] mt-2 origin-top overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
          >
            <div className="border-b border-slate-200 p-3">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                    isArabic ? "right-3" : "left-3"
                  }`}
                />

                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className={`h-11 w-full rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-[rgba(21,98,160,0.35)] focus:bg-white ${
                    isArabic ? "pr-10 pl-3 text-right" : "pl-10 pr-3 text-left"
                  }`}
                />
              </div>
            </div>

            <div className="z-50 max-h-72 overflow-y-auto p-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => {
                  const itemValue = optionValue(item);
                  const isSelected = value === itemValue;

                  return (
                    <button
                      key={itemValue}
                      type="button"
                      onClick={() => handleSelect(itemValue)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                        isSelected
                          ? "bg-[rgba(21,98,160,0.08)] font-medium text-[rgb(21,98,160)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{optionLabel(item)}</span>
                      {isSelected && <Check className="h-4 w-4" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-4 text-sm text-slate-500">
                  {noResultsText}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
