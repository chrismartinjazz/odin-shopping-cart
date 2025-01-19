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
  productIsInCart: PropTypes.bool,
  handleUpdateCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
};

function Card({
  product,
  productIsInCart,
  handleUpdateCart,
  handleRemoveFromCart,
}) {
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  function handleToggleEdit() {
    setEditing(!editing);
  }

  function handleAddToCart(product, quantity) {
    handleUpdateCart(product, quantity);
    setEditing(false);
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
      <img src={product.image} className={styles.image} />
      <div className={styles.title}>{product.title}</div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.decrementButton}
          onClick={() => handleClickDecrement()}
        />

        <div className={styles.inputContainer}>
          {editing ? (
            <input
              className={styles.inputEditing}
              value={quantity}
              onChange={handleChangeQuantity}
            />
          ) : (
            <div className={styles.inputNotEditing} onClick={handleToggleEdit}>
              {quantity}
            </div>
          )}
        </div>

        <button
          className={styles.incrementButton}
          onClick={() => handleClickIncrement()}
        />
        {productIsInCart && (
          <button
            className={styles.removeButton}
            onClick={() => handleRemoveFromCart(product.id)}
          />
        )}
      </div>

      <button onClick={() => handleAddToCart(product, quantity)}>
        {productIsInCart ? "Update Cart" : "Add to Cart"}
      </button>
      <div className={styles.price}>{formattedPrice}</div>
    </div>
  );
}

function isPositiveIntegerOrBlank(input) {
  return (!isNaN(parseInt(input)) && parseInt(input) > 0) || input === "";
}

export default Card;
