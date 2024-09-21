import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'
import OpenAI from "openai";

function CommuneButton({ setApiResponse, cardName, position }) {
    
    // Adds data context in variable
    const { data } = useContext(DataContext);
    const { queryData } = useContext(DataContext);

    // Instantiates OpenAI
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true

    });


    // Contacts ChatGPT
    async function oracle() {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            max_tokens: 170,
            messages: [
                {role: "system", content: `You are a master tarot card reader who has been given the following query: ${queryData}`},
                {
                    role: "user",
                    content: `I have drawn ${cardName} to represent my ${position}. Please explain briefly what might that mean?` ,
                },
            ],
        });
        setApiResponse(completion.choices[0].message.content);
        console.log(completion);
    }

    return (
        <button className="commune-button" onClick={oracle}>
            <span className="front"
                >Commune with Spirits
            </span>
        </button>
    )
}

export default CommuneButton