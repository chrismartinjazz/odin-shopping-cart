import PropTypes from "prop-types";
import styles from "./Home.module.css";
import imgLightning from "../../assets/lightning.jpg";
import { Link } from "react-router-dom";

Home.propTypes = {
  displayCart: PropTypes.bool,
  cart: PropTypes.array,
  handleRemoveFromCart: PropTypes.func,
};

export default function Home() {
  return (
    <>
      <div className={styles.Home} role={"region"} aria-label={"Home Page"}>
        <div className={styles.main}>
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>Welcome to Odin Mart</h1>
              <p>
                Norse shopping... <br />
                lightning fast
              </p>
              <Link className={styles.shopLink} to="/shop">
                Shop Now
              </Link>
            </div>
            <div>
              <img className={styles.heroImage} src={imgLightning} />
              <p className={styles.attributions}>
                Photo by{" "}
                <a href="https://www.pexels.com/photo/lightning-in-dark-storm-sky-9837044/">
                  Anton Kudryashov
                </a>
              </p>
              <p className={styles.attributions}>
                Shop items from{" "}
                <a href="https://fakestoreapi.com">fakestoreapi.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
