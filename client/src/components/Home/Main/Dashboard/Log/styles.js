import { makeStyles } from "@material-ui/core/styles";
import { indigo, green } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardContent: {
    padding: theme.spacing(1, 2),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  property: {
    color: indigo[500],
    fontWeight: "bold",
  },
  update: {
    color: "#ffffff",
    backgroundColor: green[500],
    padding: theme.spacing(0.25, 0.5),
    borderRadius: theme.spacing(0.5),
  },
}));
