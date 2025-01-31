import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../src/components/Card/Card.jsx";

describe("Card component", () => {
  let product = {
    id: 1,
    image: "img.jpg",
    price: 5,
    title: "Test Product",
  };

  it("displays the product image", () => {
    render(<Card product={product} />);

    const imageElement = screen.getByRole("img", { name: /test product/i });

    expect(imageElement).toHaveAttribute("src", "img.jpg");
  });

  it("displays the product title", () => {
    render(<Card product={product} />);

    const titleElement = screen.getByText(/test product/i);

    expect(titleElement).toBeInTheDocument();
  });

  it("displays the product price in dollars and cents", () => {
    render(<Card product={product} />);

    const priceElement = screen.getByText("$5.00");

    expect(priceElement).toBeInTheDocument();
  });

  it("displays a button to 'Add to cart', if the product is not in the cart", () => {
    render(<Card product={product} productIsInCart={false} />);

    const buttonElement = screen.getByRole("button", { name: /add to cart/i });

    expect(buttonElement).toBeInTheDocument();
  });

  it("displays a button to 'Update', if the product is already in the cart, and does not show the 'Add to cart' button", () => {
    render(<Card product={product} productIsInCart={true} />);

    const buttonElementUpdate = screen.getByRole("button", { name: /update/i });
    const buttonElementAddToCart = screen.queryByRole("button", {
      name: /add to cart/i,
    });

    expect(buttonElementUpdate).toBeInTheDocument();
    expect(buttonElementAddToCart).not.toBeInTheDocument();
  });

  it("triggers the onClick handler when the Add to Cart button is clicked", async () => {
    const handleUpdateCartMock = vi.fn();
    render(
      <Card
        product={product}
        productIsInCart={false}
        handleUpdateCart={handleUpdateCartMock}
      />
    );
    const buttonElement = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(buttonElement);

    expect(handleUpdateCartMock).toHaveBeenCalledTimes(1);
  });

  it("has a default quantity of 1 when first rendering", () => {
    render(<Card product={product} productIsInCart={false} />);

    const quantityElement = screen.getByLabelText(/quantity input/i);

    expect(quantityElement.value).toBe("1");
  });

  it("increases the quantity by 1, to 2 when clicking the increment button", async () => {
    render(<Card product={product} productIsInCart={false} />);

    const quantityElement = screen.getByLabelText(/quantity input/i);
    const incrementButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });
    await userEvent.click(incrementButton);

    expect(quantityElement.value).toBe("2");
  });

  it("does not decrease below 1, when clicking the increment button", async () => {
    render(<Card product={product} productIsInCart={false} />);

    const quantityElement = screen.getByLabelText(/quantity input/i);
    const decrementButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });
    await userEvent.click(decrementButton);

    expect(quantityElement.value).toBe("1");
  });

  it("has a quantity of 3 after pressing increment and decrement buttons appropriately", async () => {
    render(<Card product={product} productIsInCart={false} />);

    const quantityElement = screen.getByLabelText(/quantity input/i);
    const incrementButton = screen.getByRole("button", {
      name: /increase quantity/i,
    });
    const decrementButton = screen.getByRole("button", {
      name: /decrease quantity/i,
    });
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    await userEvent.click(incrementButton);
    expect(quantityElement.value).toBe("4");
    await userEvent.click(decrementButton);

    expect(quantityElement.value).toBe("3");
  });

  it("accepts direct input of quantity as whole positive numbers after clicking on the quantity input element", async () => {
    render(<Card product={product} productIsInCart={false} />);

    const quantityElement = screen.getByLabelText(/quantity input/i);
    await userEvent.click(quantityElement);
    await userEvent.keyboard("{Backspace}2");

    expect(quantityElement.value).toBe("2");

    await userEvent.keyboard("4");

    expect(quantityElement.value).toBe("24");
  });

  it("does not accept letters or special characters or '0' as input", async () => {
    render(<Card product={product} productIsInCart={false} />);

    const quantityElement = screen.getByLabelText(/quantity input/i);
    await userEvent.click(quantityElement);
    await userEvent.keyboard("cat0'@/><%$#[[{{");

    expect(quantityElement.value).toBe("1");
  });
});
