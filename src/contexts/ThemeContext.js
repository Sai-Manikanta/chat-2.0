import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const toDay = new Date();
        const hour = toDay.getHours();
        const isNightTime = hour < 6 || hour > 19 ? true : false;
        setIsDarkTheme(isNightTime);
    },[])

    return (
        <ThemeContext.Provider value={{
            isDarkTheme, 
            setIsDarkTheme
        }}>
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
