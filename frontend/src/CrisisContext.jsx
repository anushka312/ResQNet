import React, { createContext, useContext, useState } from "react";
import { getAuth } from "firebase/auth";

const CrisisContext = createContext();
const auth = getAuth();
const user = auth.currentUser;

export const useCrisis = () => useContext(CrisisContext);


export const CrisisProvider = ({ children }) => {
    const [crisisLocations, setCrisisLocations] = useState([]);

    const addCrisisLocation = (location, type) => {
        if (!location) return;
        const [lat, lng] = location.split(", ").map(Number);
        setCrisisLocations(prev => [...prev, { id: Date.now(), lat, lng, type, ...(user ? { email: user.email } : {}), }]);
    };
    const removeCrisisLocation = (id) => {
        setCrisisLocations(prev => prev.filter(loc => loc.id !== id));
    };

    return (
        <CrisisContext.Provider value={{ crisisLocations, addCrisisLocation, removeCrisisLocation }}>
            {children}
        </CrisisContext.Provider>
    );
};
