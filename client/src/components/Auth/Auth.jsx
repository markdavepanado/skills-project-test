import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Grow,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { register, login } from "../../redux/actions/user";
import LinearProgress from "../LinearProgress/CustomLinearProgress";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

Array.prototype.groupBy = function (prop) {
  return this.reduce(function (groups, item) {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};

const Auth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isRegister, setIsRegister] = useState(query.get("register") || false);
  const { isLoading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture: { url: "", cloudinaryId: "", createdAt: "" },
  });

  useEffect(() => {
    setIsRegister(query.get("register") || false);
    setShowPassword(false);
    !isRegister && setFormData({ ...formData, firstname: "", lastname: "" });
    clear();
  }, [location]);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      let isRegisterSuccess = await dispatch(register(formData));
      if (isRegisterSuccess.success) {
        enqueueSnackbar("Successfully Registered!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Registration Failed!", {
          variant: "error",
        });
      }
    } else {
      let isLoginSuccess = await dispatch(
        login({ email: formData.email, password: formData.password })
      );
      if (isLoginSuccess.success) {
        enqueueSnackbar("Successfully Login!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Login Failed!", {
          variant: "error",
        });
      }
    }
  };

  const clear = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      picture: { url: "", cloudinaryId: "", createdAt: "" },
    });
    setShowPassword(false);
  };

  return (
    <Grow in>
      <Container className={classes.container}>
        <Paper
          className={`${classes.paper} ${isLoading && classes.disabled}`}
          elevation={3}
        >
          {isLoading && <LinearProgress />}
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <Grid
              className={classes.gridContainer}
              spacing={3}
              justifyContent="center"
              alignItems="center"
              container
            >
              <Grid xs={12} align="center" item>
                <Typography
                  className={classes.authHelper}
                  variant="h5"
                  component="h1"
                >
                  {isRegister ? "Create your account" : "Enter your account"}
                </Typography>
              </Grid>
              {isRegister && (
                <>
                  <Grid xs={12} sm={12} md={6} item>
                    <TextField
                      disabled={isLoading}
                      value={formData.firstname}
                      onChange={(e) =>
                        setFormData({ ...formData, firstname: e.target.value })
                      }
                      // {...(firstname.length > 0 && {
                      //   error: true,
                      // })}
                      type="text"
                      label="First Name"
                      name="firstname"
                      autoFocus
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} item>
                    <TextField
                      disabled={isLoading}
                      value={formData.lastname}
                      onChange={(e) =>
                        setFormData({ ...formData, lastname: e.target.value })
                      }
                      // {...(lastNameErrors.length > 0 && {
                      //   error: true,
                      // })}
                      type="text"
                      label="Last Name"
                      name="lastname"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              <Grid xs={12} item>
                <TextField
                  disabled={isLoading}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  // {...(emailErrors.length > 0 && {
                  //   error: true,
                  // })}
                  type="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    // {...(passwordErrors.length > 0 && {
                    //   error: true,
                    // })}
                    htmlFor="outlined-adornment-password"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    disabled={isLoading}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    // {...(passwordErrors.length > 0 && {
                    //   error: true,
                    // })}
                    type={showPassword ? "text" : "password"}
                    id="outlined-adornment-password"
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled={isLoading}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon
                            // {...(passwordErrors.length > 0 && {
                            //   color: "error",
                            // })}
                            />
                          ) : (
                            <VisibilityOffIcon
                            // {...(passwordErrors.length > 0 && {
                            //   color: "error",
                            // })}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>

              <Grid align="center" xs={12} item>
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  // className={classes.button}
                  endIcon={isRegister ? <PersonAddIcon /> : <VpnKeyIcon />}
                  type="submit"
                >
                  {`${isRegister ? "Register" : "Login"}`}
                </Button>
              </Grid>
              <Grid align="center" xs={12} item>
                {!isLoading && (
                  <Link
                    className={classes.switchLink}
                    to={`${
                      isRegister
                        ? "/authentication"
                        : "/authentication?register=true"
                    }`}
                  >
                    <Typography color="primary">{`${
                      isRegister
                        ? "Have an account already?"
                        : "Don't have an account yet?"
                    }`}</Typography>
                  </Link>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Auth;
