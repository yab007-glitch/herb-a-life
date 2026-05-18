import { describe, it, expect } from "vitest";

describe("auth utilities", () => {
  it("validates email format", () => {
    const validEmail = "user@example.com";
    const invalidEmail = "not-an-email";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(validEmail)).toBe(true);
    expect(emailRegex.test(invalidEmail)).toBe(false);
  });

  it("checks password minimum length", () => {
    const shortPassword = "12345";
    const longPassword = "securepassword123";
    expect(shortPassword.length).toBeLessThan(8);
    expect(longPassword.length).toBeGreaterThanOrEqual(8);
  });
});
