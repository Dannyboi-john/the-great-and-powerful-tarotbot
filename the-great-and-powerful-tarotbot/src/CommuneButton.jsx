import React, { useState, useContext } from 'react';
import { DataContext } from './DataContext'
import OpenAI from "openai";
import loadingGif  from './assets/loading-gif.gif';

function CommuneButton({ setApiResponse, cardName, position }) {
    
    // Adds data context in variable
/*     const { data } = useContext(DataContext);
    const { queryData } = useContext(DataContext); */

    const { state } = useContext(DataContext);
    const [isResponding, setIsResponding] = useState(false); 

    // Instantiates OpenAI
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true

    });


    // Contacts ChatGPT
    async function oracle() {
        setIsResponding(true);
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            max_tokens: 170,
            messages: [
                {role: "system", content: `You are a master tarot card reader who has been tasked to give a very brief 3-card tarot reading (past/present/future) with the following query: ${state.queryData}`},
                {
                    role: "user",
                    content: `I have drawn ${cardName} to represent my ${position}. Please explain briefly what might that mean?` ,
                },
            ],
        });
        setApiResponse(completion.choices[0].message.content);
    }


    return (
        <>
        {isResponding 
            ? (<img className="loading-icon" src={loadingGif} alt="Loading..." />)
            : (<button onClick={oracle} className="commune-button">Commune with Spirits</button>)}

        </>
    )
}

export default CommuneButton