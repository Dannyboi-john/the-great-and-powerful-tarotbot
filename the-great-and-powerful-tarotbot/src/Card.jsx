import React, { useState } from 'react';
import tarotBack from './assets/tarot-back.jpg'


function Card({ cardData }) {

    const [src, setSrc] = useState(tarotBack);
    const  [isFlipped, setIsFlipped] = useState(false);


    async function displayCard() {
        try {
            const cardImage = await import(`./assets/tarot-cards/${cardData}.jpg`);
            setSrc(cardImage.default || cardImage);
            setIsFlipped(true);
        } catch (error) {
            console.error('Error loading image:', error)
        }

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