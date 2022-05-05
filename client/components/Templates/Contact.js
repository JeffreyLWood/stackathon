import React from "react";
import { useSelector } from "react-redux";
import Contact1 from "./1/Contact";
export default function Contact() {
  let user = useSelector((state) => state.user);
  let templateId = user.template;
  const template = (id) => {
    switch (id) {
      case 1:
        return <Contact1 />;
      //   case 2 :
      //     return <Contact2 />
      default:
        return <Contact1 />;
    }
  };
  return template(templateId);
}
