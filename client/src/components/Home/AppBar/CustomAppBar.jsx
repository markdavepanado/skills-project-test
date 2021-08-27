import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const CustomAppBar = ({ open, handleDrawerOpen }) => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {location?.pathname === "/dashboard"
            ? "Dashboard"
            : location?.pathname === "/profile"
            ? "Profile"
            : "Skills Project Test"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
