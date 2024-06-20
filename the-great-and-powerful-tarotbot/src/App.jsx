import { useState } from 'react'
import './App.css'

function App() {

  const [query, setQuery] = useState();

  function handleSubmit(e) {

    // Prevents browser from reloading the page.
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

  }

  return (
    <>
      <h1>The Great and Powerful TarotBot</h1>
      <h2>{query}</h2>
      <form onSubmit={handleSubmit}>
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
              className="front"
              type="submit">Submit Query</span>
        </button>
      </form>
    </>
  )
}

/* Inspo
generateTarotCards() {
  let tarotCards = [] // empty arr
  for (3 times)
     <TarotCard name=... desc=...>
 return (
        tarotCards
         
 )
} */

export default App