/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import ReactPaginate from 'react-paginate';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items
    // .filter((item) => {
    //   if (item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((item, index) => <PizzaBlock key={index} {...item} />);

  const [sort, setSort] = React.useState({
    name: 'popular (desc)',
    sortProperty: 'rating',
    direction: 'desc',
  });
  const [category, setCategory] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    const categoryId = category > 0 ? `category=${category}` : ``;
    const sortApi = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://63bbd74a32d17a509099ef50.mockapi.io/items?${categoryId}&sortBy=${sortApi}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [category, sort, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} setCategory={setCategory} />
        <Sort sort={sort} setSort={setSort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{loading ? skeletons : pizzas}</div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => console.log('e', e)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Home;
