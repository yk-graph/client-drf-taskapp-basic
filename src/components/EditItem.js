import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

const EditItem = () => {
  const { dispatchProvided } = useContext(AppContext)
  return (
    <div>
      <label>商品名変更</label>
      <input
        type="text"
        onChange={(e) =>
          dispatchProvided({
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
          dispatchProvided({
            type: 'edit_price',
            key: 'price',
            payload: e.target.value,
          })
        }
      />
    </div>
  )
}

export default EditItem
