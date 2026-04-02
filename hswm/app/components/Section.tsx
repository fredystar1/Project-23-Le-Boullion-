import { ReactNode } from "react";
import { Tilt } from "../lib/styling-types";

interface SectionProps {
  eyebrowText?: string;
  children: ReactNode;
  className?: string;
  headlineClassName?: string;
  tilt?: Tilt;
}

export const Section = ({
  eyebrowText,
  children,
  className = "",
  headlineClassName = "section-title",
  tilt,
}: SectionProps) => {
  const combinedClass = tilt ? `${className} ${tilt}` : className;
  return (
    <section className={combinedClass}>
      {/* {headline && (
        <h2 className={headlineClassName}>
          <span className="featured-heading-label">{headline}</span>
        </h2>
      )} */}
      {children}
    </section>
  );
};

export default Section;
