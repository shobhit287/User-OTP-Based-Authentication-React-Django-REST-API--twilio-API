import React, {  useState } from "react";
import { createContext } from "react";
export const Auth = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setauth] = useState(() => {
        return localStorage.getItem('refresh_token') ? true : false;
    });
    return (
        <Auth.Provider value={{ auth, setauth }}>
            {children}
        </Auth.Provider>
    );
};
