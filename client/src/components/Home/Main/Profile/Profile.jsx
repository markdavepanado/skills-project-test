import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import {
  Grid,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import useStyles from "./styles";

const Profile = () => {
  const classes = useStyles();
  const [fileImage, setFileImage] = useState([]);

  const dropZone = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: false,
    onDrop: useCallback((acceptedFile, rejectedFile) => {
      setFileImage(
        acceptedFile.length > 0 &&
          Object.assign(acceptedFile, {
            preview: URL.createObjectURL(
              new Blob(acceptedFile, { type: acceptedFile.type })
            ),
          })
      );
    }, []),
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(fileImage.preview);
    },
    [fileImage]
  );

  const clearFileImage = () => {
    setFileImage([]);
  };

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Grid className={classes.profileContainer} spacing={3} container>
      <Grid xs={12} align="center" item>
        <Button
          className={`${classes.dropZoneDeleteAccount} ${classes.dropZoneActionClear}`}
          variant="contained"
        >
          Delete Account
        </Button>
      </Grid>
      <Grid className={classes.dropZoneGrid} xs={12} sm={4} item>
        <Paper className={classes.dropZoneContainer} elevation={3}>
          {fileImage.preview && (
            <ButtonGroup
              className={classes.dropZoneActions}
              disableElevation
              variant="contained"
              color="primary"
            >
              <Button
                className={classes.dropZoneActionClear}
                onClick={clearFileImage}
              >
                <ClearIcon fontSize="small" />
              </Button>
              <Button className={classes.dropZoneActionDone}>
                <DoneIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          )}
          <div
            {...dropZone.getRootProps({
              className: `${classes.dropZone} ${
                dropZone.isDragAccept
                  ? classes.dropZoneAccept
                  : dropZone.isDragReject
                  ? classes.dropZoneReject
                  : ""
              }`,
            })}
          >
            <input {...dropZone.getInputProps()} disabled={fileImage.preview} />
            {fileImage.preview ? (
              <img className={classes.fileImage} src={fileImage.preview} />
            ) : (
              <AddAPhotoIcon
                className={classes.dropZoneIcon}
                fontSize="large"
              />
            )}
          </div>
        </Paper>
      </Grid>
      <Grid xs={12} sm={8} item>
        <Paper className={classes.userInfoPaper} elevation={3}>
          <form
            className={classes.userInfoForm}
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            noValidate
          >
            <Grid className={classes.userInfoContainer} spacing={3} container>
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
              <Grid xs={12} sm={12} item>
                <TextField
                  // error
                  // id="outlined-error-helper-text"
                  type="email"
                  label="Email"
                  name="email"
                  // helperText="Incorrect entry."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
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
              <Grid xs={12} align="center" item>
                <Button
                  className={classes.dropZoneActionDone}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
