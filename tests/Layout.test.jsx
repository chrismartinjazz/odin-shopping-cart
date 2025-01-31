import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../src/components/Layout/Layout.jsx";

const testCart = [{ product: { id: 1, title: "Test Product" }, quantity: 1 }];

describe("Layout component", () => {
  it("renders 'main' region with correct aria label", () => {
    render(
      <MemoryRouter>
        <Layout displayCart={true} cart={testCart} />
      </MemoryRouter>
    );

    const mainElement = screen.getByLabelText(/main/i);

    expect(mainElement).toBeInTheDocument();
  });

  it("displays the cart if displayCart prop is true", () => {
    render(
      <MemoryRouter>
        <Layout displayCart={true} cart={testCart} />
      </MemoryRouter>
    );

    const cartElement = screen.getByRole("region", { name: /cart/i });

    expect(cartElement).toBeInTheDocument();
  });

  it("does not display the cart if displayCart prop is false", () => {
    render(
      <MemoryRouter>
        <Layout displayCart={false} cart={testCart} />
      </MemoryRouter>
    );

    const cartElement = screen.queryByRole("region", { name: /cart/i });

    expect(cartElement).not.toBeInTheDocument();
  });

  it("still renders the cart if a cart is not passed as a prop", () => {
    render(
      <MemoryRouter>
        <Layout displayCart={true} />
      </MemoryRouter>
    );

    const cartElement = screen.getByRole("region", { name: /cart/i });

    expect(cartElement).toBeInTheDocument();
  });

  it("still renders the cart if the cart is empty", () => {
    render(
      <MemoryRouter>
        <Layout displayCart={true} cart={[]} />
      </MemoryRouter>
    );

    const cartElement = screen.getByRole("region", { name: /cart/i });

    expect(cartElement).toBeInTheDocument();
  });
});
