import { useSelector } from 'react-redux'

import { useAppDispatch } from '../redux/store'
import { setCategory } from '../redux/slices/filter/slices'
import { selectCategory } from '../redux/slices/filter/selectors'

const Categories = () => {
  const dispatch = useAppDispatch()
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Acute', 'Closed']

  let category = useSelector(selectCategory)
  const onChangeCategory = (i: number | string) => {
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
