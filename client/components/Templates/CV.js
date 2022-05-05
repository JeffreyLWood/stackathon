import React from "react";
import { useSelector } from "react-redux";
import CV1 from "./1/CV";
export default function CV(props) {
  let user = useSelector((state) => state.user);
  let templateId = user.template;
  const template = (id) => {
    switch (id) {
      case 1:
        return <CV1 props={props} />;
      //   case 2 :
      //     return <CV2 props={props} />
      default:
        return <CV1 props={props} />;
    }
  };
  return template(templateId);
}
