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
            <Collections
              url={props.url}
              toggle={toggle}
              id={"Primary"}
              link={props.link}
              collections={props.collections}
            />
            <Collections
              url={props.url}
              toggle={toggle}
              id={"Secondary"}
              link={props.link}
              collections={props.collections}
            />
            {/* <ul>
              {props.collections &&
                props.collections
                  .filter(
                    (collection) =>
                      collection.hidden === false &&
                      collection.category === "Primary"
                  )
                  .sort(function (a, b) {
                    return a.order - b.order;
                  })
                  .map((collection, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer text-xl sm:text-sm text-neutral-500"
                      onClick={(e) => {
                        props.link(e, collection), toggle();
                      }}
                    >
                      {collection.title}
                    </li>
                  ))}
            </ul>
            <ul>
              {props.collections &&
                props.collections
                  .filter(
                    (collection) =>
                      collection.hidden === false &&
                      collection.category === "Secondary"
                  )
                  .sort(function (a, b) {
                    return a.order - b.order;
                  })
                  .map((collection, idx) =>
                    props.setCollection ? (
                      <li
                        key={idx}
                        className="cursor-pointer text-xl sm:text-sm text-neutral-400 tracking-widest"
                        onClick={() => {
                          setMobileNav("hidden"),
                            setCollectionsMobile("hidden"),
                            props.setCollection(collection);
                        }}
                      >
                        <Link to={`${props.url}/work/${collection.title}`}>
                          {collection.title}
                        </Link>
                      </li>
                    ) : (
                      <li
                        key={idx}
                        onClick={() => {
                          setCollectionsMobile("hidden");
                        }}
                        className="cursor-pointer text-xl sm:text-sm  text-neutral-400 tracking-widest"
                      >
                        <Link to={`${props.url}/work/${collection.title}`}>
                          {collection.title}
                        </Link>
                      </li>
                    )
                  )}
            </ul> */}
          </span>
          {/* Collections Mobile End */}

          <li>
            <div
              onClick={(e) => props.link(e, `${props.url}/about`)}
              className="subHeader cursor-pointer"
            >
              About
            </div>
          </li>
          <li>
            <div
              onClick={(e) => props.link(e, `${props.url}/cv`)}
              className="subHeader cursor-pointer"
            >
              CV
            </div>
          </li>
          <li>
            <div
              onClick={(e) => props.link(e, `${props.url}/contact`)}
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
