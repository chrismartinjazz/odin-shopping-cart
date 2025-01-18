import { useState } from "react";
import styles from "./Card.module.css";
import PropTypes from "prop-types";

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

function Card({ product, productIsInCart, handleUpdateCart, handleRemoveFromCart }) {
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function handleChangeQuantity(event) {
    if (isPositiveInteger(event.target.value)) {
      const nextQuantity = event.target.value > 1
        ? event.target.value
        : 1
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
    const nextQuantity = quantity > 0
      ? Math.floor(parseInt(quantity) + 1)
      : 1;
    setQuantity(nextQuantity);
  }

  function handleClickDecrement() {
    const nextQuantity = quantity > 1
      ? Math.floor(parseInt(quantity) - 1)
      : 1
    setQuantity(nextQuantity);
  }

  return (
    <div className={styles.Card}>
      <img src={product.image} className={styles.image} />
      <div className={styles.price}>{product.price}</div>
      <div className={styles.title}>{product.title}</div>
      <button onClick={() => handleClickDecrement()}>-</button>
      
      {editing ? (
        <input
          value={quantity}
          onChange={handleChangeQuantity}
        />
      ) : (
        <div onClick={handleToggleEdit}>{quantity}</div>
      )}

      <button onClick={() => handleClickIncrement()}>+</button>
      <button onClick={() => handleAddToCart(product, quantity)}>
        {productIsInCart ? "Update Cart" : "Add to Cart"}
      </button>
      {productIsInCart &&
        <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
      }
    </div>
  )
}

function isPositiveInteger(input) {
  return (!isNaN(parseInt(input)) && parseInt(input) > 0) 
}

export default Card;

