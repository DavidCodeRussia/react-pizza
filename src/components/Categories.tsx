import React from 'react'

type CategoriesProps = {
  category: number | string
  onChangeCategory: (i: number | string) => void
}

const Categories: React.FC<CategoriesProps> = ({
  category,
  onChangeCategory,
}) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Acute', 'Closed']

  if (category === '') {
    category = 0
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            onClick={() => onChangeCategory(i)}
            className={category === i ? 'active' : ''}
            key={i}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
