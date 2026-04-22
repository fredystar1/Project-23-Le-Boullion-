/**
 * Date/time formatting utilities used by event and product cards.
 *
 * All functions in this module work with the date-string format returned
 * by Storyblok (`"YYYY-MM-DD HH:mm"`) and produce locale-aware strings
 * via {@link Intl.DateTimeFormat}.
 *
 * @module helpers
 */

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

/**
 * Intermediate representation of a parsed start/end date pair.
 *
 * @internal
 */
type DateRangeParts = {
  /** Parsed start date. */
  start: Date;
  /** Parsed end date. */
  end: Date;
  /** `true` when both dates fall on the same calendar day. */
  sameDate: boolean;
};

/**
 * Controls how {@link datetimeFormatter} and {@link getDateRangeDisplayParts}
 * render a date range.
 *
 * | Style         | Output example (same day)                       |
 * | ------------- | ----------------------------------------------- |
 * | `"default"`   | `"January 5, 2025 • 6:00 PM – 9:00 PM"`        |
 * | `"compact"`   | `"Jan 5 • 6:00 PM–9:00 PM"`                     |
 * | `"dateOnly"`  | `"January 5, 2025"`                              |
 * | `"timeOnly"`  | `"6:00 PM – 9:00 PM"`                            |
 */
export type DatetimeFormatStyle =
  | "default"
  | "compact"
  | "dateOnly"
  | "timeOnly";

/**
 * Individual date components (month, day, year) extracted via
 * {@link Intl.DateTimeFormat.formatToParts}.
 */
type DateDisplayParts = {
  /** Localized month string (e.g. `"January"` or `"Jan"`). */
  month?: string;
  /** Numeric day of the month (e.g. `"5"`). */
  day?: string;
  /** Full year (e.g. `"2025"`). */
  year?: string;
};

/**
 * Structured date-range result returned by {@link getDateRangeDisplayParts}.
 *
 * Consumers can cherry-pick exactly the pieces they need
 * (e.g. render month and day in separate `<p>` tags).
 */
export type DateRangeDisplayParts = {
  /** Decomposed start-date parts. */
  dateStart?: DateDisplayParts;
  /** Decomposed end-date parts. */
  dateEnd?: DateDisplayParts;
  /** Formatted start time string (e.g. `"6:00 PM"`). */
  startTime?: string;
  /** Formatted end time string (e.g. `"9:00 PM"`). */
  endTime?: string;
  /** `true` when start and end fall on the same calendar day. */
  sameDate: boolean;
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Parse two ISO-ish date strings into a {@link DateRangeParts} object.
 *
 * Storyblok stores datetimes with a space separator (`"2025-01-05 18:00"`);
 * the space is replaced with `"T"` so the native `Date` constructor can
 * parse it reliably.
 *
 * @param startString - Raw start-date string from the CMS.
 * @param endString   - Raw end-date string from the CMS.
 * @returns Parsed result, or `null` if either input is missing / invalid.
 *
 * @internal
 */
function getDateRangeParts(
  startString?: string,
  endString?: string,
): DateRangeParts | null {
  if (!startString || !endString) return null;

  const start = new Date(startString.replace(" ", "T"));
  const end = new Date(endString.replace(" ", "T"));

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  return {
    start,
    end,
    sameDate: start.toDateString() === end.toDateString(),
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Format a start/end date-time range into a single human-readable string.
 *
 * @param startString - Raw start-date string (Storyblok format).
 * @param endString   - Raw end-date string (Storyblok format).
 * @param style       - Rendering style. Defaults to `"default"`.
 * @returns Formatted string, or `""` if the inputs cannot be parsed.
 *
 * @example
 * ```ts
 * datetimeFormatter("2025-06-01 18:00", "2025-06-01 21:00");
 * // → "June 1, 2025 • 6:00 PM – 9:00 PM"
 *
 * datetimeFormatter("2025-06-01 18:00", "2025-06-01 21:00", "compact");
 * // → "Jun 1 • 6:00 PM–9:00 PM"
 * ```
 */
export function datetimeFormatter(
  startString?: string,
  endString?: string,
  style: DatetimeFormatStyle = "default",
): string {
  const parts = getDateRangeParts(startString, endString);
  if (!parts) return "";

  const longDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shortDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const formatters: Record<
    DatetimeFormatStyle,
    (parts: DateRangeParts) => string
  > = {
    default: ({ start, end, sameDate }) =>
      sameDate
        ? `${longDate.format(start)} • ${time.format(start)} – ${time.format(end)}`
        : `${longDate.format(start)} • ${time.format(start)} – ${longDate.format(end)} • ${time.format(end)}`,

    compact: ({ start, end, sameDate }) =>
      sameDate
        ? `${shortDate.format(start)} • ${time.format(start)}–${time.format(end)}`
        : `${shortDate.format(start)} ${time.format(start)} – ${shortDate.format(end)} ${time.format(end)}`,

    dateOnly: ({ start, end, sameDate }) =>
      sameDate
        ? longDate.format(start)
        : `${longDate.format(start)} – ${longDate.format(end)}`,

    timeOnly: ({ start, end }) => `${time.format(start)} – ${time.format(end)}`,
  };

  return formatters[style](parts);
}

/**
 * Extract individual date/time components from a `Date` using the provided
 * {@link Intl.DateTimeFormat} formatter.
 *
 * Only `month`, `day`, and `year` parts are returned; other parts
 * (literal separators, etc.) are discarded.
 *
 * @param date      - The `Date` to decompose.
 * @param formatter - An `Intl.DateTimeFormat` instance whose options
 *                    determine the locale representation of each part.
 * @returns An object with the extracted components.
 *
 * @internal
 */
function getDateParts(
  date: Date,
  formatter: Intl.DateTimeFormat,
): DateDisplayParts {
  const result: DateDisplayParts = {};

  for (const part of formatter.formatToParts(date)) {
    if (part.type === "month" || part.type === "day" || part.type === "year") {
      result[part.type] = part.value;
    }
  }

  return result;
}

/**
 * Decompose a start/end date range into structured display parts.
 *
 * Unlike {@link datetimeFormatter}, which returns a single concatenated
 * string, this function hands back an object so that callers (e.g.
 * `EventListItem`) can render each piece independently.
 *
 * @param startString - Raw start-date string (Storyblok format).
 * @param endString   - Raw end-date string (Storyblok format).
 * @param style       - Controls which parts are included and whether
 *                      long or short month names are used.
 * @returns A {@link DateRangeDisplayParts} object, or `null` if parsing fails.
 *
 * @example
 * ```ts
 * const parts = getDateRangeDisplayParts(
 *   "2025-06-01 18:00",
 *   "2025-06-01 21:00",
 *   "compact",
 * );
 * // parts.dateStart → { month: "Jun", day: "1", year: "2025" }
 * // parts.startTime → "6:00 PM"
 * ```
 */
export function getDateRangeDisplayParts(
  startString?: string,
  endString?: string,
  style: DatetimeFormatStyle = "default",
): DateRangeDisplayParts | null {
  const parts = getDateRangeParts(startString, endString);
  if (!parts) return null;

  const { start, end, sameDate } = parts;

  const longDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shortDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const startDateObjLong = getDateParts(start, longDate);
  const endDateObjLong = getDateParts(end, longDate);

  const startDateObjShort = getDateParts(start, shortDate);
  const endDateObjShort = getDateParts(end, shortDate);

  const startTime = time.format(start);
  const endTime = time.format(end);

  const dates: Pick<DateRangeDisplayParts, "dateStart" | "dateEnd"> =
    style === "compact"
      ? { dateStart: startDateObjShort, dateEnd: endDateObjShort }
      : { dateStart: startDateObjLong, dateEnd: endDateObjLong };

  switch (style) {
    case "default":
    case "compact":
      return {
        ...dates,
        startTime,
        endTime,
        sameDate,
      };

    case "dateOnly":
      return { ...dates, sameDate };

    case "timeOnly":
      return {
        startTime,
        endTime,
        sameDate,
      };
  }
}

/**
 * Find the first `paragraph` node inside a Storyblok rich-text content
 * array and return its text, truncated to {@link maxLength} characters.
 *
 * This is used by `EventListItem` to show a brief preview of an event's
 * description without rendering the full rich-text tree.
 *
 * @param contentArray - The `content` array from a Storyblok rich-text field.
 * @param maxLength    - Maximum character count before truncation (default `300`).
 * @returns The extracted (and possibly truncated) plain-text string,
 *          or `""` if no paragraph is found.
 *
 * @example
 * ```ts
 * findAndShortenFirstParagraph(blok.event_description.content, 120);
 * // → "Join us for a night of fine wine tasting featuring..."
 * ```
 */
export function findAndShortenFirstParagraph(
  contentArray: any[],
  maxLength = 300,
): string {
  const paragraph = contentArray.find((node) => node.type === "paragraph");

  if (!paragraph?.content) return "";

  const text = paragraph.content
    .filter((child: any) => child.type === "text")
    .map((child: any) => child.text)
    .join("");

  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength - 3) + "...";
}
