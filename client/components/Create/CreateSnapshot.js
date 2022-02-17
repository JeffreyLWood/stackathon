import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Image } from "cloudinary-react";
import CreateUploader from "./CreateUploader";
import {
  fetchAllWork,
  fetchPrimaryCollection,
  fetchSecondaryCollection,
} from "../../store/create";
import { Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";
import Item from "./Item";

export default function CreateSnapshot(props) {
  let collection =
    props.id === "primary"
      ? useSelector((state) => state.create?.primaryCollection)
      : useSelector((state) => state.create?.secondaryCollection);

  const dispatch = useDispatch();

  useEffect(() => {
    collection =
      props.id === "primary"
        ? dispatch(fetchPrimaryCollection(props.userId, props.collectionTitle))
        : dispatch(
            fetchSecondaryCollection(props.userId, props.collectionTitle)
          );
    console.log(collection);
  }, [props.collectionTitle]);

  return (
    <div className="snapshot border-2 border-gray-200 mx-2 p-2">
      <select
        id={props.id}
        className="p-2"
        onChange={props.changeHandler}
        value={props.collectionTitle}
      >
        {props &&
          props?.headers
            .filter((header) => {
              if (props.id === "primary") {
                return header !== props.secondary;
              } else {
                return header !== props.primary;
              }
            })
            .map((heading, idx) => (
              <option
                key={idx}
                onChange={props.changeHandler}
                value={heading}
                id={props.id}
              >
                {heading}
              </option>
            ))}
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
