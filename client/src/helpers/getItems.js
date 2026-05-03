export default function getItems(value, key) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (typeof item === "object") return item?.[key];
      return null;
    })
    .filter(Boolean);
}