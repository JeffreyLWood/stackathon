import React from "react";
import { useSelector } from "react-redux";
import Contact1 from "./1/Contact";
export default function Contact(props) {
  let user = useSelector((state) => state.user);
  let templateId = user.template;
  const template = (id) => {
    switch (id) {
      case 1:
        return <Contact1 props={props} />;
      //   case 2 :
      //     return <Contact2 props={props} />
      default:
        return <Contact1 props={props} />;
    }
  };
  return template(templateId);
}
