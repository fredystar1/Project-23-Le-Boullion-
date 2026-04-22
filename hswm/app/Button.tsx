/**
 * Generic button component.
 *
 * A thin wrapper around the native `<button>` element that provides a
 * consistent prop interface for label, type, and disabled state.
 *
 * @module Button
 */

/**
 * Props accepted by the {@link Button} component.
 */
interface ButtonProps {
  /** Text label displayed inside the button. */
  buttonText: string;
  /** Click handler. */
  onClick?: () => void;
  /**
   * HTML button type attribute.
   * @defaultValue `"button"`
   */
  type?: "button" | "submit" | "reset";
  /**
   * Whether the button is disabled.
   * @defaultValue `false`
   */
  disabled?: boolean;
  /** Additional CSS class(es) merged with the base styles. */
  className?: string;
}

/**
 * Render a styled `<button>` element.
 *
 * The `hover:cursor-pointer` utility is always applied; additional
 * classes can be passed via the `className` prop.
 *
 * @param props - See {@link ButtonProps}.
 * @returns A rendered `<button>` element.
 */
const Button = ({
  buttonText,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} hover:cursor-pointer`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
