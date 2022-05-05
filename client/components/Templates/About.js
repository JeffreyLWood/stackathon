import React from "react";
import { useSelector } from "react-redux";
import About1 from "./1/About";
export default function About() {
  let user = useSelector((state) => state.user);
  let templateId = user.template;
  const template = (id) => {
    switch (id) {
      case 1:
        return <About1 />;
      //   case 2 :
      //     return <About2 />
      default:
        return <About1 />;
    }
  };
  return template(templateId);
}
