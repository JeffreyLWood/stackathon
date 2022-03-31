import React from "react";
import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ArtworkModal from "./ArtworkModal";
export default function Description(props) {
  let user = useSelector((state) => state.user);

  let [show, setShow] = useState(false);

  //Disable scrolling when menu is open
  let [body, setBody] = useState("");
  let [scrollPos, setScrollPos] = useState("");
  useEffect(() => {
    //Set Timeout to avoid jumping when scrollbar is hidden. Modal is up after it is changed
    show
      ? setTimeout(() => {
          setBody("fixed");
        }, 1000)
      : setBody("");
    setScrollPos(`-${window.scrollY}px`);
  }, [show]);
  document.body.style.position = body;
  document.body.style.top = scrollPos;
  //Not functional, scrolling to top each time
  const closeHandler = (e) => {
    e.preventDefault();

    window.scrollTo(0, parseInt(scrollPos || "0") * -1);
    setShow(false);
  };

  const text = props.description.split("\n").map((str, idx) => (
    <p key={idx}>
      {str}
      <br />
    </p>
  ));

  return (
    <section className="w-screen min-h-content sm:mt-20 sm:mb-28 sm:h-96 flex flex-col-reverse items-start sm:flex-row">
      <div className="w-full h-4/6 sm:h-full sm:w-5/12  flex flex-col px-2 sm:px-10 space-y-4">
        <span className="text-3xl tracking-widest ">{props.title}</span>
        <span>
          <p className="pb-6 sm:pb-0 text-sm leading-6">{text}</p>
        </span>
      </div>
      <div className="w-full h-auto sm:h-full sm:w-7/12 flex flex-col md:flex-row sm:items-baseline md:items-end sm:justify-center">
        <span>
          <Image
            cloudName={process.env.CLOUDINARY_NAME}
            publicId={props.data.imgId}
            className="max-h-96 cursor-pointer"
            onClick={() => (window.outerWidth > 638 ? setShow(true) : null)}
          />
        </span>
        <span className="pt-5 text-right sm:text-left mx-4 tracking-widest">
          <ul className="text-xs space-y-2  uppercase text-neutral-400">
            <li className="text-neutral-400">{user.siteTitle}</li>
            <li>
              {props.data.title}{" "}
              {props.data.year ? (
                <span className="text-neutral-400">{props.data.year}</span>
              ) : null}
            </li>

            <li>
              {props.data.height}
              {props.data.width ? ` x ${props.data.width}` : null}
              {props.data.depth ? ` x ${props.data.depth}` : null}
            </li>
          </ul>
        </span>
      </div>
      <ArtworkModal
        closeHandler={closeHandler}
        show={show}
        setShow={setShow}
        user={user}
        cloudName={process.env.CLOUDINARY_NAME}
        publicId={props.data.imgId}
        data={props.data}
      />
    </section>
  );
}
