import React, { useState, useEffect } from 'react'
import './App.css'
import Landing from './Landing.jsx'
import CardBack from './CardBack.jsx'

function App() {
  const [showCardBacks, setShowCardBacks] = useState(false);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);

  useEffect(() => {
    if (shouldStartTimer) {
      const timer = setTimeout(() => {
        setShowCardBacks(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldStartTimer]);

  const handleShowCardBacks = () => {
    setShouldStartTimer(true);
  }

  return (
    <>
      <Landing onSubmit={handleShowCardBacks}/>
      {showCardBacks ? <CardBack /> : null}
    </>
      
  )
}
export default App