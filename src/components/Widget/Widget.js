import {
  Paper,
} from "@material-ui/core";
import classnames from "classnames";
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
}) {
  var classes = useStyles();
  return (
    <>
    <div className={classes.widgetWrapper} style={style && {...style}}>
      <Paper className={classes.paper} classes={{ root: classnames(classes.widgetRoot, {
        [classes.noWidgetShadow]: noWidgetShadow
        }) }}>
        <div className={classnames(classes.widgetHeader, {
          [classes.noPadding]: noHeaderPadding,
          [headerClass]: headerClass
        })}>
          {header}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
    </>
  );
}
