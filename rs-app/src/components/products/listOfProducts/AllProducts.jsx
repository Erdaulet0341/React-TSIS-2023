import React, { useEffect, useState } from "react";
import s from "./AllProducts.module.css";
import { Link, useParams } from "react-router-dom";

export default function AllProducts(prob) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      let url = "http://0.0.0.0:4000/api/products/";

      if (id !== undefined) {
        url = `http://0.0.0.0:4000/api/categories/${id}/products`;
      }

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          const cachedProducts = JSON.parse(localStorage.getItem('products'));
          setProducts(cachedProducts)
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [id]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={s.container}>
      <div className={s.search_box}>
        <input
          type="text"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="reset"></button>
      </div>
      {filteredProducts.length === 0 ? (
        <p className={s.noProductMessage}>No products found!</p>
      ) : (
        <ul className={s.ull}>
          {filteredProducts.map((product) => (
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
