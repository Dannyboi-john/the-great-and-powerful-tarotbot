import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <h1>The Great and Powerful TarotBot</h1>
      <textarea className="query-text" 
        placeholder="Compose Query Here" 
        name="query" 
        rows={5} 
        cols={80} />

        <br />

      <button 
        className="submit-button"
        name="submit"
        >Submit Query
      </button>
    </>
  )
}

export default App