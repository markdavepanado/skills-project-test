import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import Log from "./Log/Log";
import useStyles from "./styles";

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container>
      <Grid spacing={3} container>
        <Grid xs={12} sm={6} item>
          <Typography variant="overline" component="h4">
            Log History
          </Typography>
          <Log property="nasdasame" event="asdasd" date="08-26-2021 2:58 PM" />
          <Log property="name" event="update" date="08-26-2021 2:58 PM" />
          <Log />
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography variant="overline" component="h4">
            Calendar
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
