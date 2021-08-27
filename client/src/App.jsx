import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

export default function MiniDrawer() {
  const user = true;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/dashboard" />} />
        <Route
          path="/dashboard"
          exact
          component={() =>
            user ? <Home /> : <Redirect to="/authentication" />
          }
        />
        <Route
          path="/profile"
          exact
          component={() =>
            user ? <Home /> : <Redirect to="/authentication" />
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
        <Route path="/authentication" exact component={() => <Auth />} />
      </Switch>
    </BrowserRouter>
  );
}
