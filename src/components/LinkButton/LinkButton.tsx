import "./LinkButton.scss";

import React, { MouseEventHandler } from "react";

interface LinkButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
}

const LinkButton = ({ onClick, className, children }: LinkButtonProps) => {
  return (
    <button className={`link-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default LinkButton;
