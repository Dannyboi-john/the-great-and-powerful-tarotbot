import React, { useState, useContext } from 'react';
import './App.css';
import { DataContext } from './DataContext';

function Landing({ onSubmit }) {

  let textareaClassName = 'query-text';
  let buttonClassName = 'submit-button';
  let spanClassName = 'front';

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [query, setQuery] = useState('');

  const { setState } = useContext(DataContext);


  // Accesses DataContext to pass query data from Landing to ReadingView.
  // const { setQueryData } = useContext(DataContext); *****

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
    

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Sends form data to console.
    const formJson = Object.fromEntries(formData.entries());

    // Adds fadeout class to Landing elements.
    textareaClassName += ' landing-fade-out';

    // Sets query data
    setState((prevState) => ({ ...prevState, queryData: query}));
    setQuery(query);

  }

  return (
    <>
      <form onSubmit={handleSubmit}  >
        <textarea className={textareaClassName}
          placeholder="Compose Query Here" 
          name="query" 
          id="text-area-id"
          value={query} // Added this value tag while switching to context.
          onChange={e => setQuery(e.target.value)}
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


export default Landing