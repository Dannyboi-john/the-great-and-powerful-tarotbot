import React, { useState, useEffect } from 'react'
import './App.css'
import Card from './Card'

function CardView() {



    const [cardsData, setCardsData] = useState([null])

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
                console.log(json);
                setCardsData(json);
            } catch (error)  {
                console.error("Error fetching data: ". error);
            }
        } 
        getCards();
    }, [])
       // https://tarotapi.dev/
       // https://tarotapi.dev/api/v1/cards/random?n=3

    if (!cardsData || !cardsData.cards) {
        return <div>Loading...</div>
    }

    return (
        <>
            {cardsData && (
                <div className="flip-container">
                    <div className="past-card">
                        <Card cardData={cardsData.cards[0].name_short} />
                    </div>
                    <div className="present-card">
                        <Card cardData={cardsData.cards[1].name_short}/>
                    </div>
                    <div className="future-card">
                        <Card cardData={cardsData.cards[2].name_short}/>
                    </div>
                </div>
            )}
        </>
    )
    
}

export default CardView