import "./Button.scss";

import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
}

const Button = ({
  type,
  isDisabled = false,
  onClick,
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`button ${className} ${isDisabled ? " button--disabled" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
