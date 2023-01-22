import React from 'react'
import s from './NotFoundData.module.scss'

const NotFoundData: React.FC = () => (
  <div className={s.inner_not_found}>
    <h1>
      <span>😕</span>
      <br />
      Nothing found
    </h1>
    <p className={s.description}>Failed to load data for this page.</p>
  </div>
)

export default NotFoundData
