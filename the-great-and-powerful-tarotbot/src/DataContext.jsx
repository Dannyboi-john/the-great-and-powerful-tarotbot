import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const initialState = {
        showCardBacks: false,   // Added
        shouldStartTimer: false,    // Added
        queryData: '',  // Added
        beginReading: false,    // Added
        totalFlipped: 0,    // Added
        cardsData: [null],  // Added
        allFlipped: false,  // Added
        apiResponse: [null, null, null],
        isSubmitted: false  // Added
    };
/*     const [data, setData] = useState(null);
    const [queryData, setQueryData] = useState(""); */

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