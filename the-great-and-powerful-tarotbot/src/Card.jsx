import React, { useState, useEffect } from 'react';
import tarotBack from './assets/tarot-back.jpg'

function Card() {

    const [cardsData, setCardsData] = useState([])

    useEffect(() => {
        async function getCards() {
            const tarotAPI = 'https://tarotapi.dev/api/v1';
            const numOfCards = 3;
            const response = await fetch(tarotAPI + '/cards/random?n=78' + numOfCards.toString()) ;
            const json = await response.json();
            console.log(json);
            setCardsData(json.cards);
            /* console.log(json.cards[0]["desc"]) */
        } 
        getCards()
    }, [])

    return (

        <img className="tarot-back" src={tarotBack} alt="Back of a tarot card"/>
    )
}

export default Card