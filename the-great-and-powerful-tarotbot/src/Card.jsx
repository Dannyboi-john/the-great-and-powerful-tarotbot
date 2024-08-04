import React, { useState } from 'react';
import tarotBack from './assets/tarot-back.jpg';
import CardModal from './CardModal';


function Card({ cardData }) {

    const [src, setSrc] = useState(tarotBack);
    const [isFlipped, setIsFlipped] = useState(false);
    const [modal, setModal] = useState(false)


    async function displayCard() {
        try {
            const cardImage = await import(`./assets/tarot-cards/${cardData.name_short}.jpg`);
            setSrc(cardImage.default || cardImage);
            setIsFlipped(true);
        } catch (error) {
            console.error('Error loading image:', error)
        }



        setModal(true);

    }
    return (

        <>
        <img 
            className={isFlipped ? 'tarot-front' : 'tarot-back'}
            src={src}
            alt="Back of a tarot card"
            onClick={displayCard}/>
        <CardModal
            openModal={modal}
            closeModal={() => setModal(false)}
            delay={20}

        >
            {cardData.desc}
        </CardModal>
        </>
    )
}

export default Card