export function formatDescription(description: string): string {
  return description
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br/>")}</p>`)
    .join("<br/><br/>");
};