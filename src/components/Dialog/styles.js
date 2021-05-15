import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({

  logotypeContainer: {
    backgroundColor:'gray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '280px',
    borderRadius:'8px',


  },
  logotypeImage: {
    maxHeight: '280px',
    overflow: 'hidden'
  },
}));
