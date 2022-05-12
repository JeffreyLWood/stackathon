import React from "react";
import { useSelector } from "react-redux";
import Navbar1 from "./1/Navbar";
import Navbar2 from "./2/Navbar";

export default function Navbar(props) {
  let user = useSelector((state) => state.user);
  let templateId = user.template;

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
  return template(templateId);
}
