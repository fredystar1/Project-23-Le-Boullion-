import { ReactNode } from "react";
import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";

interface SectionProps {
  eyebrowText?: string;
  children: ReactNode;
  className?: string;
  headline?: string;
  headlineClassName?: string;
  tilt?: Tilt;
  variant: itemVariantsUI;
  colorSet?: string;
}

export const Section = ({
  variant,
  headline,
  eyebrowText,
  children,
  className = "",
  tilt,
  colorSet,
}: SectionProps) => {
  const combinedClass = colorSet ? `${className} ${colorSet}` : className;
  return (
    <section className={combinedClass}>
      <h2 className="section-headline">{headline}</h2>
      {children}
    </section>
  );
};

export default Section;
