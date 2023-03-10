/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce'

import {
  selectCategory,
  selectSort,
  selectCurrentPage,
  selectSearchValue,
} from '../../redux/slices/filter/selectors'
import { setSearchValue } from '../../redux/slices/filter/slices'

import s from './Search.module.scss'

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const input = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState('')

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 350),
    []
  )

  const onClearInput = () => {
    dispatch(setSearchValue(''))
    setValue('')

    input.current?.focus()
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  const navigate = useNavigate()
  const isMounted = React.useRef(false)

  const sort = useSelector(selectSort)
  const category = useSelector(selectCategory)
  const currentPage = useSelector(selectCurrentPage)
  const searchValue = useSelector(selectSearchValue)

  React.useEffect(() => {
    if (isMounted.current) {
      const queryStr = qs.stringify({
        sort: sort.sortBy,
        category,
        currentPage: currentPage,
        searchValue,
      })
      navigate(`?${queryStr}`)
    }
    isMounted.current = true
  }, [category, sort.sortBy, currentPage, searchValue])

  return (
    <div className={s.iconWrapper}>
      <input
        ref={input}
        className={s.search}
        value={value}
        onChange={onChangeInput}
        placeholder="Поиск пиццы ..."
      />
      <svg
        className={s.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      {value && (
        <svg
          className={s.cleareIcon}
          onClick={onClearInput}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  )
}
