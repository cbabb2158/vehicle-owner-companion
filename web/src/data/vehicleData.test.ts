import { describe, expect, it } from "vitest";

import {
  getQuestionById,
  getSourceReferenceById,
  getVehicleById,
  resolveVehiclePlate,
  resolveVehicleVin,
  sampleVehicles,
  searchSettings,
  supports2026Guidance
} from "./vehicleData";

describe("local vehicle data", () => {
  it("provides all three vehicles without committing full VINs", () => {
    expect(sampleVehicles.map((vehicle) => vehicle.ownerName)).toEqual([
      "Chris",
      "Jenny",
      "Elie"
    ]);

    for (const vehicle of sampleVehicles.filter(({ ownerName }) => ownerName !== "Elie")) {
      expect(vehicle.maskedVin).toMatch(/^JM3\*{9}\d{5}$/);
      expect(vehicle.maskedVin).not.toMatch(/^[A-HJ-NPR-Z0-9]{17}$/);
    }
    expect(getVehicleById("cx5-elie")?.maskedVin).toBe("VIN forthcoming");
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

  it("uses a valid local plate while retaining the local-only fallback", () => {
    expect(resolveVehiclePlate(" ab12cd ", "Plate on file")).toBe("AB12CD");
    expect(resolveVehiclePlate(undefined, "Plate on file")).toBe("Plate on file");
    expect(resolveVehiclePlate("not a plate", "Plate on file")).toBe("Plate on file");
    expect(resolveVehiclePlate("AB12CD", "Plate on file", false)).toBe("Plate on file");
  });

  it("matches the Premium Plus profiles to their local vehicle photos", () => {
    expect(
      sampleVehicles.filter(({ trim }) => trim === "Premium Plus").map(({ ownerName, exteriorColor, imageSrc, imageAlt }) => ({
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

  it("keeps Elie's new 2026 CX-5 Select profile local while her VIN is pending", () => {
    expect(getVehicleById("cx5-elie")).toMatchObject({
      ownerName: "Elie",
      year: 2026,
      make: "Mazda",
      model: "CX-5",
      trim: "2.5 S Select",
      exteriorColor: "Polymetal Gray Metallic",
      maskedVin: "VIN forthcoming",
      imageSrc: "/vehicles/2026-cx5-select-polymetal-gray-cutout.png",
      imageAlt: "Elie's Polymetal Gray Metallic 2026 Mazda CX-5 2.5 S Select"
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

  it("attaches a reviewed Mazda source to the verified odometer guidance", () => {
    const question = getQuestionById("odometer-location");
    const source = getSourceReferenceById("2026-cx5-owners-manual-odometer");

    expect(question).toMatchObject({
      verificationStatus: "verified",
      sourceReferenceIds: ["2026-cx5-owners-manual-odometer"],
      lastReviewedAt: "2026-08-01"
    });
    expect(source).toMatchObject({
      modelYear: 2026,
      market: "U.S.",
      section: "Instrument Cluster > Odometer/Trip Meter"
    });
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

  it("does not reuse 2026 guidance for a different CX-5 model year", () => {
    expect(supports2026Guidance({ year: 2026, make: "Mazda", model: "CX-5" })).toBe(true);
    expect(supports2026Guidance({ year: 2024, make: "Mazda", model: "CX-5" })).toBe(false);
  });
});
