type DateRangeParts = {
  start: Date;
  end: Date;
  sameDate: boolean;
};

export type DatetimeFormatStyle =
  | "default"
  | "compact"
  | "dateOnly"
  | "timeOnly";

type DateDisplayParts = {
  month?: string;
  day?: string;
  year?: string;
};

export type DateRangeDisplayParts = {
  dateStart?: DateDisplayParts;
  dateEnd?: DateDisplayParts;
  startTime?: string;
  endTime?: string;
  sameDate: boolean;
};

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
