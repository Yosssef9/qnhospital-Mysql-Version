export const getDoctorParent = (doctor) => {
  const parent =
    doctor.clinic ||
    doctor.unit ||
    doctor.center ||
    doctor.medical_service ||
    null;

  return {
    title: parent?.title || "",
    shortTitle: parent?.shortTitle || parent?.title || "",
    slug: parent?.slug || "",
    cardDesc: parent?.cardDesc || "",
    type: doctor.clinic
      ? "clinic"
      : doctor.unit
        ? "unit"
        : doctor.center
          ? "center"
          : doctor.medical_service
            ? "medical-service"
            : "",
  };
};
