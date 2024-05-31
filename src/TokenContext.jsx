import { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [tokens, setTokens] = useState(() => {
        const storedTokens = localStorage.getItem('tokens');
        return storedTokens ? JSON.parse(storedTokens) : [];
    });

    useEffect(() => {
        if (tokens.length > 0) {
            localStorage.setItem('tokens', JSON.stringify(tokens));
            console.log("adding to local storage:", JSON.stringify(tokens));
        }
    }, [tokens]);

    return (
        <TokenContext.Provider value={{ tokens, setTokens }}>
            {children}
        </TokenContext.Provider>
    );
};
