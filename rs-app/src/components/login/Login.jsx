import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';

const Login = (props) => {
  let type = props.type;
  if (type === "client") type = "/client-registration";
  else type = "/seller-registration";

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    if (props.type === "client") {
      fetchUserData("http://0.0.0.0:4000/api/clients/");
    } else {
      fetchUserData("http://0.0.0.0:4000/api/sellers/");
    }
  }, [props.type]);

  const [loginValue, setLoginValue] = useState("");
  const loginChange = (e) => {
    setLoginValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = useState("");
  const passwordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginValue.length === 0 || passwordValue.length === 0) {
      console.log("Enter login and password");
    } else {
      let check = false;
      users.map((user) => {
        if (user.email === loginValue && user.password === passwordValue) {
          check = true;

          toast.success("Your are logined successfully", { autoClose: 1500 });
          if (type === "/seller-registration") {
            navigate("/seller-products", { state: { id: user.id } });
            Cookies.set('sellerid', user.id);
            Cookies.remove('clientid');
          } else {
            navigate("/list-of-products", { state: { id: user.id } });
            Cookies.set('clientid', user.id);
            Cookies.remove('sellerid');
          }
        }
      });

      if (!check) {
        toast.error("Incorrect login or password", { autoClose: 1500 });
      }
    }
  };

  return (
    <div className={s.main}>
      <form onSubmit={handleSubmit}>
        <div className={s.container}>
          <h1>Login</h1>
          <p>Enter email and password for login</p>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="example@mail.com"
            name="username"
            id="username"
            required
            value={loginValue}
            onChange={loginChange}
            autoComplete="current-email"
          />

          <label htmlFor="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="**********"
            name="pwd"
            id="pwd"
            required
            value={passwordValue}
            onChange={passwordChange}
            autoComplete="current-password"
          />

          <button type="submit">Login</button>
        </div>
        <div className={s.already}>
          <p>
            Don't have an Account?{" "}
            <Link className={s.link} to={type}>
              Register
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
