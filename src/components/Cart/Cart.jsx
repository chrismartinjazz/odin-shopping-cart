import PropTypes from "prop-types";
import styles from "./Cart.module.css";
import convertToCurrency from "../../convert-to-currency.js";

Cart.propTypes = {
  cart: PropTypes.array,
  handleRemoveFromCart: PropTypes.func,
};

function Cart({ cart, handleRemoveFromCart }) {
  const totalCost = convertToCurrency(
    Math.round(
      cart.reduce((total, cartItem) => {
        return total + cartItem.quantity * cartItem.product.price;
      }, 0) * 100
    ) / 100,
    "USD"
  );

  return (
    <div className={styles.Cart}>
      <div className={styles.grandTotal}>Total Cost: {totalCost}</div>
      <a className={styles.checkoutLink} href="#">
        Checkout Now
      </a>
      {cart.map((cartItem) => {
        return (
          <div key={cartItem.product.id}>
            <img
              className={styles.image}
              src={cartItem.product.image}
              alt={cartItem.product.title}
            />
            <div className={styles.buttonRow}>
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveFromCart(cartItem.product.id)}
              />
              <div className={styles.quantity}>{cartItem.quantity}</div>
              <div className={styles.price}>
                {convertToCurrency(cartItem.product.price, "USD")}
              </div>
            </div>
            <div className={styles.productTotal}>
              {convertToCurrency(
                cartItem.product.price * cartItem.quantity,
                "USD"
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
