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
            onClick={() => setShow(true)}
            className="min-h-70 max-h-full object-contain mx-auto  md:h-64 cursor-pointer"
          />
        </span>
        <span
          className="pt-4 sm:pt-8 text-xs italic font-light tracking-widest uppercase text-right cursor-pointer text-neutral-500"
          onClick={() => setShow(true)}
        >
          {props.data.title},{" "}
          <span className="text-neutral-400">{props.data.year}</span>
        </span>
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
