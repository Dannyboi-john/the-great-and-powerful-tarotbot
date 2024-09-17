import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'
import OpenAI from "openai";
import Card from './Card'

function ReadingView() {

    // Uses data context provided from ./DataContext
    const { data } = useContext(DataContext);

    // Used for reassigning tarot front images
    const [imageSrc, setImageSrc] = useState(null)

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true

    });

    // const [promp, setPrompt] = useState("");
    const [apiResponse, setApiResponse] = useState("");


    async function oracle() {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role: "system", content: "You are a master tarot card reader."},
                {
                    role: "user",
                    content: "I have drawn The Magician card. What might that mean?",
                },
            ],
        });
        setApiResponse(completion.choices[0].message);
        console.log(apiResponse.content);
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
                <button className="commune-button" onClick={oracle}><span className="front">Commune with Spirits</span></button>   
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
                <button className="commune-button"><span className="front">Commune with Spirits</span></button>    
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
                <button className="commune-button"><span className="front">Commune with Spirits</span></button>    
            </div>
        </div>
        </>
    )
}

export default ReadingView