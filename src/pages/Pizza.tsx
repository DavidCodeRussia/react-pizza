import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const navigate = useNavigate()
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: number
  }>()

  const { id } = useParams()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(
          'https://63bbd74a32d17a509099ef50.mockapi.io/items/' + id
        )
        setPizza(res.data)
      } catch (err) {
        console.log('Ошибка: ', err)
        navigate('/')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <div>Загрузка ...</div>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
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
