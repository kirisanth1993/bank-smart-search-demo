export function highlight(text: string, term: string): string {
  const re = new RegExp(`(${term})`, "gi");
  return text.replace(re, `<mark>$1</mark>`);
}
