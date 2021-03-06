import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { LOGOUT } from "../../../redux/constants/actionTypes";
import CustomAvatar from "../Avatar/CustomAvatar";
import useStyles from "./styles";

const CustomDrawer = ({ open, handleDrawerClose, setTriggerAuth }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Typography variant="button" component="h1">
          Skills Project Test
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link className={classes.link} to="/profile">
          <ListItem button>
            <ListItemIcon>
              <CustomAvatar
                alt={`${user.firstname} ${user.lastname}`}
                // src="/broken-image.jpg"
                src={user.picture.url}
                variant="rounded"
              />
            </ListItemIcon>
            <ListItemText primary={`${user.firstname} ${user.lastname}`} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link className={classes.link} to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link className={classes.link} onClick={handleLogout} to="#">
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
