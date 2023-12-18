import { Link, useNavigate } from "react-router-dom";
import s from "./AddProduct.module.css";
import Cookies from "js-cookie";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddProduct() {
  const navigate = useNavigate();
  const sellerid = Cookies.get("sellerid");
  const [categories, setCategories] = useState([]);
  const [categoryname, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://0.0.0.0:4000/api/categories/`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching likes data:", error);
      }
    };

    fetchData();
  }, [sellerid]);

  let categoryNames = [];
  if (categories.length !== 0) {
    categories.map((category) => {
      categoryNames.push(category.name);
    });
  }

  let categoryOptions = [];
  if (categories.length !== 0) {
    categoryOptions = categoryNames.map((name) => ({
      label: name,
      value: name,
    }));
  }

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    category: "",
    seller: sellerid,
    description: "",
    imageURL: "",
    price: "",
    quantity: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlCategory = (selectedOption) => {
    setCategoryName(selectedOption.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log(`Category: ${formData.category}`);
  
    const fetchDataCategory = async () => {
      try {
        const response = await fetch(`http://0.0.0.0:4000/api/categotyByName/${categoryname}/`);
        const category = await response.json();
  
        formData.category = category.id;
        return formData;
      } catch (error) {
        console.error("Error fetching category data:", error);
        throw error; 
      }
    };
  
    fetchDataCategory()
      .then((updatedFormData) => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        };
  
        return fetch(`http://0.0.0.0:4000/api/products/`, requestOptions);
      })
      .then((response) => response.json())
      .then(() => {
        console.log(formData);
        navigate("/seller-products");
        toast.success("Your Product added successfully", { autoClose: 1500 });
      })
      .catch((error) => {
        console.log("Error updating data:", error);
        toast.error("Something went wrong", { autoClose: 2500 });
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
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>

          <div className={s.profile_item}>
            <span className={s.label}>Category:</span>
            <Select
              className={s.dropdown}
              placeholder="Select a category"
              options={categoryOptions}
              name="category"
              id="username"
              required
              value={categoryOptions.find(
                (option) => option.value === categoryname
              )}
              onChange={handlCategory}
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
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
