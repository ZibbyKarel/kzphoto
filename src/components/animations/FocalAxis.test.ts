import { describe, expect, it } from "vitest";
import { focalAt } from "./FocalAxis";

/**
 * focalAt(progress) maps a 0..1 scroll-progress value onto the focal-length
 * scale [16, 24, 35, 50, 70, 105, 135, 200] by linear interpolation between
 * the two focals bracketing `progress * (FOCALS.length - 1)`.
 */
describe("focalAt", () => {
  it("returns the first focal at progress 0", () => {
    expect(focalAt(0)).toBe(16);
  });

  it("returns the last focal at progress 1", () => {
    expect(focalAt(1)).toBe(200);
  });

  it("interpolates at the midpoint between two focals", () => {
    // FOCALS has 8 entries (7 gaps). progress = 1/7 lands exactly on FOCALS[1] = 24.
    expect(focalAt(1 / 7)).toBe(24);
  });

  it("interpolates halfway through the first gap (16 -> 24)", () => {
    // x = 0.5 * 7 = 3.5 -> i = 3? no: x = progress * 7. Use progress that lands mid gap 0.
    const progress = 0.5 / 7; // half of the first gap
    expect(focalAt(progress)).toBe(Math.round(16 + (24 - 16) * 0.5));
  });

  it("clamps the bracketing index at the top boundary (progress = 1 exactly)", () => {
    // Ensures Math.min(FOCALS.length - 2, Math.floor(x)) doesn't overflow the array.
    expect(() => focalAt(1)).not.toThrow();
    expect(focalAt(1)).toBe(200);
  });

  it("handles values beyond the nominal 0..1 range without throwing", () => {
    expect(() => focalAt(1.5)).not.toThrow();
  });

  it("is monotonically non-decreasing across the full range", () => {
    let prev = focalAt(0);
    for (let p = 0.05; p <= 1; p += 0.05) {
      const value = focalAt(p);
      expect(value).toBeGreaterThanOrEqual(prev);
      prev = value;
    }
  });
});
