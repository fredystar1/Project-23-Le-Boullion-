export function datetimeFormatter(
  startString?: string,
  endString?: string,
) {
  if (!startString || !endString) return "";

  const start = new Date(startString.replace(" ", "T"));
  const end = new Date(endString.replace(" ", "T"));

  const sameDay = start.toDateString() === end.toDateString();

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (sameDay) {
    return `${dateFormatter.format(start)} • ${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;
  }

  return `${dateFormatter.format(start)} • ${timeFormatter.format(start)} – ${dateFormatter.format(end)} • ${timeFormatter.format(end)}`;
}
