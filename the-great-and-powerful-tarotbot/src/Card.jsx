import React, { useState, useEffect, useContext } from 'react';
import tarotBack from './assets/tarot-back.jpg';
import CardModal from './CardModal';
import ReactCardFlip from "react-card-flip";
import { DataContext } from './DataContext';
import OpenAI from "openai";
import loadingGif from './assets/loading-gif.gif';




function Card({ cardData, position, positionIndex }) {

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [src, setSrc] = useState(tarotBack);
    const [cardIsFlipped, setCardIsFlipped] = useState(false);
    const [modal, setModal] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isResponding, setIsResponding] = useState(false);
    const [apiResponse, setApiResponse] = useState([null, null, null]);
    const [rateLimitError, setRateLimitError] = useState(false);

    const { state, setState } = useContext(DataContext);


    // Instantiates OpenAI
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true

    });
    


    // Contacts ChatGPT
    async function oracle() {
        try {
            setIsResponding(true);

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                max_tokens: 170,
                messages: [
                    {role: "system", content: `You are a master tarot card reader who has been tasked to give a very brief 3-card tarot reading (${state.spreadType}), with the following query: "${state.queryData}"`},
                    {
                        role: "user",
                        content: `I have drawn ${cardData.name} to represent the "${position}" position. Please explain briefly what might that mean.` ,
                    },
                ],
            });

            // Successful response
            setApiResponse((prev) => {
                const newApiResponse = [...prev];
                newApiResponse[positionIndex] = completion.choices[0].message.content;
                return newApiResponse;            
            })

        } catch (error) {
            // Rate-limiting errors
            if (error.name === "RateLimitError" || error.message.includes("429")) {
                setRateLimitError(true);
            } else {
                console.error("OOPS", error);
            }
        } finally {
            setIsResponding(false);
        }
    }




    // Animates text on successful reading.
    useEffect(() => {
        if (apiResponse[positionIndex] && currentIndex < apiResponse[positionIndex].length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + apiResponse[positionIndex][currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 20);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, apiResponse, positionIndex]);





    // Dynamically import front of tarot cards.
    async function displayCard() {
        try {
            const cardImage = await import(`./assets/tarot-cards/${cardData.name_short}.png`);
            oracle();
            setSrc(cardImage.default || cardImage);
            setCardIsFlipped(prev => {
                return true;
            });
            setIsFlipped(!isFlipped);

            setModal(true);
            setCurrentText('');
            setCurrentIndex(0);

        } catch (error) {
            console.error('Error loading image:', error)
        }
    }



    function justDisplayModal() {
        setModal(true);
    }



    return (

        <>

        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <img 
                className="tarot-back"
                src={tarotBack}
                alt="Back of a tarot card"
                onClick={() => {displayCard()}}
                    />

            <img className="tarot-front"
                src={src}
                alt="front of a tarot card"
                onClick={() => {justDisplayModal()}}
                />
        </ReactCardFlip>

        <CardModal
            openModal={modal}
            closeModal={() => setModal(false)}

        >
            <div className="card-title">
                {cardData.name}
            </div>
            <br/>
            {apiResponse[positionIndex] != null 
                ? <div className="reading-text">{currentText}</div>
                : isResponding === true
                    ? <img className="loading-icon" src={loadingGif} alt="Loading..." />
                    : rateLimitError === true
                        ? <button className="redial-button" onClick={() => {oracle()}}>
                            Spirits are busy, click to try again in a moment!</button>
                        : <div className="reading-text">{currentText}</div>
            }
        </CardModal>
        </>
    )
}

export default Card