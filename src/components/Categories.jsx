import React from "react";

function Categories({ category, setCategory }) {
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Acute", "Closed"];

  const onClickCategory = (i) => {
    if (i === 0) {
      i = "";
    }
    setCategory(i);
  };

  if (category === "") {
    category = 0;
  }

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
