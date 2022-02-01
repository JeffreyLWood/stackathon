import React from "react";
import { Image } from "cloudinary-react";

export default function ArtworkModal(props) {
  console.log("console.log(props.user.siteTitle)", props.user);
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
        <div className="workModalImgContainer bg-red-100">
          <Image cloudName="jeffreywood" publicId={props.data.imgId} />
        </div>
        <div className="workModalTextContainer">
          <ul>
            <li className="uppercase tracking-widest text-gray-400 font-light text-large mb-2">
              {props.user.siteTitle}
            </li>
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
