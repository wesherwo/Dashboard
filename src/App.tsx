import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { grommet, Grommet } from 'grommet';
import NavBar from './Components/NavBar/NavBar'
import Routing from './Routing/Routing';
import { MyThemeContext } from './Services/ThemeContext';
import { deepMerge } from 'grommet/utils';
import { ThemeMaster } from './Styles/ThemeMaster';

export default function App() {
    const [theme, setTheme] = useState(() => {
        const localData = localStorage.getItem('theme')
        return localData ? JSON.parse(localData) : false
    })
    const value = useMemo(() => ({theme, setTheme}),[theme])
    const themeGrommet = deepMerge(grommet, ThemeMaster)

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    return (
        <MyThemeContext.Provider value={value}>
            <Grommet full background={'offBackground'} theme={themeGrommet} themeMode={theme ? 'light':'dark'}>
                <Router>
                    <NavBar/>
                    <Routing/>
                </Router>
            </Grommet>
        </MyThemeContext.Provider>
    );
}