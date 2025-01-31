import { requestData } from "../src/request-data.js";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("requestData", () => {
  const mockResponse = [
    {
      id: 1,
      image: "image1.jpg",
      price: 5,
      title: "Test Product 1",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("successfully fetches data from the API", async () => {
    global.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });
    });

    const result = await requestData("products");
    expect(result).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");
  });

  it("handles an error when failing to fetch data", async () => {
    vi.mock("../src/local-storage", () => ({
      getLocalStorage: vi.fn(() => ({})),
      setLocalStorage: vi.fn(),
    }));

    global.fetch = vi.fn(() => Promise.reject(new Error("API is down")));

    await expect(requestData("products")).rejects.toThrow("API is down");

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
