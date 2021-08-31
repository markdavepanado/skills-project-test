import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 16px)",
  },
  paper: {
    maxWidth: "50%",
    padding: theme.spacing(5),
    borderRadius: theme.spacing(2.5),
    position: "relative",
    overflow: "hidden",
  },
  [theme.breakpoints.down("xs")]: { paper: { maxWidth: "100%" } },
  gridContainer: { width: "100%", margin: 0 },
  authHelper: {
    textTransform: "uppercase",
    letterSpacing: "0.2rem",
    margin: theme.spacing(0, 0, 3),
  },
  switchLink: { textDecoration: "none" },
  margin: {
    margin: theme.spacing(1),
  },
}));
