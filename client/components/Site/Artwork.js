import React from "react";
import { Image } from "cloudinary-react";
export default function Artwork(props) {
  return (
    <div className="p-4">
      <Image cloudName="jeffreywood" publicId={props.data.imgId} />
    </div>
  );
}
