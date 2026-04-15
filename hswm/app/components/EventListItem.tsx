import {
  findAndShortenFirstParagraph,
  getDateRangeDisplayParts,
} from "../lib/helpers";

import { StoryblokServerRichText } from "@storyblok/react/rsc";

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

type EventListItemProps = {
  event: EventContent;
  slug?: string;
};

export const EventListItem = ({ event, slug }: EventListItemProps) => {
  const dateparts = getDateRangeDisplayParts(
    event.event_start,
    event.event_end,
    "compact",
  );
  const shortenedText = findAndShortenFirstParagraph(
    event.event_description.content,
  );
  // console.log(dateparts);
  // console.log(event.event_description.content[0]);
  const dateFormat = (
    <>
      {dateparts?.sameDate ? (
        <div className="color-set-3 event-list-item-date">
          <p className="month">{dateparts.dateStart?.month}</p>
          <p className="day">{dateparts.dateStart?.day}</p>
        </div>
      ) : (
        <div className="color-set-3 event-list-item-date">
          <p className="month">{dateparts?.dateStart?.month}</p>
          <p className="day">{dateparts?.dateStart?.day}</p>
          <br />
          <p className="month">{dateparts?.dateEnd?.month}</p>
          <p className="day">{dateparts?.dateEnd?.day}</p>
        </div>
      )}
    </>
  );
  const textPortion = (
    <div className="event-list-item-content">
      <p>{`${dateparts?.startTime} - ${dateparts?.endTime}`}</p>
      <h3 className="card-title">{event.event_name}</h3>
      <div className="event-list-item-desc">
        {shortenedText && shortenedText}
      </div>
    </div>
  );
  const content = (
    <div className="event-list-item">
      {dateFormat}
      {textPortion}
    </div>
  );

  return content;
};
export default EventListItem;
