import { EventCard } from "../components/EventCard";

export const Event = ({ blok }: any) => {
  return <EventCard variant={"detailed"} event={blok} />;
};
