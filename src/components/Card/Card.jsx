import { useState } from "react";
import styles from "./Card.module.css";
import PropTypes from "prop-types";
import convertToCurrency from "../../convert-to-currency.js";

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
  }),
  initialQuantity: PropTypes.number,
  productIsInCart: PropTypes.bool,
  handleUpdateCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
};

function Card({
  product,
  initialQuantity = 1,
  productIsInCart,
  handleUpdateCart,
  handleRemoveFromCart,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const formattedPrice = convertToCurrency(product.price, "USD");

  function handleChangeQuantity(event) {
    if (isPositiveIntegerOrBlank(event.target.value)) {
      const nextQuantity =
        event.target.value > 1 || event.target.value == ""
          ? event.target.value
          : 1;
      setQuantity(nextQuantity);
    }
  }

  function handleAddToCart(product, quantity) {
    handleUpdateCart(product, quantity);
  }

  function handleClickIncrement() {
    const nextQuantity = quantity > 0 ? Math.floor(parseInt(quantity) + 1) : 1;
    setQuantity(nextQuantity);
  }

  function handleClickDecrement() {
    const nextQuantity = quantity > 1 ? Math.floor(parseInt(quantity) - 1) : 1;
    setQuantity(nextQuantity);
  }

  return (
    <div className={styles.Card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.title}>{product.title}</div>

      <div className={styles.buttonRow}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.decrementButton}
            onClick={() => handleClickDecrement()}
            aria-label={"Decrease Quantity"}
          />

          <div className={styles.inputContainer}>
            <input
              className={styles.inputEditing}
              value={quantity}
              onChange={handleChangeQuantity}
              aria-label={"Quantity Input"}
            />
          </div>

          <button
            className={styles.incrementButton}
            onClick={() => handleClickIncrement()}
            aria-label={"Increase Quantity"}
          />
          {productIsInCart && (
            <button
              className={styles.removeButton}
              onClick={() => handleRemoveFromCart(product.id)}
              aria-label={"Remove From Cart"}
            />
          )}
        </div>

        <button
          className={styles.addToCartButton}
          onClick={() => handleAddToCart(product, quantity)}
        >
          {productIsInCart ? "Update" : "Add to Cart"}
        </button>
      </div>
      <div className={styles.price} aria-label={"Price"}>
        {formattedPrice}
      </div>
    </div>
  );
}

function isPositiveIntegerOrBlank(input) {
  return (!isNaN(parseInt(input)) && parseInt(input) > 0) || input === "";
}

export default Card;
