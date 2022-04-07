import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
import { gsap } from "gsap";
import { useRef } from "react";
export default function Dropdown(props) {
  let [preview, setPreview] = useState(props.preview);
  let visible = props.visible;

  const previewHandler = (e) => {
    e.preventDefault();
    setPreview(e.target.id);
  };

  let nav = useRef();
  const el = gsap.utils.selector(nav);

  const enterPreview = () => {
    gsap.fromTo(
      el(".preview"),
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
    <div
      ref={nav}
      className="flex flex-row justify-between dropdown drop-shadow-md"
    >
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
          <ul>
            {visible &&
              visible
                .filter((collection) => collection.category === "Primary")
                .sort(function (a, b) {
                  return a.order - b.order;
                })
                .map((collection, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer text-xl sm:text-sm text-neutral-500"
                    id={collection.works[0]?.imgId}
                    onMouseOver={(e) => previewHandler(e)}
                    onMouseEnter={enterPreview}
                    onClick={(e) => props.collectionClickHandler(e, collection)}
                  >
                    {collection.title}
                  </li>
                ))}
          </ul>
        </span>
        <span className="w-full flex justify-center sm:justify-start sm:w-3/6 mr-4">
          <ul>
            {visible &&
              visible
                .filter((collection) => collection.category === "Secondary")
                .sort(function (a, b) {
                  return a.order - b.order;
                })
                .map((collection, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer text-xl sm:text-sm text-neutral-500"
                    id={collection.works[0]?.imgId}
                    onMouseOver={(e) => previewHandler(e)}
                    onClick={(e) => props.collectionClickHandler(e, collection)}
                  >
                    {collection.title}
                  </li>
                ))}
          </ul>
        </span>
      </div>
    </div>
  );
}
