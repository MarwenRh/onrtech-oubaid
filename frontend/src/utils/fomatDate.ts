export function formatDate(date: Date | string | number | undefined): string {
  if (!date) return " unpublished yet";
  const d = new Date(date);
  if (isNaN(d.getTime())) return " unpublished yet";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return d.toLocaleDateString("en-us", options);
}