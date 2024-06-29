import React from 'react';

function Card() {

    useEffect(() => {
        async function getCards() {
            const tarotAPI = 'https://tarotapi.dev/api/v1';
            const numOfCards = 3;
            const response = await fetch(tarotAPI + '/cards/random?n=' + numOfCards.toString());
            const json = await response.json();
            console.log(json);
            setCardsData(json.cards);
            console.log(json.cards[0]["desc"])
        } 
        getCards()
    }, [])

    return (

        <div></div>
    )
}

export default Card