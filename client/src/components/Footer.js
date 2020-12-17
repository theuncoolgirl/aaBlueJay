import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { useStyles } from '../styles.js';

export default function Footer() {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.footerAppBar} position="static" color="inherit" elevation={0}>
                <Toolbar className={classes.footerToolbar}>
                    {/* <NavLink className={classes.navImg} to="/" activeclass="active"><Container className={classes.logo} /></NavLink> */}
                    <div className={classes.grow} />
                    <a className={classes.footerImgLink} target="_blank" href="https://github.com/theuncoolgirl/aaBlueJay">
                        {/* <img src='/github.png' alt="logo" className={classes.footerImg} /> */}
                        <Container className={classes.footerImg} alt="github logo" style={{ marginBottom: "8px" }} />
                    </a>
                    <div className={classes.footerLinks}>
                        <Typography underline="none" variant="caption" className={classes.footerDivider}>|</Typography>
                        <Typography underline="none" variant="caption">Created by
                            <a className={classes.footerLink} target="_blank" href="https://danielford.dev/"> Daniel Ford</a>
                            ,
                            <a className={classes.footerLink} target="_blank" href="http://erinshields.dev"> Erin Shields</a>
                            ,
                            <a className={classes.footerLink} target="_blank" href="http://john-anders.com/"> John Anders</a>
                            , and
                            <a className={classes.footerLink} target="_blank" href="http://quynnsmith.com"> Quynn Smith</a>
                        </Typography>
                    </div>

                </Toolbar>
            </AppBar>
        </div >
    );
}
