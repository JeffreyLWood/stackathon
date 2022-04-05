import React from "react";
import { Image } from "cloudinary-react";
import { useState, useEffect } from "react";
import ArtworkModal from "./ArtworkModal";
import Dimensions from "./Dimensions";
import { useRef } from "react";
import { gsap } from "gsap";
export default function Artwork(props) {
  let [show, setShow] = useState(false);

  //Disable scrolling when menu is open
  let [body, setBody] = useState("");
  let [scrollPos, setScrollPos] = useState("");
  useEffect(() => {
    //Set Timeout to avoid jumping when scrollbar is hidden. Modal is up after it is changed
    show
      ? setTimeout(() => {
          setBody("fixed");
        }, 1000)
      : setBody("");
    setScrollPos(`-${window.scrollY}px`);
  }, [show]);
  document.body.style.position = body;
  document.body.style.top = scrollPos;
  //Not functional, scrolling to top each time
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
            cloudName="jeffreywood"
            publicId={props.data.imgId}
            onClick={() => (window.outerWidth > 638 ? setShow(true) : null)}
            className="min-h-70 object-contain mx-auto  md:h-64 cursor-pointer"
          />
        </span>
        <div className="pt-4 sm:pt-8 text-xs flex flex-col space-y-2 sm:space-y-0 justify-end font-light tracking-widest uppercase text-right cursor-pointer text-neutral-500">
          <span
            onClick={() => (window.outerWidth > 638 ? setShow(true) : null)}
          >
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
      <ArtworkModal
        closeHandler={closeHandler}
        show={show}
        setShow={setShow}
        user={props.user}
        cloudName="jeffreywood"
        publicId={props.data.imgId}
        data={props.data}
      />
    </>
  );
}
