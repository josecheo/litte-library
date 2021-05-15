import React, { useState, useRef } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import classnames from "classnames";
// styles
import useStyles from "./styles";

export default function DialogCustom(props) {
  const {data, onclose} = props;
  var classes = useStyles();
  const fileRefs = {
    file: useRef(null),
  };
  const [form, setform] = useState(data)
  const handleFileClick = () => {
    fileRefs.file.current.click();
  };

// Subir archivo
  async function uploadImageCallBack(img) {
    var axios = require('axios');
    var FormData = require('form-data');
    var fs = require('fs');
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
      .then(function (response) {

            setform({
        ...form,
        imagenUrl: response.data.data.url,
      });

      
      })
      .catch(function (error) {
        console.log(error);
      });


  }


  const handleFileChange = (e) => {
    const file = fileRefs.file.current.files;
    if (file) {
      uploadImageCallBack(file[0])
    }
  };
  function handleInputChange(e) {
    const { name, value } = e.target
    setform({ ...form, [name]: value })
  }

  function onlyNumber(e)  {
    const key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
        e.preventDefault();
    }
}

  return (
    <div>
      <DialogTitle id="form-dialog-title">Editar Libro</DialogTitle>
      <DialogContent>
        <TextField
          autofocus
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
        {form.imagenUrl !== '' && (
          <>
          <br></br>
          <br></br>
          <div className={classes.logotypeContainer}>
            <img src={form.imagenUrl} alt="logo" className={classes.logotypeImage} />
          </div>
          </>
        )}
        <DialogActions>
          <Button onClick={(e) => handleFileClick(e, 'file')} color="primary">
            Subir Imagen
          </Button>
          <input type="file" ref={fileRefs.file} name="filename" style={{ display: 'none' }}
            multiple="multiple"
            onChange={(e) => handleFileChange(e)}
          />
        </DialogActions>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => onclose()} color="primary">
          Cancelar
          </Button>
        <Button onClick={() => { }} color="primary">
          Guardar
          </Button>
      </DialogActions>
    </div>
  );
}
