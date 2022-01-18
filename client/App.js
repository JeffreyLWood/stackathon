import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { useSelector } from "react-redux";

const App = () => {
  let user = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar user={user} />
      <Routes user={user} />
    </div>
  );
};

export default App;
