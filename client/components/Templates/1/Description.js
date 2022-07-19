import React from "react";
import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ArtworkModal from "./ArtworkModal";
import Dimensions from "./Dimensions";
import useQ from "../../../useQ";
import { gsap } from "gsap";
import styles from "./styles.module.css";

export default function Description(props) {
  let [show, setShow] = useState(true);

  let user = useSelector((state) => state.user);
  let [body, setBody] = useState("");
  let [scrollPos, setScrollPos] = useState(null);
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
    gsap.to(q(".artwork"), {
      opacity: 0,
      duration: 2,
      ease: "expo",
    });
    gsap.to(q(".description"), {
      opacity: 0,
      zIndex: -1,
      duration: 2,
      ease: "expo",
    });
    gsap.to(q(".gsap"), {
      opacity: 0,
      zIndex: -1,
      duration: 2,
      ease: "expo",
      delay: 1,
    });
  };

  const showModal = () => {
    if (window.outerWidth <= 638) {
      return;
    }
    fadeIn();
    setScrollPos(window.scrollY);
    setTimeout(() => {
      document.body.style.position = "fixed";
    }, 500);
  };

  const text = props.description.split("\n").map((str, idx) => (
    <p key={idx} className="pb-6 sm:pb-0 text-sm leading-6">
      {str}
      <br />
    </p>
  ));

  return (
    <section className={styles.description}>
      <div className={`${styles.descriptionText}`}>
        <span className={`${styles.h1} stagger`}>{props.title}</span>
        {props.subheading1 ? (
          <span className={`${styles.h2} stagger`}>{props.subheading1}</span>
        ) : null}
        {props.subheading2 ? (
          <span className={`${styles.h2} stagger`}>{props.subheading2}</span>
        ) : null}
        <span className="stagger">{text}</span>
      </div>
      <div className={`${styles.descriptionImageWrapper}`}>
        <Image
          cloudName={process.env.CLOUDINARY_NAME}
          publicId={props.data.imgId}
          className={`${styles.descriptionImage} stagger`}
          onClick={showModal}
        />
        <span className={`${styles.descriptionImageDescription} stagger`}>
          <span>{props.data.title}</span>
          <span className={styles.textSecondary}>{props.data.year}</span>
          <span className={styles.textSecondary}>{props.data.medium}</span>
          <Dimensions data={props.data} />
        </span>
      </div>

      <div ref={ref}>
        <ArtworkModal
          fadeOut={fadeOut}
          show={show}
          user={user}
          cloudName={process.env.CLOUDINARY_NAME}
          publicId={props.data.imgId}
          data={props.data}
        />
      </div>
    </section>
  );
}
