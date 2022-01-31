import React from "react";
import { Image } from "cloudinary-react";
export default function Artwork(props) {
  return (
    <div className="p-4 flex flex-col flex-wrap">
      <div>
        <Image
          cloudName="jeffreywood"
          publicId={props.data.imgId}
          className="max-h-44"
        />
      </div>
      <div className="py-3">{props.data.title}</div>
    </div>
  );
}
