export const cutContent = (content: string) => {
  const maxContentLength = 180;
  return content.length > maxContentLength
    ? content.substring(0, maxContentLength) + "..."
    : content;
};
export const cutTitle = (title: string) => {
  return title.length > 55 ? title.substring(0, 55) + "..." : title;
};
