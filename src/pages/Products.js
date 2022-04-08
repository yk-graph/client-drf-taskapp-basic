import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import DisplayItem from '../components/DisplayItem'
import EditItem from '../components/EditItem'

const Products = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DisplayItem />
        <EditItem />
        <Link to="/">TOPへ</Link>
      </header>
    </div>
  )
}

export default Products
