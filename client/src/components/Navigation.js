import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, InputBase, Link, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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
        // vertical padding + font size from searchIcon
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    return (
        <div>
            <AppBar className={classes.toolbar} position="static" color="inherit" elevation="0">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title} variant="h6" style={{ color: "black" }} noWrap>
                        Logo
                    </Typography>
                    <div className={classes.search} style={{ marginLeft: "20%", width: "40%" }}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link className={classes.link} color="black" href="/" underline="none" variant="subtitle2">
                            Link 1
                        </Link>
                        <Link className={classes.link} color="black" href="/" underline="none" variant="subtitle2">
                            Link 2
                        </Link>
                        <Link className={classes.link} color="black" href="/" underline="none" variant="subtitle2">
                            Link 3
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div >
    );
}