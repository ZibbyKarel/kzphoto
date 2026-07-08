import { describe, expect, it } from "vitest";
import { sortByLargestFirst, isCategorySlug, getCategorySlugs, type GalleryPhoto } from "./gallery";

function photo(overrides: Partial<GalleryPhoto>): GalleryPhoto {
  return {
    category: "family",
    src: "/gallery/family/x.jpg",
    width: 100,
    height: 100,
    alt: "alt",
    blurDataURL: "",
    ...overrides,
  };
}

describe("sortByLargestFirst", () => {
  it("orders photos by pixel area (width x height) descending", () => {
    const small = photo({ src: "small", width: 100, height: 100 }); // 10,000
    const large = photo({ src: "large", width: 400, height: 300 }); // 120,000
    const medium = photo({ src: "medium", width: 200, height: 200 }); // 40,000

    const result = sortByLargestFirst([small, large, medium]);

    expect(result.map((p) => p.src)).toEqual(["large", "medium", "small"]);
  });

  it("does not mutate the input array", () => {
    const a = photo({ src: "a", width: 100, height: 100 });
    const b = photo({ src: "b", width: 200, height: 200 });
    const input = [a, b];

    const result = sortByLargestFirst(input);

    expect(input).toEqual([a, b]); // original order untouched
    expect(result).not.toBe(input); // new array returned
  });

  it("preserves relative order for photos with equal area (stable sort)", () => {
    const first = photo({ src: "first", width: 100, height: 200 }); // 20,000
    const second = photo({ src: "second", width: 200, height: 100 }); // 20,000
    const third = photo({ src: "third", width: 50, height: 400 }); // 20,000

    const result = sortByLargestFirst([first, second, third]);

    expect(result.map((p) => p.src)).toEqual(["first", "second", "third"]);
  });

  it("returns an empty array for empty input", () => {
    expect(sortByLargestFirst([])).toEqual([]);
  });

  it("handles a single-element array", () => {
    const only = photo({ src: "only" });
    expect(sortByLargestFirst([only])).toEqual([only]);
  });
});

describe("isCategorySlug", () => {
  it("returns true for known category slugs", () => {
    for (const slug of getCategorySlugs()) {
      expect(isCategorySlug(slug)).toBe(true);
    }
  });

  it("returns false for an unknown slug", () => {
    expect(isCategorySlug("not-a-real-category")).toBe(false);
  });
});
