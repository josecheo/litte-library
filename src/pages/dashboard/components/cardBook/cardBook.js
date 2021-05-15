import React, { useState } from "react";
import { Grid, Select, MenuItem, Input, Button } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";
import Dialog from '@material-ui/core/Dialog';
import DialogCustom from '../../../../components/Dialog/DialogCustom'
import DialogCustomDelete from '../../../../components/Dialog/DialogCustomDelete'


export default function CardBook(props) {
  var { title, copies, publication, author, edition, imagenUrl } = props;
  var classes = useStyles();


  // local
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  return (
    <>
      <Widget
        header={
          <div className={classes.title}>
            <Typography variant="h5">{title}</Typography>
          </div>
        }
        upperTitle
        bodyClass={classes.bodyWidgetOverflow}
      >
        <div className={classes.totalValueContainer}>
          <div className={classes.totalValue}>
            <Typography size="xxl" color="text" colorBrightness="secondary">
              {copies}
            </Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!publication]: classes.profitArrowDanger,
              })}
            />
            <Typography size="sm" color="text" colorBrightness="secondary">
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
              <Typography variant="h6">{publication}</Typography>

            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              Publicado
          </Typography>
          </div>
          <div className={classes.statCell}>
            <Grid container alignItems="center">
              <Typography variant="h6">{author}</Typography>
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              Autor
          </Typography>
          </div>
          <div className={classnames(classes.statCell, classes.borderRight)}>
            <Grid container alignItems="center">
              <Typography variant="h6">
                {edition}
              </Typography>
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
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
            onclose={() => setIsOpen(false)}
          />
        </Dialog>
      )}

      {isOpenDelete && (
        <Dialog aria-labelledby="customized-dialog-title" open={isOpenDelete}>
          <DialogCustomDelete
            data={props}
            onclose={() => setIsOpenDelete(false)}
          />
        </Dialog>
      )}

    </>
  );
}
