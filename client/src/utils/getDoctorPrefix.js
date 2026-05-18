export default function getDoctorPrefix(rank, lang = "en") {
  const isArabic = lang?.startsWith("ar");

  switch (rank) {
    case "consultant":
    case "specialist":
      return isArabic ? "د." : "Dr.";

    case "professor":
      return isArabic ? "ا.د" : "Prof.";

    default:
      return isArabic ? "د." : "Dr.";
  }
}
