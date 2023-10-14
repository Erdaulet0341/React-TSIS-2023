import s from "./Top.module.css";

const Top = () => {
  return (
    <nav className={s.nav}>
      <a href="/" className={s.logo}>
        RS-shop
      </a>
      <ul>
        <li className={s.active}>
          <a href="/products">PRODUCTS</a>
        </li>
        <li>
          <a href="/categories">CATEGORIES</a>
        </li>
        <li>
          <a href="/new">NEW</a>
        </li>
      </ul>
      <input type="text"></input>
    </nav>
  );
};

export default Top;
