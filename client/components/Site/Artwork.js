import React from "react";
import { Image } from "cloudinary-react";
import { useState } from "react";
import ArtworkModal from "./ArtworkModal";
export default function Artwork(props) {
  let [show, setShow] = useState(false);

  return (
    <div className="flex flex-col flex-wrap justify-center w-full sm:w-2/4 lg:w-1/4 px-12 py-8 md:mt-4 md:mx-0 md:px-8">
      <div
        onClick={() => setShow(true)}
        className="cursor-pointer flex justify-center"
      >
        <Image
          cloudName="jeffreywood"
          publicId={props.data.imgId}
          className="min-h-70 md:h-56 object-contain"
        />
      </div>
      <div
        className="pt-4 sm:pt-8 text-xs italic font-light tracking-widest uppercase text-right cursor-pointer text-neutral-400"
        onClick={() => setShow(true)}
      >
        {props.data.title}
      </div>
      <ArtworkModal
        show={show}
        setShow={setShow}
        user={props.user}
        cloudName="jeffreywood"
        publicId={props.data.imgId}
        data={props.data}
      />
    </div>
  );
}
