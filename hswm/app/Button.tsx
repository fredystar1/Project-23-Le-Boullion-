interface ButtonProps {
  buttonText: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

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
      className={`btn-brand hover:cursor-pointer disabled:opacity-50 ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
