import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export const Navbar = (props) => {
  let siteTitle = `${props.user.siteTitle}`;
  return (
    <nav className="flex flex-row justify-between h-1/6 p-5">
      <div className="siteTitle">
        <Link to={`/${props.user.username}`}>{siteTitle}</Link>
      </div>
      <div className="flex flex-row space-x-2">
        <Link to={`/${props.user.username}/work`}>
          <div>Work</div>
        </Link>
        <Link to={`/${props.user.username}/about`}>
          <div>About</div>
        </Link>
        <Link to={`/${props.user.username}/cv`}>
          <div>CV</div>
        </Link>
        <Link to={`/${props.user.username}/contact`}>
          <div>Contact</div>
        </Link>
      </div>
    </nav>
  );
};

// import React from "react";
