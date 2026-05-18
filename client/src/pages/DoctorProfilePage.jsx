import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseMedical,
  Sparkles,
  Stethoscope,
  GraduationCap,
  CheckCircle2,
  CalendarDays,
  Microscope,
} from "lucide-react";
import SEO from "../components/SEO";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import SectionBadge from "../components/reusableComponents/SectionBadge";
import SectionTitle from "../components/reusableComponents/SectionTitle";
import { useDoctorBySlug } from "../api/strapi";
import { formatArabicYears } from "../helpers/formatArabicYears";
import { trackEvent } from "../utils/analytics";
import { withLang } from "../utils/languageRouting";
import { useEffect } from "react";
import getDoctorPrefix from "../utils/getDoctorPrefix";

export default function DoctorProfilePage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const doctorQuery = useDoctorBySlug(slug);
  const doctor = doctorQuery.data;
  console.log("doctor", doctor);
  useEffect(() => {
    if (!doctor) return;

    trackEvent("doctor_profile_view", {
      doctor_name: doctor.name,
      parent: doctor.parent?.title || "",
    });
  }, [doctor]);
  if (doctorQuery.isLoading) {
    return (
      <div dir={isRTL ? "rtl" : "ltr"} className="bg-[#f6fbff]">
        <BreadcrumbArea
          imgUrl="/images/about-us-header.jpg"
          items={[
            { label: t("navbar.home"), to: "/" },
            { label: t("navbar.ourDoctors"), to: "/our-doctors" },
            { label: t("ourDoctorsPage.profileButton") },
          ]}
        />

        {/* Hero skeleton */}
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 right-0 h-[360px] w-[360px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-[rgba(30,127,143,0.08)] blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-[380px_1fr]">
              {/* Image card skeleton */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-[34px] border-2 border-[rgb(21,98,160)]/20 bg-gradient-to-br from-white via-[#f7fbff] to-[#eef6fc] p-[10px] shadow-[0_25px_70px_rgba(2,32,71,0.08)]">
                  <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-10 right-0 h-36 w-36 rounded-full bg-[rgba(30,127,143,0.10)] blur-3xl" />

                  <div className="relative overflow-hidden rounded-[28px] border border-[rgba(21,98,160,0.10)] bg-[linear-gradient(180deg,#f8fbfe_0%,#edf5fb_100%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />
                    <div className="pointer-events-none absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />

                    <div className="absolute right-4 top-4 z-10 h-8 w-28 animate-pulse rounded-full bg-white/70" />

                    <div className="flex h-[420px] w-full items-center justify-center">
                      <div className="h-[82%] w-[78%] animate-pulse rounded-[28px] bg-slate-200/80" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content skeleton */}
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="h-8 w-32 animate-pulse rounded-full bg-slate-200" />

                <div className="mt-5 h-12 w-[72%] animate-pulse rounded-2xl bg-slate-200" />
                <div className="mt-3 h-12 w-[48%] animate-pulse rounded-2xl bg-slate-200" />

                <div className="mt-5 flex flex-wrap gap-4">
                  <div className="h-10 w-56 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-10 w-40 animate-pulse rounded-full bg-slate-200" />
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-[96%] animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-[88%] animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-[76%] animate-pulse rounded bg-slate-200" />
                </div>

                <div className="mt-8 h-12 w-48 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
        </section>

        {/* Info cards skeleton */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((card) => (
              <div
                key={card}
                className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white p-6 shadow-[0_20px_60px_rgba(2,32,71,0.07)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(21,98,160,0.06)] blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[rgba(30,127,143,0.06)] blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[rgb(21,98,160)] via-[rgb(30,127,143)] to-[rgb(21,98,160)] opacity-90" />

                <div className="relative flex items-center gap-4">
                  <div className="h-14 w-14 animate-pulse rounded-[20px] bg-slate-200" />
                  <div className="h-7 w-44 animate-pulse rounded-xl bg-slate-200" />
                </div>

                <div className="relative mt-6 space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[22px] border border-slate-200/70 bg-gradient-to-r from-[#f8fbfe] to-white px-4 py-4"
                    >
                      <div className="mt-1 h-7 w-7 animate-pulse rounded-full bg-slate-200" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-[92%] animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-[68%] animate-pulse rounded bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="bg-[#f6fbff] flex-1">
        <SEO
          title="Doctor Not Found | Qassim National Hospital"
          description="The requested doctor profile could not be found."
          noIndex
        />
        <BreadcrumbArea
          imgUrl="/images/about-us-header.jpg"
          items={[
            { label: t("navbar.home"), to: "/" },
            { label: t("navbar.ourDoctors"), to: "/our-doctors" },
            { label: t("ourDoctorsPage.profileButton") },
          ]}
        />

        <section className="mx-auto   max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <div className="rounded-[30px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              {t("ourDoctorsPage.emptyState.title")}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              {t("ourDoctorsPage.emptyState.desc")}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-[#f6fbff]">
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? ` ${getDoctorPrefix(doctor.doctorRank, i18n.language)} ${doctor.name} | ${doctor.parent?.title || "طبيب"} | مستشفى القصيم الوطني`
            : `${getDoctorPrefix(doctor.doctorRank, i18n.language)} ${doctor.name} | ${doctor.parent?.title || "Doctor"} | Qassim National Hospital`
        }
        description={
          i18n.language?.startsWith("ar")
            ? `احجز موعدك مع ${getDoctorPrefix(doctor.doctorRank, i18n.language)} ${doctor.name} في ${doctor.parent?.title || "مستشفى القصيم الوطني"}.`
            : `Book an appointment with ${getDoctorPrefix(doctor.doctorRank, i18n.language)} ${doctor.name} at Qassim National Hospital.`
        }
        image={doctor.image || "/Logo.png"}
        type="profile"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Physician",
          name: doctor.name,
          image: doctor.image || "https://qnhospital.com.sa/Logo.png",
          worksFor: {
            "@type": "Hospital",
            name: "Qassim National Hospital",
            url: "https://qnhospital.com.sa",
          },
          medicalSpecialty: doctor.parent?.title || "",
          url: `https://qnhospital.com.sa/${i18n.language || "en"}/our-doctors/${doctor.slug}`,
        }}
      />
      <BreadcrumbArea
        imgUrl="/images/about-us-header.jpg"
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("navbar.ourDoctors"), to: "/our-doctors" },
          {
            label: `${getDoctorPrefix(doctor.doctorRank, i18n.language)} ${doctor.name}`,
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 right-0 h-[360px] w-[360px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-[rgba(30,127,143,0.08)] blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[380px_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative order-2 lg:order-1"
            >
              <div className="group relative overflow-hidden rounded-[34px] border-2 border-[rgb(21,98,160)]/30 bg-gradient-to-br from-white via-[#f7fbff] to-[#eef6fc] p-[10px] shadow-[0_25px_70px_rgba(2,32,71,0.10)]">
                {/* outer soft glow */}
                <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-[rgba(21,98,160,0.10)] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 right-0 h-36 w-36 rounded-full bg-[rgba(30,127,143,0.10)] blur-3xl" />

                {/* decorative frame */}
                <div className="absolute inset-0 rounded-[34px] border border-[rgba(21,98,160,0.10)]" />

                <div className="relative overflow-hidden rounded-[28px] border border-[rgba(21,98,160,0.10)] bg-[linear-gradient(180deg,#f8fbfe_0%,#edf5fb_100%)]">
                  {/* subtle radial light */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />
                  <div className="pointer-events-none absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />

                  {doctor.featured && (
                    <div className="absolute right-4 top-4 z-10">
                      <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-gradient-to-r from-[rgb(21,98,160)] to-[rgb(30,127,143)] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_10px_25px_rgba(21,98,160,0.30)] backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                        {t("ourDoctorsPage.featuredLabel")}
                      </div>
                    </div>
                  )}

                  <img
                    src={
                      doctor.image ||
                      (doctor.gender === "female"
                        ? "/images/female-doctor-default.jpeg"
                        : "/images/doctor-defalut.png")
                    }
                    alt={doctor.name}
                    className="relative z-[1] h-[420px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`${isRTL ? "text-right" : "text-left"} order-1 lg:order-2`}
            >
              <SectionBadge>{doctor.parent?.title}</SectionBadge>

              <SectionTitle className="max-w-3xl font-light leading-tight">
                {`${getDoctorPrefix(doctor.doctorRank, i18n.language)} ${doctor.name}`}
              </SectionTitle>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {" "}
                {doctor.doctorRank && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm">
                    <Stethoscope className="h-4 w-4" />
                    {t("ourDoctorsPage.doctorRankBadge", {
                      rank: t(
                        `ourDoctorsPage.doctorRank.${doctor.doctorRank}`,
                        doctor.doctorRank,
                      ),
                      department:
                        doctor.parent?.shortTitle || doctor.parent?.title || "",
                    })}
                  </div>
                )}
                {doctor.experience ? (
                  <div className="mt-4">
                    <ExperienceBadge experience={doctor.experience} />
                  </div>
                ) : null}
              </div>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                {doctor.shortBio}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={withLang("/appointments-App", i18n.language || "en")}
                  onClick={() =>
                    trackEvent("book_appointment_click", {
                      location: "doctor_profile_page",
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(21,98,160,0.22)] transition hover:-translate-y-0.5 hover:bg-[rgb(15,75,125)] sm:w-auto"
                >
                  <CalendarDays className="h-4 w-4" />
                  {t("common.bookAppointment")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {doctor.specializations?.length > 0 && (
            <InfoCard
              title={t("doctorProfile.specializations")}
              icon={<CheckCircle2 className="h-5 w-5" />}
              itemsIcon={<Stethoscope className="h-4 w-4" />}
              items={doctor.specializations}
              isRTL={isRTL}
            />
          )}
          {doctor.qualifications?.length > 0 && (
            <InfoCard
              title={t("doctorProfile.qualifications")}
              icon={<GraduationCap className="h-5 w-5" />}
              itemsIcon={<Microscope className="h-4 w-4" />}
              items={doctor.qualifications}
              isRTL={isRTL}
            />
          )}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, icon, itemsIcon, items = [], isRTL }) {
  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-white/80 bg-white p-6 shadow-[0_20px_60px_rgba(2,32,71,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(2,32,71,0.10)]">
      {/* background accents */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[rgba(21,98,160,0.06)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[rgba(30,127,143,0.06)] blur-2xl" />

      {/* top border glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[rgb(21,98,160)] via-[rgb(30,127,143)] to-[rgb(21,98,160)] opacity-90" />

      <div
        className={`relative flex items-center gap-4 ${isRTL ? "text-right" : "text-left"}`}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border border-[rgba(21,98,160,0.10)] bg-gradient-to-br from-[rgba(21,98,160,0.12)] to-[rgba(30,127,143,0.10)] text-[rgb(21,98,160)] shadow-sm">
          {icon}
        </div>

        <div>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
        </div>
      </div>

      <div className="relative mt-6 space-y-3">
        {items?.length ? (
          items.map((item) => (
            <div
              key={item.id}
              className={`group/item flex items-start gap-3 rounded-[22px] border border-slate-200/70 bg-gradient-to-r from-[#f8fbfe] to-white px-4 py-4 transition duration-300 hover:border-[rgba(21,98,160,0.18)] hover:shadow-[0_10px_30px_rgba(2,32,71,0.05)] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(21,98,160,0.10)] text-[rgb(21,98,160)]">
                {itemsIcon}
              </div>

              <p className="text-sm leading-7 text-slate-700">{item.title}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[22px] border border-dashed border-slate-200 bg-[#f8fbfe] px-4 py-5 text-sm text-slate-500">
            -
          </div>
        )}
      </div>
    </div>
  );
}
function ExperienceBadge({ experience }) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  const count = Number(experience || 0);

  const word = isArabic
    ? formatArabicYears(count)
    : count === 1
      ? "Year"
      : "Years";

  const text = t("ourDoctorsPage.experienceMoreThan", {
    count,
    word,
  });

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.12)] bg-[rgba(21,98,160,0.08)] px-4 py-2 text-sm font-semibold text-[rgb(21,98,160)] shadow-sm">
      <BriefcaseMedical className="h-4 w-4" />
      {text}
    </div>
  );
}
