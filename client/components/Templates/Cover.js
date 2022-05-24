import React from "react";
import { useSelector } from "react-redux";
import Cover1 from "./1/Cover";
export default function Cover(props) {
  let user = useSelector((state) => state.user);
  let templateId = user.template;

  const template = (id) => {
    switch (id) {
      case 1:
        return <Cover1 props={{ props }} />;
      //   case 2 :
      //     return <Cover2 props={{props}}/>
      default:
        return <Cover1 props={{ props }} />;
    }
  };
  return template(templateId);
}
