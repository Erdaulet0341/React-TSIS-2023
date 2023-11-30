import { Link, useParams } from "react-router-dom";
import s from "./EditProducts.module.css";
import React, { useEffect, useState } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageURL: ""
  });

  const fetchData = () => {
    fetch(`http://0.0.0.0:4000/api/productById/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData(); 
  }, [id]); 

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.profile}>
        <h2>Edit Product</h2>
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
            <span className={s.label}>Price:</span>
            <input
              className={s.value}
              type="text"
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
          <div className={s.btn}>
            <button type="submit" className={s.savee}>
              save
            </button>
            <button className={s.dell}>DELETE</button>
          </div>
        </div>
      </form>
    </div>
  );
}
