import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useStyles } from '../styles.js';

export default function Footer() {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.footerAppBar} position="static" color="inherit" elevation={0}>
                <Toolbar className={classes.footerToolbar}>
                    <div className={classes.grow} />
                    <a className={classes.footerImgLink} target="_blank" rel="noopener noreferrer" href="https://github.com/theuncoolgirl/aaBlueJay"><img src='/github.png' alt="logo" className={classes.footerImg} /></a>
                    <div className={classes.footerLinks}>
                        <Typography underline="none" variant="caption" className={classes.footerDivider}>|</Typography>
                        <Typography underline="none" variant="caption">Created by
                            <a className={classes.footerLink} target="_blank" rel="noopener noreferrer" href="https://danielford.dev/"> Daniel Ford</a>
                            ,
                            <a className={classes.footerLink} target="_blank" rel="noopener noreferrer" href="http://erinshields.dev"> Erin Shields</a>
                            ,
                            <a className={classes.footerLink} target="_blank" rel="noopener noreferrer" href="http://john-anders.com/"> John Anders</a>
                            , and
                            <a className={classes.footerLink} target="_blank" rel="noopener noreferrer" href="http://quynnsmith.com"> Quynn Smith</a>
                        </Typography>
                    </div>
                    
                </Toolbar>
            </AppBar>
        </div >
    );
}
