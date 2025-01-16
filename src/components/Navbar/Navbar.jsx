import PropTypes from "prop-types";
import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css";

Navbar.propTypes = {
  cart: PropTypes.array,
}

export default function Navbar({ cart = [] }) {
  const styleNavlinkPending = `${styles.Navlink} ${styles.pending}`;
  const styleNavlinkActive = `${styles.Navlink} ${styles.active}`;
  const shoppingCartSize = cart.length;

  return (
    <div className={styles.Navbar}>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? styleNavlinkPending : isActive ? styleNavlinkActive : styles.Navlink
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive, isPending }) =>
          isPending ? styleNavlinkPending : isActive ? styleNavlinkActive : styles.Navlink
        }
      >
        Shop
      </NavLink>
      <div>
        {shoppingCartSize > 0 && shoppingCartSize}
      </div>
    </div>
  )
}

