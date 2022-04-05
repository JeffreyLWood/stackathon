import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
// import LocomotiveScroll from "locomotive-scroll";

ReactDOM.render(
  <Provider store={store} history={history}>
    <Router history={history}>
      <App history={history} />
    </Router>
  </Provider>,
  document.getElementById("app")
);

// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
// });
