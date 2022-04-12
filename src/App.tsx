import React from 'react'
import './App.css'
import DrfApiFetch from './components/DrfApiFetch'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DrfApiFetch />
      </header>
    </div>
  )
}

export default App
