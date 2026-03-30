import { describe, it, expect } from "vitest";
import { rateLimit } from "../../rate-limit";

describe("rateLimit", () => {
  it("allows requests within limit", () => {
    const result = rateLimit("test-ip-1", 5, 60_000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("blocks requests exceeding limit", () => {
    const ip = "test-ip-block-" + Date.now();
    for (let i = 0; i < 3; i++) {
      rateLimit(ip, 3, 60_000);
    }
    const result = rateLimit(ip, 3, 60_000);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("tracks different IPs independently", () => {
    const ip1 = "ip-a-" + Date.now();
    const ip2 = "ip-b-" + Date.now();
    for (let i = 0; i < 3; i++) {
      rateLimit(ip1, 3, 60_000);
    }
    const result = rateLimit(ip2, 3, 60_000);
    expect(result.success).toBe(true);
  });
});
