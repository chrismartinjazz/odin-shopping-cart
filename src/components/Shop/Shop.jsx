import PropTypes from "prop-types";
import Card from "../Card/Card.jsx";
import Cart from "../Cart/Cart.jsx";
import styles from "./Shop.module.css";

Shop.propTypes = {
  displayCart: PropTypes.bool,
  products: PropTypes.array,
  cart: PropTypes.array,
  handleUpdateCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
  isProductInCart: PropTypes.func,
};

export default function Shop({
  displayCart,
  products,
  cart,
  handleUpdateCart,
  handleRemoveFromCart,
  isProductInCart,
}) {
  return (
    <>
      <div className={styles.Shop}>
        <div className={styles.shopItems}>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Card
                  product={product}
                  productIsInCart={isProductInCart(product.id)}
                  handleUpdateCart={handleUpdateCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </div>
            );
          })}
        </div>
        {displayCart && (
          <Cart
            className={styles.Cart}
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        )}
      </div>
    </>
  );
}
