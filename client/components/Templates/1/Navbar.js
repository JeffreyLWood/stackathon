import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import history from "../../../history";
import { gsap } from "gsap";
import MobileNav from "./MobileNav";
import Dropdown from "./Dropdown";
import useQ from "../../../useQ";
import styles from "./styles.module.css";
import "/public/styles.css";
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

  const tl = new gsap.timeline({ paused: true });

  const fade = () => {
    gsap.to(
      q(`.${styles.nav}`),
      { opacity: 1, duration: 1, ease: "expo" },
      0.5
    );
  };

  let [show, setShow] = useState(false);

  gsap.set(q(`.${styles.mobileNav}`), {
    xPercent: 100,
  });

  tl.to(q(`.${styles.mobileNav}`), {
    xPercent: -1,
    duration: 1,
    ease: "expo",
  });

  const toggleMenu = () => {
    if (!show) {
      tl.play();
      setShow(true);
    } else {
      gsap.to(q(`.${styles.mobileNav}`), {
        xPercent: 100,
        duration: 2,
        ease: "expo",
      });
      setShow(false);
    }
  };
  useEffect(() => {
    fade();
  });

  const dropDown = () => {
    if (visible.length < 2) {
      return;
    }
    gsap.to(q(".gsap"), {
      display: "flex",
      opacity: 1,
      duration: 1,
      ease: "expo",
      zIndex: 10,
    });
  };

  const dropDownUp = () => {
    gsap.to(q(".gsap"), {
      duration: 0.2,
      display: "none",
      opacity: 0,
    });
  };

  let [showDropdown, setShowDropdown] = useState(false);

  return (
    <div ref={ref}>
      {/* Mobile Nav Hamburger*/}
      <span className={styles.mobileNav}>
        <MobileNav
          url={url}
          collections={visible}
          link={link}
          fadeOut={props.fadeOut}
          toggleMenu={toggleMenu}
        />
      </span>
      <nav className={styles.nav}>
        <span className={styles.siteTitle} onClick={(e) => link(e, `${url}/`)}>
          {user?.siteTitle}
        </span>

        <span className={styles.linkContainer}>
          <span
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className={styles.link}
            onClick={(e) => link(e, `${url}/`)}
          >
            Selected Work
            <Dropdown
              showDropdown={showDropdown}
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
            className={styles.link}
            onClick={(e) => link(e, `${url}/about`)}
          >
            About
          </span>

          <span className={styles.link} onClick={(e) => link(e, `${url}/cv`)}>
            CV
          </span>

          <span
            onClick={(e) => link(e, `${url}/contact`)}
            className={styles.link}
          >
            Contact
          </span>
          <span className={styles.social}>
            <img src="../social/instagram.png" />
          </span>
        </span>
        <div className={styles.toggle} onClick={toggleMenu}>
          <img src="/menu.png" />
        </div>
      </nav>
    </div>
  );
}
