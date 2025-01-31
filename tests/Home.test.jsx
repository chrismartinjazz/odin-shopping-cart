import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/components/Home/Home.jsx";

const testCart = [{ product: { id: 1, title: "Test Product" }, quantity: 1 }];

describe("Home component", () => {
  it("renders with correct aria label", () => {});

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

  it("displays the cart if displayCart prop is true", () => {
    render(
      <MemoryRouter>
        <Home displayCart={true} cart={testCart} />
      </MemoryRouter>
    );

    const cartElement = screen.getByRole("region", { name: /cart/i });

    expect(cartElement).toBeInTheDocument();
  });

  it("does not display the cart if displayCart prop is false", () => {
    render(
      <MemoryRouter>
        <Home displayCart={false} cart={testCart} />
      </MemoryRouter>
    );

    const cartElement = screen.queryByRole("region", { name: /cart/i });

    expect(cartElement).not.toBeInTheDocument();
  });
});
