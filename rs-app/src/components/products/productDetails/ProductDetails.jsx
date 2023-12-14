import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import s from "./ProductDetails.module.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  faStar,
  faStarHalfAlt,
  faArrowLeft,
  faEnvelope,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductDetails() {
  const { id } = useParams();
  const clientid = Cookies.get("clientid");
  const [product, setProduct] = useState([]);
  const [likes, setLikes] = useState([]);

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

  const fetchLike = () => {
    fetch(`http://0.0.0.0:4000/api/likes/${clientid}/`)
      .then((response) => response.json())
      .then((data) => {
        setLikes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    if (clientid !== undefined) {
      fetchLike();
    }
  }, []);

  const addlike = () => {
    setTimeout(() => {
      if (clientid !== undefined) {
        fetchLike();
        let check = true;
        likes.map((like) => {
          if (like.product === product.id) {
            console.log("find");
            check = false;
          }
        });

        console.log(check);

        if (check) {
          const newLike = {
            client: clientid,
            product: product.id,
          };
          console.log(newLike);
          fetch("http://0.0.0.0:4000/api/likes/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLike),
          })
            .then((response) => response.json())
            .then(() => {
              toast.success("Your are liked successfully", { autoClose: 1500 });
            })
            .catch((error) => {
              console.log("Error creating a new user:", error);
            });
        }
        else{
          toast.info("You already liked", { autoClose: 1500 });
        }
      } else {
        toast.error("First you ro login as client", {
          autoClose: 1500,
        });
      }
    }, 500);
  };
  

  const directmsg = () => {
    if (clientid !== undefined) {
      const recipientEmail = "seller@g.com";
      const subject =    `${product.name}`;
      const body = `Can I by this product ${product.name}`;

      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
    } else {
      toast.error("First you ro login as client", {
        autoClose: 1500,
      });
    }
  };

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
                <span>{product.seller} reviews</span>
              </div>
            </div>
          </div>
          <div className={s.card__footer}>
            <div className={s.recommend}>
              <p>Pieces left</p>
              <h3>{product.quantity}</h3>
            </div>
            <div className={s.action}>
              <button onClick={directmsg} type="button">
                Direct Message{" "}
                <FontAwesomeIcon className={s.messagee} icon={faEnvelope} />
              </button>
            </div>
            <div className={s.action}>
              <button onClick={addlike} type="button">
                Add to Like{" "}
                <FontAwesomeIcon className={s.likee} icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
