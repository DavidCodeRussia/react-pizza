import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);

  const amountItemsForLoading = [{}, {}, {}, {}, {}, {}, {}, {}];
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://63bbd74a32d17a509099ef50.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? amountItemsForLoading.map((_, i) => <Skeleton key={i} />)
          : items.map((item, index) => <PizzaBlock key={index} {...item} />)}
      </div>
    </>
  );
};

export default Home;
