import React from "react";
import s from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
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

export default NotFoundBlock;
