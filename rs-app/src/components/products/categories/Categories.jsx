import React, { useEffect, useState } from "react";
import s from "./Categories.module.css";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const fetchUserData = () => {
    fetch("http://0.0.0.0:4000/api/categories/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={s.container}>
      <ul className={s.ull}>
        {categories.map((category) => (
          <Link
            className={s.linkk}
            to={`/categories/${category.id}/products`}
            key={category.id}
          >
            <CateforyItem category={category} />
          </Link>
        ))}
      </ul>
    </div>
  );
}

const CateforyItem = ({ category }) => {
  return (
    <div className={s.categoryItem}>
      <section className={s.articles}>
        <article>
          <div className={s.article_wrapper}>
            <figure>
              <img src={category.imageURL} alt="" />
            </figure>
            <div className={s.article_body}>
              <h2>{category.name}</h2>
              <p>
                {category.description}
              </p>
              <a href="#" className={s.read_more}>
                Read more{" "}
                <span className={s.sr_only}>about this is some title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={s.icon}
                  viewBox="0 0 20 20"
                  fill="currentC  olor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
