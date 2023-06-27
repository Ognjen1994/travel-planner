import "./ErrorMessage.scss";

import React from "react";

import Button from "../Button/Button";

interface ErrorMessageProps {
  message: string;
  onClick: () => void;
}

const ErrorMessage = ({ message, onClick }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <Button onClick={onClick}>Back</Button>
    </div>
  );
};

export default ErrorMessage;
