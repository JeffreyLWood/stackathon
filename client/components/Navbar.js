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

  // Used for loading user's data based on the url for logged out viewing
  useEffect(() => {
    async function load() {
      // await fetchUserData(props.history.location.pathname.split("/")[1]);
    }
    load();
    // Not re rendering
  }, []);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div className="flex justify-between items-end mb-5 px-10 h-16">
      <span className="onView">SlctdWork</span>

      <div className="">
        {user.username ? (
          <>
            <Link to={`/${user.username}`}>
              <button type="button" className="pillDark mx-2">
                View Site
              </button>
            </Link>
            <a href="#" className="pill mx-2" onClick={handleClick}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">
              <button type="button" className="pillDark mx-2">
                Login
              </button>
            </Link>
            <Link to="/signup">
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
