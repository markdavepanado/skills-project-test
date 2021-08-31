import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import clsx from "clsx";
import {
  Grid,
  Paper,
  Button,
  ButtonGroup,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { updateUserInfo } from "../../../../redux/actions/user";
import useStyles from "./styles";
import useAppStyles from "../../../../styles";

const Profile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const appClasses = useStyles();
  const { user, isLoading } = useSelector((state) => state.user);
  const [fileImage, setFileImage] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    password: "",
  });
  const [triggerChange, setTriggerChange] = useState(false);

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

  useEffect(() => {
    return () => {
      setFormData({ ...formData, password: "" });
      setShowPassword(false);
      clearFileImage();
    };
  }, [triggerChange]);

  const clearFileImage = () => {
    setFileImage([]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user?.email) {
      const isSuccess = await dispatch(updateUserInfo(user?.id, formData));
      if (isSuccess.success) {
        enqueueSnackbar("Updated Successfully!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Update Failed!", {
          variant: "error",
        });
      }
    }
    setTriggerChange((prevState) => !prevState);
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
            ) : user?.picture?.url ? (
              <img className={classes.fileImage} src={user?.picture?.url} />
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
        <Paper
          className={`${classes.userInfoPaper} ${
            isLoading && appClasses.disabled
          }`}
          elevation={3}
        >
          {isLoading && <LinearProgress />}
          <form
            className={classes.userInfoForm}
            onSubmit={handleFormSubmit}
            autoComplete="off"
            noValidate
          >
            <Grid className={classes.userInfoContainer} spacing={3} container>
              <Grid xs={12} sm={12} md={6} item>
                <TextField
                  // error
                  // id="outlined-error-helper-text"
                  disabled={isLoading}
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                  type="text"
                  label="First Name"
                  name="firstname"
                  // helperText="Incorrect entry."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} item>
                <TextField
                  // error
                  // id="outlined-error-helper-text"
                  disabled={isLoading}
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
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
                  disabled={isLoading}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                    disabled={isLoading}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    type={showPassword ? "text" : "password"}
                    id="outlined-adornment-password"
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          disabled={isLoading}
                          onClick={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                          edge="end"
                        >
                          {showPassword ? (
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
                  disabled={isLoading}
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
