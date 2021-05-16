import { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import classnames from "classnames";
import useStyles from "./styles";
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";
import Dialog from '@material-ui/core/Dialog';
import DialogCustom from '../../../../components/Dialog/DialogCustom'
import DialogCustomDelete from '../../../../components/Dialog/DialogCustomDelete'


export default function CardBook(props: { title: any; copies: any; publication: any; author: any; edition: any; imagenUrl: any; setParm: any; }) {
  var { title, copies,  author, publication,edition, imagenUrl, setParm }:any = props;

 
  var classes: any = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  return (
    <>

      <Widget
        header={
          <div className={classes.title}>
            <Typography
              weight
              size
              color
              colorBrightness
              variant="h5">{title}</Typography>
          </div>
        }
        upperTitle
        bodyClass={classes.bodyWidgetOverflow}
      >
        <div className={classes.totalValueContainer}>
          <div className={classes.totalValue}>
            <Typography
              size="xxl"
              color="text"
              colorBrightness="secondary"
              weight
            >
              {copies}
            </Typography>
            <ArrowForwardIcon
              className={classes.profitArrow}
            />
            <Typography
              weight
              size="sm"
              color="text"
              colorBrightness="secondary"
            >
              Ejemplares
          </Typography>
          </div>
          <div className={classes.logotypeContainer}>
            <img src={imagenUrl} alt="logo" className={classes.logotypeImage} />
          </div>
        </div>
        <div className={classes.bottomStatsContainer}>
          <div className={classnames(classes.statCell, classes.borderRight)}>
            <Grid container alignItems="center">
              <Typography
                variant="h6"
                weight
                size="sm"
                color="text"
                colorBrightness="secondary"
              >{publication}</Typography>

            </Grid>
            <Typography weight size="sm" color="text" colorBrightness="secondary">
              Publicado
          </Typography>
          </div>
          <div className={classes.statCell}>
            <Grid container alignItems="center">
              <Typography
                weight
                variant="h6"
                size="sm"
                color="text"
                colorBrightness="secondary"
              >{author}</Typography>
            </Grid>
            <Typography weight size="sm" color="text" colorBrightness="secondary">
              Autor
          </Typography>
          </div>
          <div className={classnames(classes.statCell, classes.borderRight)}>
            <Grid container alignItems="center">
              <Typography
                weight
                size
                color
                colorBrightness="secondary"
                variant="h6">
                {edition}
              </Typography>
            </Grid>
            <Typography
              weight
              size="sm"
              color="text"
              colorBrightness="secondary">
              Edición
          </Typography>
          </div>
        </div>
        <div className={classnames(classes.buttonRow)}>

          <Button onClick={() => { setIsOpen(true) }} color="primary">
            Editar
        </Button>
          <Button onClick={() => { setIsOpenDelete(true) }} color="secondary">
            Eliminar
        </Button>
        </div>
      </Widget>

      {isOpen && (
        <Dialog aria-labelledby="customized-dialog-title" open={isOpen}>
          <DialogCustom
            data={props}
            setParm={setParm}
            onclose={() => setIsOpen(false)}
          />
        </Dialog>
      )}
      {isOpenDelete && (
        <Dialog aria-labelledby="customized-dialog-title" open={isOpenDelete}>
          <DialogCustomDelete
            data={props}
            setParm={setParm}
            onclose={() => setIsOpenDelete(false)}
          />
        </Dialog>
      )}
    </>
  );
}
