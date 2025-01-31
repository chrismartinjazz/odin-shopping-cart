import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../src/components/Cart/Cart.jsx";

describe("Cart component", () => {
  const testCart = [
    {
      product: {
        id: 1,
        image: "test1.jpg",
        price: 4.99,
        title: "Test Product 1",
      },
      quantity: 2,
    },
    {
      product: {
        id: 5,
        image: "test5.jpg",
        price: 3.5,
        title: "Test Product 5",
      },
      quantity: 1,
    },
  ];

  it("Renders with correct aria label", () => {
    render(<Cart cart={testCart} />);

    const cartElement = screen.getByRole("region", { name: /cart/i });

    expect(cartElement).toBeInTheDocument();
  });

  it("Correctly calculates the total cost of the cart and displays in dollars and cents", () => {
    render(<Cart cart={testCart} />);

    const totalCostElement = screen.getByText(/total cost:/i);

    expect(totalCostElement.textContent).toMatch("$13.48");
  });

  it("Displays an image with the expected alt text and source", () => {
    render(<Cart cart={testCart} />);

    const imageElement = screen.getByAltText(/test product 1/i);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toMatch("test1.jpg");
  });

  it("Displays the price, quantity, and total price of the item", () => {
    render(<Cart cart={testCart} />);

    const quantityElement = screen.getAllByLabelText(/quantity/i)[0];
    expect(quantityElement.textContent).toBe("2");

    const priceElement = screen.getAllByLabelText(/price/i)[0];
    expect(priceElement.textContent).toBe("$4.99");

    const productTotalElement = screen.getAllByLabelText(/product total/i)[0];
    expect(productTotalElement.textContent).toBe("$9.98");
  });

  it("Calls the correct function when clicking the remove button", async () => {
    const handleRemoveFromCartMock = vi.fn();

    render(
      <Cart cart={testCart} handleRemoveFromCart={handleRemoveFromCartMock} />
    );

    const removeButton = screen.getAllByRole("button", { name: /remove/i })[0];
    await userEvent.click(removeButton);

    expect(handleRemoveFromCartMock).toHaveBeenCalledTimes(1);
  });
});
