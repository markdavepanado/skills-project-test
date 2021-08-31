import * as API from "../api";
import {
  START_LOADING,
  END_LOADING,
  UPDATE_USER_INFO,
  REGISTER,
  LOGIN,
} from "../constants/actionTypes";

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await API.register(formData);
    dispatch({ type: REGISTER, payload: data });
    dispatch({ type: END_LOADING });
    return data;
  } catch (error) {
    dispatch({ type: END_LOADING });
    return error.response.data;
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await API.login(formData);
    dispatch({ type: LOGIN, payload: data });
    dispatch({ type: END_LOADING });
    return data;
  } catch (error) {
    dispatch({ type: END_LOADING });
    return error.response.data;
  }
};

export const updateUserInfo = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await API.updateUserInfo(id, formData);
    dispatch({ type: UPDATE_USER_INFO, payload: data });
    dispatch({ type: END_LOADING });
    return data;
  } catch (error) {
    console.log(error);
  }
};
