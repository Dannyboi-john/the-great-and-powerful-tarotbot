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
      <DataProvider>  {/* Wrapped by DataProvider */}
        <AppContent />  {/* Logic separated into another component */}
      </DataProvider>
    </>
  );
}

function AppContent() {
  const { state, setState, resetState } = useContext(DataContext);

  const [showCardBacks, setShowCardBacks] = useState(false);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);
  const [query, setQuery] = useState('');
  const [beginReading, setBeginReading] = useState(false);

  const [isHome, setIsHome] = useState(true);


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
  }, [shouldStartTimer, setState]);

  const handleShowCardBacks = (query) => {
    setIsHome(false)
    setShouldStartTimer(true);
    setState((prevState) => ({ ...prevState, shouldStartTimer: true }));
    setQuery(query);
  };

  const handleGoBack = () => {
    setBeginReading(false);
    setIsHome(true);
    resetState();
  }

  return (




    <div className="background">

      <Header />
      <h2>{query}</h2>
{/*         {beginReading
          ? <ReadingView  goBack={handleGoBack}/> 
          : showCardBacks 
            ? <CardView onBeginReading={handleBeginReading} /> 
            : <Landing onSubmit={handleShowCardBacks} />
      }
 */}

        {isHome 
        ? <Landing onSubmit={handleShowCardBacks} />
        : beginReading 
          ? <ReadingView goBack={handleGoBack}/> 
          : <CardView onBeginReading={handleBeginReading} />
      }
    </div>
  );
}

export default App;