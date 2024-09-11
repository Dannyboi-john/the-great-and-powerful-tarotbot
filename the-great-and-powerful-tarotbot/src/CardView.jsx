import React, {useContext, useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import { DataContext } from './DataContext';

function CardView( { onBeginReading }) {

    const [totalFlipped, setTotalFlipped] = useState(0);
    const [cardsData, setCardsData] = useState([null])

    const [allFlipped, setAllFlipped] = useState(false)

    const { setData } = useContext(DataContext)

    const incrementTotalFlipped = () => {
        setTotalFlipped(prev => prev + 1)
        console.log(totalFlipped);
        if (totalFlipped === 2) {
            setAllFlipped(true);
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
                console.log(json);
                setCardsData(json);
                setData(json);
            } catch (error)  {
                console.error("Error fetching data: ", error);
            }
        } 
        getCards();
    }, [setData])


    if (!cardsData || !cardsData.cards) {
        return <div>Loading...</div>
    }


    return (
        <>
            {cardsData && (
                <div className="flip-container">
                    <div className="past-card">
                        <Card 
                            cardData={cardsData.cards[0]}
                            incrementTotalFlipped={incrementTotalFlipped}/>
                    </div>
                    <div className="present-card">
                        <Card 
                            cardData={cardsData.cards[1]}
                            incrementTotalFlipped={incrementTotalFlipped}/>
                    </div>
                    <div className="future-card">
                        <Card 
                            cardData={cardsData.cards[2]}
                            incrementTotalFlipped={incrementTotalFlipped}/>
                    </div>
                </div>
            )}

            {allFlipped ? <button onClick={onBeginReading} className="begin-reading-button"><span className="front">Begin Reading</span></button> : null}
        </>
    )
    
}

export default CardView