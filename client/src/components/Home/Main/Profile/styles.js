import { makeStyles } from "@material-ui/core/styles";
import { green, red, grey } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  profileContainer: {
    width: "100%",
    margin: 0,
  },
  dropZoneContainer: {
    padding: theme.spacing(2.5),
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  dropZone: {
    "&:hover": {
      backgroundColor: "rgba(66, 66, 66, 0.05)",
    },
    border: `${theme.spacing(0.25)}px dashed ${grey[500]}`,
    height: 0,
    paddingBottom: "100%",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
  },
  dropZoneAccept: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderColor: green[500],
  },
  dropZoneReject: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderColor: red[500],
  },
  fileImage: {
    "&:hover": {
      opacity: "0.95",
    },
    width: "100%",
    objectFit: "contain",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  dropZoneIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "4rem",
    color: grey[500],
  },
  dropZoneActions: {
    alignSelf: "flex-end",
    margin: theme.spacing(0, 0, 2),
  },
  dropZoneActionClear: {
    "&:hover": { backgroundColor: red[700] },
    backgroundColor: red[500],
    color: grey[50],
  },
  dropZoneActionDone: {
    "&:hover": { backgroundColor: green[700] },
    backgroundColor: green[500],
    color: grey[50],
  },
  dropZoneDeleteAccount: { float: "right" },
  [theme.breakpoints.down("xs")]: {
    dropZoneDeleteAccount: { float: "initial" },
  },
  userInfoPaper: { height: "100%" },
  userInfoForm: { height: "inherit" },
  userInfoContainer: {
    height: "inherit",
    width: "100%",
    padding: theme.spacing(2),
    margin: theme.spacing(0),
  },
}));
