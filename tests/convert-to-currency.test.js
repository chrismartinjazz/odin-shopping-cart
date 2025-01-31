import { describe, it, expect } from "vitest";
import convertToCurrency from "../src/convert-to-currency";

describe("convertToCurrency", () => {
  it("Converts a whole integer to currency format", () => {
    const result = convertToCurrency(5, "USD");
    expect(result).toBe("$5.00");
  });

  it("Converts a decimal to currency format", () => {
    const result = convertToCurrency(2.5, "USD");
    expect(result).toBe("$2.50");
  });

  it("Converts a decimal from more than two decimal places", () => {
    const resultOne = convertToCurrency(3.1415, "USD");
    expect(resultOne).toBe("$3.14");

    const resultTwo = convertToCurrency(99.999, "USD");
    expect(resultTwo).toBe("$100.00");
  });
});
