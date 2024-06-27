import React, { useState, useEffect, createContext, useContext } from 'react'
import './App.css'
import Landing from './Landing.jsx'
import CardView from './CardView.jsx'
import Header from './Header.jsx'
import QueryText from './QueryText.jsx'

const QueryContext = createContext()

function App() {
  const [showCardBacks, setShowCardBacks] = useState(false);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);

  const [query, setQuery] = useState();



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
      <Header />
      <QueryText query={query} />
      {showCardBacks ? <CardView /> : <Landing onSubmit={[handleShowCardBacks, setQuery]}/>}
    </>
      
  )
}
export default App