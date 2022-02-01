import React from "react";
import { Image } from "cloudinary-react";
export default function ArtworkModal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="workModal">
      <div
        className="workModalHeader cursor-pointer"
        onClick={() => props.setShow(false)}
      >
        <img src="/icons8-close-16.png"></img>
      </div>
      <div className="workModalBody">
        <Image cloudName="jeffreywood" publicId={props.data.imgId} />

        <div>{props.data.title}</div>
      </div>
    </div>
  );
}
