import { useState, useEffect } from "react";
import { requestData } from "../../request-data.js";
import Card from "../Card/Card.jsx";

export default function Shop() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestData("products")
      .then((response) => {
        setError(null);
        setProducts(response);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2>Shop</h2>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Card product={product} />
          </div>
        )
      })}
    </>
  )
}