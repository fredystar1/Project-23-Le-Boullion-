/**
 * Generic content section wrapper.
 *
 * Provides a consistent `<section>` container with optional headline,
 * color-set class, and tilt/variant passthrough for child components.
 *
 * @module Section
 */

import { ReactNode } from "react";
import { contentPageType, itemVariantsUI, Tilt } from "../lib/styling-types";

/**
 * Props accepted by the {@link Section} component.
 */
interface SectionProps {
  /** Eyebrow text (currently unused in the template but available for future use). */
  eyebrowText?: string;
  /** Content rendered inside the section. */
  children: ReactNode;
  /** Additional CSS class(es) applied to the `<section>` element. */
  className?: string;
  /** Section headline rendered as an `<h2>`. */
  headline?: string;
  /** Additional CSS class for the headline (currently unused in template). */
  headlineClassName?: string;
  /** Tilt direction passed through to child components. */
  tilt?: Tilt;
  /** Card variant used to inform the section's layout context. */
  variant: itemVariantsUI;
  /** Optional color-set class (e.g. `"color-set-4"`) appended to the section. */
  colorSet?: string;
}

/**
 * Render a `<section>` wrapper with an optional headline and color set.
 *
 * When a `colorSet` is provided it is merged with the existing
 * `className` so that CSS custom-property scoping is applied to the
 * section and all its descendants.
 *
 * @param props - See {@link SectionProps}.
 * @returns A `<section>` element wrapping the children.
 */
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
