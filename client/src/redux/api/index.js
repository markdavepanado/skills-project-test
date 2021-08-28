import axios from "axios";

const URL = axios.create({ baseURL: "http://localhost:5000" });

URL.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

export const register = (formData) => URL.post("/user/register", formData);
export const login = (formData) => URL.post("/user/login", formData);
export const updateUserInfo = (id, formData) =>
  URL.patch(`/user/${id}`, formData);
