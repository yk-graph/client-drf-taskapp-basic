import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

const Item = () => {
  const value = useContext(AppContext)
  return <div>{value}</div>
}

export default Item
