import React from "react";
import { useSelector } from "react-redux";
import CV1 from "./1/Work";
export default function CV() {
  let user = useSelector((state) => state.user);
  let templateId = user.template;
  const template = (id) => {
    switch (id) {
      case 1:
        return <CV1 />;
      //   case 2 :
      //     return <CV2 />
      default:
        return <CV1 />;
    }
  };
  return template(templateId);
}
