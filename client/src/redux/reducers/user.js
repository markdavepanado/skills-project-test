import {
  START_LOADING,
  END_LOADING,
  FETCH_USER_FROM_STORAGE,
  UPDATE_USER_INFO,
  REGISTER,
  LOGIN,
  LOGOUT,
} from "../constants/actionTypes";

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    picture: { url: "", cloudinaryId: "", createdAt: "" },
  },
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_USER_FROM_STORAGE:
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("user"))?.user || "",
      };
    case UPDATE_USER_INFO: {
      localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      return { ...state, user: { ...state.user, ...[action?.payload] } };
    }
    case REGISTER:
      localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      return { ...state, user: action?.payload?.user };
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      return { ...state, user: action?.payload?.user };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        user: {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          picture: { url: "", cloudinaryId: "", createdAt: "" },
        },
      };

    default:
      return state;
  }
};

export default userReducer;
