import React, { useReducer } from 'react'
import './App.css'
import AppContext from './contexts/AppContext'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Products from './pages/Products'

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

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider
      value={{ stateProvided: state, dispatchProvided: dispatch }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/products" element={<Products />} />
        </Routes>
        <div className="App">
          <header className="App-header">
            <Link to="/products">プロダクトページへ</Link>
          </header>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
