import "./DatePicker.scss";
import "react-datepicker/dist/react-datepicker.css";

import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import React, { ChangeEvent } from "react";
import DatePickerExternal from "react-datepicker";

import arrowLeft from "../../assets/arrow-circle-left.png";
import arrowRight from "../../assets/arrow-circle-right.png";

interface DatePickerProps {
  id: string;
  value: Date;
  onChange: (val: Date) => void;
  className?: string;
}

const DatePicker = ({ id, value, onChange, className }: DatePickerProps) => {
  const years: number[] = range(1990, getYear(new Date()) + 1, 1);
  const months: string[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return (
    <DatePickerExternal
      id={id}
      className={`custom-input-style ${className}`}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }: any) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            disabled={prevMonthButtonDisabled}
            onClick={decreaseMonth}
          >
            <img src={arrowLeft} alt="Previous Month" />
          </button>

          <select
            className="custom-select-style"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="custom-select-style"
            value={getYear(date)}
            onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) =>
              changeYear(parseInt(value, 10))
            }
          >
            {years.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={nextMonthButtonDisabled}
            onClick={increaseMonth}
          >
            <img src={arrowRight} alt="Next Month" />
          </button>
        </div>
      )}
      selected={value}
      onChange={onChange}
    />
  );
};

export default DatePicker;
