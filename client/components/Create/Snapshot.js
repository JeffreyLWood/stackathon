import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Image } from "cloudinary-react";
import { Uploader } from "./Uploader";
export default function Snapshot(props) {
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");
  let [imgId, setImgId] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchUserData(user.userName));
  }, [show]);

  const clickHandler = (e) => {
    e.preventDefault();
    setDisplayName("Edit Work");
    let imgId = e.target.src.split("/").slice(-1).join();
    setImgId(imgId);
    setShow(true);
  };

  return (
    <div>
      <div className="w-full flex flex-row">
        {/* //snapshot of works on view */}
        <div className="snapshot border-2 w-4/6 border-gray-300 flex flex-wrap justify-around mx-2 p-1">
          {props.works &&
            props.works.map((work, index) => {
              return (
                <Image
                  key={index}
                  cloudName="jeffreywood"
                  publicId={work.imgId}
                  className="h-32 m-1"
                  onClick={(e) => clickHandler(e)}
                />
              );
            })}
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
        value="Add a Work"
      >
        Add a Work
      </button>

      <Uploader
        displayName={displayName}
        show={show}
        setShow={setShow}
        imgId={imgId}
        user={props.user}
      />
    </div>
  );
}
