import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Create from "./Create/Create";
import SiteTitle from "./Create/SiteTitle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "../store/user";

export const Navbar = (props) => {
  // Logged in user data
  let user = useSelector((state) => state.auth);
  let siteTitle = useSelector((state) => state.user.siteTitle);

  useEffect(() => {
    async function load() {
      await fetchUserData(props.history.location.pathname.split("/")[1]);
    }

    load();
  }, []);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  // If logged in, you can view the view site and logout buttons
  if (props.history.location.pathname === "/home") {
    return (
      <div className="grid mb-5">
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
          <span className="siteTitle">Artist Website Maker</span>
          <img src="/favicon.ico" className="mx-4" />
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
  } else if (user.username) {
    <div className="grid mb-5">
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
    </div>;
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
    // Not logged in and at a user's site, view the regular navbar without auth or view buttons
  } else if (
    !user.userName &&
    props.history.location.pathname !== "/login" &&
    props.history.location.pathname !== "/signup"
  ) {
    return (
      <div>
        <div className="w-full p-3 flex justify-between items-baseline">
          <div className="siteTitle">{siteTitle}</div>
          <div className="flex flex-row space-x-5">
            <Link
              to={`/${props.history.location.pathname.split("/")[1]}`}
              className="subHeader"
            >
              <div>Work</div>
            </Link>
            <Link
              to={`/${props.history.location.pathname.split("/")[1]}/about`}
              className="subHeader"
            >
              <div>About</div>
            </Link>
            <Link
              to={`/${props.history.location.pathname.split("/")[1]}/cv`}
              className="subHeader"
            >
              <div>CV</div>
            </Link>
            <Link
              to={`/${props.history.location.pathname.split("/")[1]}/contact`}
              className="subHeader"
            >
              <div>Contact</div>
            </Link>
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
