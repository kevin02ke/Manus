import { describe, expect, it } from "vitest";
import { getVisibleStatusItems } from "../lib/status-bar";

describe("getVisibleStatusItems", () => {
  it("returns enabled indicators in stable display order", () => {
    expect(getVisibleStatusItems({ showNotifications: true, showNetwork: false, showBattery: true })).toEqual([
      "notifications",
      "battery",
    ]);
  });

  it("returns no indicators when all controls are hidden", () => {
    expect(getVisibleStatusItems({ showNotifications: false, showNetwork: false, showBattery: false })).toEqual([]);
  });
});
