import React from 'react'
import './App.css'

function Header({ queryText }) {


    return (
        <>
        <h1>The Great and Powerful TarotBot</h1>
        <h2>{queryText}</h2>
        </>
    )
}

export default Header