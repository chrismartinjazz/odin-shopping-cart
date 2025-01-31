import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { requestData } from "../../request-data.js";
import Layout from "../Layout/Layout.jsx";
import Home from "../Home/Home.jsx";
import Shop from "../Shop/Shop.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";

export default function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [displayCart, setDisplayCart] = useState(true);

  function handleUpdateCart(product, quantity) {
    // Create a deep copy of the cart
    const nextCart = cart.map((item) => {
      return { ...item };
    });
    // Check if the product is already in the cart. If it is, we will update its
    // quantity. If not, add as a new object to the cart.
    const existingItem = nextCart.find(
      (item) => item.product.id === product.id
    );
    existingItem
      ? (existingItem.quantity = quantity)
      : nextCart.push({ product, quantity });
    setCart(nextCart);
    console.log(nextCart);
  }

  function handleRemoveFromCart(id) {
    const nextCart = cart.filter((item) => item.product.id !== id);
    setCart(nextCart);
  }

  function isProductInCart(id) {
    return cart.some((item) => item.product.id === id);
  }

  function toggleDisplayCart() {
    setDisplayCart(!displayCart);
  }

  useEffect(() => {
    requestData("products")
      .then((response) => {
        setError(null);
        setProducts(response);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout
          cart={cart}
          displayCart={displayCart}
          toggleDisplayCart={toggleDisplayCart}
          handleRemoveFromCart={handleRemoveFromCart}
        >
          <Home />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/shop",
      element: (
        <Layout
          cart={cart}
          displayCart={displayCart}
          toggleDisplayCart={toggleDisplayCart}
          handleRemoveFromCart={handleRemoveFromCart}
        >
          <Shop
            products={products}
            cart={cart}
            handleUpdateCart={handleUpdateCart}
            handleRemoveFromCart={handleRemoveFromCart}
            isProductInCart={isProductInCart}
          />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
