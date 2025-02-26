import React, { useState, useContext, useRef } from 'react';
import './App.css';
import { DataContext } from './DataContext';

function Landing({ onSubmit }) {

  let textareaClassName = 'query-text';
  let buttonClassName = 'submit-button';

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedSpread, setSelectedSpread] = useState(null)

  // Handles Landing fade-out.
  const [fadeOut, setFadeOut] = useState(false);

  const { state, setState } = useContext(DataContext);

  const formRef = useRef(null);
  
  function handleSubmit(e, newSpread) {

    // Prevents browser from reloading the page.
    e.preventDefault();

    // Passes spread type.
    setState((prevState) => ({ ...prevState, 
      spreadType: selectedSpread,
      isSubmitted: true,
      queryData: query
    }));

    // Passes prop to App.jsx
    onSubmit(query);
/*     setIsSubmitted(true); */
    setState((prevState) => ({ ...prevState, isSubmitted: true}));
    

    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
    }


    // Sets query data
    setState((prevState) => ({ ...prevState, queryData: query}));
    setQuery(query);
    console.log("fadeOut: ", fadeOut);

  }

  return (
    <>

      <div className={`background ${fadeOut ? "landing-fade-out" : ""}`}>

        <div className="textarea-label">What seeks your attention today?</div>

        <form ref={formRef} onSubmit={handleSubmit}  >
          <textarea className={textareaClassName}
            placeholder="Ask a question and receive divine insight" 
            name="query" 
            id="text-area-id"
            value={query} // Added this value tag while switching to context.
            onChange={e => setQuery(e.target.value)}
            />

            <br />

            <h2 className="spread-choose-message">Choose your 3-card Spread</h2>

          <div className="spread-buttons-container">

          <button
              className={buttonClassName}
              type="submit"
              onClick={() => setSelectedSpread(["Problem", "Action", "Outcome"])}
              >
                Problem | Action | Outcome
            </button>

            <button
              className={buttonClassName}
              type="submit"
              onClick={() => setSelectedSpread(["Past", "Present", "Future"])}
              >
                Past | Present | Future
            </button>

            <button
              className={buttonClassName}
              type="submit"
              onClick={() => setSelectedSpread(["You", "Your Path", "Advice"])}
              >
                You | Your Path | Advice
            </button>
          </div>
        </form>
      </div>
    </>
  )
}


export default Landing