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
  let collection = useSelector((state) => state.create?.collection);

  const dispatch = useDispatch();
  let [works, setWorks] = useState([]);

  useEffect(() => {
    collection = dispatch(fetchCollection(props.userId, props.collectionTitle));
  }, [props.collectionTitle]);

  return (
    <div className="snapshot border-2 border-gray-300 mx-2 p-1">
      <select
        id={props.id}
        className="p-2"
        onChange={props.changeHandler}
        value={props.collectionTitle}
      >
        {props &&
          props?.headers.map((heading, idx) => (
            <option key={idx} value={heading} id={props.id}>
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
              id={props.collectionTitle}
              onClick={(e) => props.clickHandler(e)}
            />
          );
        })}
    </div>
  );
}
