import React, { useState, useEffect } from 'react'
import './App.css'
import Card from './Card'

function CardView(props) {

    const [cardsData, setCardsData] = useState([])

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
/* 
    const cardData = [
        {
            name: 'some card',
            desc: 'some desc',
            imgUrl: 'tarot1.png'
        },
            {
            name: 'some other card',
            desc: 'some other desc',
            imgUrl: 'tarot2.png'
        },
         {
            name: 'some other other card',
            desc: 'some other other desc',
            imgUrl: 'tarot3.png'
        },
    ] */

       // https://tarotapi.dev/
       // https://tarotapi.dev/api/v1/cards/random?n=3


    return (
        <>
        <Card />
        <Card />
        <Card />
        </>
    )
    
}

export default CardView