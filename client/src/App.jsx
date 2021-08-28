import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { FETCH_USER_FROM_STORAGE } from "./redux/constants/actionTypes";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

export default function MiniDrawer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: FETCH_USER_FROM_STORAGE });
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/dashboard" />} />
        <Route
          path="/dashboard"
          exact
          component={() =>
            user?.email ? <Home /> : <Redirect to="/authentication" />
          }
        />
        <Route
          path="/profile"
          exact
          component={() =>
            user?.email ? <Home /> : <Redirect to="/authentication" />
          }
        />
        <Route
          path="/auth"
          exact
          component={() => <Redirect to="/authentication" />}
        />
        <Route
          path="/login"
          exact
          component={() => <Redirect to="/authentication" />}
        />
        <Route
          path="/register"
          exact
          component={() => <Redirect to="/authentication" />}
        />
        <Route
          path="/authentication"
          exact
          component={() => (user?.email ? <Redirect to="" /> : <Auth />)}
        />
      </Switch>
    </BrowserRouter>
  );
}
