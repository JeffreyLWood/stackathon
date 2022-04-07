import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";
import { gsap } from "gsap";
import { useRef } from "react";
import MobileNav from "./MobileNav";
import Dropdown from "./Dropdown";
export const Navbar = (props) => {
  let user = useSelector((state) => state.user);

  let siteTitle = props?.user.siteTitle
    ? `${props?.user.siteTitle}`
    : `${props.user.firstName} ${props.user.lastName}`;

  document.title = siteTitle;

  let collections = user.collections;

  let visible =
    collections &&
    collections
      .filter((collection) => !collection.hidden)
      .sort((a, b) => a.order - b.order);

  const hide = () => {
    dropDownUp();
  };

  let url =
    window.location.host === "www.selected-work.com"
      ? `/${user.userName}`
      : user.domain
      ? ""
      : `/${user.userName}`;

  // GSAP
  const link = (e, destination) => {
    e.preventDefault();
    hide();
    if (destination === window.location.pathname) {
      return;
    }

    props.fadeOut();
    setTimeout(() => {
      history.push(destination);
    }, 1000);
  };

  let nav = useRef();
  const el = gsap.utils.selector(nav);

  const fade = () => {
    gsap.to(el(".nav"), { opacity: 1, duration: 1, ease: "expo" }, 0.5);
  };

  const dropDown = () =>
    gsap.to(el(".dropdown"), {
      display: "flex",
      opacity: 1,
      duration: 1,
      ease: "expo",
    });

  const dropDownUp = () =>
    gsap.to(el(".dropdown"), {
      display: "none",
      ease: "expo",
      duration: 0.5,
      opacity: 0,
    });

  useEffect(() => {
    fade();
  });

  const collectionClickHandler = (e, collection) => {
    e.preventDefault();
    props.setCollection && props.setCollection(collection);

    link(e, `${url}/work/${collection.title}`);
  };

  return (
    <div ref={nav}>
      {/* Mobile Nav Hamburger*/}
      <MobileNav
        url={url}
        collections={visible}
        link={link}
        collectionClickHandler={collectionClickHandler}
      />
      <nav className="nav navbar fixed flex flex-row justify-between items-end sm:px-14 tracking-widest">
        <div className="text-xl">
          <Link to={`${url}`}>{siteTitle}</Link>
        </div>

        <span className="flex flex-row space-x-3 text-xs sm:text-sm pe-5">
          <span
            className="subHeader cursor-pointer"
            onMouseEnter={dropDown}
            onMouseLeave={dropDownUp}
            onClick={(e) => link(e, `${url}/`)}
          >
            Selected Work
            {/* Drop Down Nav For Collections */}
            <Dropdown
              url={url}
              preview={
                props.collection?.works && props.collection?.works[0].imgId
              }
              collection={props.collection}
              visible={visible}
              collections={collections}
              collectionClickHandler={collectionClickHandler}
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
