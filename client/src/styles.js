// import { fade, makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    about: {
        marginTop: 10,
    },
    listButton: {
        margin: 20
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
    formButton: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10
    },
    formCard: {
        textAlign: 'center',
        padding: 30,
        margin: 50
    },
    inputField: {
        marginTop: 8,
        width: 250
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
            cursor: "pointer",
        },
    },
    MuiFormControl: {
        root: {
            margin: 0,
            color: "red",
            height: 40,
            maxHeight: 40
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 400
    }, 
    slider: {
        width: 300,
        display: 'block'
      },
    sideCard: {
        textAlign: 'center',
        padding: 10,
        maxWidth: 250
    },
    spacer: {
        height: 200
    },
    table: {
        minWidth: 650
    },
    title: {
        marginBottom: 10
    }
}));

export default useStyles;
