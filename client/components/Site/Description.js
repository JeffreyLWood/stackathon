import React from "react";
import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ArtworkModal from "./ArtworkModal";
import Dimensions from "./Dimensions";
import useQ from "./useQ";
import { gsap } from "gsap";

export default function Description(props) {
  let [show, setShow] = useState(true);

  let user = useSelector((state) => state.user);
  let [body, setBody] = useState("");
  let [scrollPos, setScrollPos] = useState(null);
  let [q, ref] = useQ();

  const fadeIn = () => {
    gsap.to(q(".workModal"), {
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
    gsap.to(q(".workModal"), {
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
    <section className="w-screen min-h-content sm:mt-20 sm:mb-28 sm:h-96 flex flex-col-reverse items-start sm:flex-row">
      <div className="stagger w-full h-4/6 sm:h-full sm:w-5/12  flex flex-col px-2 sm:px-10 space-y-4">
        <span className="text-3xl tracking-widest ">{props.title}</span>
        {text}
      </div>
      <div className="w-full h-auto sm:h-full sm:w-7/12 flex flex-col md:flex-row sm:items-baseline md:items-end sm:justify-center">
        <span>
          <Image
            cloudName={process.env.CLOUDINARY_NAME}
            publicId={props.data.imgId}
            className="stagger max-h-96 cursor-pointer"
            onClick={showModal}
          />
        </span>
        <span className="stagger pt-5 text-right sm:text-left mx-4 tracking-widest">
          <ul className="text-xs space-y-2  uppercase text-neutral-400">
            <li className="text-neutral-400">{user.siteTitle}</li>
            <li>{props.data.title} </li>
            <li>
              <span className="text-neutral-400">{props.data.year}</span>
            </li>
            <li>
              <Dimensions data={props.data} />
            </li>
          </ul>
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
