import { DatetimeFormatStyle, getDateRangeDisplayParts } from "../lib/helpers";
import { Tilt } from "../lib/styling-types";

type EventContent = {
  event_name?: string;
  event_description?: any;
  event_start?: string;
  event_end?: string;
  price?: string | number;
  actionText?: string;
  image?: {
    filename?: string;
    meta_data?: {
      alt?: string;
    };
  };
};

type EventCardVariants = "featured" | "detailed" | "list";

type EventCardProps = {
  event: EventContent;
  slug?: string;
  variant?: EventCardVariants;
  tilt?: Tilt;
  eyebrowText?: string;
  datetimeFormat?: DatetimeFormatStyle;
};

export const EventListItem = ({
  event,
  slug,
  variant,
  tilt,
  eyebrowText,
  datetimeFormat,
}: EventCardProps) => {
  const dateparts = getDateRangeDisplayParts(
    event.event_start,
    event.event_end,
    "compact",
  );
  console.log(dateparts);
  const dateFormat = (
    <>
      {dateparts?.sameDate && (
        <>
          <p>{dateparts.dateStart.month}</p>
          <p>{dateparts.dateStart.day}</p>
        </>
      )}
    </>
  );
  return <>{dateFormat}</>;
};
export default EventListItem;
