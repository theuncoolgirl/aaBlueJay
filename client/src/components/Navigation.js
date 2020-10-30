import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import LogoutButton from './LogoutButton';
import SearchBar from './SearchBar';
import { useStyles } from '../styles.js';

export default function Navigation() {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.toolbar} position="static" color="inherit" elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <NavLink className={classes.navImg} to="/" activeclass="active"><img src="/logo.png" alt="logo" height={'34px'} /></NavLink>
                    <SearchBar />
                    <div className={classes.grow} />
                    <div className={classes.navBarLinks}>
                        <NavLink to="/explore/1" activeclass="active" className={classes.navBarLink}>
                            <Typography underline="none" variant="caption">Explore</Typography>
                        </NavLink>
                        <NavLink to="/list/Watch List" activeclass="active" className={classes.navBarLink}>
                            <Typography underline="none" variant="caption">Lists</Typography>
                        </NavLink>
                        <LogoutButton />
                    </div>
                </Toolbar>
            </AppBar>
        </div >
    );
}
