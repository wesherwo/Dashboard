import React, { useContext } from 'react';
import { Button, Header, Nav } from 'grommet';
import { Actions, HomeRounded, Moon } from 'grommet-icons';
import { MyThemeContext } from '../../Services/ThemeContext';

export default function NavBar() {
    const {theme, setTheme} = useContext(MyThemeContext);

    function swithMode() {
        if (theme) {
            setTheme(false)
        } else {
            setTheme(true)
        }
    }

    return (
        <Header background={'offBackground'}>
            <Button icon={<HomeRounded/>} href='/'/>
            <Nav direction='row'>
                <Button icon={theme? <Actions color='text'/>: <Moon color='text'/>} onClick={swithMode} />
            </Nav>
        </Header>
    )
}