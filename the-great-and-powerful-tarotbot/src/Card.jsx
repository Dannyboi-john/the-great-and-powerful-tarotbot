import React, { useState, useEffect } from 'react';
import tarotBack from './assets/tarot-back.jpg';
import CardModal from './CardModal';


function Card({ cardData, incrementTotalFlipped, parent, source }) {

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const [src, setSrc] = useState(tarotBack);
    const [isFlipped, setIsFlipped] = useState(false);
    const [modal, setModal] = useState(false);


/*     const checkIfReading = parent === 'ReadingView'
        ? displayCard()
        : src */


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


    // Dynamically import front of tarot cards.
    async function displayCard() {
        try {
            const cardImage = await import(`./assets/tarot-cards/${cardData.name_short}.png`);
            setSrc(cardImage.default || cardImage);
            setIsFlipped(true);
            if (parent != "ReadingView") {
                incrementTotalFlipped();
            }

        } catch (error) {
            console.error('Error loading image:', error)
        }

        if (parent != "ReadingView") {
            setModal(true);
            setCurrentText('');
            setCurrentIndex(0);
        }
    }

    return (

        <>
        <img 
            className={isFlipped ? 'tarot-front' : 'tarot-back'}
            src={src}
            alt="Back of a tarot card"
            onLoad={parent === "ReadingView" ? displayCard : null}
            onClick={parent != "ReadingView" ? displayCard : null}/>
        <CardModal
            openModal={modal}
            closeModal={() => setModal(false)}

        >
            <div className="card-title">
                {cardData.name}
            </div>
            <br/>
            {currentText}
        </CardModal>
        </>
    )
}

export default Card