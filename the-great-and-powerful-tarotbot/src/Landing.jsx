import React, { useState, useEffect, useContext, createContext } from 'react'
import './App.css'

function Landing({ onSubmit }) {

  let textareaClassName = 'query-text';
  let buttonClassName = 'submit-button';
  let spanClassName = 'front';

  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = React.createRef();

    if (isSubmitted) {
      textareaClassName += ' landing-fade-out';
      buttonClassName += ' landing-fade-out';
    }

  function handleSubmit(e) {

    // Prevents browser from reloading the page.
    e.preventDefault();

    // Passes prop to App.jsx
    onSubmit();
    setIsSubmitted(true);

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Sends form data to console.
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    // Adds fadeout class to Landing elements.
    textareaClassName += ' landing-fade-out';

  }

  return (
    <>
      <form onSubmit={handleSubmit}  >
        <textarea className={textareaClassName}
          placeholder="Compose Query Here" 
          name="query" 
          rows={5} 
          ref={ref}
          cols={80}
          id="text-area-id"
/*           onChange={e => setQuery(e.target.value) 
          } */
          />

          <br />

        <button 
          className={buttonClassName}
          type="submit"
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