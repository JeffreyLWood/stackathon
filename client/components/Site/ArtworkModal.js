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
        <div className="bg-red-100 workModalContainer">
          <Image cloudName="jeffreywood" publicId={props.data.imgId} />
        </div>
        <div className="bg-green-100 workModalContainer">
          <ul>
            <li className="uppercase italic font-light text-large mb-6"></li>
            <li className="uppercase italic font-light text-large mb-6 tracking-widest">
              {props.data.title}
            </li>
            <li className="text-large text-gray-400">{props.data.year}</li>
            <li className="font-light text-large ">{props.data.medium}</li>
            <li className="font-light text-large">
              {props.data.height} x {props.data.width} "
            </li>
            <li className="py-10">
              <button type="button" className="border-2 p-2 ">
                Enquire
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
