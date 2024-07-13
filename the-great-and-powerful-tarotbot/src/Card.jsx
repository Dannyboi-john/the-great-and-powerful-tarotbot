import React, { useState } from 'react';
import tarotBack from './assets/tarot-back.jpg'


function Card({ cardData }) {

    const [src, setSrc] = useState(tarotBack);
    const  [isFlipped, setIsFlipped] = useState(false);


    function displayCard() {
        setSrc(`./assets/tarot-cards/${cardData}.jpg`);
        setIsFlipped(true);

    }
    return (

        <img 
            className={isFlipped ? 'tarot-front' : 'tarot-back'}
            src={src}
            alt="Back of a tarot card"
            onClick={displayCard}/>
    )
}

export default Card