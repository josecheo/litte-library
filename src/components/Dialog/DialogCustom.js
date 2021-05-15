import React, { useState, useRef } from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import classnames from "classnames";
import TextField from '@material-ui/core/TextField';
import { DialogContent } from '@material-ui/core';



// styles
import useStyles from "./styles";
import { Grid } from "@material-ui/core";

export default function DialogCustom(props) {
  const { data, onclose } = props;
  var classes = useStyles();
  const fileRefs = {
    file: useRef(null),
  };
  const [form, setform] = useState(data)
  const handleFileClick = () => {
    fileRefs.file.current.click();
  };


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

  function onlyNumber(e) {
    const key = window.event ? e.which : e.keyCode;
    if (key < 48 || key > 57) {
      e.preventDefault();
    }
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
              <Button onClick={(e) => handleFileClick(e, 'file')} color="primary">
                Subir Imagen
          </Button>
              <input type="file" accept="image/png,image/jpeg" ref={fileRefs.file} name="filename" style={{ display: 'none' }}
                multiple="multiple"
                onChange={(e) => handleFileChange(e)}
              />
            </DialogActions>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { }} color="primary">
          Guardar
          </Button>
        <Button onClick={() => onclose()} color="secondary">
          Cancelar
          </Button>
      </DialogActions>
    </>
  );
}
