import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'
import Card from './Card';
import CommuneButton from './CommuneButton';
import Landing from './Landing'

function ReadingView({ goBack }) {


    const { state, setState } = useContext(DataContext);

    // Used for reassigning tarot front images
    const [imageSrc, setImageSrc] = useState(null)
    const [apiResponse, setApiResponse] = useState([null, null, null]);


    const updateApiResponse = (index, value) => {
        const updatedResponse = [...apiResponse]; // Create copy of array
        updatedResponse[index] = value; // Update specific index
        setApiResponse(updatedResponse); // Set the new array as the state
        setState((prevState) => ({ ...prevState, apiResponse: updatedResponse }));

    }

    // Dynamically import front of tarot cards.
    async function displayCard() {
        if (!state.cardsData || !state.cardsData.name_short) return;
        try {
            const cardImage = await import(`./assets/tarot-cards/${state.cardsData.name_short}.png`);
            setImageSrc(cardImage);

        } catch (error) {
            console.error('Error loading image:', error)
        }

    }





    if (!state.cardsData || !state.cardsData.cards || state.cardsData.cards.length < 3) {
        return console.log("It's hanging because of the state thing");
    }


    return (
        <>
            <div className="reading-container">
                <div className="reading-past-card">
                        <Card 
                            cardData={state.cardsData.cards[0]}
                            parent="ReadingView"
                            src={imageSrc}
                            onLoad={displayCard}
                        />
                </div>
                <div className="commune-button-container">
                    {state.apiResponse[0] === null ? (
                        <CommuneButton 
                            /* position={"past"} */ 
                            position={state.spreadType[0]}
                            cardName={state.cardsData.cards[0].name} 
                            setApiResponse={(value) => updateApiResponse(0, value)}
                        />
                    ) : apiResponse[0]} 
                </div>    


                <div className="reading-present-card">
                        <Card 
                            cardData={state.cardsData.cards[1]}
                            parent="ReadingView"
                            src={imageSrc}
                            onLoad={displayCard}
                        />
                </div>
                <div className="commune-button-container">
                    {state.apiResponse[1] === null ? (
                        <CommuneButton 
                            /* position={"present"} */ 
                            position={state.spreadType[1]}
                            cardName={state.cardsData.cards[1].name} 
                            setApiResponse={(value) => updateApiResponse(1, value)}
                        />
                    ) : apiResponse[1]}   
                </div>


                <div className="reading-future-card">
                        <Card 
                            cardData={state.cardsData.cards[2]}
                            parent="ReadingView"
                            src={imageSrc}
                            onLoad={displayCard}
                        />
                </div>

                <div className="commune-button-container">
                    {state.apiResponse[2] === null ? (
                        <CommuneButton 
                            /* position={"future"} */
                            position={state.spreadType[2]}
                            cardName={state.cardsData.cards[2].name}
                            setApiResponse={(value) => updateApiResponse(2, value)}
                        />
                    ) : apiResponse[2]}   
                </div>
            </div>

            <button className="home-button" onClick={goBack}>
                Try A Different Reading
            </button>
        </>
    )
}

export default ReadingView