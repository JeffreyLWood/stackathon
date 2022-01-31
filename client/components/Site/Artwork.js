import React from "react";
import { Image } from "cloudinary-react";
export default function Artwork(props) {
  return (
    <div className="flex flex-col flex-wrap px-10 py-16">
      <div>
        <Image
          cloudName="jeffreywood"
          publicId={props.data.imgId}
          className="h-56"
        />
      </div>
      <div className="pt-10 text-sm italic font-light tracking-widest uppercase text-right">
        {props.data.title}
      </div>
    </div>
  );
}
