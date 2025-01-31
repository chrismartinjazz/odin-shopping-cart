import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/components/Home/Home.jsx";

describe("Home component", () => {
  it("renders with correct aria label", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const homePageElement = screen.getByLabelText(/home page/i);

    expect(homePageElement).toBeInTheDocument();
  });

  it("renders correct heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const headingElement = screen.getByRole("heading");

    expect(headingElement.textContent).toMatch(/welcome to odin mart/i);
  });

  it("links to the shop page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link", { name: /shop now/i });

    expect(linkElement.href).toMatch(/\/shop/i);
  });
});
