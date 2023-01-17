import React from 'react'
import { useDispatch } from 'react-redux'
import { setCategory } from '../redux/slices/filtrationSlice'

type CategoriesProps = {
  category: number | string
}

const Categories: React.FC<CategoriesProps> = ({ category }) => {
  const dispatch = useDispatch()
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Acute', 'Closed']

  const onClickCategory = (i: number | string) => {
    if (i === 0) {
      i = ''
    }
    dispatch(setCategory(i))
  }

  if (category === '') {
    category = 0
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            onClick={() => onClickCategory(i)}
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
