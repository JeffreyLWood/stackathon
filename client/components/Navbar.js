import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { logout } from "../store";
import Create from "./Create/Create";
import SiteTitle from "./Create/SiteTitle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "../store/user";

export const Navbar = (props) => {
  // Logged in user data
  let user = useSelector((state) => state.auth);
  // If logged out, site title is fetched like this:
  let siteTitle = useSelector((state) => state.user.siteTitle);
  let [path, setPath] = useState(window.location.pathname);
  const dispatch = useDispatch();

  // Used for loading user's data based on the url for logged out viewing
  useEffect(() => {
    async function load() {
      await fetchUserData(props.history.location.pathname.split("/")[1]);
    }
    load();
    // Not re rendering
  }, []);

  const handleClick = () => {
    dispatch(logout());
  };

  useEffect(() => {
    console.log("path", path);
  }, [path]);

  const linkHandler = () => {
    setPath(`/${user.username}`);
  };

  // If logged in, you can view the view site and logout buttons
  // if (props.history.location.pathname === "/home") {
  if (props) {
    return (
      <div className="grid mb-5 px-10">
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
          {/* Should load AWS* instead of siteTitle on Create view. */}
          {/* <span className="siteTitle">Artist Website Maker</span>
          <img src="/favicon.ico" className="mx-4" /> */}

          <div className="siteTitle">{user.siteTitle}</div>
          <div className="flex flex-row space-x-5">
            <Link
              to={`/${user.username}`}
              className="subHeader"
              onClick={linkHandler}
            >
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
  } else if (user.username && props.history.location.pathname !== "/home") {
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
