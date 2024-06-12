export function formatDate(date: Date | undefined): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date
    ? new Date(date).toLocaleDateString("en-us", options)
    : " unpublished yet";
}
