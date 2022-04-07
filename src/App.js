import { useState } from 'react'
import './App.css'

const App = () => {
  const [product, setProducts] = useState({ name: '', price: '' })

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <span>productの名称 : {product.name}</span>
          <br />
          <span>productの価格 : {product.price}</span>
          <div>
            名称変更
            <input
              type="text"
              onChange={(e) =>
                setProducts({ ...product, name: e.target.value })
              }
            />
          </div>
          <div>
            価格変更
            <input
              type="number"
              onChange={(e) =>
                setProducts({ ...product, price: e.target.value })
              }
            />
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
