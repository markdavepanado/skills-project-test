import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { SnackbarProvider } from "notistack";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import reducers from "./redux/reducers";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      hideIconVariant
      maxSnack={3}
      ref={notistackRef}
      TransitionComponent={Slide}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      action={(key) => (
        <IconButton onClick={onClickDismiss(key)} style={{ color: "#ffffff" }}>
          <CloseIcon />
        </IconButton>
      )}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
