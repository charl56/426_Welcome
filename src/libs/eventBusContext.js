// EventBusContext.js
import React, { createContext, useState } from 'react';

export const EventBusContext = createContext();

export const EventBusProvider = ({ children }) => {
    const [data, setData] = useState(null);
    return (
        <EventBusContext.Provider value={{ data, setData }}>
            {children}
        </EventBusContext.Provider>
    );
};
