import PropTypes from "prop-types";
import styles from "./Cart.module.css"

Cart.propTypes = {
  cart: PropTypes.array,
  handleRemoveFromCart: PropTypes.func
}

function Cart({ cart, handleRemoveFromCart }) {
  
  const totalCost = Math.round(
    cart.reduce((total, cartItem) => {
      return total + (cartItem.quantity * cartItem.product.price)
    }, 0) * 100
  ) / 100;

  return (
    <div className={styles.Cart}>
      <div>Total Cost: ${totalCost}</div>
      <a href="#">Go to Checkout</a>
      {cart.map(cartItem => {
        return(
          <div key={cartItem.product.id}>
            <img className={styles.image} src={cartItem.product.image} alt={cartItem.product.title} />
            <div>{cartItem.product.price}</div>
            <div>{cartItem.quantity}</div>
            <button onClick={() => handleRemoveFromCart(cartItem.product.id)}>Remove</button>
          </div>
        )
      })}
    </div>
  )
}

export default Cart;