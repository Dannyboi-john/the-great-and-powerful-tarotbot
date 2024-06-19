import { useState } from 'react'
import './App.css'

function App() {

  const [query, setQuery] = useState();

  return (
    <>
      <h1>The Great and Powerful TarotBot</h1>
      <h2>{query}</h2>
      <textarea className="query-text" 
        placeholder="Compose Query Here" 
        name="query" 
        rows={5} 
        cols={80}
        onChange={
          e => setQuery(e.target.value)
        } />

        <br />

      <button 
        onClick={
          e => {}
        }
        className="submit-button"
        name="submit"
        >
          <span
            className="front" >Submit Query</span>
      </button>
    </>
  )
}

export default App