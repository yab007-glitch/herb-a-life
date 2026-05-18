import { describe, it, expect } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rate limiting", () => {
  it("allows requests under the limit", async () => {
    const ip = "127.0.0.1";
    for (let i = 0; i < 5; i++) {
      const result = await rateLimit(ip, 10, 60_000);
      expect(result.success).toBe(true);
    }
  });

  it("blocks requests over the limit", async () => {
    const ip = "127.0.0.2";
    for (let i = 0; i < 10; i++) {
      await rateLimit(ip, 10, 60_000);
    }
    const result = await rateLimit(ip, 10, 60_000);
    expect(result.success).toBe(false);
  });
});
