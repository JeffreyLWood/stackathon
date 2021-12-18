import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export const Contact = (props) => {
  let user = useSelector((state) => state.auth);
  let contact = useSelector((state) => state.user.contact);

  let text = contact && contact.text;
  let email = contact && contact.email;
  let socialMedia = contact && contact.socialMedia;
  return (
    <div>
      <Navbar data={props} user={user} />
      <div className="grid grid-cols-12 grid-rows-6">
        <div className="row-start-3 row-span-6 col-start-3 col-end-10">
          {text}
          {email}
          {socialMedia}
        </div>
      </div>
    </div>
  );
};
