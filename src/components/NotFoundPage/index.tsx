import React from 'react'
import s from './NotFoundPage.module.scss'

export const NotFoundPage: React.FC = () => (
  <div className={s.inner_not_found}>
    <h1>
      <span>😕</span>
      <br />
      Nothing found
    </h1>
    <p className={s.description}>
      This page is not available in the online store.
    </p>
  </div>
)
