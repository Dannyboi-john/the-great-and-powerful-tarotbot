import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'
import Card from './Card';
import CommuneButton from './CommuneButton';

function ReadingView() {

    // Uses data context provided from ./DataContext
    const { data } = useContext(DataContext);

    // Used for reassigning tarot front images
    const [imageSrc, setImageSrc] = useState(null)

    const [apiResponse, setApiResponse] = useState([null, null, null]);

    const updateApiResponse = (index, value) => {
        const updatedResponse = [...apiResponse]; // Create copy of array
        updatedResponse[index] = value; // Update specific index
        setApiResponse(updatedResponse); // Set the new array as the state
    }

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
                {apiResponse[0] === null ? <CommuneButton position={"past"} cardName={data.cards[0].name} setApiResponse={(value) => updateApiResponse(0, value)}/> : apiResponse[0]} 
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
                {apiResponse[1] === null ? <CommuneButton position={"present"} cardName={data.cards[1].name} setApiResponse={(value) => updateApiResponse(1, value)}/> : apiResponse[1]}   
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
                {apiResponse[2] === null ? <CommuneButton position={"future"} cardName={data.cards[2].name} setApiResponse={(value) => updateApiResponse(2, value)}/> : apiResponse[2]}   
            </div>
        </div>

        <button className="home-button">
            <span className="home-button-front">Try A Different Reading</span>
        </button>
        </>
    )
}

export default ReadingView