import React, { useState, useEffect } from 'react'
import './App.css'
import Landing from './Landing.jsx'
import CardView from './CardView.jsx'
import Header from './Header.jsx'
import ReadingView from './ReadingView.jsx'
import { DataProvider } from './DataContext'

function App() {
  const [showCardBacks, setShowCardBacks] = useState(false);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);

  const [query, setQuery] = useState('')

  const [beginReading, setBeginReading] = useState(false);

  function handleBeginReading() {
    setBeginReading(true);
  }

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
    setQuery(query);
  }

  return (
    <>
      <div className="background">

        <Header />
        <h2>{query}</h2>
        <DataProvider>
          {beginReading ? <ReadingView /> : showCardBacks ? <CardView onBeginReading={handleBeginReading}/> : <Landing onSubmit={handleShowCardBacks}/>}
        </DataProvider>
      </div>
    </>
      
  )
}
export default App