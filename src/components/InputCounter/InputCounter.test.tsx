import { fireEvent, render } from "@testing-library/react";
import React from "react";

import InputCounter from "./InputCounter";

describe("InputCounter", () => {
  it("renders the initial value", () => {
    const { getByDisplayValue } = render(
      <InputCounter
        value={5}
        onChange={() => {
          console.log("change");
        }}
      />
    );

    const valueInput = getByDisplayValue("5");
    expect(valueInput).toBeInTheDocument();
  });

  it("increments the value when the increment button is clicked", () => {
    let updatedValue = 0;
    const handleChange = (value: number) => {
      updatedValue = value;
    };

    const { getByText } = render(
      <InputCounter value={5} onChange={handleChange} />
    );
    const incrementButton = getByText("+");
    fireEvent.click(incrementButton);

    expect(updatedValue).toBe(6);
  });

  it("decrements the value when the decrement button is clicked", () => {
    let updatedValue = 0;
    const handleChange = (value: number) => {
      updatedValue = value;
    };

    const { getByText } = render(
      <InputCounter value={5} onChange={handleChange} />
    );
    const decrementButton = getByText("-");
    fireEvent.click(decrementButton);

    expect(updatedValue).toBe(4);
  });

  it("does not decrement the value below 0", () => {
    let updatedValue = 0;
    const handleChange = (value: number) => {
      updatedValue = value;
    };

    const { getByText } = render(
      <InputCounter value={0} onChange={handleChange} />
    );
    const decrementButton = getByText("-");
    fireEvent.click(decrementButton);

    expect(updatedValue).toBe(0);
  });
});
