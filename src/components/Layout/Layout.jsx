import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar.jsx";

Layout.propTypes = {
  cart: PropTypes.array,
  toggleDisplayCart: PropTypes.func,
  children: PropTypes.element,
};

export default function Layout({ cart, toggleDisplayCart, children }) {
  return (
    <>
      <Navbar cart={cart} toggleDisplayCart={toggleDisplayCart} />
      {children}
    </>
  );
}
