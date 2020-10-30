// import { fade, makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';


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
    }
}));

export default useStyles;
