import React from "react";
import { useSelector } from "react-redux";
import Footer1 from "./1/Footer";
import Footer2 from "./2/Footer";
export default function Footer(props) {
  let user = useSelector((state) => state.user);
  let templateId = user.template || 1;

  const template = (id) => {
    switch (id) {
      case 1:
        return <Footer1 props={props} />;
      case 2:
        return <Footer2 props={props} />;
      default:
        return <Footer1 props={props} />;
    }
  };
  return template(templateId);
}
