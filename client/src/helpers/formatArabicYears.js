export function formatArabicYears(count) {
  if (count === 1) return "سنة";
  if (count === 2) return "سنتين";
  if (count >= 3 && count <= 10) return "سنوات";
  return "سنة"; // 11+
}
