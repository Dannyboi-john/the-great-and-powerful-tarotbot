import React, { useState, useEffect } from 'react'
import './App.css'

function Landing({ onSubmit }) {

  let textareaClassName = 'query-text';
  let buttonClassName = 'submit-button';
  let spanClassName = 'front';

  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = React.createRef();

  // Handles fading out animation.
  if (isSubmitted) {
    textareaClassName += ' landing-fade-out';
    buttonClassName += ' landing-fade-out';
/* 
  } else if (ref.current && ref.current.classList.contains("landing-fade-out")){      
    setTimeout(function() {
      textareaClassName += 'landing-remove';
      buttonClassName += 'landing-remove';

  }, 250);} */
  }

  const [query, setQuery] = useState();

  function handleSubmit(e) {


    // Prevents browser from reloading the page.
    e.preventDefault();
    onSubmit();
    setIsSubmitted(true);

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
      
      <form onSubmit={handleSubmit}  >
        <textarea className={textareaClassName}
          placeholder="Compose Query Here" 
          name="query" 
          rows={5} 
          ref={ref}
          cols={80}
          id="text-area-id"
          onChange={e => setQuery(e.target.value)
          }
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