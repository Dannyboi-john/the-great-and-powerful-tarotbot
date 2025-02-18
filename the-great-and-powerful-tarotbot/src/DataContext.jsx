import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const initialState = {
        showCardBacks: false,   
        shouldStartTimer: false,    
        queryData: '',  
        beginReading: false,    
        totalFlipped: 0,    
        cardsData: [null],  
        allFlipped: false,  
        apiResponse: [null, null, null], 
        isSubmitted: false , 
        isHome: true,
        spreadType: [null]
    };


    const [state, setState] = useState(initialState);

    const resetState = () => {
        setState(initialState);
    };

    return (
        <DataContext.Provider value={{ state, setState, resetState }}>
            {children}
        </DataContext.Provider>
    );
};