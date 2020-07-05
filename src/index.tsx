import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store/configureStore";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ReduxProvider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReduxProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
