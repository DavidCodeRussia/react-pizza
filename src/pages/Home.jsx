/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const amountItemsForLoading = [{}, {}, {}, {}, {}, {}, {}, {}];

  const [sort, setSort] = React.useState({
    name: "popular (desc)",
    sortProperty: "rating",
    direction: "desc",
  });
  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    const categoryId = category > 0 ? `category=${category}` : ``;
    const sortApi = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";

    fetch(
      `https://63bbd74a32d17a509099ef50.mockapi.io/items?${categoryId}&sortBy=${sortApi}&order=${order}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [category, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} setCategory={setCategory} />
        <Sort sort={sort} setSort={setSort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {loading
          ? amountItemsForLoading.map((_, i) => <Skeleton key={i} />)
          : items.map((item, index) => <PizzaBlock key={index} {...item} />)}
      </div>
    </div>
  );
};

export default Home;
