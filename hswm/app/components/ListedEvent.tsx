import Image from "next/image";

export const ListedEvent = (props: any) => {
  console.log(props);
  return (
    <div className="flex outline rounded">
      <div>
        <Image
          src={props.story.content.image?.filename}
          width={800}
          height={800}
          alt={props.story.content.image?.meta_data?.alt || ""}
        />
      </div>
      <div>
        <h1>{props.story.content.event_name}</h1>

        <p>{props.story.content.event_description}</p>
      </div>
      <div>
        {props.story.content.event_start}
        {props.story.content.event_end}
      </div>
    </div>
  );
};
