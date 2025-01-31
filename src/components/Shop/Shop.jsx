import PropTypes from "prop-types";
import Card from "../Card/Card.jsx";
import styles from "./Shop.module.css";

Shop.propTypes = {
  products: PropTypes.array,
  cart: PropTypes.array,
  handleUpdateCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
  isProductInCart: PropTypes.func,
};

export default function Shop({
  products,
  cart,
  handleUpdateCart,
  handleRemoveFromCart,
  isProductInCart,
}) {
  function findProductQuantity(id) {
    isProductInCart(id)
      ? cart.find((item) => item.product.id === id).quantity
      : 1;
  }

  return (
    <div className={styles.Shop} role={"region"} aria-label={"Shop"}>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Card
              product={product}
              productIsInCart={isProductInCart(product.id)}
              handleUpdateCart={handleUpdateCart}
              handleRemoveFromCart={handleRemoveFromCart}
              initialQuantity={findProductQuantity(product.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
