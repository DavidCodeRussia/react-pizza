import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const FullPizza = () => {
  const [pizza, setPizza] = React.useState()
  const { id } = useParams()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = axios.get(
          'https://63bbd74a32d17a509099ef50.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (err) {
        console.log('Ошибка: ', err)
      }
    }
    fetchPizza()
  }, [])

  return (
    <div className="container">
      {/* <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4> */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
        quam? Tempore dolore quaerat, veniam ex accusamus quasi eius assumenda
        maiores repudiandae sint praesentium sunt similique. Harum iusto sequi
        possimus veritatis!
      </p>
      <h4>395 ₽</h4>
    </div>
  )
}

export default FullPizza
