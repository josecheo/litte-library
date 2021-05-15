import React, { useState } from "react";
import { Grid, Select, MenuItem, Input } from "@material-ui/core";
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


export default function CardBook(props) {
  var { title, copies, publication,author,edition,imagenUrl } = props;
  var classes = useStyles();
  var theme = useTheme();

  // local
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <Widget
    setIsOpen={setIsOpen}
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
    </Widget>

    {isOpen && (
            <Dialog aria-labelledby="customized-dialog-title" open={isOpen}>
              <DialogCustom 
              data={props}
              onclose={()=>setIsOpen(false)}
              />
          </Dialog>
     )}


    </>
  );
}
