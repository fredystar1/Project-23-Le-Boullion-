import { ReactNode } from "react";

type SectionType = "editorial" | "pricing";

interface SectionProps {
  eyebrowText?: string;
  children: ReactNode;
  className?: string;
  headline?: string;
  colorSet?: string;
  sectionType?: SectionType;
}

export const Section = ({
  headline,
  eyebrowText,
  children,
  className = "",
  colorSet,
  sectionType,
}: SectionProps) => {
  const combinedClass = colorSet ? `${className} ${colorSet}` : className;
  return (
    <section className={`section ${combinedClass} bg-[var(--surface)]`}>
      {eyebrowText && <span className="section-eyebrow">{eyebrowText}</span>}
      {headline && <h2 className="section-headline">{headline}</h2>}
      {children}
    </section>
  );
};

export default Section;
