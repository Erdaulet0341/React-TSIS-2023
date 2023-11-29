import s from "./Top.module.css";
import { Link } from "react-router-dom";
import logo from "./logo_home.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Top = () => {
  return (
    <nav className={s.nav}>
      <Link to="/" className={s.logo}>
        <img className={s.logo_icon} src={logo} alt="logo" />
      </Link>
      <ul>
        <li className={s.active}>
          <Link to="/top-products">TOP PRODUCTS</Link>
        </li>
        <li>
          <Link to="/categories">CATEGORIES</Link>
        </li>
      </ul>
      <Link to="/profile">
        <FontAwesomeIcon className={s.faIcon} icon={faUser} />
      </Link>
    </nav>
  );
};

export default Top;
