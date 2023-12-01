import React, { useEffect, useState } from "react";
import s from "./MyLikes.module.css";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function MyLikes() {
  const [likes, setLikes] = useState([]);
  const [products, setProducts] = useState([]);
  const clientid = Cookies.get("clientid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://0.0.0.0:4000/api/likes/${clientid}/`
        );
        const data = await response.json();
        setLikes(data);
      } catch (error) {
        console.error("Error fetching likes data:", error);
      }
    };

    fetchData();
  }, [clientid]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = likes.map(async (like) => {
          const response = await fetch(
            `http://0.0.0.0:4000/api/productById/${like.product}/`
          );
          const data = await response.json();
          return data;
        });

        const productsData = await Promise.all(promises);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    if (likes.length > 0) {
      fetchProducts();
    }
  }, [likes]);

  const uniqueLikes = Array.from(new Set(products.map(product => product.id)))
  .map(id => {
    return products.find(product => product.id === id);
  });

  return (
    <div className={s.container}>
        <h1 >MY LIKED PRODUCTS</h1>
      {likes.length === 0 ? (
        <p className={s.noProductMessage}>You don't liked any product!</p>
      ) : (
        <ul className={s.ull}>
          {uniqueLikes.map((product) => (
            <Link
              className={s.linkk}
              to={`/list-of-products/${product.id}`}
              key={product.id}
            >
              <ProductItem product={product} />
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export const ProductItem = ({ product }) => {
  const [sseller, setSeller] = useState([]);

  console.log(`produc = ${product.name}`);

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
