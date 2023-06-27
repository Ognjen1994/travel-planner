import "./CloseButton.scss";

import React, { MouseEventHandler } from "react";

interface CloseButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button className={`close-button ${className}`} onClick={onClick}>
      &times;
    </button>
  );
};

export default CloseButton;
