import { Link, useParams, useNavigate } from "react-router-dom";
import s from "./EditProducts.module.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditProduct() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    category: 0,
    seller: 0,
    description: "",
    imageURL: "",
    price: "",
    quantity: 0,
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`http://0.0.0.0:4000/api/productById/${id}/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        toast.success("Your Product updated successfully", { autoClose: 2500 });
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        toast.error("Somethink wrong", { autoClose: 2500 });
      });
  };

  const deleteUser = () => {
    fetch(`http://0.0.0.0:4000/api/productById/${id}/`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        toast.error("Product deleted", { autoClose: 2500 });
        navigate("/seller-products", { state: { id: formData.seller } });
      })
      .catch((error) => {
        toast.error("Somethink wrong", { autoClose: 2500 });
      });
  };

  return (
    <div className={s.container}>
      <div className={s.profile}>
        <div className={s.icon}>
          <Link to="/seller-products" state={{ id: formData.seller }}>
            <FontAwesomeIcon className={s.iconn} icon={faArrowLeft} />
          </Link>
        </div>
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
          <div className={s.btn}>
            <button onClick={handleSubmit} className={s.savee}>
              SAVE
            </button>
            <button className={s.dell} onClick={deleteUser}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
