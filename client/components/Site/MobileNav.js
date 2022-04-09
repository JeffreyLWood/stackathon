import React from "react";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import history from "../../history";
import { gsap } from "gsap";
import { useRef } from "react";
import Collections from "./Collections";
import CollectionsMobile from "./CollectionsMobile";
export default function MobileNav(props) {
  let user = useSelector((state) => state.user);

  let [collectionsMobile, setCollectionsMobile] = useState("hidden");

  //Disable scrolling when menu is open
  let [body, setBody] = useState("");

  document.body.style.position = body;

  let nav = useRef();
  const el = gsap.utils.selector(nav);
  let [show, setShow] = useState(false);

  const toggle = () => {
    show ? setShow(false) : setShow(true);
    show
      ? gsap.to(el(".mobileNav"), {
          xPercent: 100,
          duration: 2,
          ease: "expo",
        })
      : gsap.to(el(".mobileNav"), {
          xPercent: -100,
          duration: 1,
          ease: "expo",
        });
  };

  useEffect(() => {
    show ? setBody("fixed") : setBody("");
  }, [show]);

  const clickHandler = (e, destination) => {
    e.preventDefault();
    toggle();
    props.link(e, destination);
  };

  return (
    <div ref={nav}>
      <nav className="mobile fixed top-0 w-screen bg-white z-20 h-18 flex flex-row justify-between p-2 tracking-widest">
        <div className="text-xl">
          <Link to={`${props.url}`}>
            {user.siteTitle || `${user.firstName} ${user.lastName}`}
          </Link>
        </div>
        <div className="toggle" onClick={() => toggle()}></div>
      </nav>
      {/* Mobile Nav */}
      <nav className="mobileNav">
        <ul className="text-xl space-y-4 ">
          <li
            onClick={() =>
              collectionsMobile === "hidden"
                ? setCollectionsMobile("flex flex-col")
                : setCollectionsMobile("hidden")
            }
            className="subHeader cursor-pointer"
          >
            Selected Work
          </li>

          {/* Collections Mobile */}
          <span className={collectionsMobile}>
            <CollectionsMobile
              url={props.url}
              toggle={toggle}
              id={"Primary"}
              link={props.link}
              collections={props.collections}
            />
            <CollectionsMobile
              url={props.url}
              toggle={toggle}
              id={"Secondary"}
              link={props.link}
              collections={props.collections}
            />
          </span>
          {/* Collections Mobile End */}

          <li>
            <div
              onClick={(e) => clickHandler(e, `${props.url}/about`)}
              className="subHeader cursor-pointer"
            >
              About
            </div>
          </li>
          <li>
            <div
              onClick={(e) => clickHandler(e, `${props.url}/cv`)}
              className="subHeader cursor-pointer"
            >
              CV
            </div>
          </li>
          <li>
            <div
              onClick={(e) => clickHandler(e, `${props.url}/contact`)}
              className="subHeader cursor-pointer"
            >
              Contact
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
