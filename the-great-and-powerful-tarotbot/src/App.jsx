import React, { useState, useEffect } from 'react'
import './App.css'
import Landing from './Landing.jsx'
import CardView from './CardView.jsx'
import Header from './Header.jsx'

function App() {
  const [showCardBacks, setShowCardBacks] = useState(false);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);

  const [query, setQuery] = useState('')

  useEffect(() => {
    if (shouldStartTimer) {
      const timer = setTimeout(() => {
        setShowCardBacks(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldStartTimer]);

  const handleShowCardBacks = (query) => {
    setShouldStartTimer(true);
    setQuery(query)
  }

  return (
    <>
      <Header />
      <h2>{query}</h2>
      {showCardBacks ? <CardView /> : <Landing onSubmit={handleShowCardBacks}/>}
    </>
      
  )
}
export default App