import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  Globe,
  ArrowRight,
  HeartPulse,
  Building2,
  Stethoscope,
  ShieldPlus,
} from "lucide-react";
import { CONTACT } from "../data/contact";
import { useTranslation } from "react-i18next";
export default function NavBarDesignV2() {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({});
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const handleHomeClick = () => {
    // close mobile menu if open
    setOpen(false);

    // if already on home → force scroll
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const nav = useMemo(
    () => [
      { label: t("navbar.home"), to: "/" },

      {
        label: t("navbar.about"),
        children: [
          { label: t("navbar.qnhHistory"), to: "/qnh-history" },
          { label: t("navbar.missionVision"), to: "/mission-vision" },
          { label: t("navbar.patientsRights"), to: "/patients-rights" },
          {
            label: t("navbar.hospitalAccreditations"),
            to: "/hospital-accreditations",
          },
          {
            label: t("navbar.staffPortal"),
            to: "https://www.qnhospital.com/portal/",
          },
        ],
      },

      {
        label: t("navbar.departments"),
        type: "mega",
        intro: {
          eyebrow: t("departments.introEyebrow"),
          title: t("departments.introTitle"),
          desc: t("departments.introDesc"),
          to: "/medical-departments",
        },
        sections: [
          {
            title: t("departments.clinics"),
            icon: Stethoscope,
            links: [
              {
                label: t("departments.items.cardiology"),
                to: "/clinics/cardiology",
              },
              {
                label: t("departments.items.dermatology"),
                to: "/clinics/dermatology",
              },
              {
                label: t("departments.items.pediatrics"),
                to: "/clinics/pediatrics",
              },
              { label: t("departments.items.ent"), to: "/clinics/ent" },
              {
                label: t("departments.items.ophthalmology"),
                to: "/clinics/ophthalmology",
              },
            ],
            moreLink: {
              label: t("departments.viewAllClinics"),
              to: "/medical-departments?tab=Clinics",
            },
          },

          {
            title: t("departments.units"),
            icon: ShieldPlus,
            links: [
              {
                label: t("departments.items.cardiacCatheterization"),
                to: "/units/Cardiac-Catheterization",
              },
              {
                label: t("departments.items.emergency"),
                to: "/units/Emergency",
              },
              {
                label: t("departments.items.intensiveCare"),
                to: "/units/Intensive-Care",
              },
              {
                label: t("departments.items.newbornIntensiveCare"),
                to: "/units/Newborn-Intensive-Care",
              },
              {
                label: t("departments.items.pediatricIntensiveCare"),
                to: "/units/Pediatric Intensive Care",
              },
            ],
            moreLink: {
              label: t("departments.viewAllUnits"),
              to: "/medical-departments?tab=Units",
            },
          },

          {
            title: t("departments.medicalServices"),
            icon: HeartPulse,
            links: [
              {
                label: t("departments.items.radiology"),
                to: "/medical-service/Radiology",
              },
              {
                label: t("departments.items.laboratory"),
                to: "/medical-service/Laboratory",
              },
              {
                label: t("departments.items.anesthesiology"),
                to: "/medical-service/Anesthesiology",
              },
              {
                label: t("departments.items.operations"),
                to: "/medical-service/Operations",
              },
              {
                label: t("departments.items.infectionControl"),
                to: "/medical-service/Infection-Control",
              },
            ],
            moreLink: {
              label: t("departments.viewAllServices"),
              to: "/medical-departments?tab=Services",
            },
          },

          {
            title: t("departments.centers"),
            icon: Building2,
            links: [
              {
                label: t("departments.items.physiotherapyCenter"),
                to: "/centers/Physiotherapy-Center",
              },
            ],
            moreLink: {
              label: t("departments.viewAllCenters"),
              to: "/medical-departments?tab=Centers",
            },
          },
        ],
      },

      {
        label: t("navbar.doctors"),
        children: [
          { label: t("navbar.findDoctor"), to: "/doctors" },
          { label: t("navbar.doctorSchedule"), to: "/doctors/schedule" },
        ],
      },

      { label: t("navbar.eServices"), to: "/e-services" },
      { label: t("navbar.contact"), to: "/contact" },
    ],
    [t],
  );

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) setMobileOpen({});
  }, [open]);

  const toggleMobileItem = (label) => {
    setMobileOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isParentActive = (item) => {
    const path = window.location.pathname;

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

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 border-b border-slate-200 shadow-sm transition-all duration-300",
        sticky ? "bg-white/92 backdrop-blur-xl" : "bg-white/70",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[82px] items-center justify-between gap-6 px-6 md:px-16 xl:px-24">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/images/newLogo-removebg-preview.png"
            alt="Qassim National Hospital"
            className="h-12 w-auto object-contain"
          />
          {/* <div className="hidden lg:block">
            <div className="text-[15px] font-semibold leading-tight text-slate-800">
              Qassim National Hospital
            </div>
            <div className="text-xs text-slate-500">
              Trusted care in Al-Qassim
            </div>
          </div> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const parentActive = isParentActive(item);

            if (item.type === "mega") {
              return (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className={[
                      "relative inline-flex items-center gap-1 text-sm font-medium transition",
                      "after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-0 after:bg-[rgb(21,98,160)] after:transition-all",
                      parentActive
                        ? "text-[rgb(21,98,160)] after:w-full"
                        : "text-slate-700 hover:text-[rgb(21,98,160)] group-hover:after:w-full",
                    ].join(" ")}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <div
                    className="
                      invisible absolute left-1/2 top-full z-[70] w-[980px] -translate-x-1/2 translate-y-2 pt-5 opacity-0
                      transition-all duration-200
                      group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                    "
                  >
                    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
                      <div className="grid grid-cols-[320px_1fr]">
                        {/* Left Intro Panel */}
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
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[rgb(21,98,160)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                          >
                            {t("departments.viewAllDepartments")}
                            <ArrowRight className="h-4 w-4" />
                          </Link>

                          {/* <div className="mt-8 rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              Featured
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {[
                                {
                                  label: "Emergency",
                                  to: "/departments/emergency",
                                },
                                {
                                  label: "Cardiology",
                                  to: "/clinics/cardiology",
                                },
                                {
                                  label: "Pediatrics",
                                  to: "/clinics/pediatrics",
                                },
                                {
                                  label: "Radiology",
                                  to: "/medical-service/radiology",
                                },
                              ].map((feature) => (
                                <NavLink
                                  key={feature.label}
                                  to={feature.to}
                                  className="rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-[rgba(21,98,160,0.08)] hover:text-[rgb(21,98,160)]"
                                >
                                  {feature.label}
                                </NavLink>
                              ))}
                            </div>
                          </div> */}
                        </div>

                        {/* Right Grid */}
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
                                      <ArrowRight className="h-4 w-4 translate-x-0 opacity-0 transition duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                                    </NavLink>
                                  ))}
                                </div>

                                {section.moreLink && (
                                  <NavLink
                                    to={section.moreLink.to}
                                    className="mt-2 inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[rgb(21,98,160)] transition hover:opacity-80"
                                  >
                                    {section.moreLink.label}
                                    <ArrowRight className="h-4 w-4" />
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
                      "relative inline-flex items-center gap-1 text-sm font-medium transition",
                      "after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-0 after:bg-[rgb(21,98,160)] after:transition-all",
                      parentActive
                        ? "text-[rgb(21,98,160)] after:w-full"
                        : "text-slate-700 hover:text-[rgb(21,98,160)] group-hover:after:w-full",
                    ].join(" ")}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <div
                    className="
                      invisible absolute left-0 top-full z-[60] translate-y-2 pt-4 opacity-0
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
                onClick={
                  item.to === "/" ? handleHomeClick : () => setOpen(false)
                }
                className={({ isActive }) =>
                  [
                    "relative text-sm font-medium transition",
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

        {/* Right Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={() => {
              const newLang = i18n.language === "en" ? "ar" : "en";
              i18n.changeLanguage(newLang);
              localStorage.setItem("lang", newLang);
            }}
            className="hidden md:inline-flex cursor-pointer items-center gap-2
  rounded-xl border border-slate-200 bg-white
  px-3 py-2 text-sm font-medium text-[rgb(21,98,160)]
  hover:bg-[rgba(21,98,160,0.05)]
  transition"
          >
            <Globe className="h-4 w-4" />
            {i18n.language === "en" ? "AR" : "EN"}
          </button>

          <a
            href={`tel:${CONTACT.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[rgba(21,98,160,0.3)] hover:text-[rgb(21,98,160)]"
          >
            <PhoneCall className="h-4 w-4 text-[rgb(21,98,160)]" />
            {CONTACT.phone}
          </a>

          <Link
            to="/appointments"
            className="inline-flex items-center rounded-full bg-[rgb(21,98,160)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {t("common.bookAppointment")}
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile */}
      <div
        className={[
          "overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 lg:hidden",
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="flex flex-col gap-2 px-6 py-4">
          {nav.map((item) =>
            item.children || item.sections ? (
              <div
                key={item.label}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleMobileItem(item.label)}
                  className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={[
                      "h-4 w-4 transition-transform duration-200",
                      mobileOpen[item.label] ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                <div
                  className={[
                    "grid transition-all duration-300 ease-out",
                    mobileOpen[item.label]
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-2 px-2 pb-2">
                      {item.children &&
                        item.children.map((child) =>
                          child.to.startsWith("http") ? (
                            <a
                              key={child.label}
                              href={child.to}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setOpen(false)}
                              className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-[rgba(21,98,160,0.06)] hover:text-[rgb(21,98,160)]"
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
                                  "block rounded-xl px-3 py-2 text-sm transition",
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
                        item.sections.map((section) => (
                          <div
                            key={section.title}
                            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-2"
                          >
                            <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {section.title}
                            </div>

                            <div className="flex flex-col gap-1">
                              {section.links.map((child) => (
                                <NavLink
                                  key={child.label}
                                  to={child.to}
                                  onClick={() => setOpen(false)}
                                  className={({ isActive }) =>
                                    [
                                      "block rounded-xl px-3 py-2 text-sm transition",
                                      isActive
                                        ? "bg-[rgba(21,98,160,0.08)] font-medium text-[rgb(21,98,160)]"
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
                                  <ArrowRight className="h-4 w-4" />
                                </NavLink>
                              )}
                            </div>
                          </div>
                        ))}

                      {item.type === "mega" && item.intro?.to && (
                        <Link
                          to={item.intro.to}
                          onClick={() => setOpen(false)}
                          className="mt-1 inline-flex items-center justify-center rounded-xl bg-[rgb(21,98,160)] px-4 py-3 text-sm font-semibold text-white"
                        >
                          {t("departments.viewAllDepartments")}
                        </Link>
                      )}
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
                    "rounded-xl px-3 py-3 text-sm font-medium transition",
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

          <Link
            to="/appointments"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-[rgb(21,98,160)] px-4 py-3 text-sm font-semibold text-white"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
