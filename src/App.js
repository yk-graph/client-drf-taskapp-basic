import React from 'react'
import './App.css'
import AppContext from './contexts/AppContext'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Products from './pages/Products'

const App = () => {
  return (
    <AppContext.Provider value={'情報を他のコンポーネントに提供できる'}>
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
