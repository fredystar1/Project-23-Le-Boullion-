import Link from "next/link";
import Image from "next/image";

interface ImageButtonProps {
  imageUrl: string;
  full_slug: string;
  imageAlt?: string;
  title?: string;
  width?: number;
  height?: number;
}

const ImageButton = ({
  imageUrl,
  full_slug,
  imageAlt,
  title,
  width,
  height,
}: ImageButtonProps) => {
  return (
    <div className="image-button-container">
      <Link className="image-button-top striped" href={full_slug}>
        <div className="image-container">
          <Image
            src={imageUrl}
            width={width}
            height={height}
            alt={imageAlt || title || ""}
            className="object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default ImageButton;
