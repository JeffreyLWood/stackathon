import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Image } from "cloudinary-react";
import CreateUploader from "./CreateUploader";
import CollectionSettings from "./CollectionSettings";
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
  // Hide or show collection settings, if true: editing the collection title, description and delete collection
  // if false the thumbnails are show.
  let [settings, setSettings] = useState(false);
  // Load works from collection based on the user id the props.collectionTitle passed down
  useEffect(() => {
    collection =
      props.id === "primary"
        ? dispatch(fetchPrimaryCollection(props.userId, props.collectionTitle))
        : dispatch(
            fetchSecondaryCollection(props.userId, props.collectionTitle)
          );
  }, [props.collectionTitle]);

  return (
    <div className="snapshot h-full border-2 border-gray-200 mx-2 p-5 font-light">
      <div className="flex items-center flex-row">
        <span className="text-gray-400">Collection: </span>
        <select
          id={props.id}
          className="p-2"
          onChange={props.changeHandler}
          value={props.collectionTitle}
        >
          {props &&
            props?.collections
              .filter((collection) => {
                if (props.id === "primary") {
                  return collection !== props.secondary;
                } else {
                  return collection !== props.primary;
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
        {/* If primary, show edit collection settings, secondary cannot edit settings */}
        {props.id === "primary" ? (
          <span className="mx-10 space-x-5 flex flex-row items-center">
            {/* Toggle settings vs thumbnail view */}
            {settings ? (
              <span onClick={() => setSettings(false)}>
                <img
                  src="../../../collection.png"
                  className="w-4 hover:cursor-pointer"
                />
              </span>
            ) : (
              <span onClick={() => setSettings(true)}>
                <img
                  src="../../../edit.png "
                  className="w-4 hover:cursor-pointer"
                />
              </span>
            )}
            {/* Set to hidden, not active */}
            <img
              src="../../../hiddeninactive.png"
              className="w-6  hover:cursor-pointer"
            />
          </span>
        ) : null}
      </div>
      {/* If settings, show edit settings, if false show the thumbnails */}
      {settings ? (
        <CollectionSettings
          collectionTitle={props.collectionTitle}
          collectionDescription={collection?.description}
        />
      ) : (
        collection &&
        collection.map((work, idx) => {
          return (
            <Image
              key={idx}
              cloudName="jeffreywood"
              publicId={work.imgId}
              className="h-32 m-2 hover:cursor-pointer"
              id={props.collectionTitle}
              value={props.id}
              onClick={(e) => props.editHandler(e)}
            />
          );
        })
      )}
    </div>
  );
}
