import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { ArrowRight, ArrowLeft, Mail, PhoneCall, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getSiteNav } from "../data/navData";
// import { CONTACT } from "../data/contact";
import SectionPrimaryButton from "./SectionPrimaryButton";
import { useWebsiteLinks } from "../api/strapi";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterDesignV2() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const nav = useMemo(() => getSiteNav(t), [t]);
  const { data: websiteLinks, isLoading } = useWebsiteLinks();

  const aboutLinks =
    nav.find((item) => item.label === t("navbar.about"))?.children || [];

  const departmentsItem =
    nav.find((item) => item.label === t("navbar.departments")) || null;

  const departmentViewAllLinks =
    departmentsItem?.sections
      ?.map((section) => section.moreLink)
      .filter(Boolean) || [];
  const quickLinks = nav.filter(
    (item) => item.to && item.label !== t("navbar.home"),
  );

  const socialLinks = [
    {
      Icon: FaFacebookF,
      href: websiteLinks?.socialMediaLinks?.facebook,
      label: "Facebook",
    },
    {
      Icon: FaXTwitter,
      href: websiteLinks?.socialMediaLinks?.twitter,
      label: "X (Twitter)",
    },
    {
      Icon: FaInstagram,
      href: websiteLinks?.socialMediaLinks?.instagram,
      label: "Instagram",
    },
    {
      Icon: FaYoutube,
      href: websiteLinks?.socialMediaLinks?.youtube,
      label: "YouTube",
    },
  ].filter((item) => item.href);
  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="mt-auto overflow-hidden border-t border-slate-200 bg-white"
    >
      {/* TOP CTA STRIP */}
      <div className="relative overflow-hidden border-b border-[rgba(21,98,160,0.12)] bg-[rgba(21,98,160,0.12)]">
        <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-0 h-36 w-36 rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />

        <div className="relative mx-auto flex flex-col items-start justify-between gap-4 px-6 py-4 md:flex-row md:items-center md:px-16 xl:px-24 border-y-2 border-[rgba(21,98,160,0.15)]">
          <div className={isRTL ? "text-right" : "text-left"}>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgb(21,98,160)]">
              {t("footer.cta.eyebrow")}
            </div>

            <div className="mt-1 text-lg font-semibold text-slate-900 md:text-xl">
              {t("footer.cta.title")}
            </div>
          </div>

          <div
            className={`flex w-full flex-col gap-3 sm:flex-row md:w-auto ${isRTL ? "sm:flex-row" : ""}`}
          >
            <a
              href={`tel:${websiteLinks?.contactInfo?.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(21,98,160,0.25)] bg-white px-4 py-2 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm transition hover:bg-[rgba(21,98,160,0.06)]"
            >
              <PhoneCall className="h-4 w-4" />
              {websiteLinks?.contactInfo?.phone}
            </a>

            <SectionPrimaryButton to="/appointments-App">
              {t("common.bookAppointment")}
            </SectionPrimaryButton>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="relative bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 right-0 h-56 w-56 rounded-full bg-[rgba(21,98,160,0.05)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[rgba(21,98,160,0.04)] blur-3xl" />
        </div>

        <div className="relative mx-auto px-6 py-14 md:px-16 md:py-16 xl:px-24">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            {/* LEFT BRAND BLOCK */}
            <div className={isRTL ? "text-right" : "text-left"}>
              <div
                className={`flex items-center gap-4 ${isRTL ? "flex-row justify-start" : ""}`}
              >
                <img
                  src="/images/newLogo-removebg-preview.png"
                  alt="Qassim National Hospital"
                  className="h-14 w-auto object-contain"
                />

                {/* <div className="hidden md:block">
                  <div className="text-xl font-main text-slate-900">
                    {t("footer.brand.name")}
                  </div>
                  <div className="text-sm text-slate-500">
                    {t("footer.brand.tagline")}
                  </div>
                </div> */}
              </div>

              <p className="mt-6 max-w-xl text-sm leading-8 text-slate-600 md:text-base">
                {t("footer.brand.description")}
              </p>

              <div className="mt-8 space-y-4 text-sm text-slate-700">
                <div className={`flex items-start gap-3 `}>
                  <MapPin className="mt-0.5 h-5 w-5 text-[rgb(21,98,160)]" />
                  <span>{t("footer.contact.address")}</span>
                </div>

                <div className={`flex items-center gap-3 `}>
                  <PhoneCall className="h-5 w-5 text-[rgb(21,98,160)]" />
                  <a
                    href={`tel:${websiteLinks?.contactInfo?.phone}`}
                    className="transition hover:text-[rgb(21,98,160)]"
                  >
                    {websiteLinks?.contactInfo?.phone}
                  </a>
                </div>

                <div className={`flex items-center gap-3 `}>
                  <Mail className="h-5 w-5 text-[rgb(21,98,160)]" />
                  <a
                    href={`mailto:${websiteLinks?.contactInfo?.email}`}
                    className="transition hover:text-[rgb(21,98,160)]"
                  >
                    {websiteLinks?.contactInfo?.email}
                  </a>
                </div>
              </div>

              <div className={`mt-8 flex items-center gap-3 `}>
                {socialLinks.map(({ Icon, href, label }, i) => (
                  <a
                    key={i}
                    href={href}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[rgba(21,98,160,0.35)] hover:bg-[rgba(21,98,160,0.06)] hover:text-[rgb(21,98,160)] ${isRTL ? "hover:-translate-x-1" : "hover:translate-x-1"}`}
                    aria-label={`Visit our ${label} page`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT LINKS */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <FooterCol
                title={t("navbar.about")}
                links={aboutLinks}
                isRTL={isRTL}
              />

              <FooterCol
                title={t("navbar.departments")}
                links={departmentViewAllLinks}
                isRTL={isRTL}
              />

              <FooterCol
                title={t("footer.quickLinks")}
                links={quickLinks}
                isRTL={isRTL}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-200 bg-slate-50/80 backdrop-blur-sm ">
        <div
          className={`mx-auto flex flex-col-reverse items-center justify-between gap-4 px-6 py-5 md:flex-row md:px-16 xl:px-24 ${isRTL ? "md:flex-row-reverse" : ""}`}
        >
          <div
            className={`text-center text-sm text-slate-500 md:text-left ${isRTL ? "md:text-right" : ""}`}
          >
            © {new Date().getFullYear()} {t("footer.brand.name")} .{" "}
            {t("footer.poweredBy")}{" "}
            <span className="font-semibold text-[rgb(21,98,160)] whitespace-nowrap">
              QNH IT Team
            </span>
          </div>

          {/* <div
            className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <span className="text-sm text-slate-600">
              {t("footer.chi.label")}
            </span>

            <a
              href="https://www.chi.gov.sa/pages/Home.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[rgb(21,98,160)] transition hover:text-[rgb(15,75,125)]"
            >
              {t("footer.chi.visit")}
            </a>

            <img
              src="/images/chi logo.png"
              className="h-9 w-auto object-contain"
              alt="CHI Logo"
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, isRTL }) {
  return (
    <div className={isRTL ? "text-right" : "text-left"}>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(21,98,160)]">
        {title}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {links.map((l) => {
          const href = l.to || l.href;
          const isInternal = href?.startsWith("/");

          if (!href) return null;

          return isInternal ? (
            <Link
              key={`${title}-${l.label}-${href}`}
              to={href}
              className="text-sm text-slate-600 transition hover:text-[rgb(21,98,160)]"
            >
              {l.label}
            </Link>
          ) : (
            <a
              key={`${title}-${l.label}-${href}`}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-slate-600 transition hover:text-[rgb(21,98,160)]"
            >
              {l.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
