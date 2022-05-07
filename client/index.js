import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, BrowserRouter } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <Provider store={store} history={history}>
    <BrowserRouter>
      <Router history={history}>
        <App history={history} />
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
