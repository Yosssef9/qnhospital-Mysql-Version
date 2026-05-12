import { useEffect, useMemo, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  PhoneCall,
  MapPin,
  Clock,
  Search,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronDown,
  Globe,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { CONTACT } from "../data/contact";
import { getSiteNav } from "../data/navData";
import { motion, useAnimation } from "framer-motion";
import { useWebsiteLinks } from "../api/strapi";
import GlobalSearchBox from "./GlobalSearchBox";
import { FaXTwitter } from "react-icons/fa6";
export default function NavBarQNH() {
  const [open, setOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const controls = useAnimation();
  const touchStartX = useRef(null);
  const edgeThreshold = 28; // swipe start area from screen edge
  const openThreshold = 70; // how far user must swipe to open
  const closeThreshold = 90; // how far user must swipe to close
  const nav = useMemo(() => getSiteNav(t), [t]);
  const { data: websiteLinks, isLoading } = useWebsiteLinks();
  console.log("nav", nav);
  const handleLinkClick = () => {
    setOpen(false);
    setMobileOpen(null);
  };
  useEffect(() => {
    const isArabic = i18n.language === "ar";

    const transition = {
      type: "tween",
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    };

    if (open) {
      controls.start({
        x: 0,
        scale: 1,
        transition,
      });
    } else {
      controls.start({
        x: isArabic ? "-100%" : "100%",
        scale: 0.985,
        transition,
      });
    }
  }, [open, controls, i18n.language]);
  useEffect(() => {
    const isArabic = i18n.language === "ar";

    const handleTouchStart = (e) => {
      if (window.innerWidth >= 1024) return;
      if (open) return;

      const x = e.touches[0].clientX;
      const screenWidth = window.innerWidth;

      const touchingEdge = isArabic
        ? x <= edgeThreshold
        : x >= screenWidth - edgeThreshold;

      touchStartX.current = touchingEdge ? x : null;
    };

    const handleTouchMove = (e) => {
      if (window.innerWidth >= 1024) return;
      if (open) return;
      if (touchStartX.current == null) return;

      const currentX = e.touches[0].clientX;

      const delta = isArabic
        ? currentX - touchStartX.current // swipe right
        : touchStartX.current - currentX; // swipe left

      if (delta > openThreshold) {
        setOpen(true);
        touchStartX.current = null;
      }
    };

    const handleTouchEnd = () => {
      touchStartX.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [open, i18n.language]);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      setMobileOpen(null);
      return;
    }

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(null);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleMobileItem = (label) => {
    setMobileOpen((prev) => (prev === label ? null : label));
  };

  const isParentActive = (item) => {
    const path = location.pathname;

    if (item.children) {
      return item.children.some(
        (child) => !child.to.startsWith("http") && path === child.to,
      );
    }

    if (item.sections) {
      return item.sections.some((section) =>
        section.links.some((child) => path === child.to),
      );
    }

    return false;
  };

  const renderDesktopNav = () => (
    <nav className="hidden lg:flex items-center gap-8">
      {nav.map((item) => {
        const parentActive = isParentActive(item);

        if (item.type === "mega") {
          return (
            <div key={item.label} className="group relative">
              <button
                type="button"
                className={[
                  "relative inline-flex items-center gap-1 text-sm font-semibold transition",
                  "after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-0 after:bg-[rgb(21,98,160)] after:transition-all",
                  parentActive
                    ? "text-[rgb(21,98,160)] after:w-full"
                    : "text-slate-700 hover:text-[rgb(21,98,160)] group-hover:after:w-full",
                ].join(" ")}
              >
                {item.label}
                <ChevronDown
                  className={[
                    "h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    parentActive ? "rotate-180" : "group-hover:rotate-180",
                  ].join(" ")}
                />
              </button>

              <div
                className="
                  invisible absolute left-1/2 top-full z-[300] w-[980px] -translate-x-1/2 translate-y-2 pt-5 opacity-0
                  transition-all duration-200
                  group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                "
              >
                <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                  <div className="grid grid-cols-[320px_1fr]">
                    <div className="border-r border-slate-200 bg-[linear-gradient(180deg,rgba(21,98,160,0.10),rgba(21,98,160,0.03))] p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgb(21,98,160)]">
                        {item.intro.eyebrow}
                      </p>

                      <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-900">
                        {item.intro.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.intro.desc}
                      </p>

                      <Link
                        to={item.intro.to}
                        onClick={handleLinkClick}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[rgb(21,98,160)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                      >
                        {t("departments.viewAllDepartments")}
                        {i18n.language === "ar" ? (
                          <ArrowLeft className="h-4 w-4" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 p-7">
                      {item.sections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <div key={section.title} className="min-w-0">
                            <div className="mb-3 flex items-center gap-2">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                                <Icon className="h-4 w-4" />
                              </div>
                              <h4 className="text-sm font-semibold text-slate-900">
                                {section.title}
                              </h4>
                            </div>

                            <div className="flex flex-col gap-1">
                              {section.links.map((child) => (
                                <NavLink
                                  key={child.label}
                                  to={child.to}
                                  onClick={handleLinkClick}
                                  className={({ isActive }) =>
                                    [
                                      "group/item flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition",
                                      isActive
                                        ? "bg-[rgba(21,98,160,0.08)] font-medium text-[rgb(21,98,160)]"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-[rgb(21,98,160)]",
                                    ].join(" ")
                                  }
                                >
                                  <span>{child.label}</span>
                                  {i18n.language === "ar" ? (
                                    <ArrowLeft className="h-4 w-4 translate-x-0 opacity-0 transition duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                                  ) : (
                                    <ArrowRight className="h-4 w-4 translate-x-0 opacity-0 transition duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                                  )}
                                </NavLink>
                              ))}
                            </div>

                            {section.moreLink && (
                              <NavLink
                                to={section.moreLink.to}
                                className="mt-2 inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[rgb(21,98,160)] transition hover:opacity-80"
                              >
                                {section.moreLink.label}
                                {i18n.language === "ar" ? (
                                  <ArrowLeft className="h-4 w-4" />
                                ) : (
                                  <ArrowRight className="h-4 w-4" />
                                )}{" "}
                              </NavLink>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (item.children) {
          return (
            <div key={item.label} className="group relative">
              <button
                type="button"
                className={[
                  "relative inline-flex items-center gap-1 text-sm font-semibold transition",
                  "after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-0 after:bg-[rgb(21,98,160)] after:transition-all",
                  parentActive
                    ? "text-[rgb(21,98,160)] after:w-full"
                    : "text-slate-700 hover:text-[rgb(21,98,160)] group-hover:after:w-full",
                ].join(" ")}
              >
                {item.label}
                <ChevronDown
                  className={[
                    "h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    parentActive ? "rotate-180" : "group-hover:rotate-180",
                  ].join(" ")}
                />
              </button>

              <div
                className="
                  invisible absolute left-0 top-full z-[300] translate-y-2 pt-4 opacity-0
                  transition-all duration-200
                  group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                "
              >
                <div className="relative z-[500] min-w-[260px] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {item.children.map((child) =>
                    child.to.startsWith("http") ? (
                      <a
                        key={child.label}
                        href={child.to}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)]"
                      >
                        {child.label}
                      </a>
                    ) : (
                      <NavLink
                        key={child.label}
                        to={child.to}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                          [
                            "block rounded-xl px-4 py-3 text-sm font-medium transition",
                            isActive
                              ? "bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]"
                              : "text-slate-700 hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)]",
                          ].join(" ")
                        }
                      >
                        {child.label}
                      </NavLink>
                    ),
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <NavLink
            key={item.label}
            to={item.to}
            onClick={() => {
              handleLinkClick();
              if (item.to === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={({ isActive }) =>
              [
                "relative text-sm font-semibold transition",
                "after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[rgb(21,98,160)] after:transition-all",
                isActive
                  ? "text-[rgb(21,98,160)] after:w-full"
                  : "text-slate-700 hover:text-[rgb(21,98,160)] hover:after:w-full",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );

  const renderMobileNav = () => {
    const isArabic = i18n.language === "ar";

    return (
      <>
        <div
          onClick={() => setOpen(false)}
          className={[
            "fixed inset-0 z-[240] bg-slate-900/40 backdrop-blur-[2px] lg:hidden transition-opacity duration-300 ease-out",
            open ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
        />

        <motion.div
          drag="x"
          dragDirectionLock
          dragElastic={0.08}
          dragMomentum={false}
          animate={controls}
          initial={{ x: isArabic ? "-100%" : "100%", scale: 0.985 }}
          onDragEnd={(_, info) => {
            const offsetX = info.offset.x;

            const snapTransition = {
              type: "tween",
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            };

            if (isArabic) {
              if (offsetX < -closeThreshold) {
                setOpen(false);
              } else {
                controls.start({
                  x: 0,
                  scale: 1,
                  transition: snapTransition,
                });
              }
            } else {
              if (offsetX > closeThreshold) {
                setOpen(false);
              } else {
                controls.start({
                  x: 0,
                  scale: 1,
                  transition: snapTransition,
                });
              }
            }
          }}
          dragConstraints={{ left: 0, right: 0 }}
          className={[
            "fixed top-0 z-[250] h-screen w-[88%] max-w-[380px] bg-white shadow-2xl lg:hidden touch-pan-y",
            isArabic ? "left-0" : "right-0",
          ].join(" ")}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src="/images/newLogo-removebg-preview.png"
                  alt="Qassim National Hospital"
                  className="h-11 w-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {nav.map((item) =>
                  item.children || item.sections ? (
                    <div
                      key={item.label}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileItem(item.label)}
                        className={[
                          "flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold transition",
                          mobileOpen === item.label
                            ? "bg-[rgba(21,98,160,0.06)] text-[rgb(21,98,160)]"
                            : "text-slate-700 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={[
                            "h-4 w-4 transition-transform duration-200",
                            mobileOpen === item.label ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </button>

                      <div
                        className={[
                          "grid transition-all duration-300 ease-out",
                          mobileOpen === item.label
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-slate-100 px-3 py-3">
                            <div className="flex flex-col gap-2">
                              {item.children &&
                                item.children.map((child) =>
                                  child.to.startsWith("http") ? (
                                    <a
                                      key={child.label}
                                      href={child.to}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={() => setOpen(false)}
                                      className="block rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-[rgba(21,98,160,0.06)] hover:text-[rgb(21,98,160)]"
                                    >
                                      {child.label}
                                    </a>
                                  ) : (
                                    <NavLink
                                      key={child.label}
                                      to={child.to}
                                      onClick={() => setOpen(false)}
                                      className={({ isActive }) =>
                                        [
                                          "block rounded-xl px-3 py-2.5 text-sm transition",
                                          isActive
                                            ? "bg-[rgba(21,98,160,0.08)] font-medium text-[rgb(21,98,160)]"
                                            : "text-slate-600 hover:bg-[rgba(21,98,160,0.06)] hover:text-[rgb(21,98,160)]",
                                        ].join(" ")
                                      }
                                    >
                                      {child.label}
                                    </NavLink>
                                  ),
                                )}

                              {item.sections &&
                                item.sections.map((section) => {
                                  const Icon = section.icon;
                                  return (
                                    <div
                                      key={section.title}
                                      className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3"
                                    >
                                      <div className="mb-2 flex items-center gap-2 px-1">
                                        {Icon && (
                                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]">
                                            <Icon className="h-4 w-4" />
                                          </div>
                                        )}
                                        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                                          {section.title}
                                        </div>
                                      </div>

                                      <div className="flex flex-col gap-1">
                                        {section.links.map((child) => (
                                          <NavLink
                                            key={child.label}
                                            to={child.to}
                                            onClick={() => setOpen(false)}
                                            className={({ isActive }) =>
                                              [
                                                "block rounded-xl px-3 py-2.5 text-sm transition",
                                                isActive
                                                  ? "bg-white font-medium text-[rgb(21,98,160)] shadow-sm"
                                                  : "text-slate-600 hover:bg-white hover:text-[rgb(21,98,160)]",
                                              ].join(" ")
                                            }
                                          >
                                            {child.label}
                                          </NavLink>
                                        ))}

                                        {section.moreLink && (
                                          <NavLink
                                            to={section.moreLink.to}
                                            onClick={() => setOpen(false)}
                                            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-[rgb(21,98,160)]"
                                          >
                                            {section.moreLink.label}
                                            {i18n.language === "ar" ? (
                                              <ArrowLeft className="h-4 w-4" />
                                            ) : (
                                              <ArrowRight className="h-4 w-4" />
                                            )}{" "}
                                          </NavLink>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}

                              {item.type === "mega" && item.intro?.to && (
                                <Link
                                  to={item.intro.to}
                                  onClick={() => setOpen(false)}
                                  className="mt-1 inline-flex items-center justify-center rounded-xl bg-[rgb(21,98,160)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                                >
                                  {t("departments.viewAllDepartments")}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          "rounded-2xl px-4 py-3.5 text-sm font-semibold transition",
                          isActive
                            ? "bg-[rgba(21,98,160,0.08)] text-[rgb(21,98,160)]"
                            : "text-slate-700 hover:bg-slate-50",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  ),
                )}
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-200 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const newLang = i18n.language === "en" ? "ar" : "en";
                      i18n.changeLanguage(newLang);
                      localStorage.setItem("lang", newLang);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-[rgb(21,98,160)] transition hover:bg-slate-50"
                  >
                    <Globe className="h-4 w-4" />
                    {i18n.language === "en" ? "AR" : "EN"}
                  </button>

                  <a
                    href={`tel:${websiteLinks?.contactInfo?.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <PhoneCall className="h-4 w-4 text-[rgb(21,98,160)]" />
                    Call
                  </a>
                </div>

                <Link
                  to="/appointments-App"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[rgb(21,98,160)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                >
                  {t("common.bookAppointment")}
                </Link>

                {/* <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    placeholder={t("common.search") || "Search..."}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-[rgba(21,98,160,0.35)] focus:bg-white"
                  />
                </div> */}

                <div className="relative">
                  <GlobalSearchBox onSelect={() => setOpen(false)} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  };

  const BottomNav = ({ isSticky = false }) => (
    <div
      className={[
        "relative z-50 bg-white/90 backdrop-blur",
        isSticky ? "shadow-sm" : "shadow-none",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[rgb(21,98,160)]/40" />{" "}
      <div className="mx-auto px-6 md:px-16 xl:px-24 h-[82px] flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/images/newLogo-removebg-preview.png"
            alt="Qassim National Hospital"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {renderDesktopNav()}

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newLang = i18n.language === "en" ? "ar" : "en";
              i18n.changeLanguage(newLang);
              localStorage.setItem("lang", newLang);
            }}
            className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-[rgb(21,98,160)] hover:bg-[rgba(21,98,160,0.05)] transition"
          >
            <Globe className="h-4 w-4" />
            {i18n.language === "en" ? "AR" : "EN"}
          </button>

          <a
            href={`tel:${websiteLinks?.contactInfo?.phone}`}
            className="hidden xl:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            <PhoneCall className="h-4 w-4 text-[rgb(21,98,160)]" />
            {websiteLinks?.contactInfo?.phone}
          </a>

          <Link
            to="/appointments-App"
            className="hidden md:inline-flex items-center justify-center rounded-xl bg-[rgb(21,98,160)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
          >
            {t("common.bookAppointment")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white h-10 w-10 hover:bg-slate-50 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <header className="w-full relative z-[200]">
      <div className="bg-[rgba(21,98,160,0.08)] border-b border-[rgba(21,98,160,0.12)]">
        <div className="mx-auto px-6 md:px-16 xl:px-24 h-11 flex items-center justify-between gap-4">
          <div className="hidden lg:flex items-center gap-5 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[rgb(21,98,160)]" />
              <span>{t("topnav.services24")}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[rgb(21,98,160)]" />
              <span>{t("topnav.location")}</span>
            </div>

            <a
              href={`tel:${websiteLinks?.contactInfo?.phone}`}
              className="flex items-center gap-2 hover:text-[rgb(21,98,160)] transition"
            >
              <PhoneCall className="h-4 w-4 text-[rgb(21,98,160)]" />
              <span>
                {t("topnav.emergency")}: {websiteLinks?.contactInfo?.phone}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-2 text-slate-600">
              <a
                className="p-1.5 rounded-lg hover:bg-white/70 hover:text-[rgb(21,98,160)] transition"
                href={websiteLinks?.socialMediaLinks?.facebook}
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                className="p-1.5 rounded-lg hover:bg-white/70 hover:text-[rgb(21,98,160)] transition"
                href={websiteLinks?.socialMediaLinks?.instagram}
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                className="p-1.5 rounded-lg hover:bg-white/70 hover:text-[rgb(21,98,160)] transition"
                href={websiteLinks?.socialMediaLinks?.twitter}
              >
                <FaXTwitter className="h-4 w-4" />{" "}
              </a>
              <a
                className="p-1.5 rounded-lg hover:bg-white/70 hover:text-[rgb(21,98,160)] transition"
                href={websiteLinks?.socialMediaLinks?.youtube}
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>

            {/* <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                placeholder={t("common.search") || "Search..."}
                className="h-8 w-[220px] rounded-xl bg-white/70 border border-white/60 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-500 outline-none focus:bg-white focus:border-[rgba(21,98,160,0.35)]"
              />
            </div> */}
            <div className="hidden w-[260px] md:block">
              <GlobalSearchBox />
            </div>
          </div>
        </div>
      </div>

      <BottomNav isSticky={false} />

      <div
        className={[
          "fixed top-0 left-0 w-full z-50",
          "will-change-transform transition-all duration-300 ease-out",
          showSticky
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <BottomNav isSticky />
      </div>

      {renderMobileNav()}
    </header>
  );
}
