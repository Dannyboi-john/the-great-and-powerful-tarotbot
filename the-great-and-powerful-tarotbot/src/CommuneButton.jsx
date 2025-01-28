import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from './DataContext'
import OpenAI from "openai";
import loadingGif  from './assets/loading-gif.gif';

function CommuneButton({ setApiResponse, cardName, position }) {
    
    // Adds data context in variable
/*     const { data } = useContext(DataContext);
    const { queryData } = useContext(DataContext); */

    const { state } = useContext(DataContext);
    const [isResponding, setIsResponding] = useState(false);
    const [communeOrWait, setCommuneOrWait] = useState("Commune with Spirits")

    // Instantiates OpenAI
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true

    });

    useEffect(() => {
        console.log("CommuneOrWait message updated:", communeOrWait);
    }, [communeOrWait]);


    // Contacts ChatGPT
    async function oracle() {
        try {
            setIsResponding(true);

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                max_tokens: 170,
                messages: [
                    {role: "system", content: `You are a master tarot card reader who has been tasked to give a very brief 3-card tarot reading (${state.spreadType}) with the following query: ${state.queryData}`},
                    {
                        role: "user",
                        content: `I have drawn ${cardName} to represent my ${position}. Please explain briefly what might that mean?` ,
                    },
                ],
            });

            // Successful response
            setApiResponse(completion.choices[0].message.content);
            setCommuneOrWait("Commune with Spirits")
    } catch (error) {
            // Rate-limiting errors
            if (error.name === "RateLimitError" || error.message.includes("Rate limit reached")) {
                setCommuneOrWait("Spirits are busy, try again shortly!");
            } else {
                console.error("OOPS", error);
            }
        } finally {
            setIsResponding(false);
        }
    }


    return (
        <>
        {isResponding 
            ? (<img className="loading-icon" src={loadingGif} alt="Loading..." />)
            : (<button onClick={oracle} className="commune-button">{communeOrWait}</button>)}

        </>
    )
}

export default CommuneButton