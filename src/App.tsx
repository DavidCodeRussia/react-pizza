import React from 'react'
import Loadable from 'react-loadable'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import MainLayout from './layouts/MainLayout'

import './scss/app.scss'

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Loading...</div>,
})

const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "Pizza" */ './pages/Pizza')
)
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
