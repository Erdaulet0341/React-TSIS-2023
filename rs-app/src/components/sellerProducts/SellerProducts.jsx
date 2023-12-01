import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import s from "./SellerProducts.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const userId = Cookies.get("sellerid");

  useEffect(() => {
    const fetchData = () => {
      let url = `http://0.0.0.0:4000/api/SellerById/${userId}/products/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [userId]);

  const addproduct = () =>{
    navigate("/seller-products/add-product")
  }

  return (
    <div className={s.container}>
      <button onClick={addproduct} className={s.addnew}>ADD NEW PRODUCT</button>
      <div>
        {products.length === 0 ? (
          <p className={s.noProductMessage}>No products found!</p>
        ) : (
          <ul className={s.ull}>
            {products.map((product) => (
              <Link
                className={s.linkk}
                to={`/edit-product/${product.id}`}
                key={product.id}
              >
                <ProductItemSeller product={product} />
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const ProductItemSeller = ({ product }) => {
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
          <div className={s.creator}></div>
        </div>
      </div>
    </div>
  );
};
