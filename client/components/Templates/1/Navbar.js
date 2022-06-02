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
import { Link } from "react-router-dom";
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

  let [showDropdown, setShowDropdown] = useState(false);

  return (
    <div ref={ref}>
      {/* Mobile Nav Hamburger*/}
      <span className={styles.mobileNav}>
        <MobileNav
          url={url}
          collections={visible}
          fadeOut={props.fadeOut}
          toggleMenu={toggleMenu}
        />
      </span>
      <nav className={styles.nav}>
        <Link to={`${url}/`}>
          <span className={styles.siteTitle}>{user?.siteTitle}</span>
        </Link>

        <span className={styles.linkContainer}>
          <span
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            onClick={() => setShowDropdown(false)}
          >
            <Link to={`${url}/work`} className={styles.link}>
              Selected Work
            </Link>
            <Dropdown
              showDropdown={showDropdown}
              url={url}
              preview={
                props.collection?.works && props.collection?.works[0].imgId
              }
              collection={props.collection}
              visible={visible}
              collections={collections}
            />
          </span>
          <Link to={`${url}/about`}>
            <span className={styles.link}>About</span>
          </Link>
          <Link to={`${url}/cv`}>
            <span className={styles.link}>CV</span>
          </Link>
          <Link to={`${url}/contact`}>
            <span className={styles.link}>Contact</span>
          </Link>
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
