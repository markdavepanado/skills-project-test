import React, { useState, useEffect } from "react";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Auth = () => {
  const location = useLocation();
  const query = useQuery();
  const [isRegister, setIsRegister] = useState(query.get("register") || false);
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    setIsRegister(query.get("register") || false);
  }, [location]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Grow in>
      <Container className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <form
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            noValidate
          ></form>
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
                    // error
                    // id="outlined-error-helper-text"
                    type="text"
                    label="First Name"
                    name="firstname"
                    // helperText="Incorrect entry."
                    autoFocus
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={12} md={6} item>
                  <TextField
                    // error
                    // id="outlined-error-helper-text"
                    type="text"
                    label="Last Name"
                    name="lastname"
                    // helperText="Incorrect entry."
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </>
            )}
            <Grid xs={12} item>
              <TextField
                // error
                // id="outlined-error-helper-text"
                label="Email"
                // helperText="Incorrect entry."
                name="email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>

            <Grid align="center" xs={12} item>
              <Link
                className={classes.authButtonLink}
                to={`${isRegister ? "/authentication" : "/"}`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  // className={classes.button}
                  endIcon={<VpnKeyIcon />}
                >
                  {`${isRegister ? "Register" : "Login"}`}
                </Button>
              </Link>
            </Grid>
            <Grid align="center" xs={12} item>
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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Auth;
