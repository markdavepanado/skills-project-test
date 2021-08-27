import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    content: {
      padding: theme.spacing(3, 0),
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));
