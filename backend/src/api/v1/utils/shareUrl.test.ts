import { describe, it, expect } from "vitest";
import { getShareUrl } from "./shareUrl";

describe("getShareUrl", () => {
  it("returns URL ending with /share/{slug}", () => {
    const url = getShareUrl("abc123");
    expect(url).toContain("/share/abc123");
    expect(url).toMatch(/^https?:\/\//);
  });

  it("returns different URLs for different slugs", () => {
    expect(getShareUrl("one")).toContain("/share/one");
    expect(getShareUrl("two")).toContain("/share/two");
  });
});
