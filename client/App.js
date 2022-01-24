import React from "react";

import { Navbar } from "./components/Navbar";
import Routes from "./Routes";
import { useSelector } from "react-redux";

const App = (props) => {
  let user = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar user={user} history={props.history} />
      <Routes user={user} />
    </div>
  );
};

export default App;
