import React, { useEffect, useState } from "react";
import s from "./TopProducts.module.css";
import { Link } from "react-router-dom";

export default function TopProducts() {
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    fetch("http://0.0.0.0:4000/api/popularProducts/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={s.container}>
      <h1>TOP SALED PRODUCTS</h1>

      <ul className={s.ull}>
        {products.map((product) => (
          <Link
            className={s.linkk}
            to={`/list-of-products/${product.id}`}
            key={product.id}
          >
            <ProductItem product={product} />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export const ProductItem = ({ product }) => {
  const [sseller, setSeller] = useState([]);

  useEffect(() => {
    const FetchDataSeller = (id) => {
      fetch(`http://0.0.0.0:4000/api/SellerById/${id}/`)
        .then((response) => response.json())
        .then((data) => {
          setSeller(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    FetchDataSeller(product.seller);
  }, [product.seller]);

  return (
    <div className={s.body}>
      <div className={s.nft}>
        <div className={s.main}>
          <img className={s.tokenImage} src={product.imageURL} alt="NFT" />
          <h2>{product.name}</h2>
          <p className={s.description}>{product.description}</p>
          <div className={s.tokenInfo}>
            <div className={s.price}>
              <ins>◘</ins>
              <p>{product.price} TNG</p>
            </div>
            <div className={s.duration}>
              <ins>◷</ins>
              <p>{product.quantity} pieces left</p>
            </div>
          </div>
          <hr />
          <div className={s.creator}>
            <p>
              <ins>Company: </ins> {sseller.company_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
