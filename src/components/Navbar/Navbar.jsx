import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

Navbar.propTypes = {
  cart: PropTypes.array,
  toggleDisplayCart: PropTypes.func,
};

export default function Navbar({ cart, toggleDisplayCart }) {
  const styleNavlinkPending = `${styles.Navlink} ${styles.pending}`;
  const styleNavlinkActive = `${styles.Navlink} ${styles.active}`;
  const shoppingCartSize = cart.length;

  return (
    <div className={styles.Navbar} role={"region"} aria-label={"Navbar"}>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? styleNavlinkPending
              : isActive
              ? styleNavlinkActive
              : styles.Navlink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive, isPending }) =>
            isPending
              ? styleNavlinkPending
              : isActive
              ? styleNavlinkActive
              : styles.Navlink
          }
        >
          Shop
        </NavLink>
      </div>
      <div className={styles.cart} onClick={toggleDisplayCart}>
        <div className={styles.cartItemCount}>
          {shoppingCartSize > 0 && shoppingCartSize}
        </div>
        <div className={styles.cartIcon}></div>
      </div>
    </div>
  );
}
