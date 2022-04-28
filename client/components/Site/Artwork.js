import React from "react";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import ArtworkModal from "./ArtworkModal";
import Dimensions from "./Dimensions";
import useQ from "./useQ";
import { gsap } from "gsap";

export default function Artwork(props) {
  let [show, setShow] = useState(true);

  //Disable scrolling when menu is open
  let [body, setBody] = useState("");
  let [scrollPos, setScrollPos] = useState("");

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
    gsap.to(q(".workModal"), {
      opacity: 0,
      zIndex: -1,
      duration: 1,
      ease: "expo",
    });
  };

  const showModal = () => {
    if (window.outerWidth <= 638) {
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
    <>
      <div className="stagger z-10 flex flex-col flex-wrap w-full mx-2 my-8 md:my-0 sm:w-2/4 lg:w-1/4 md:h-96 sm:px-8 md:mt-4 md:mx-0">
        <span>
          <Image
            cloudName={process.env.CLOUDINARY_NAME}
            publicId={props.data.imgId}
            onClick={showModal}
            className="min-h-70 object-contain mx-auto  md:h-64 cursor-pointer"
          />
        </span>
        <div className="pt-4 sm:pt-8 text-xs flex flex-col space-y-2 sm:space-y-0 justify-end font-light tracking-widest uppercase text-right cursor-pointer text-neutral-500">
          <span onClick={showModal}>
            {props.data.title},{" "}
            <span className="text-neutral-400">{props.data.year}</span>
          </span>
          <span className="mobileArtDescription text-neutral-500">
            {props.data.medium}
          </span>
          <span className="mobileArtDescription text-neutral-500">
            <Dimensions data={props.data} />
          </span>
          <span className="mobileArtDescription text-neutral-500">
            {props.data.status}
          </span>
          <span className="mobileArtDescription text-neutral-500">
            {props.data.price}
          </span>
        </div>
      </div>
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
    </>
  );
}
