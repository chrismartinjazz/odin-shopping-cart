import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar.jsx";

Layout.propTypes = {
  cart: PropTypes.array,
  children: PropTypes.element,
};

export default function Layout({ cart, children }) {
  return (
    <>
      <Navbar cart={cart} />
      {children}
    </>
  );
}
