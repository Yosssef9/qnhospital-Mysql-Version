import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DateSelect({
  name = "dateOfBirth",
  value,
  onChange,
  error,
  inputBaseClass,
  placeholder,
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedDate = value ? new Date(value) : null;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (date) => {
    if (!date) return;

    onChange({
      target: {
        name,
        value: date.toISOString().split("T")[0],
      },
    });

    setOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Input Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${inputBaseClass} w-full flex items-center justify-between ${
          !value ? "text-slate-400" : "text-slate-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>
            {value
              ? formatDate(selectedDate)
              : placeholder || t("joinUsPage.form.placeholders.dateOfBirth")}
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-slate-500 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Calendar Popup */}
      {open && (
        <div className="absolute z-50 mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={{ after: new Date() }}
            captionLayout="dropdown"
            fromYear={1920}
            toYear={new Date().getFullYear()}
          />
        </div>
      )}

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
