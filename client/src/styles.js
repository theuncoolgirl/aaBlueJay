import { fade, makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    coinGridItem: {
        marginRight: 20,
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
}));

export default useStyles;