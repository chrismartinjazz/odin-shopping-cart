import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar.jsx";
import Cart from "../Cart/Cart.jsx";
import styles from "./Layout.module.css";

Layout.propTypes = {
  cart: PropTypes.array,
  displayCart: PropTypes.bool,
  toggleDisplayCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
  children: PropTypes.element,
};

export default function Layout({
  cart = [],
  displayCart = false,
  toggleDisplayCart,
  handleRemoveFromCart,
  children,
}) {
  return (
    <>
      <Navbar cart={cart} toggleDisplayCart={toggleDisplayCart} />
      <div className={styles.main} role="region" aria-label="main">
        {children}
        {displayCart && (
          <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
        )}
      </div>
    </>
  );
}
