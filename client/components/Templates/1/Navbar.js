import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import history from "../../../history";
import { gsap } from "gsap";
import MobileNav from "./MobileNav";
import Dropdown from "./Dropdown";
import useQ from "../../../useQ";
export default function Navbar(props) {
  let user = useSelector((state) => state.user);
  document.title = user?.siteTitle;
  let collections = user?.collections;
  let visible =
    collections && collections.filter((collection) => !collection.hidden);
  let url =
    window.location.hostname === "selected-work.com"
      ? `/${user.username}`
      : user.domain
      ? ""
      : `/${user.username}`;

  // GSAP
  const fadeOut = () => {
    gsap.to(q(".stagger"), {
      opacity: 0,
      stagger: 0.1,
      duration: 2,
      ease: "expo",
    });
  };

  const link = (e, destination) => {
    e.preventDefault();
    dropDownUp();
    if (destination === window.location.pathname) {
      return null;
    }

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
      <MobileNav
        url={url}
        collections={visible}
        link={link}
        fadeOut={props.fadeOut}
      />
      <nav className="nav navbar fixed flex flex-row justify-between items-end sm:px-14 tracking-widest">
        <div
          className="text-xl cursor-pointer"
          onClick={(e) => link(e, `${url}/`)}
        >
          {user?.siteTitle}
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
}
