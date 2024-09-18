import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'
import OpenAI from "openai";
import Card from './Card';
import CommuneButton from './CommuneButton';

function ReadingView() {

    // Uses data context provided from ./DataContext
    const { data } = useContext(DataContext);

    // Used for reassigning tarot front images
    const [imageSrc, setImageSrc] = useState(null)

    const [apiResponse, setApiResponse] = useState("");

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
            <div className="commune-button-container">
                {apiResponse === "" ? <CommuneButton setApiResponse={setApiResponse}/> : apiResponse} 
            </div>    


            <div className="reading-present-card">
                <Card 
                    cardData={data.cards[1]}
                    parent="ReadingView"
                    src={imageSrc}
                    onLoad={displayCard}
                />
            </div>
            <div className="commune-button-container">
                <CommuneButton />   
            </div>


            <div className="reading-future-card">
                <Card 
                    cardData={data.cards[2]}
                    parent="ReadingView"
                    src={imageSrc}
                    onLoad={displayCard}
                />
            </div>

            <div className="commune-button-container">
                <CommuneButton />    
            </div>
        </div>
        </>
    )
}

export default ReadingView