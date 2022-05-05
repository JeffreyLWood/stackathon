import React from "react";
import { useSelector } from "react-redux";
import Work1 from "./1/Work";
import Work2 from "./2/Work";
export default function Work(props) {
  let user = useSelector((state) => state.user);
  let templateId = user.template || 1;
  console.log(user);
  const template = (id) => {
    switch (id) {
      case 1:
        return <Work1 props={props} />;
      case 2:
        return <Work2 />;
      default:
        return <Work1 props={props} />;
    }
  };
  return template(templateId);
}
