import React from "react";
import { Image } from "cloudinary-react";
import { useState } from "react";
import ArtworkModal from "./ArtworkModal";
export default function Artwork(props) {
  let [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-col flex-wrap w-full my-8 md:my-0 sm:w-2/4 lg:w-1/4 md:h-96 px-8 md:mt-4 md:mx-0">
        <span>
          <Image
            cloudName="jeffreywood"
            publicId={props.data.imgId}
            onClick={() => (window.outerWidth > 638 ? setShow(true) : null)}
            className="min-h-70 max-h-full object-contain mx-auto  md:h-64 cursor-pointer"
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
            {props.data.height} {"x"} {props.data.width}
          </span>
        </div>
      </div>
      <ArtworkModal
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
