import s from "./Top.module.css";
import { Link } from "react-router-dom";
import logo from "./logo_home.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Top = () => {
  const clientid = Cookies.get("clientid");
  const navigate = useNavigate();
  const sellerid = Cookies.get("sellerid");
  const handleNavigation = () => {
    if (sellerid !== undefined) {
      navigate("/seller-products", { state: { id: sellerid } });
    } else if (clientid !== undefined) {
      navigate("/list-of-products", { state: { id: clientid } });
    } else {
      navigate("/");
    }
  };

  return (
    <nav className={s.nav}>
      <button className={s.logo} onClick={handleNavigation}>
        <img className={s.logo_icon} src={logo} alt="logo" />
      </button>
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
