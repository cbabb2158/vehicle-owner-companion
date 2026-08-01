import { describe, expect, it } from "vitest";

import {
  getQuestionById,
  getVehicleById,
  resolveVehicleVin,
  sampleVehicles,
  searchSettings
} from "./vehicleData";

describe("local vehicle data", () => {
  it("provides all three vehicles without committing full VINs", () => {
    expect(sampleVehicles.map((vehicle) => vehicle.ownerName)).toEqual([
      "Chris",
      "Jenny",
      "Elie"
    ]);

    for (const vehicle of sampleVehicles) {
      expect(vehicle.maskedVin).toMatch(/^JM3\*{9}\d{5}$/);
      expect(vehicle.maskedVin).not.toMatch(/^[A-HJ-NPR-Z0-9]{17}$/);
    }
  });

  it("uses a valid local VIN while retaining the masked fallback", () => {
    expect(
      resolveVehicleVin(" abcdefgh0jklmnprs ", "JM3*********49339")
    ).toBe("ABCDEFGH0JKLMNPRS");
    expect(resolveVehicleVin(undefined, "JM3*********49339")).toBe(
      "JM3*********49339"
    );
    expect(resolveVehicleVin("not-a-vin", "JM3*********49339")).toBe(
      "JM3*********49339"
    );
    expect(
      resolveVehicleVin("ABCDEFGH0JKLMNPRS", "JM3*********49339", false)
    ).toBe("JM3*********49339");
  });

  it("matches each owner to the correct 2026 CX-5 paint and local vehicle photo", () => {
    expect(
      sampleVehicles.filter(({ year }) => year === 2026).map(({ ownerName, exteriorColor, imageSrc, imageAlt }) => ({
        ownerName,
        exteriorColor,
        imageSrc,
        imageAlt
      }))
    ).toEqual([
      {
        ownerName: "Chris",
        exteriorColor: "Machine Gray Metallic",
        imageSrc: "/vehicles/2026-cx5-premium-plus-machine-gray.png",
        imageAlt: "Chris's Machine Gray Metallic 2026 Mazda CX-5 Premium Plus"
      },
      {
        ownerName: "Jenny",
        exteriorColor: "Soul Red Crystal Metallic",
        imageSrc: "/vehicles/2026-cx5-premium-plus-soul-red.png",
        imageAlt: "Jenny's Soul Red Crystal Metallic 2026 Mazda CX-5 Premium Plus"
      }
    ]);
  });

  it("keeps Elie's verified 2024 CX-5 separate from the 2026 profiles", () => {
    expect(getVehicleById("cx5-elie")).toMatchObject({
      ownerName: "Elie",
      year: 2024,
      make: "Mazda",
      model: "CX-5",
      trim: "Select",
      exteriorColor: "Platinum Quartz Metallic",
      maskedVin: "JM3*********49339",
      imageSrc: "/vehicles/2024-cx5-platinum-quartz-select-render.png",
      imageAlt: "Elie's Platinum Quartz Metallic 2024 Mazda CX-5 Select"
    });
  });

  it("resolves vehicles and questions by stable identifiers", () => {
    expect(getVehicleById("cx5-chris")?.ownerName).toBe("Chris");
    expect(getQuestionById("odometer-location")?.title).toBe(
      "Where is the odometer?"
    );
    expect(getVehicleById("missing")).toBeUndefined();
    expect(getQuestionById("missing")).toBeUndefined();
  });

  it("searches settings across names, explanations, and menu paths", () => {
    expect(searchSettings("profile").map((setting) => setting.name)).toContain(
      "Driver personalization"
    );
    expect(searchSettings("doors").map((setting) => setting.name)).toContain(
      "Walk-away locking"
    );
    expect(searchSettings("not a real setting")).toEqual([]);
  });
});
