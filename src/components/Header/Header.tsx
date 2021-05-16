import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import { Typography } from "../Wrappers/Wrappers";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";


export default function Header(props: { history: any; }) {
  var classes = useStyles();
  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  // local
  var [profileMenu, setProfileMenu] = useState<any>(null);
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography
          variant="h6"
          weight="medium"
          className={classes.logotype}
          size
          colorBrightness
          color
        >
          Litte Library
        </Typography>
        <div className={classes.grow} />

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>

        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography
              variant="h4"
              weight="medium"
              size
              colorBrightness
              color>
              Jose Alvarez
            </Typography>
            <Typography
              variant
              weight="small"
              size
              colorBrightness
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="https://flatlogic.com"
            >
              joseche0.ja@gmail.com
            </Typography>
          </div>

          <div className={classes.profileMenuUser}>
            <Typography
              variant="h4"
              weight="medium"
              size
              colorBrightness
              color
              className={classes.profileMenuLink}
              onClick={() => signOut(userDispatch, props.history)}
            >
              Salir
            </Typography>
          </div>
        </Menu>
      </Toolbar>

    </AppBar>
  );
}
