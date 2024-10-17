import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "disable";
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  const baseStyle =
    "font-bold text-cus_navy text-sm transition-colors duration-200 rounded-md";
  const variantStyle = {
    primary:
      "w-[116px] h-[46px] cursor-pointer bg-cus_yellow hover:bg-cus_yellow_light",
    secondary:
      "w-[90px] h-[46px] cursor-pointer bg-btn_gray hover:bg-[#759BEE]",
    disable: "bg-gray-100 cursor-not-allowed",
  };
  const appliedStyle = disabled ? variantStyle.disable : variantStyle[variant];
  return (
    <button
      className={`${baseStyle} ${className} ${appliedStyle} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
