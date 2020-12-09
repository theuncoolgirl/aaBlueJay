import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
// import { tsvFormat } from 'd3-dsv';
import background from './commuters.png';
import doge from './doge.png';
import dogeleft from './leftdoge.png';
import logo from './logo.png'


export const useStyles = makeStyles((theme) => ({
    about: {
        marginTop: 10,
    },
    background: {
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        margin: 0,
        height: 900,
    },
    center: {
        textAlign: 'center'
    },
    coinGridItem: {
        marginRight: 20,
    },
    coinModal: {
        position: 'absolute',
        width: 250,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },
    doge: {
        backgroundImage: `url(${doge})`,
        backgroundSize: "cover",
        margin: 0,
    },
    dogeleft: {
        backgroundImage: `url(${dogeleft})`,
        backgroundSize: "cover",
        margin: 0
    },
    formButton: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10
    },
    formCard: {
        textAlign: 'center',
        padding: 30,
        marginTop: '25%',
    },
    full: {
        width: '100%',
        height: '100%'
    },
    grow: {
        flexGrow: 1,
    },
    hero: {
        height: 350,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "0% 50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    hidden: {
        overflow: 'hidden'
    },
    img: {
        display: 'inline-block',
        marginTop: 3,
        marginBottom: 3,
        height: 34
    },
    inputField: {
        marginTop: 8,
        width: 250
    },
    lighter: {
        fontWeight: "lighter",
    },
    link: {
        color: "#3f51b5",
        weight: "bold",
        marginTop: "auto",
        marginBottom: "auto",
        textDecoration: "none",
        '&:visited': {
            color: "#3f51b5",
        },
        '&:hover': {
            color: "black",
        },
    },
    listButton: {
        margin: 20
    },
    logoBar: {
        width: '100%',
        height: 40,
        textAlign: 'center',
    },
    logo: {
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        alt: "logo",
        height: '34px',
        padding: 20
    },
    logoForLoggedOutView: {
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        alt: "logo",
        height: '34px',
        width: '34px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 3,
        marginTop: 6,
        padding: 1
    },
    navBarLink: {
        marginLeft: 15,
        marginRight: 15,
        color: "black",
        weight: "bold",
        marginTop: "auto",
        marginBottom: "auto",
        textDecoration: "none",
        '&:visited': {
            color: "black",
        },
        '&:hover': {
            color: "#3f51b5",
        },
    },
    navBarLinks: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    navImg: {
        paddingLeft: 20,
        paddingTop: 3
    },
    pagination: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
    searchDiv: {
        marginLeft: "8.5%",
        width: "40%"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 400,
    },
    slider: {
        width: 450,
        margin: '0 auto'
        // display: 'block'
    },
    dialogPaper: {
        height: 500,
        width: '1000px !important'
        // overflow: 'hidden'
    },
    sideCard: {
        textAlign: 'center',
        padding: 10,
        maxWidth: 250,
        height: '80vh'
    },
    siteInfoCard: {
        textAlign: 'center',
        padding: 30,
        marginTop: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: '50%'
    },
    spacer: {
        height: 200
    },
    sparklinesLine: {
        strokeWidth: 2,
        stroke: "#336aff",
        fill: "green",
    },
    sparklinesSpots: {
        stroke: "#336aff",
        strokeWidth: 2,
        fill: "white",
    },
    table: {
        minWidth: 650
    },
    title: {
        marginBottom: 10
    },
    toolbar: {
        margin: 0,
        padding: 0,
        height: 40,
        minHeight: 40
    }
}));

export const theme = createMuiTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
        },
        MuiInput: {
            formControl: {
                "label + &": {
                    marginTop: "auto",
                    marginBottom: "auto"
                }
            }
        },
        MuiInputLabel: {
            formControl: {
                top: -8,
            }
        },
        MuiAutocomplete: {
            root: {
                height: 30,
                maxHeight: 30,
            },
            input: {
                paddingLeft: 0,
                '&:first-child': {
                    paddingLeft: 1,
                },
            },
            inputRoot: {
                '&&[class*="MuiFilledInput-root"]': {
                    padding: 1
                }
            }
        },
        MuiFilledInput: {
            root: {
                backgroundColor: "white",
                border: "1px solid lightgray",
                borderRadius: 4
            },
            underline: {
                '&:hover': {
                    '&:before': {
                        borderBottom: "none"
                    }
                },
                '&:before': {
                    borderBottom: "none"
                },
                '&:after': {
                    borderBottom: "none"
                }
            }
        },
    },
});

export const dialogTheme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paper: {
                minWidth: 550,
                maxWidth: 550,
                minHeight: 500,
                maxHeight: 500
            },
        }
    }
})