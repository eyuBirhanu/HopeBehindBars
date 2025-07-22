import React from "react";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  as: Component = "button",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-block font-bold rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-brand-sky-blue text-white hover:bg-brand-sky-blue/90 focus:ring-brand-sky-blue",
    secondary:
      "bg-transparent border-2 border-brand-dark-gray text-brand-dark-gray hover:bg-brand-dark-gray hover:text-white focus:ring-brand-dark-gray",
  };

  const sizeStyles = {
    sm: "py-2 px-5 text-sm",
    md: "py-2.5 px-6 text-base",
    lg: "py-3 px-8 text-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <Component
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${props.disabled ? disabledStyles : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};
