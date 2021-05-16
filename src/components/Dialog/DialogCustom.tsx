import { useState, useRef } from "react";

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DialogContent } from '@material-ui/core';
import { BookServices } from '../../services/book-service'
import useStyles from "./styles";
import { Grid } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import {DialogTitle,DialogActions} from '../Wrappers/Wrappers'


export default function DialogCustom(props: { data: any; onclose: any; setParm: any; }) {
  const { data, onclose,setParm } = props
  var classes = useStyles()
  const fileRefs:any = { file: useRef(null) }
  const bookServices = BookServices.getInstance()
  const [form, setform] = useState(data)
  const [susscess, setSusscess] = useState(false)

  const handleFileClick = () => {
    fileRefs.file.current.click();
  }

  async function uploadImageCallBack(img: any) {
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('image', img);
    var config = {
      method: 'post',
      url: 'https://api.imgbb.com/1/upload?key=8c0071cae2083466170853a79ca4a680',
      headers: {
        ...data
      },
      data: data
    };
    axios(config)
      .then(function (response: { data: { data: { url: any; }; }; }) {

        setform({
          ...form,
          imagenUrl: response.data.data.url,
        });
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
  const handleFileChange = () => {
    const file = fileRefs.file.current.files;
    if (file) {
      uploadImageCallBack(file[0])
    }
  }
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target
    setform({ ...form, [name]: value })
  }
  const onlyNumber = (e:any) => {
    const key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
  }

  const handleSubmit = () => {
    bookServices.updateBook(form).subscribe((data) => {
      setSusscess(true)
      setTimeout(() => {
        setSusscess(false)
        setParm()
        onclose()
      }, 2000);
    },
      (error) => console.log(error)
    );
  }

  return (
    <>
      <DialogTitle id="customized-dialog-title" onClose={() => onclose()}>
        Editar Libro
        </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              id="title"
              name='title'
              label="Titulo"
              type="text"
              variant="outlined"
              fullWidth
              value={form.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="copies"
              name='copies'
              label="Ejemplares"
              type="text"
              variant="outlined"
              fullWidth
              onKeyPress={(e) => onlyNumber(e)}
              value={form.copies}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name='publication'
              id="publication"
              label="Año de Publicación"
              type="text"
              onKeyPress={(e) => onlyNumber(e)}
              variant="outlined"
              fullWidth
              value={form.publication}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="author"
              name='author'
              label="Autor"
              type="text"
              variant="outlined"
              fullWidth
              value={form.author}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="edition"
              name='edition'
              label="Edición N°"
              type="text"
              variant="outlined"
              fullWidth
              onKeyPress={(e) => onlyNumber(e)}
              value={form.edition}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            {form.imagenUrl !== '' && (
              <>
                <div className={classes.logotypeContainer}>
                  <img src={form.imagenUrl} alt="logo" className={classes.logotypeImage} />
                </div>
              </>
            )}
            <DialogActions>
              <Button onClick={() => handleFileClick()} color="primary">
                Subir Imagen
          </Button>
              <input type="file" accept="image/png,image/jpeg" ref={fileRefs.file} name="filename" style={{ display: 'none' }}
                onChange={() => handleFileChange()}
              />
            </DialogActions>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()} color="primary">
          Guardar
          </Button>
        <Button onClick={() => onclose()} color="secondary">
          Cancelar
          </Button>
      </DialogActions>


      {susscess && (
        <Dialog aria-labelledby="customized-dialog-title" open={susscess}>
          <div style={{ width: '200px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Ok!</Typography>
          </div>
        </Dialog>

      )}
    </>
  );
}
