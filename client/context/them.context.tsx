import React, { useState, useContext, createContext } from "react";


export type theme = 'light' | 'dark';
type Props = { children: React.ReactNode }
export interface ITheme { theme: theme; toggleTheme: any; }
const ctxInitVal: ITheme = { theme: 'light', toggleTheme: null}
const themeContext = createContext<ITheme>(ctxInitVal);

export const ThemProvider = ({ children }: Props) => {

    const [theme, setTheme] = useState<theme>('light')
    const toggleTheme = ()=>{
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    return (
        <themeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </themeContext.Provider>

    )
}

export const useTheme = () => {
    return useContext(themeContext)
}