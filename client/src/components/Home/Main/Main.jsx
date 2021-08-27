import React from "react";
import { useLocation } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import useStyles from "./styles";

const Main = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {location?.pathname === "/dashboard" ? <Dashboard /> : <Profile />}
    </main>
  );
};

export default Main;
