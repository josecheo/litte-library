import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DialogContent } from '@material-ui/core';
import { BookServices } from '../../services/book-service'


export default function DialogCustom(props) {
  const bookServices = BookServices.getInstance()
  const { data, onclose,setParm } = props;
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const handleSubmit = () => {
    bookServices.deleteBook(data).subscribe((data) => {
      setParm()
      onclose()
    },
      (error) => console.log(error)
    );
  }

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  return (
    <>
      <DialogTitle id="customized-dialog-title" onClose={() => onclose()}>
        Elimiar Libro
        </DialogTitle>
      <DialogContent>
        ¿Esta seguro que desea eliminar este Libro?
       </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()} color="primary">
          Si, seguro
          </Button>
        <Button onClick={() => onclose()} color="secondary">
          No, olvidalo
          </Button>
      </DialogActions>
    </>
  );
}
