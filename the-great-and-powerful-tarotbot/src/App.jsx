import React, { useState } from 'react'
import './App.css'
import Landing from './Landing.jsx'
import CardBack from './CardBack.jsx'

function App() {
  const [showCardBacks, setShowCardBacks] = useState(false);

  const handleShowCardBacks = () => {
    setShowCardBacks(true);
  }
  return (
    <>
      <Landing onSubmit={handleShowCardBacks}/>
      {showCardBacks ? <CardBack /> : null}
    </>
      
  )
}
export default App