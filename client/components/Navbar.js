import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar(props) {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };

  let picture = user && user.picture;
  let url = user.domain
    ? `https://${user.domain}`
    : `https://www.selected-work.com/${user.username}`;

  return (
    <div className="h-32 flex justify-between py-4 px-2 font-light bg-white z-30">
      <div className="text-xs md:text-sm sm:text-md flex flex-wrap sm:flex-row space-x-2 sm:space-x-4 items-center">
        <span className="">
          <Link to={`/create/in/${user.username}/work`}>Selected-Work</Link>
        </span>
        <div className="pl-4 pr-10">
          <Link to={`/create/in/${user.username}/settings`}>
            <img src={picture} className="w-8 h-8 rounded-full" />
          </Link>
        </div>
        <div className="space-x-4">
          <Link to={`/create/in/${user.username}/work`}>Work</Link>
          <Link to={`/create/in/${user.username}/about`}> About</Link>
          <Link to={`/create/in/${user.username}/cv`}> CV</Link>
          <Link to={`/create/in/${user.username}/contact`}>Contact</Link>
        </div>
      </div>
      <div className="space-x-2">
        {process.env.ENVIRONMENT === "development" ? (
          <Link to={`/${user.username}`}>
            <button type="button" className="pillDark">
              View Site
            </button>{" "}
          </Link>
        ) : (
          <a href={url} target="_blank">
            <button type="button" className="pillDark">
              View Site
            </button>
          </a>
        )}
        <button type="button" className="pill" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
}
