// for default set up, do rafce
import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
    const auth = useAuth();
    return (<AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
    <Toolbar sx={{ display: "flex" }}> <Logo />
    <div>
        {auth?.isLoggedIn? (
            <>
            <NavigationLink bg="#00fffc" to="/chat" text="Go to chat" textColor='black' />
            <NavigationLink bg="#51538f" textColor="white" to="/" text="Logout" onClick={auth.logout} />
            </>
        ):(<>
        <NavigationLink bg="#00fffc" to="/login" text="Login" textColor='black' />
        <NavigationLink bg="#51538f" textColor="white" to="/signup" text="Sign Up" />
        </>)}
    </div>
    </Toolbar>
    </AppBar>
  );
};

export default Header;

