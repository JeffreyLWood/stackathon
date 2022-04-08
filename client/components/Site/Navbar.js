import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";
import { gsap } from "gsap";
import { useRef } from "react";
import MobileNav from "./MobileNav";
import Dropdown from "./Dropdown";
import useQ from "./useQ";
export const Navbar = (props) => {
  let user = useSelector((state) => state.user);

  let siteTitle = user?.siteTitle
    ? `${user?.siteTitle}`
    : `${user.firstName} ${user.lastName}`;
  document.title = siteTitle;

  let collections = user.collections;

  let visible =
    collections &&
    collections
      .filter((collection) => !collection.hidden)
      .sort((a, b) => a.order - b.order);

  let url =
    window.location.host === "www.selected-work.com"
      ? `/${user.userName}`
      : user.domain
      ? ""
      : `/${user.userName}`;

  // GSAP
  const link = (e, destination) => {
    e.preventDefault();
    dropDownUp();
    if (destination === window.location.pathname) {
      return null;
    }
    props.fadeOut();
    setTimeout(() => {
      history.push(destination);
    }, 2000);
  };

  let [q, ref] = useQ();

  const fade = () => {
    gsap.to(q(".nav"), { opacity: 1, duration: 1, ease: "expo" }, 0.5);
  };
  useEffect(() => {
    fade();
  });
  const dropDown = () =>
    gsap.to(q(".dropdown"), {
      display: "flex",
      opacity: 1,
      duration: 1,
      ease: "expo",
    });

  const dropDownUp = () =>
    gsap.to(q(".dropdown"), {
      display: "none",
      ease: "expo",
      duration: 0.5,
      opacity: 0,
    });

  return (
    <div ref={ref}>
      {/* Mobile Nav Hamburger*/}
      <MobileNav url={url} collections={visible} link={link} />
      <nav className="nav navbar fixed flex flex-row justify-between items-end sm:px-14 tracking-widest">
        <div className="text-xl" onClick={(e) => link(e, `${url}/`)}>
          {siteTitle}
        </div>

        <span className="flex flex-row space-x-3 text-xs sm:text-sm pe-5">
          <span
            className="subHeader cursor-pointer"
            onMouseEnter={dropDown}
            onMouseLeave={dropDownUp}
          >
            <span onClick={(e) => link(e, `${url}/`)}>Selected Work</span>
            {/* Drop Down Nav For Collections */}
            <Dropdown
              url={url}
              preview={
                props.collection?.works && props.collection?.works[0].imgId
              }
              collection={props.collection}
              visible={visible}
              collections={collections}
              link={link}
            />
          </span>

          <span
            className="subHeader cursor-pointer"
            onClick={(e) => link(e, `${url}/about`)}
          >
            About
          </span>

          <span
            className="subHeader cursor-pointer"
            onClick={(e) => link(e, `${url}/cv`)}
          >
            CV
          </span>

          <span
            onClick={(e) => link(e, `${url}/contact`)}
            className="subHeader cursor-pointer"
          >
            Contact
          </span>
        </span>
      </nav>
    </div>
  );
};
