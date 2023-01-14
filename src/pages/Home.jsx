/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../App';
import {
  selectCategory,
  selectSort,
  selectCurrentPage,
  setTotalFiltration,
} from '../redux/slices/filtrationSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const sort = useSelector(selectSort);
  const category = useSelector(selectCategory);
  const currentPage = useSelector(selectCurrentPage);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((item, index) => <PizzaBlock key={index} {...item} />);

  const fetchPizzas = () => {
    setLoading(true);

    const sortApi = sort.sortBy.replace('-', '');
    const order = sort.sortBy.includes('-') ? 'asc' : 'desc';
    const categoryId = category > 0 ? `&category=${category}` : ``;
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://63bbd74a32d17a509099ef50.mockapi.io/items?page=${currentPage}&limit=4${categoryId}&sortBy=${sortApi}&order=${order}${search}`,
      )
      .then((data) => {
        setItems(data.data);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sortBy: sort.sortBy,
        category,
        page: currentPage,
      });
      navigate(`?${queryStr}`);
    }
    isMounted.current = true;
  }, [category, sort.sortBy, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const item = list.find((item) => item.sortBy === params.sortBy);

      dispatch(setTotalFiltration({ ...params, item }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [category, sort.sortBy, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={category} />

        <Sort sort={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{loading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} />
    </div>
  );
};

export default Home;
