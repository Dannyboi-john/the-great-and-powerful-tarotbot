import React, { useState, useEffect } from 'react';
import tarotBack from './assets/tarot-back.jpg';
import CardModal from './CardModal';


function Card({ cardData }) {

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const [src, setSrc] = useState(tarotBack);
    const [isFlipped, setIsFlipped] = useState(false);
    const [modal, setModal] = useState(false)


    // Using setTImeout to animate card text.
    useEffect(() => {
        if (currentIndex < cardData.desc.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + cardData.desc[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 20);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, cardData.desc]);

    async function displayCard() {
        try {
            const cardImage = await import(`./assets/tarot-cards/${cardData.name_short}.png`);
            setSrc(cardImage.default || cardImage);
            setIsFlipped(true);
        } catch (error) {
            console.error('Error loading image:', error)
        }

        setModal(true);
        setCurrentText('');
        setCurrentIndex(0);


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

        >
            {currentText}
        </CardModal>
        </>
    )
}

export default Card