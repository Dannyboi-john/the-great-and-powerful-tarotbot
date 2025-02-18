import React, {useContext, useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import { DataContext } from './DataContext';

function CardView( { goBack }) {

    const { state, setState } = useContext(DataContext);



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
                setState((prevState) => ({...prevState, cardsData: json}))
            } catch (error)  {
                console.error("Error fetching data: ", error);
            }
        } 
        getCards();
    }, [])


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
                            />
                            <br/>
                        <div>{state.spreadType[0]}</div>
                    </div>
                    <div className="present-card">
                        <Card 
                            cardData={state.cardsData.cards[1]}
                            position={state.spreadType[1]}
                            positionIndex={1}
                            />
                            <br/>
                        <div>{state.spreadType[1]}</div>
                    </div>
                    <div className="future-card">
                        <Card 
                            cardData={state.cardsData.cards[2]}
                            position={state.spreadType[2]}
                            positionIndex={2}
                            />
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