import { makeStyles } from '@mui/styles';

const useStyles = makeStyles( theme => ({
    root: {
        color: 'red',
        border:'1px solid red',
        height:'auto',
        justifyContent:'center',
        alignContent:'center',
        width:'100%',
        minHeight:'100px'
    },
    link: {
        color:"red",
        textDecoration:"none",
        textTransform:'none'
    }

}));

export default useStyles;