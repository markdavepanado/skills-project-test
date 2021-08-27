import React from "react";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import UpdateIcon from "@material-ui/icons/Update";
import HelpIcon from "@material-ui/icons/Help";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "./styles";

const Log = ({ property, event, date }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          String(event).toLowerCase() === "update" ? (
            <UpdateIcon aria-label="update icon" />
          ) : (
            <HelpIcon aria-label="help icon" />
          )
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={
          String(event).toLowerCase() === "update" ? (
            <Typography variant="body2">
              Your <span className={classes.property}>{property}</span> has been{" "}
              <span className={classes.update}>updated</span>
            </Typography>
          ) : (
            <Typography variant="body2">Unknown event</Typography>
          )
        }
        subheader={date ? "1 hour ago" : "????"}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardContent}>
          <Typography variant="caption" component="p" color="textSecondary">
            {date ? "08-26-2021 2:58 PM" : "????"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Log;
