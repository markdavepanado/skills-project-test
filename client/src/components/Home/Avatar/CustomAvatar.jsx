import React from "react";
import Avatar from "@material-ui/core/Avatar";

import useStyles from "./styles";

const CustomAvatar = ({ alt, src, variant, size }) => {
  const classes = useStyles();
  return (
    <Avatar
      alt={!alt ? "Avatar" : alt}
      src={src}
      className={`${classes.indigo}`}
      variant={!variant ? "circle" : variant}
    >
      {!alt ? "A" : alt.charAt(0)}
    </Avatar>
  );
};

export default CustomAvatar;
