import { Link, useNavigate } from "react-router-dom";
import s from "./AddProduct.module.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddProduct() {
  const navigate = useNavigate();
  const sellerid = Cookies.get("sellerid");

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    category: "",
    seller:sellerid ,
    description: "",
    imageURL: "",
    price: "",
    quantity: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`http://0.0.0.0:4000/api/products/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(formData)
        navigate("/seller-products")
        toast.success("Your Product added successfully", { autoClose: 1500 });
      })
      .catch((error) => {
        console.log("Error updating data:", error);
        toast.error("Somethink wrong", { autoClose: 2500 });
      });
    
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.profile}>
        <div className={s.icon}>
          <Link to="/seller-products" state={{ id: formData.seller }}>
            <FontAwesomeIcon className={s.iconn} icon={faArrowLeft} />
          </Link>
        </div>
        <h2>Add new product:</h2>
        <div className={s.profile_details}>
          <div className={s.profile_item}>
            <span className={s.label}>Name:</span>
            <input
              className={s.value}
              type="text"
              placeholder="Samsung 111"
              name="name"
              id="username"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Description:</span>
            <input
              className={s.value}
              type="text"
              placeholder="Description......"
              name="description"
              id="username"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Category:</span>
            <input
              className={s.value}
              type="text"
              placeholder="Phones......"
              name="category"
              id="username"
              required
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Price:</span>
            <input
              className={s.value}
              type="number"
              placeholder="6999"
              name="price"
              id="username"
              required
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Image URL:</span>
            <input
              className={s.value}
              type="text"
              placeholder="https://image.cdn-kaspi.kz/img/m/p/h7a/h5f/67"
              name="imageURL"
              id="username"
              required
              value={formData.imageURL}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Quantity:</span>
            <input
              className={s.value}
              type="number"
              placeholder="777"
              name="quantity"
              id="username"
              required
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.btn}>
            <button type="submit" className={s.savee}>
              ADD
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
