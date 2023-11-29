import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import s from "./ProductDetails.module.css";
import {
  faStar,
  faStarHalfAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  const fetchData = () => {
    fetch(`http://0.0.0.0:4000/api/productById/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <main>
        <div className={s.card}>
          <div className={s.card__title}>
            <div className={s.icon}>
              <Link to="/list-of-products">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
            </div>
            <h3>All Products</h3>
          </div>
          <div className={s.card__body}>
            <div className={s.half}>
              <div className={s.featured_text}>
                <h1>{product.name}</h1>
                <p className={s.price}>{product.price} TNG</p>
              </div>
              <div className={s.image}>
                <img src={product.imageURL} alt="" />
              </div>
            </div>
            <div className={s.half}>
              <div className={s.description}>
                <p>{product.description}</p>
              </div>
              <div className={s.eviews}>
                <ul className={s.stars}>
                  <li>
                    <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faStar} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                  </li>
                </ul>
                <span>(64 reviews)</span>
              </div>
            </div>
          </div>
          <div className={s.card__footer}>
            <div className={s.recommend}>
              <p>Pieces left</p>
              <h3>{product.quantity}</h3>
            </div>
            <div className={s.action}>
              <button type="button">Add to cart</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}