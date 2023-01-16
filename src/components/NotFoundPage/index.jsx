import React from "react";
import s from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={s.inner_not_found}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={s.description}>Данная страница отсутствует в интернет-магазине.</p>
    </div>
  );
};

export default NotFoundPage;
