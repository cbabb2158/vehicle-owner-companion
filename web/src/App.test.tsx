import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("Vehicle Owner Companion prototype", () => {
  it("moves from the garage through vehicle knowledge to a question", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Your garage" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /open chris/i }));

    expect(
      screen.getByRole("heading", { name: "Chris's CX-5" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /browse knowledge/i }));

    expect(
      screen.getByRole("heading", { name: "Knowledge topics" })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /where is the odometer/i })
    );

    expect(
      screen.getByRole("heading", { name: "Where is the odometer?" })
    ).toBeInTheDocument();
    expect(screen.getByText("Needs source verification")).toBeInTheDocument();
  });

  it("filters the settings explorer with plain-language search", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));

    expect(
      screen.getByRole("heading", { name: "Settings explorer" })
    ).toBeInTheDocument();

    const results = screen.getByTestId("settings-results");
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "profile" }
    });

    expect(
      within(results).getByRole("button", { name: /driver personalization/i })
    ).toBeInTheDocument();
    expect(
      within(results).queryByRole("button", { name: /walk-away locking/i })
    ).not.toBeInTheDocument();
  });

  it("keeps all three vehicles available when returning to the garage", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open jenny/i }));
    fireEvent.click(screen.getByRole("button", { name: "Garage" }));

    expect(
      screen.getByRole("heading", { name: "Chris's CX-5" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Jenny's CX-5" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Elie's CX-5" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Chris's Machine Gray Metallic 2026 Mazda CX-5 Premium Plus"
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Jenny's Soul Red Crystal Metallic 2026 Mazda CX-5 Premium Plus"
      })
    ).toBeInTheDocument();
    const elieImage = screen.getByRole("img", {
      name: "Elie's Platinum Quartz Metallic 2024 Mazda CX-5 Select"
    });
    expect(elieImage).toBeInTheDocument();
    expect(elieImage.parentElement).toHaveClass("vehicle-photo-cutout");
    expect(elieImage.parentElement).not.toHaveClass("vehicle-photo-mirrored");
  });

  it("keeps 2026 knowledge out of Elie's 2024 research track", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open elie/i }));
    fireEvent.click(screen.getByRole("button", { name: /browse knowledge/i }));

    expect(
      screen.getByRole("heading", { name: "2024 research track" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /where is the odometer/i })
    ).not.toBeInTheDocument();
  });

  it("keeps 2026 settings out of Elie's 2024 research track", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open elie/i }));
    fireEvent.click(screen.getByRole("button", { name: /explore settings/i }));

    expect(
      screen.getByRole("heading", { name: "2024 settings research" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });
});
