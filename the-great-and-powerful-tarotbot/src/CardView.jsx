import React, {useContext, useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import { DataContext } from './DataContext';

function CardView( { goBack }) {

    const { state, setState, resetState } = useContext(DataContext);

    const [totalFlipped, setTotalFlipped] = useState(0);
    // const [cardsData, setCardsData] = useState([null]) *****

    const [allFlipped, setAllFlipped] = useState(false)

    // const { setData } = useContext(DataContext) *****

    const incrementTotalFlipped = () => {
        setTotalFlipped(prev => prev + 1)
        setState((prevState) => ({ ...prevState, totalFlipped: prevState.totalFlipped + 1}));
        if (totalFlipped === 2) {
            setAllFlipped(true);
            setState((prevState) => ({ ...prevState, allFlipped: true}));
        }
    }

    useEffect(() => {

        async function getCards() {

            try {
                const tarotAPI = 'https://tarotapi.dev/api/v1';
                const numOfCards = 3;
                const response = await fetch(tarotAPI + '/cards/random?n=' + numOfCards.toString());
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const json = await response.json();
                // setCardsData(json);
                // setData(json);
                setState((prevState) => ({...prevState, cardsData: json}))
            } catch (error)  {
                console.error("Error fetching data: ", error);
            }
        } 
        getCards();
    }, [/* setData */])


    if (!state.cardsData || !state.cardsData.cards) {
        return <div>Loading...</div>
    }


    return (
        <>
            {state.cardsData && (
                <div className="flip-container">
                    <div className="past-card">
                        <Card 
                            cardData={state.cardsData.cards[0]}
                            position={state.spreadType[0]}
                            positionIndex={0}
                            incrementTotalFlipped={incrementTotalFlipped}/>
                            <br/>
                        <div>{state.spreadType[0]}</div>
                    </div>
                    <div className="present-card">
                        <Card 
                            cardData={state.cardsData.cards[1]}
                            position={state.spreadType[1]}
                            positionIndex={1}
                            incrementTotalFlipped={incrementTotalFlipped}/>
                            <br/>
                        <div>{state.spreadType[1]}</div>
                    </div>
                    <div className="future-card">
                        <Card 
                            cardData={state.cardsData.cards[2]}
                            position={state.spreadType[2]}
                            positionIndex={2}
                            incrementTotalFlipped={incrementTotalFlipped}/>
                            <br/>
                        <div>{state.spreadType[2]}</div>
                    </div>
                </div>
            )}

            <button className="home-button" onClick={goBack}>
                Try A Different Reading
            </button>
        </>
    )
    
}

export default CardView