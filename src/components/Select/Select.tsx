import React from "react";
import ReactSelect, { Props as ReactSelectProps } from "react-select";

type SelectProps = ReactSelectProps<any>;

const Select = (props: SelectProps) => {
  const customStyles = {
    dropdownIndicator: (base: any) => ({
      ...base,
      display: "none",
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      display: "none",
    }),
    clearIndicator: (base: any) => ({
      ...base,
      color: "var(--primary-color)",
    }),
  };

  return <ReactSelect {...props} styles={customStyles} />;
};

export default Select;
