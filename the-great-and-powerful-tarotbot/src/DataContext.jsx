import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [queryData, setQueryData] = useState("");

    return (
        <DataContext.Provider value={{ data, setData, queryData, setQueryData }}>
            {children}
        </DataContext.Provider>
    );
};