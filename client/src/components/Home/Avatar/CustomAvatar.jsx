import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import useStyles from "./styles";

const CustomAvatar = ({ alt, src, variant, size }) => {
  const theme = useTheme();
  const classes = useStyles();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Avatar
      alt={!alt ? "Avatar" : alt}
      src={src}
      className={`${classes.avatar} ${classes.indigo} ${
        isSmallScreen && classes.small
      }`}
      variant={!variant ? "circle" : variant}
    >
      {!alt ? "A" : alt.charAt(0)}
    </Avatar>
  );
};

export default CustomAvatar;
