import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Image } from "cloudinary-react";
import Uploader from "./Uploader";
export default function Snapshot(props) {
  const dispatch = useDispatch();
  let [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <div>
      <div className="w-full flex flex-row">
        {/* //add a work modal  */}
        {/* //snapshot of works on view */}
        <div className="border-2 w-4/6 border-gray-300 flex flex-wrap justify-around mx-2">
          {props.works &&
            props.works.map((work, index) => {
              return (
                <Image
                  key={index}
                  cloudName="jeffreywood"
                  publicId={work.imgId}
                  className="h-36 m-4"
                />
              );
            })}
          <div className="h-36 w-24 m-4 bg-gray-200 border-2 border-gray-300 justify-center items-center">
            <img src="public/placeholderadd.png"></img>
          </div>
        </div>
        {/* //snapshot of hidden works */}
        <div className="border-2 w-2/6 border-gray-300 bg-gray-200 flex mx-2">
          {/* {props.works &&
          props.works.map((work, index) => {
            return (
              <Image
                key={index}
                cloudName="jeffreywood"
                publicId={work.imgId}
                className="max-h-16 m-2"
              />
            );
          })} */}
        </div>
      </div>

      <button
        type="submit"
        onClick={(event) => submitHandler(event)}
        className="btn bg-black my-5 text-white w-18 h-8 p-2 rounded-md"
      >
        Add a Work
      </button>

      <Uploader show={show} user={props.user} />
    </div>
  );
}
