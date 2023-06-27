import { fireEvent, render } from "@testing-library/react";
import React from "react";

import Button from "./Button";

describe("Button", () => {
  it("renders the button with children", () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("applies the className prop to the button", () => {
    const { getByText } = render(
      <Button className="custom-class">Click me</Button>
    );
    const button = getByText("Click me");
    expect(button).toHaveClass("custom-class");
  });

  it("disables the button when isDisabled prop is true", () => {
    const { getByText } = render(<Button isDisabled>Click me</Button>);
    const button = getByText("Click me");
    expect(button).toBeDisabled();
  });

  it("calls the onClick callback when the button is clicked", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    const button = getByText("Click me");
    fireEvent.click(button);

    expect(clicked).toBe(true);
  });

  it("sets the correct button type based on the type prop", () => {
    const { getByText } = render(<Button type="submit">Submit</Button>);
    const button = getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });
});
