import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "disable";
  disabled?: boolean;
  type?: "button" | "submit";
};

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const baseStyle =
    "font-bold text-cus_navy px-6 py-2 break-words transition-colors duration-200 rounded-md shadow shadow-cus_navy hover:bg-cus_gray_light";
  const variantStyle = {
    primary: "cursor-pointer bg-cus_yellow ",
    secondary: "cursor-pointer bg-btn_gray",
    disable: "bg-gray-100 cursor-not-allowed",
  };
  const appliedStyle = disabled ? variantStyle.disable : variantStyle[variant];
  return (
    <button
      type={type}
      className={`${baseStyle} ${className} ${appliedStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
