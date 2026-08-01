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
    expect(screen.getByText("Verified Mazda guidance")).toBeInTheDocument();
    expect(screen.getByText("Where to find it")).toBeInTheDocument();
    expect(screen.getByText("2026 Mazda CX-5 Owner's Manual")).toBeInTheDocument();
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
      name: "Elie's Polymetal Gray Metallic 2026 Mazda CX-5 2.5 S Select"
    });
    expect(elieImage).toBeInTheDocument();
    expect(elieImage.parentElement).toHaveClass("vehicle-photo-cutout");
  });

  it("makes Elie's new 2026 profile eligible for the shared 2026 knowledge", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open elie/i }));
    fireEvent.click(screen.getByRole("button", { name: /browse knowledge/i }));

    expect(
      screen.getByRole("heading", { name: "Knowledge topics" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /where is the odometer/i })
    ).toBeInTheDocument();
  });

  it("shows Elie's matching 2026 Select image without reusing a different vehicle", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /open elie/i }));

    expect(
      screen.getByRole("img", {
        name: "Elie's Polymetal Gray Metallic 2026 Mazda CX-5 2.5 S Select"
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Polymetal Gray Metallic")).toBeInTheDocument();
  });
});
