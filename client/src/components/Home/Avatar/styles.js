import { makeStyles } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
