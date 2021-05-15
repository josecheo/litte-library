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

export default function BigStat(props) {
  var { title, copies, publication,author,edition,imagenUrl } = props;
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [value, setValue] = useState("daily");

  return (
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
    </Widget>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
