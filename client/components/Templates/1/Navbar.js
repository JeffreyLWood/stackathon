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
  const link = (e, destination) => {
    e.preventDefault();
    dropDownUp();
    if (destination === window.location.pathname) {
      return null;
    }

    history.push(destination);
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
      <nav className="nav fixed flex flex-row w-screen justify-between tracking-widest items-end sm:px-14 tracking-widest">
        <span
          className="text-2xl uppercase items-end cursor-pointer w-3/6"
          onClick={(e) => link(e, `${url}/`)}
        >
          {user?.siteTitle}
        </span>

        <span className="flex flex-row items-end justify-between w-2/6 text-xs sm:text-xs">
          <span className="space-between flex flex-row space-x-8">
            <span
              className="subHeader mx-4 cursor-pointer"
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
              className="subHeader mx-4 cursor-pointer"
              onClick={(e) => link(e, `${url}/about`)}
            >
              About
            </span>

            <span
              className="subHeader mx-4 cursor-pointer"
              onClick={(e) => link(e, `${url}/cv`)}
            >
              CV
            </span>

            <span
              onClick={(e) => link(e, `${url}/contact`)}
              className="subHeader mx-4 cursor-pointer"
            >
              Contact
            </span>
          </span>
          <span className="pl-12">
            <img src="../social/instagram.png" className="w-6" />
          </span>
        </span>
      </nav>
    </div>
  );
}
