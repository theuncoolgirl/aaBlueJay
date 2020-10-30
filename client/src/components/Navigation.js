import React from 'react';
import { NavLink } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import LogoutButton from './LogoutButton';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.03),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.06),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: {
        margin: 0,
        padding: 0,
        height: 40,
        minHeight: 40
    },
    link: {
        color: "black",
        weight: "bold",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 15,
        marginRight: 15,
        '&:visited': {
            color: "black",
        },
        '&:hover': {
            color: "gray",
        },
    }
}));

export default function Navigation() {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.toolbar} position="static" color="inherit" elevation="0">
                <Toolbar className={classes.toolbar}>
                    <NavLink style={{ paddingLeft: 20, paddingTop: 3 }} to="/" activeclass="active"><img src="/logo.png" alt="logo" height={'34px'} /></NavLink>
                    <SearchBar />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <NavLink to="/explore/1" activeclass="active" style={{ textDecoration: "none" }}>
                            <Typography className={classes.link} underline="none" variant="caption">Explore</Typography>
                        </NavLink>
                        <NavLink to="/list/Watch List" activeclass="active" style={{ textDecoration: "none" }}>
                            <Typography className={classes.link} underline="none" variant="caption">Lists</Typography>
                        </NavLink>
                        <NavLink to="/friends" activeclass="active" style={{ textDecoration: "none" }}>
                            <Typography className={classes.link} underline="none" variant="caption">Friends</Typography>
                        </NavLink>
                        <NavLink to="/users" activeclass="active" style={{ textDecoration: "none" }}>
                            <Typography className={classes.link} underline="none" variant="caption">Users</Typography>
                        </NavLink>
                        <LogoutButton />
                    </div>
                </Toolbar>
            </AppBar>
        </div >
    );
}
