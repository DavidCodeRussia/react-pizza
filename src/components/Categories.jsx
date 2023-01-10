import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/filtrationSlice";
import { selectsetCategory } from "../redux/filtrationSlice";

function Categories() {
  const dispatch = useDispatch();
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
  let category = useSelector(selectsetCategory);
  console.log("category", category);
  const onClickCategory = (index) => {
    if (index === 0) {
      index = "";
    }
    dispatch(setCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li onClick={() => onClickCategory(i)} className={category === i ? "active" : ""} key={i}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
