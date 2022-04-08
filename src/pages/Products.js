import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Item from '../components/Item'

const initialState = {
  name: 'ディスプレイ',
  price: 10000,
}

const reducer = (currentState, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'edit_name':
      return {
        ...currentState,
        [action.key]: action.payload,
      }
    case 'edit_price':
      return {
        ...currentState,
        [action.key]: action.payload,
      }
    case 'reset':
      return initialState
    default:
      return currentState
  }
}

const Products = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <header className="App-header">
        <Item />
        <div>
          商品名 : {state.name}
          <br />
          価格 : {state.price}
          <br />
          <label>商品名変更</label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({
                type: 'edit_name',
                key: 'name',
                payload: e.target.value,
              })
            }
          />
          <br />
          <label>価格変更</label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({
                type: 'edit_price',
                key: 'price',
                payload: e.target.value,
              })
            }
          />
        </div>
        <Link to="/">TOPへ</Link>
      </header>
    </div>
  )
}

export default Products
