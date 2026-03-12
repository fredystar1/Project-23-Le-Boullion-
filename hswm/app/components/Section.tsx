import { ReactNode } from "react";

interface SectionProps {
  headline?: string;
  children: ReactNode;
  className?: string;
  headlineClassName?: string;
}

export const Section = ({
  headline,
  children,
  className = "",
  headlineClassName = "featured-heading",
}: SectionProps) => {
  return (
    <section className={className}>
      {headline && (
        <h2 className={headlineClassName}>
          <span className="featured-heading-label">{headline}</span>
        </h2>
      )}
      {children}
    </section>
  );
};

export default Section;
