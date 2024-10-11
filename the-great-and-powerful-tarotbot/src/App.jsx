import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import Landing from './Landing.jsx'
import CardView from './CardView.jsx'
import Header from './Header.jsx'
import ReadingView from './ReadingView.jsx'
import { DataContext, DataProvider } from './DataContext.jsx'

function App() {
  return (
    <>
      <DataProvider>  {/* Now the component tree is wrapped by DataProvider */}
        <AppContent />  {/* Separate logic into another component */}
      </DataProvider>
    </>
  );
}

function AppContent() {
  const { setState } = useContext(DataContext);  // Now it will have the correct value

  const [showCardBacks, setShowCardBacks] = useState(false);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);
  const [query, setQuery] = useState('');
  const [beginReading, setBeginReading] = useState(false);

  function handleBeginReading() {
    setBeginReading(true);
    setState((prevState) => ({ ...prevState, beginReading: true }));
  }

  useEffect(() => {
    if (shouldStartTimer) {
      const timer = setTimeout(() => {
        setShowCardBacks(true);
        setState((prevState) => ({ ...prevState, showCardBacks: true }));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldStartTimer, setState]);  // Remember to include setState as a dependency

  const handleShowCardBacks = (query) => {
    setShouldStartTimer(true);
    setState((prevState) => ({ ...prevState, shouldStartTimer: true }));
    setQuery(query);
  };

  return (
    <div className="background">
      <Header />
      <h2>{query}</h2>
      {beginReading 
        ? <ReadingView /> 
        : showCardBacks 
          ? <CardView onBeginReading={handleBeginReading} /> 
          : <Landing onSubmit={handleShowCardBacks} />
      }
    </div>
  );
}

export default App;