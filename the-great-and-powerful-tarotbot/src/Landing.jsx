import React, { useState, useContext, useRef } from 'react';
import './App.css';
import { DataContext } from './DataContext';
import enterIcon from './assets/enter-icon.svg';

function Landing({ onSubmit }) {

  let textareaClassName = 'query-text';
  let buttonClassName = 'submit-button';

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [query, setQuery] = useState('');

  const { setState } = useContext(DataContext);

  const formRef = useRef(null);

  function handleKeyDown(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }

    if (isSubmitted) {
      textareaClassName += ' landing-fade-out';
      buttonClassName += ' landing-fade-out';
    }


  function handleSubmit(e) {

    // Prevents browser from reloading the page.
    e.preventDefault();

    // Passes prop to App.jsx
    onSubmit(query);
    setIsSubmitted(true);
    setState((prevState) => ({ ...prevState, isSubmitted: true}));
    

    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      console.log('Form Data:', formJson);
    }

    // Adds fadeout class to Landing elements.
    textareaClassName += ' landing-fade-out';

    // Sets query data
    setState((prevState) => ({ ...prevState, queryData: query}));
    setQuery(query);

  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}  >
        <textarea className={textareaClassName}
          placeholder="Compose Query Here" 
          name="query" 
          id="text-area-id"
          value={query} // Added this value tag while switching to context.
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          />

          <br />

        <button 
          className={buttonClassName}
          type="submit"
          >
            <img
              src={enterIcon}
              alt="enter icon"
              />
        </button>
      </form>
    </>
  )
}


export default Landing