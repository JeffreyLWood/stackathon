import React from "react";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import ArtworkModal from "./ArtworkModal";
import Dimensions from "./Dimensions";
import useQ from "../../../useQ";
import { gsap } from "gsap";
import styles from "./styles.module.css";

export default function Artwork(props) {
  let [show, setShow] = useState(true);

  //Disable scrolling when menu is open
  let [body, setBody] = useState("");
  let [scrollPos, setScrollPos] = useState("");

  let [q, ref] = useQ();

  const fadeIn = () => {
    gsap.to(q(".gsap"), {
      opacity: 1,
      zIndex: 50,
      duration: 1,
      ease: "expo",
    });
    gsap.fromTo(
      q(".artwork"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: -20,
        duration: 2,
        delay: 0.5,
        ease: "expo",
      }
    );
    gsap.fromTo(
      q(".description"),
      {
        opacity: 0,
        x: 20,
      },
      {
        opacity: 1,
        x: -20,
        stagger: 0.1,
        duration: 2,
        ease: "expo",
        delay: 1,
      }
    );
  };

  const fadeOut = () => {
    document.body.style.position = "";
    window.scrollTo({ top: scrollPos, behavior: "auto" });
    gsap.to(q(".gsap"), {
      opacity: 0,
      zIndex: -1,
      duration: 1,
      ease: "expo",
    });
  };

  const showModal = () => {
    if (window.outerWidth <= 820) {
      return;
    }
    setScrollPos(window.scrollY);
    fadeIn();
    setTimeout(() => {
      document.body.style.position = "fixed";
    }, 500);
  };

  const closeHandler = (e) => {
    e.preventDefault();

    window.scrollTo(0, parseInt(scrollPos || "0") * -1);
    setShow(false);
  };

  return (
    <div className={styles.cell}>
      <div className={`${styles.artBox} stagger`}>
        <Image
          cloudName={process.env.CLOUDINARY_NAME}
          publicId={props.data.imgId}
          onClick={showModal}
          className={styles.thumbnail}
        />
      </div>
      <span className={styles.thumbnailDescription} onClick={showModal}>
        {props.data.title}
        <span className={styles.mobileArtDescription}>{props.data.medium}</span>
        <span className={styles.mobileArtDescription}>
          <Dimensions data={props.data} />
        </span>
        <span className={styles.mobileArtDescription}>{props.data.status}</span>
        <span className={styles.mobileArtDescription}>{props.data.price}</span>
      </span>

      <div ref={ref}>
        <ArtworkModal
          closeHandler={closeHandler}
          show={show}
          setShow={setShow}
          user={props.user}
          cloudName={process.env.CLOUDINARY_NAME}
          publicId={props.data.imgId}
          data={props.data}
          fadeOut={fadeOut}
        />
      </div>
    </div>
  );
}
