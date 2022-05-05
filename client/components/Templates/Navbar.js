import React from "react";
import { useSelector } from "react-redux";
import Navbar1 from "./1/Navbar";

export default function Navbar() {
  let user = useSelector((state) => state.user);
  let templateId = user.template;
  const template = (id) => {
    switch (id) {
      case 1:
        return <Navbar1 />;
      //   case 2 :
      //     return <Navbar2 />
      default:
        return <Navbar1 />;
    }
  };
  return template(templateId);
}
