import React from 'react'
import './App.css'
import tarotBack from './assets/tarot-back.jpg'

function CardBack(props) {
    return (
        <>
            <img className="tarot-back" src={tarotBack} atl="Back of a tarot card"/>
            <img className="tarot-back" src={tarotBack} atl="Back of a tarot card"/>
            <img className="tarot-back" src={tarotBack} atl="Back of a tarot card"/>
        </>
    )
    
}

export default CardBack