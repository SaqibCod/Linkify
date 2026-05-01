import { createContext } from "react";
import { useState, useEffect, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(()=>{
        // check local storage for theme preference
         const saved = localStorage.getItem('theme');
            if(saved) return saved; 
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (
            prevTheme === "dark" ? "light" : "dark"
        ));
    }
    
    useEffect(()=>{
        const root = document.documentElement;
        if(theme === "dark"){
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem('theme', theme);
        
    }, [theme])
    
    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
    
};

export const useTheme = () => useContext(ThemeContext);