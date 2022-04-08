import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Item from '../components/Item'

const Products = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Item />
        <Link to="/">TOPへ</Link>
      </header>
    </div>
  )
}

export default Products
