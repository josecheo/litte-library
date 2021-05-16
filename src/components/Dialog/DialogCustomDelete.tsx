import Button from '@material-ui/core/Button';
import { DialogContent } from '@material-ui/core';
import { BookServices } from '../../services/book-service'
import {DialogTitle,DialogActions} from '../Wrappers/Wrappers'

export default function DialogCustom(props: { data: any; onclose: any; setParm: any; }) {
  const bookServices = BookServices.getInstance()
  const { data, onclose,setParm } = props;

  const handleSubmit = () => {
    bookServices.deleteBook(data).subscribe((data) => {
      setParm()
      onclose()
    },
      (error) => console.log(error)
    );
  }

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
