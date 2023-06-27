import { fireEvent, render } from "@testing-library/react";
import React from "react";

import LinkButton from "./LinkButton";

describe("LinkButton", () => {
  it("renders the button with children", () => {
    const { getByText } = render(<LinkButton>Click me</LinkButton>);
    const button = getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("applies the className prop to the button", () => {
    const { getByText } = render(
      <LinkButton className="custom-class">Click me</LinkButton>
    );
    const button = getByText("Click me");
    expect(button).toHaveClass("custom-class");
  });

  it("calls the onClick callback when the button is clicked", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    const { getByText } = render(
      <LinkButton onClick={handleClick}>Click me</LinkButton>
    );
    const button = getByText("Click me");
    fireEvent.click(button);

    expect(clicked).toBe(true);
  });
});
