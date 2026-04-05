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
}

export const Section = ({
  variant,
  headline,
  eyebrowText,
  children,
  className = "",
  tilt,
}: SectionProps) => {
  // const combinedClass = tilt ? `${className} ${tilt}` : className;
  return <section className={className}>{children}</section>;
};

export default Section;
