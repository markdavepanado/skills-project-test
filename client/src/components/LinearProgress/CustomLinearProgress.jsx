import React from "react";
import { LinearProgress } from "@material-ui/core";

import useStyles from "./styles";

const CustomLinearProgress = ({ color, value, valueBuffer, variant }) => {
  const classes = useStyles();
  return (
    <>
      <LinearProgress
        className={classes.linearProgress}
        {...(color && { color })}
        {...(value && { value })}
        {...(valueBuffer && { valueBuffer })}
        {...(variant && { variant })}
      />
    </>
  );
};

export default CustomLinearProgress;
