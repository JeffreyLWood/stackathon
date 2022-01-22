import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Create from "./Create/Create";
import SiteTitle from "./Create/SiteTitle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export const Navbar = (props) => {
  let user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log(
    "props.history.location.pathname",
    props.history.location.pathname
  );

  const handleClick = () => {
    dispatch(logout());
  };

  if (user.username) {
    return (
      <div className="grid mb-5">
        {/* The navbar will show these links after you log in */}

        <div className="justify-self-end pt-2">
          <Link to={`/${user.username}`}>
            <button type="button" className="pillDark mx-2">
              View Site
            </button>
          </Link>
          <a href="#" className="pill mx-2" onClick={handleClick}>
            Logout
          </a>
        </div>

        <div className="w-full p-3 flex justify-between items-baseline">
          <div className="siteTitle">{user.siteTitle}</div>
          <div className="flex flex-row space-x-5">
            <Link to={`/${user.username}`} className="subHeader">
              <div>Work</div>
            </Link>
            <Link to={`/${user.username}/about`} className="subHeader">
              <div>About</div>
            </Link>
            <Link to={`/${user.username}/cv`} className="subHeader">
              <div>CV</div>
            </Link>
            <Link to={`/${user.username}/contact`} className="subHeader">
              <div>Contact</div>
            </Link>
          </div>
        </div>
      </div>
    );
    // If not logged in and at the login page
  } else if (
    props.history.location.pathname === "/" ||
    props.history.location.pathname === "/login" ||
    props.history.location.pathname === "/signup"
  ) {
    return (
      <div className="grid mb-5">
        <div className="justify-self-end pt-2"></div>

        <div className="w-full p-3 flex items-baseline">
          <span className="siteTitle">Artist Website Maker</span>
          <img src="/favicon.ico" className="mx-4" />
          <div className="flex flex-row space-x-5">
            {/* <Link to={`/${user.username}`} className="subHeader">
              <div>Work</div>
            </Link>
            <Link to={`/${user.username}/about`} className="subHeader">
              <div>About</div>
            </Link>
            <Link to={`/${user.username}/cv`} className="subHeader">
              <div>CV</div>
            </Link>
            <Link to={`/${user.username}/contact`} className="subHeader">
              <div>Contact</div>
            </Link> */}
          </div>
        </div>
      </div>
    );
  }
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
