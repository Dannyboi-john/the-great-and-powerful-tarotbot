import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'
import OpenAI from "openai";

function CommuneButton({ setApiResponse }) {
    
    // Instantiates OpenAI
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true

    });

    // const [promp, setPrompt] = useState("");
    
    // const [apiResponse, setApiResponse] = useState("");

    // Contacts ChatGPT
    async function oracle() {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            max_tokens: 100,
            messages: [
                {role: "system", content: "You are a master tarot card reader."},
                {
                    role: "user",
                    content: "I have drawn The Magician card. Explain briefly what might that mean?",
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