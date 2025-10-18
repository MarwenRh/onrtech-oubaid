export const cutContent = (content?: string) => {
  const text = content ?? "";
  const maxContentLength = 180;
  return text.length > maxContentLength
    ? text.substring(0, maxContentLength) + "..."
    : text;
};
export const cutTitle = (title?: string) => {
  const text = title ?? "";
  return text.length > 55 ? text.substring(0, 55) + "..." : text;
};
