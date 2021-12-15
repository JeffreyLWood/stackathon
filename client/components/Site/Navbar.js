import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export const Navbar = (props) => {
  let siteTitle = `${props.user.firstName} ${props.user.lastName}`;
  return (
    <nav className="flex flex-row justify-between h-1/6 p-5">
      <div className="uppercase font-bold tracking-wide text-3xl text-light">
        {siteTitle}
      </div>
      <div className="flex flex-row space-x-2">
        <Link to={`/${props.user.userName}/work`}>
          <div>Work</div>
        </Link>
        <Link to={`/${props.user.userName}/about`}>
          <div>About</div>
        </Link>
        <Link to={`/${props.user.userName}/cv`}>
          <div>CV</div>
        </Link>
        <Link to={`/${props.user.userName}/contact`}>
          <div>Contact</div>
        </Link>
      </div>
    </nav>
  );
};

// import React from "react";
