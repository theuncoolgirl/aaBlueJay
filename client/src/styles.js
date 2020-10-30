import { fade, makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        // flexGrow: 1,
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
            cursor: "pointer"
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
      }
}));

export default useStyles;