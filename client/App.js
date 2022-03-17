import React from "react";

import { Navbar } from "./components/Navbar";
import Routes from "./Routes";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = (props) => {
  let user = useSelector((state) => state.auth);
  return (
    <div>
      {/* <Navbar user={user} history={props.history} /> */}
      <Routes user={user} />
    </div>
  );
};

export default App;
