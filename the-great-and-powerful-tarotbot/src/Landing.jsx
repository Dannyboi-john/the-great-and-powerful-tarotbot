import React, { useState, useContext, useRef } from 'react';
import './App.css';
import { DataContext } from './DataContext';
import star from './assets/svgs/star.svg';
import moon from './assets/svgs/moon.svg';
import infinity from './assets/svgs/infinity-thing.svg';

function Landing({ onSubmit }) {

  let textareaClassName = 'query-text';
  let buttonClassName = 'query-selector';

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

    // Shows an alert if no spread selected.
    if (!selectedSpread) {
      alert("Please select a spread before continuing!");
      return;
    }

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

  }

  return (
    <>

      <div className={`background ${fadeOut ? "landing-fade-out" : ""}`}>

        
      <div className="icons-top">
            <img src={star} alt="star"/>
            <img src={moon} alt="moon"/>
            <img src={star} alt="star"/>
          </div>

        <div className="background-inner">

          <div className="instructions">Enter your query below, pick a spread, and receive higher guidance. Or, simply pick a spread without a query for general reading</div>

          <div className="icon-header">
            <img src={infinity} alt="star"/>
        </div>

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

              <div className="spread-container"
                onClick={() => setSelectedSpread(["Problem", "Action", "Outcome"])}
                tabIndex="0">
                <div
                    className="spread-content"
                    
                    >
                      <h3 className="spread-header">Problem | Action | Outcome</h3>
                      <p className="spread-description">Identifies a problem you're facing, what action to take, and the likely result</p>
                </div>
              </div>
              
              <div className="spread-container"
                onClick={() => setSelectedSpread(["Past", "Present", "Future"])}
                tabIndex="0">
                <div
                    className="spread-content"
                    >
                      <h3 className="spread-header">Past | Present | Future</h3>
                      <p className="spread-description">See what has shaped you, what surrounds you, and what awaits you</p>
                </div>
              </div>

              <div className="spread-container"
                onClick={() => setSelectedSpread(["You", "Your Path", "Advice"])}
                tabIndex="0">
                <div
                    className="spread-content"

                    >
                      <h3 className="spread-header">You | Your Path | Advice</h3>
                      <p className="spread-description">Understand yourself, your journey ahead, and the wisdom you need</p>
                </div>
              </div>


            </div>

            <button
              className="submit-button"
              type="submit"
              >Draw Your Cards</button>
          </form>
        </div>
      </div>
    </>
  )
}


export default Landing