import { Link } from "react-router-dom";
import s from "./Registration.module.css";
import React from "react";

const Registration = (props) => {

  let type = props.type

  if(type === "Client") type = "/login-client"
  else type = "/login-seller"

  return (
    <div className={s.main}>
      <form>
        <div className={s.container}>
          <h1>{props.type} Registration</h1>
          <p>Kindly fill in this form to register.</p>
          <label for="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Arman74"
            name="username"
            id="username"
            required
          />

          <label for="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="example@mail.com"
            name="username"
            id="username"
            required
          />

          <label for="email">
            <b>{props.labell}</b>
          </label>
          <input
            type="text"
            placeholder={props.placee}
            name="email"
            id="email"
            required
          />

          <label for="pwd">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="**********"
            name="pwd"
            id="pwd"
            required
          />

          <label for="pwd-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="**********"
            name="pwd-repeat"
            id="pwd-repeat"
            required
          />

          <button type="submit">Register</button>
        </div>
        <div className={s.already}>
          <p>
            Already have an account? <Link className={s.link} to={type}>Log in</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
