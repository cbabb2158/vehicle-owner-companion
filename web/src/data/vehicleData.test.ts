import { describe, expect, it } from "vitest";

import {
  getQuestionById,
  getVehicleById,
  sampleVehicles,
  searchSettings
} from "./vehicleData";

describe("local vehicle data", () => {
  it("provides Chris and Jenny sample vehicles without committing full VINs", () => {
    expect(sampleVehicles.map((vehicle) => vehicle.ownerName)).toEqual([
      "Chris",
      "Jenny"
    ]);

    for (const vehicle of sampleVehicles) {
      expect(vehicle.maskedVin).toMatch(/^JM3\*{9}\d{5}$/);
      expect(vehicle.maskedVin).not.toMatch(/^[A-HJ-NPR-Z0-9]{17}$/);
    }
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
