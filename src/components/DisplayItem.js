import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

const DisplayItem = () => {
  const { stateProvided } = useContext(AppContext)
  return (
    <>
      商品名 : {stateProvided.name}
      <br />
      価格 : {stateProvided.price}
    </>
  )
}

export default DisplayItem
