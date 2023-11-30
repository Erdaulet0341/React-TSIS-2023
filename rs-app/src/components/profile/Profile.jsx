import s from "./Profile.module.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const clientid = Cookies.get("clientid");
  const sellerid = Cookies.get("sellerid");
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  let cnt = 0;
  let city_or_companyname = "";
  if (sellerid !== undefined) {
    city_or_companyname = "Company name";
  } else if (clientid !== undefined) {
    city_or_companyname = "City";
  }

  useEffect(() => {
    cnt++;
    if (sellerid !== undefined) {
      console.log(`cookie = ${sellerid}`);
      fetch(`http://0.0.0.0:4000/api/SellerById/${sellerid}/`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else if (clientid !== undefined) {
      console.log(`cookie = ${clientid}`);
      fetch(`http://0.0.0.0:4000/api/clientById/${clientid}/`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    } else {
      navigate("/");
      if (cnt === 2) {
        toast.info("First you need login or registration!", {
          autoClose: 1500,
        });
      }
    }
  }, []);

  const logout = () => {
    navigate("/");
    Cookies.remove("sellerid");
    Cookies.remove("clientid");
    toast.info("You are log out!", {
      autoClose: 1500,
    });
  };

  const back = () => {
    navigate(-1);
  };

  return (
    <div className={s.container}>
      <div className={s.profile}>
        <div className={s.icon}>
          <FontAwesomeIcon
            onClick={back}
            className={s.iconn}
            icon={faArrowLeft}
          />
        </div>
        <h2>Profile</h2>
        <div className={s.profile_details}>
          <div className={s.profile_item}>
            <span className={s.label}>Username:</span>
            <span className={s.value}>{user.username}</span>
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Email:</span>
            <span className={s.value}>{user.email}</span>
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>{city_or_companyname}</span>
            <span className={s.value}>
              {user.company_name === undefined ? user.city : user.company_name}
            </span>
          </div>
          <div className={s.profile_item}>
            <span className={s.label}>Password:</span>
            <span className={s.value}>{user.password}</span>
          </div>
          <div className={s.profile_item}>
            <button className={s.logout} onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
