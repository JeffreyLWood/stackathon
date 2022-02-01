import React from "react";
import { Image } from "cloudinary-react";
import { useState } from "react";
import ArtworkModal from "./ArtworkModal";
export default function Artwork(props) {
  let [show, setShow] = useState(false);

  return (
    <div className="flex flex-col flex-wrap mx-auto md:px-10 py-16">
      <div onClick={() => setShow(true)} className="cursor-pointer w-full">
        <Image
          cloudName="jeffreywood"
          publicId={props.data.imgId}
          className="md:h-56 h-70"
        />
      </div>
      <div
        className="pt-10 text-sm italic font-light tracking-widest uppercase text-right cursor-pointer text-grey-300"
        onClick={() => setShow(true)}
      >
        {props.data.title}
      </div>
      <ArtworkModal
        show={show}
        setShow={setShow}
        cloudName="jeffreywood"
        publicId={props.data.imgId}
        data={props.data}
      />
    </div>
  );
}
