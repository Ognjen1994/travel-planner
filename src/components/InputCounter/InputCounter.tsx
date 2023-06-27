import "./InputCounter.scss";

import React from "react";

interface InputCounterProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const InputCounter = ({ value, onChange, className }: InputCounterProps) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="input-field">
      <button
        type="button"
        className="decrement-button"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        readOnly
        type="text"
        className={`value-input ${className}`}
        value={value}
      />
      <button
        type="button"
        className="increment-button"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default InputCounter;
