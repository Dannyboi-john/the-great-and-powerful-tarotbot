import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'
import tarotBack from './assets/tarot-back.jpg';
import Card from './Card'

function ReadingView() {

    const { data } = useContext(DataContext);

    const [imageSrc, setImageSrc] = useState(null)

    // Dynamically import front of tarot cards.
    async function displayCard() {
        try {
            const cardImage = await import(`./assets/tarot-cards/${cardData.name_short}.png`);
            setImageSrc(cardImage);
            

        } catch (error) {
            console.error('Error loading image:', error)
        }

    }


    return (
        <>
        <div className="reading-container">
            <div className="reading-past-card">
                <Card 
                    cardData={data.cards[0]}
                    parent="ReadingView"
                    src={imageSrc}
                    onLoad={displayCard}
                />
            </div>
            <div className="reading-present card">
                <Card 
                    cardData={data.cards[1]}
                    parent="ReadingView"
                    src={imageSrc}
                    onLoad={displayCard}
                    />
            </div>
            <div className="reading-future-card">
                <Card 
                    cardData={data.cards[2]}
                    parent="ReadingView"
                    src={imageSrc}
                    onLoad={displayCard}
                    />
            </div>
        </div>
        </>
    )
}

export default ReadingView