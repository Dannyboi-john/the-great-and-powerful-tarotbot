import React, { useContext } from 'react';
import { DataContext } from './DataContext'
import Card from './Card'

function ReadingView() {

    const { data } = useContext(DataContext);




    return (
        <>
        <div className="reading-container">
            <div className="reading-past-card">
            <Card 
                cardData={data.cards[0]}
                />
            </div>
            <div className="reading-present card">
                <Card 
                    cardData={data.cards[1]}
                    />
            </div>
            <div className="reading-future-card">
                <Card 
                    cardData={data.cards[2]}
                    />
            </div>
        </div>
        </>
    )
}

export default ReadingView