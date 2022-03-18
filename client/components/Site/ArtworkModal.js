import React from "react";
import { Image } from "cloudinary-react";

export default function ArtworkModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="workModal">
      <div className="workModalHeader">
        <span
          className="workModalClose cursor-pointer"
          onClick={() => props.setShow(false)}
        >
          <img src="/icons8-close-16.png" className="w-6" />
        </span>
      </div>
      <div className="workModalBody ">
        <div className="workModalImgContainer mb-2 sm:my-5">
          <Image cloudName="jeffreywood" publicId={props.data.imgId} />
        </div>
        <div className="workModalTextContainer">
          <ul className="tracking-wider">
            <li className="italic text-xl text-neutral-600 mb-2">
              {props.data.title}
            </li>
            <li className="uppercase tracking-widest text-neutral-500 text-sm sm:mb-10">
              {props.user.siteTitle ||
                props.user.firstName + " " + props.user.lastName}
            </li>
            <li className="text-sm text-neutral-500 mb-2">{props.data.year}</li>
            <li className="text-xs uppercase text-neutral-500 mb-2">
              {props.data.medium}
            </li>
            <li className="text-sm text-neutral-500">
              {props.data.height} x {props.data.width} "
            </li>
            <li className="md:py-10">
              {/* <button type="button" className="border-2 p-2 ">
                Enquire
              </button> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
