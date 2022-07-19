import React from "react";
import { useSelector } from "react-redux";
import Navbar1 from "./1/Navbar";
import Navbar2 from "./2/Navbar";
import CreateNavbar from "../Navbar";

export default function Navbar(props) {
  let user = useSelector((state) => state.user);
  let templateId = user.template || 1;
  let create = `${window.location.pathname.split("/")[1]}/${
    window.location.pathname.split("/")[2]
  }`;

  const template = (id) => {
    switch (id) {
      case 1:
        return <Navbar1 props={props} />;
      case 2:
        return <Navbar2 props={props} />;
      default:
        return <Navbar1 props={props} />;
    }
  };

  if (create === "create/in") {
    return <CreateNavbar />;
  } else {
    return template(templateId);
  }
}
