import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const Navbar = (props) => {
  console.log("navbarprops", props);
  let siteTitle = `${props.user.firstName} ${props.user.lastName}`;
  return (
    <nav className="flex flex-row justify-between h-1/6 p-5">
      <div>{siteTitle}</div>
      <div className="flex flex-row space-x-2">
        <div>Home</div>
        <div>About</div>
        <div>CV</div>
        <div>Contact</div>
      </div>
    </nav>
  );
};

// import React from "react";
