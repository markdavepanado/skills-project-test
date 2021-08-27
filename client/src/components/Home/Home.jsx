import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import CustomAppBar from "./AppBar/CustomAppBar";
import CustomDrawer from "./Drawer/CustomDrawer";
import Main from "./Main/Main";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Main />
    </div>
  );
};

export default Home;
