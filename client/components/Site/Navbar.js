import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  let siteTitle = `${props.user.siteTitle}`;

  document.title = siteTitle;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserData(props.user.username));
  // }, []);

  let [workDropdown, setWorkDropdown] = useState("hidden");

  const show = () => {
    setWorkDropdown("block dropdown");
  };
  const hide = () => {
    setWorkDropdown("hidden");
  };

  let collections = props.user && props.user.collections;
  console.log(props);
  return (
    <>
      <nav className="flex flex-row justify-between h-18 items-end mx-10 mt-10">
        <div className="siteTitle">
          <Link to={`/${props.user.userName}`}>{siteTitle}</Link>
        </div>
        <div className="flex flex-row space-x-3 text-sm pe-5">
          <div
            className="subHeader cursor-pointer"
            onMouseOver={show}
            onMouseLeave={hide}
          >
            Work
            <div className={workDropdown}>
              <ul>
                {collections &&
                  collections
                    .filter((collection) => collection.hidden === "false")
                    .map((collection, idx) => (
                      <li key={idx} className="cursor-pointer">
                        <Link to={`/jeffreywood/${collection.title}`}>
                          {collection.title}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <Link to={`/${props.user.userName}/about`} className="subHeader">
            <div>About</div>
          </Link>
          <Link to={`/${props.user.userName}/cv`} className="subHeader">
            <div>CV</div>
          </Link>
          <Link to={`/${props.user.userName}/contact`} className="subHeader">
            <div>Contact</div>
          </Link>
        </div>
      </nav>
    </>
  );
};

// import React from "react";
