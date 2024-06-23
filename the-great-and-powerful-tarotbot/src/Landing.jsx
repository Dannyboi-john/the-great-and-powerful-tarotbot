import React, { useState } from 'react'
import './App.css'

function Landing() {

  let textareaClassName = 'query-text';
  let buttonClassName = 'submit-button';
  let spanClassName = 'front';

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    textareaClassName += ' landing-fade-out';
    buttonClassName += ' landing-fade-out';
  }

  const [query, setQuery] = useState();

  function handleSubmit(e) {

    // Prevents browser from reloading the page.
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    // Adds fadeout class to Landing elements
    textareaClassName += ' landing-fade-out';

  }

  return (
    <>
      <h1>The Great and Powerful TarotBot</h1>
      <h2>{query}</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea className={textareaClassName}
          placeholder="Compose Query Here" 
          name="query" 
          rows={5} 
          cols={80}
          onChange={
            e => setQuery(e.target.value)
          }
          />

          <br />

        <button 
          className={buttonClassName}
          name="submit"
          onClick={() => setIsSubmitted(true)}
          >
            <span
              className={spanClassName}
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

export default Landing