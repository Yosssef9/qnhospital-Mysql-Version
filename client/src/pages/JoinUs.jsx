import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { academicDegrees } from "../constants/academicDegrees";

import {
  UploadCloud,
  CalendarDays,
  Mail,
  Lock,
  Phone,
  User,
  Briefcase,
  GraduationCap,
  VenusAndMars,
  Check,
  ChevronDown,
  Search,
} from "lucide-react";
import BreadcrumbArea from "../components/reusableComponents/BreadcrumbArea";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { nationalities } from "../constants/nationalities";
import SearchableSelect from "../components/SearchableSelect";
import DateSelect from "../components/DateSelect";
import { useJoinUsSettings } from "../api/strapi";
import LoadingOverlay2 from "../components/LoadingOverlay-2";
import getMediaUrl from "../helpers/getMediaUrl";
import SectionBadge from "../components/reusableComponents/SectionBadge";
import SEO from "../components/SEO";
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export default function JoinUs() {
  const { t, i18n } = useTranslation();

  const { data, isLoading, isError } = useJoinUsSettings();
  if (isLoading) return <LoadingOverlay2 />;
  const breadcrumbImage =
    getMediaUrl(data.breadcrumbImage) ||
    getMediaUrl(data?.attributes?.breadcrumbImage) ||
    "/images/about-us-header.jpg";
  console.log("data", data);
  const now = new Date();

  const startDate = data?.formStartDate ? new Date(data.formStartDate) : null;

  const endDate = data?.formEndDate ? new Date(data.formEndDate) : null;

  const isWithinDate =
    (!startDate || now >= startDate) && (!endDate || now <= endDate);

  const isFormOpen = data?.isFormActive && isWithinDate;
  return (
    <div className="bg-[#f8fbfe]">
      <SEO
        title={
          i18n.language?.startsWith("ar")
            ? "انضم إلينا | مستشفى القصيم الوطني"
            : "Join Us | Qassim National Hospital"
        }
        description={
          i18n.language?.startsWith("ar")
            ? "قدّم طلبك للانضمام إلى فريق مستشفى القصيم الوطني واستعرض فرص العمل المتاحة."
            : "Apply to join Qassim National Hospital team and explore available career opportunities."
        }
      />
      <BreadcrumbArea
        imgUrl={breadcrumbImage}
        items={[
          { label: t("navbar.home"), to: "/" },
          { label: t("joinUsPage.breadcrumbTitle") },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -top-20 right-0 h-[320px] w-[320px] rounded-full bg-[rgba(21,98,160,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(21,98,160,0.06)] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center md:px-10 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-3xl"
          >
            <SectionBadge> {t("joinUsPage.eyebrow")}</SectionBadge>

            <h1 className="mt-5 text-3xl font-light tracking-tight text-slate-900 md:text-5xl">
              {data.title}
            </h1>

            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>
      {isFormOpen && (data.jobCampaignTitle || data.jobCampaignDescription) && (
        <section className="mx-auto max-w-7xl px-6 pt-10 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
          >
            <div className="bg-[linear-gradient(180deg,rgba(21,98,160,0.10),rgba(21,98,160,0.03))] p-7 md:p-8">
              {data.jobCampaignBadge && (
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,98,160,0.18)] bg-[rgba(21,98,160,0.07)] px-4 py-1.5 text-sm font-semibold text-[rgb(21,98,160)]">
                  <span className="h-2 w-2 rounded-full bg-[rgb(21,98,160)]" />
                  {data.jobCampaignBadge}
                </div>
              )}

              {data.jobCampaignTitle && (
                <h2 className="mt-4 text-2xl font-semibold text-slate-900 md:text-3xl">
                  {data.jobCampaignTitle}
                </h2>
              )}

              {data.jobCampaignDescription && (
                <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600 md:text-base">
                  {data.jobCampaignDescription}
                </p>
              )}
            </div>
          </motion.div>
        </section>
      )}
      {/* Content */}
      {isFormOpen ? <JoinUsForm /> : <ClosedMessage />}
    </div>
  );
}

function JoinUsForm() {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    specialization: "",
    academicDegree: "",
    yearsOfExperience: "",
    nationality: "",
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const [cvName, setCvName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isArabic = i18n.language === "ar";

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setSubmitted(false);
    setSubmitError("");

    if (files) {
      const file = files[0] || null;

      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      // File type validation
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          cv: "Only PDF, DOC, or DOCX files are allowed.",
        }));

        return;
      }

      // File size validation (5 MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          cv: "File size must be less than 5 MB.",
        }));

        return;
      }

      // Save valid file
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      setCvName(file.name);

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = t("joinUsPage.validation.fullNameRequired");
    if (!form.mobile.trim()) {
      newErrors.mobile = t("joinUsPage.validation.mobileRequired");
    } else if (!/^(\+9665|05)\d{8}$/.test(form.mobile.trim())) {
      newErrors.mobile = t("joinUsPage.validation.mobileInvalid");
    }

    if (!form.dateOfBirth)
      newErrors.dateOfBirth = t("joinUsPage.validation.dateOfBirthRequired");
    if (!form.gender)
      newErrors.gender = t("joinUsPage.validation.genderRequired");

    if (!form.email.trim()) {
      newErrors.email = t("joinUsPage.validation.emailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = t("joinUsPage.validation.emailInvalid");
    }

    if (!form.specialization.trim()) {
      newErrors.specialization = t(
        "joinUsPage.validation.specializationRequired",
      );
    }

    if (!form.academicDegree) {
      newErrors.academicDegree = t(
        "joinUsPage.validation.academicDegreeRequired",
      );
    }

    if (form.yearsOfExperience === "") {
      newErrors.yearsOfExperience = t(
        "joinUsPage.validation.yearsOfExperienceRequired",
      );
    } else if (Number(form.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = t(
        "joinUsPage.validation.yearsOfExperienceInvalid",
      );
    }
    if (!form.nationality.trim()) {
      newErrors.nationality = t("joinUsPage.validation.nationalityRequired");
    }
    if (!form.cv) {
      newErrors.cv = t("joinUsPage.validation.cvRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSubmitError("");

      let uploadedFileId = null;
      // 1) Upload CV first
      if (form.cv) {
        const uploadFormData = new FormData();
        uploadFormData.append("files", form.cv);

        const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
          method: "POST",
          body: uploadFormData,
        });
        console.log("uploadRes", uploadRes);

        if (!uploadRes.ok) {
          throw new Error("Failed to upload CV");
        }

        const uploadData = await uploadRes.json();
        uploadedFileId = uploadData?.[0]?.id;
        if (!uploadedFileId) {
          throw new Error("CV uploaded but file id was not returned");
        }
      }
      // 2) Create job application
      const payload = {
        data: {
          fullName: form.fullName,
          mobile: form.mobile,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          email: form.email,
          nationality: form.nationality,
          specialization: form.specialization,
          academicDegree: form.academicDegree,
          yearsOfExperience: Number(form.yearsOfExperience),
          cv: uploadedFileId,
        },
      };

      const appRes = await fetch(`${STRAPI_URL}/api/job-applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("appRes", appRes);
      if (!appRes.ok) {
        const errorData = await appRes.json().catch(() => null);
        console.error("Create error:", errorData);
        throw new Error("Failed to submit application");
      }

      const appData = await appRes.json();
      console.log("Application created:", appData);

      setSubmitted(true);

      setForm({
        fullName: "",
        mobile: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        nationality: "",
        specialization: "",
        academicDegree: "",
        yearsOfExperience: "",
        cv: null,
      });

      setCvName("");
      setErrors({});
    } catch (error) {
      console.error(error);
      setSubmitError(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = `
    h-12 w-full rounded-2xl border border-slate-200 bg-white
    px-4 text-sm text-slate-800 outline-none transition
    placeholder:text-slate-400
    focus:border-[rgba(21,98,160,0.35)]
    focus:ring-4 focus:ring-[rgba(21,98,160,0.10)]
  `;

  const errorClass = "mt-2 text-xs text-red-500";

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.25fr]">
        {/* Left info card */}
        <motion.div
          initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="h-fit overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(21,98,160,0.10),rgba(21,98,160,0.03))] p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgb(21,98,160)]">
              {t("joinUsPage.sideCard.eyebrow")}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {t("joinUsPage.sideCard.title")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {t("joinUsPage.sideCard.description")}
            </p>
          </div>

          <div className="p-7">
            <div className="space-y-4">
              {[
                t("joinUsPage.sideCard.points.point1"),
                t("joinUsPage.sideCard.points.point2"),
                t("joinUsPage.sideCard.points.point3"),
                t("joinUsPage.sideCard.points.point4"),
              ].map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[rgb(21,98,160)]" />
                  <p className="text-sm leading-7 text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 bg-white p-7">
            <h3 className="text-2xl font-semibold text-slate-900">
              {t("joinUsPage.form.title")}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {t("joinUsPage.form.description")}
            </p>
          </div>

          <div className="p-7">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.fullName")}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder={t("joinUsPage.form.placeholders.fullName")}
                  className={inputBaseClass}
                />
                {errors.fullName && (
                  <p className={errorClass}>{errors.fullName}</p>
                )}
              </div>

              {/* Saudi Mobile Number */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Phone className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.mobile")}
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder={t("joinUsPage.form.placeholders.mobile")}
                  className={inputBaseClass}
                />
                {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarDays className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.dateOfBirth")}
                </label>
                <DateSelect
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  error={errors.dateOfBirth}
                  inputBaseClass={inputBaseClass}
                  placeholder={t("joinUsPage.form.placeholders.dateOfBirth")}
                />
                {errors.dateOfBirth && (
                  <p className={errorClass}>{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <VenusAndMars className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.gender")}
                </label>

                <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-[rgba(21,98,160,0.25)] hover:bg-[rgba(21,98,160,0.05)]">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={form.gender === "male"}
                      onChange={handleChange}
                      className="accent-[rgb(21,98,160)]"
                    />
                    {t("joinUsPage.form.genderOptions.male")}
                  </label>

                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:border-[rgba(21,98,160,0.25)] hover:bg-[rgba(21,98,160,0.05)]">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={form.gender === "female"}
                      onChange={handleChange}
                      className="accent-[rgb(21,98,160)]"
                    />
                    {t("joinUsPage.form.genderOptions.female")}
                  </label>
                </div>

                {errors.gender && <p className={errorClass}>{errors.gender}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("joinUsPage.form.placeholders.email")}
                  className={inputBaseClass}
                />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>
              {/* Nationality */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.nationality")}
                </label>

                <SearchableSelect
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  error={errors.nationality}
                  options={nationalities}
                  inputBaseClass={inputBaseClass}
                  placeholder={t("joinUsPage.form.placeholders.nationality")}
                  searchPlaceholder={t(
                    "joinUsPage.form.placeholders.searchNationality",
                  )}
                  noResultsText={t("common.noResults")}
                />

                {errors.nationality && (
                  <p className={errorClass}>{errors.nationality}</p>
                )}
              </div>
              {/* Specialization */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Briefcase className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.specialization")}
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  placeholder={t("joinUsPage.form.placeholders.specialization")}
                  className={inputBaseClass}
                />
                {errors.specialization && (
                  <p className={errorClass}>{errors.specialization}</p>
                )}
              </div>

              {/* Academic Degree */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <GraduationCap className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.academicDegree")}
                </label>
                <SearchableSelect
                  name="academicDegree"
                  value={form.academicDegree}
                  onChange={handleChange}
                  error={errors.academicDegree}
                  options={academicDegrees}
                  inputBaseClass={inputBaseClass}
                  placeholder={t("joinUsPage.form.placeholders.academicDegree")}
                  searchPlaceholder={t(
                    "joinUsPage.form.placeholders.searchAcademicDegree",
                  )}
                  noResultsText={t("common.noResults")}
                />
                {errors.academicDegree && (
                  <p className={errorClass}>{errors.academicDegree}</p>
                )}
              </div>

              {/* Years of Experience */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Briefcase className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.yearsOfExperience")}
                </label>
                <input
                  type="number"
                  min="0"
                  name="yearsOfExperience"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  placeholder={t(
                    "joinUsPage.form.placeholders.yearsOfExperience",
                  )}
                  className={inputBaseClass}
                />
                {errors.yearsOfExperience && (
                  <p className={errorClass}>{errors.yearsOfExperience}</p>
                )}
              </div>

              {/* Upload CV */}
              <div className="md:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <UploadCloud className="h-4 w-4 text-[rgb(21,98,160)]" />
                  {t("joinUsPage.form.fields.cv")}
                </label>

                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-8 text-center transition hover:border-[rgba(21,98,160,0.35)] hover:bg-[rgba(21,98,160,0.04)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[rgb(21,98,160)] shadow-sm transition group-hover:scale-105">
                    <UploadCloud className="h-6 w-6" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-800">
                    {t("joinUsPage.form.uploadTitle")}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {cvName || t("joinUsPage.form.uploadHint")}
                  </p>

                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>

                {errors.cv && <p className={errorClass}>{errors.cv}</p>}
              </div>
            </div>

            {/* Success message */}
            {submitted && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {t("joinUsPage.form.successMessage")}
              </div>
            )}

            {/* Submit */}
            <div className="mt-8 flex justify-center lg:justify-center ">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-w-[220px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? t("joinUsPage.form.submitting")
                  : t("joinUsPage.form.submit")}
              </button>
              {submitError && (
                <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function ClosedMessage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[30px] border border-slate-200 bg-white shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[linear-gradient(180deg,rgba(21,98,160,0.10),rgba(21,98,160,0.03))] p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[rgb(21,98,160)] shadow-sm">
            <Lock className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            {t("joinUsPage.closed.title")}
          </h2>

          <p className="mt-2 text-slate-600 text-sm leading-7">
            {t("joinUsPage.closed.description")}
          </p>
        </div>

        {/* Body */}
        {/* <div className="p-8 text-center">
          <p className="text-slate-600 text-sm leading-7">
            {t("joinUsPage.closed.note")}
          </p>

          <a
            href="mailto:hr@qnhospital.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[rgb(21,98,160)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            <Mail className="h-4 w-4" />
            {t("joinUsPage.closed.contact")}
          </a>
        </div> */}
      </motion.div>
    </section>
  );
}
