import React, { useState, useEffect } from 'react';
import tarotBack from './assets/tarot-back.jpg'
/* import { images } from './importImages.jsx'; */
import test from './assets/tarot-cards/ar01.jpg'



function Card(cardData) {

/*     const [cardsData, setCardsData] = useState([])

    useEffect(() => {
        async function getCards() {
            const tarotAPI = 'https://tarotapi.dev/api/v1';
            const numOfCards = 3;
            const response = await fetch(tarotAPI + '/cards/random?n=' + numOfCards.toString()) ;
            const json = await response.json();
            console.log(json);
            setCardsData(json);
            console.log(json.cards[0]["desc"]);
            console.log(cardsData);
        } 
        getCards()
    }, [])
 */


    function displayCard(e) {
        e.target.setAttribute('class', 'tarot-front');
        e.target.setAttribute( 'src', test);

    }
    return (

        <img 
            className="tarot-back"
            src={tarotBack} alt="Back of a tarot card"
            onClick={displayCard}/>
    )
}

export default Card