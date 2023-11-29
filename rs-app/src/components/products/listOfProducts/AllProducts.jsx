import React, { useEffect, useState } from "react";
import s from "./AllProducts.module.css";
import { Link } from "react-router-dom";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState([]);

  const handl = (event) => {
    setInput(event.target.value);
  };

  const fetchData = () => {
    fetch("http://0.0.0.0:4000/api/products/")
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
      <ul className={s.ull}>
        {products
          .filter((element) => element.name.includes(input))
          .map((product) => (
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

const ProductItem = ({ product }) => {
  const [sseller, setSeller] = useState([]);

  const FetchDataSeller = (id) => {
    useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/SellerById/${id}/`)
        .then((response) => response.json())
        .then((data) => {
          setSeller(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  };

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
              <ins>Company: </ins> {FetchDataSeller(product.seller)}{" "}
              {sseller.company_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
