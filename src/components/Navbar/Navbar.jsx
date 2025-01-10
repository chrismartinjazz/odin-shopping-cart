import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css";

export default function Navbar() {
  const styleNavlinkPending = `${styles.Navlink} ${styles.pending}`;
  const styleNavlinkActive = `${styles.Navlink} ${styles.active}`;

  return (
    <div className={styles.Navbar}>
      <NavLink
        to="/home"
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
    </div>
  )
}