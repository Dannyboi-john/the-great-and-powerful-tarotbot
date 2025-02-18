import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import Landing from './Landing.jsx'
import CardView from './CardView.jsx'
import Header from './Header.jsx'
/* import ReadingView from './ReadingView.jsx' */
import { DataContext, DataProvider } from './DataContext.jsx'

function App() {
  return (
    <>
      <DataProvider>  {/* Wrapped by DataProvider */}
        <AppContent />  {/* Logic separated into another component */}
      </DataProvider>
    </>
  );
}

function AppContent() {
  const { state, setState, resetState } = useContext(DataContext);

  const [shouldStartTimer, setShouldStartTimer] = useState(false);
  const [query, setQuery] = useState('');

  const [isHome, setIsHome] = useState(true);


  useEffect(() => {
    if (shouldStartTimer) {
      const timer = setTimeout(() => {
        setState((prevState) => ({ ...prevState, showCardBacks: true }));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldStartTimer, setState]);

  const handleShowCardBacks = (query) => {
    setIsHome(false)
    setShouldStartTimer(true);
    setState((prevState) => ({ ...prevState, shouldStartTimer: true }));
    setQuery(query);
  };

  const handleGoBack = () => {
    setIsHome(true);
    resetState();
  }

  return (



    <div className="background">

      <Header />
      <h2>{state.queryData}</h2>

      {isHome
        ? <Landing onSubmit={handleShowCardBacks} />
        : <CardView goBack={handleGoBack} />
      }
      
    </div>
  );
}

export default App;