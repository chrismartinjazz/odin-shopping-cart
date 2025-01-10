import styles from "./Card.module.css"
import PropTypes from 'prop-types'

export default function Card({ product }) {
  return (
    <div className={styles.Card}>
      <img src={product.image} className={styles.image} />
      <div className={styles.price}>{product.price}</div>
      <div className={styles.title}>{product.title}</div>
    </div>
  )
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string,
}),
};