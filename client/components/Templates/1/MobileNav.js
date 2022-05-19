import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import CollectionsMobile from "./CollectionsMobile";
import useQ from "../../../useQ";
import styles from "./styles.module.css";
export default function MobileNav(props) {
  let user = useSelector((state) => state.user);

  let [collectionsMobile, setCollectionsMobile] = useState("hidden");

  const clickHandler = (e, destination) => {
    e.preventDefault();
    props.toggleMenu();
    props.link(e, destination);
  };

  return (
    <nav>
      <ul className="text-xl space-y-4">
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
            toggleMenu={props.toggleMenu}
            fadeOut={props.fadeOut}
            url={props.url}
            id={"Primary"}
            link={props.link}
            collections={props.collections}
          />
          <CollectionsMobile
            url={props.url}
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
  );
}
