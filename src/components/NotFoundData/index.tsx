import React from 'react'
import s from './NotFoundData.module.scss'

const NotFoundData: React.FC = () => (
  <div className={s.inner_not_found}>
    <h1>
      <span>😕</span>
      <br />
      Ничего не найдено
    </h1>
    <p className={s.description}>
      Не удалось подгрузить данные для данной страницы.
    </p>
  </div>
)

export default NotFoundData
