import s from "./Top.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from './logo_home.png'

const Top = () => {
  return (
    <nav className={s.nav}>
      <Link to="/welcome" className={s.logo}>
        <img className={s.logo_icon} src={logo} alt="logo" />
      </Link>
      <ul>
        <li className={s.active}>
          <Link to="/top-products">TOP</Link>
        </li>
        <li>
          <Link to="/categories">CATEGORIES</Link>
        </li>
        <li>
          <Link to="/new-products">NEW</Link>
        </li>
      </ul>
      <Search></Search>
    </nav>
  );
};

export default Top;

function Search() {
  return (
    <form className={s.search_box}>
      <input type="text" placeholder="Search anything"/>
      <button type="reset"></button>
    </form>
  );
}
