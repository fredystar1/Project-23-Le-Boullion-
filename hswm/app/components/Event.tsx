import Image from "next/image";

export const Event = (params: any) => {
  return (
    <section>
      <div className="flex outline rounded">
        <div>
          <Image
            src={params.blok.image.filename}
            width={800}
            height={800}
            alt={params.blok.image.meta_data.alt}
          />
        </div>
        <div>
          <h1>{params.blok.event_name}</h1>

          <p>{params.blok.event_description}</p>
        </div>
        <div>
          {params.blok.event_start}
          {params.blok.event_end}
        </div>
      </div>
    </section>
  );
};
