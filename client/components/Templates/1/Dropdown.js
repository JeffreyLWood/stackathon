import React from "react";
import { useState } from "react";
import { Image } from "cloudinary-react";
import { gsap } from "gsap";
import useQ from "../../../useQ";
import Collections from "./Collections";
export default function Dropdown(props) {
  let [preview, setPreview] = useState(props.preview);
  let visible = props.visible;

  const previewHandler = (e) => {
    e.preventDefault();
    setPreview(e.target.id);
  };

  let [q, ref] = useQ();
  const enterPreview = () => {
    gsap.fromTo(
      q(".preview"),
      { opacity: 0, x: -20 },
      {
        x: 20,
        opacity: 1,
        duration: 1,
        ease: "expo",
      }
    );
  };

  return (
    <div ref={ref} className="flex flex-row justify-between dropdown shadow-md">
      <div className="hidden sm:block w-full flex text-center h-content">
        <ul className="w-full h-full">
          <span className="w-full h-full">
            <li className="w-full h-full">
              <Image
                cloudName={process.env.CLOUDINARY_NAME}
                publicId={preview}
                className="preview hover:cursor-pointer h-72 mx-auto "
              />
            </li>
          </span>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-start h-full w-screen sm:justify-start sm:w-2/6 md:flex-row">
        <span className="w-full flex justify-center sm:justify-start sm:w-3/6">
          <Collections
            id={"Primary"}
            collections={visible}
            link={props.link}
            previewHandler={previewHandler}
            enterPreview={enterPreview}
            url={props.url}
          />
        </span>
        <span className="w-full flex justify-center sm:justify-start sm:w-3/6 mr-4">
          <Collections
            id={"Secondary"}
            collections={visible}
            link={props.link}
            previewHandler={previewHandler}
            enterPreview={enterPreview}
            url={props.url}
          />
        </span>
      </div>
    </div>
  );
}
