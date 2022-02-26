import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../store";
import Create from "./Create/Create";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "../store/user";

export const Navbar = (props) => {
  // Logged in user data
  let user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-between py-4 px-2 font-light">
      <div className="flex flex-row space-x-5">
        <span className="">SlctdWork</span>

        {user.username ? (
          <>
            <Link to={`/create/in/${user.username}/settings`}>
              <span className="italic text-sm text-indigo-600">
                Hello, {user.firstName}. Manage your site here.
              </span>
            </Link>
            <Link to={`/create/in/${user.username}/work`}>Work</Link>
            <Link to={`/create/in/${user.username}/about`}> About</Link>
            <Link to={`/create/in/${user.username}/cv`}> CV</Link>
            <Link to={`/create/in/${user.username}/contact`}>Contact</Link>

            <div className="">
              <Link to={`/${user.username}`} target="_blank">
                <button type="button" className="pillDark mx-2">
                  View Site
                </button>
              </Link>
              <a href="#" className="pill mx-2" onClick={handleClick}>
                Logout
              </a>
              <div></div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login/in">
              <button type="button" className="pillDark mx-2">
                Login
              </button>
            </Link>
            <Link to="/signup/in">
              <button type="button" className="pill mx-2" onClick={handleClick}>
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };
