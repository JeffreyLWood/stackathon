import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Image } from "cloudinary-react";
import CreateUploader from "./CreateUploader";
import { fetchAllWork } from "../../store/create";
import { Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";
import Item from "./Item";
import { fetchCollection } from "../../store/create";
export default function CreateSnapshot(props) {
  // still not triggering refresh when a user changes an image of a work or adds a new work
  let collection = useSelector((state) => state.create.collection);

  const dispatch = useDispatch();
  let [works, setWorks] = useState([]);

  useEffect(() => {
    collection = dispatch(fetchCollection(props.userId, props.collectionTitle));
  }, []);
  console.log("collection", collection);
  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
    setShow(true);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    props.setDisplayName("Edit Work");
    let imgId = e.target.src.split("/").slice(-1).join();
    props.setImgId(imgId);
    props.setShow(true);
  };

  const changeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name === props.id) {
      props.setHeader(evt.target.value);
    }
  };

  return (
    <div className="snapshot border-2 border-gray-300 mx-2 p-1">
      <select
        className="p-2"
        name={props.id}
        id={props.id}
        onChange={changeHandler}
        value={props.primary}
      >
        {props &&
          props?.headers.map((heading, idx) => (
            <option key={idx} value={heading}>
              {heading}
            </option>
          ))}
        {props.id === "secondary" ? (
          <option value="Hidden">Hidden</option>
        ) : null}
      </select>
      {collection &&
        collection.map((work, idx) => {
          return (
            <Image
              key={idx}
              cloudName="jeffreywood"
              publicId={work.imgId}
              className="h-32 m-2"
              onClick={(e) => clickHandler(e)}
            />
          );
        })}
    </div>
  );
}
