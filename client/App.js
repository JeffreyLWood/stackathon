import React from "react";

import { Navbar } from "./components/Navbar";
import Routes from "./Routes";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = (props) => {
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
