import { useState, useEffect } from "react";
import { requestData } from "../../request-data.js";
import Navbar from "../Navbar/Navbar.jsx";
import Card from "../Card/Card.jsx";
import Cart from "../Cart/Cart.jsx";
import styles from "./Shop.module.css"

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  function handleUpdateCart(product, quantity) {
    // Create a deep copy of the cart
    const nextCart = cart.map(item => {return {...item}});
    // Check if the product is already in the cart. If it is, we will update its
    // quantity. If not, add as a new object to the cart.
    const existingItem = nextCart.find(item => item.product.id === product.id);
    existingItem
      ? existingItem.quantity = quantity
      : nextCart.push({product, quantity});
    setCart(nextCart);
  }

  function handleRemoveFromCart(id) {
    const nextCart = cart
      .map(item => {return {...item}})
      .filter(item => item.product.id !== id);
    setCart(nextCart);
  }

  function isProductInCart(id) {
    return cart.some(item => item.product.id === id);
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

  return (
    <>
      <Navbar className={styles.Navbar} cart={cart}/>
      <div className={styles.main}>
        <div className={styles.Shop}>
          <h2>Shop</h2>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Card
                  product={product}
                  productIsInCart={isProductInCart(product.id)}
                  handleUpdateCart={handleUpdateCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </div>
            )
          })}
        </div>
        <Cart
          className={styles.Cart}
          cart={cart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
    </>
  )
}