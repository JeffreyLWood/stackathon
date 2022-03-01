import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import CollectionSettings from "./CollectionSettings";
import { ListManager } from "react-beautiful-dnd-grid";
import {
  fetchPrimaryCollection,
  fetchSecondaryCollection,
  reorder,
  hiddenCollection,
} from "../../store/create";
// import { Draggable, Droppable } from "react-beautiful-dnd";
// import List from "./List";
// import Item from "./Item";

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

  let [state, setState] = useState({ sortedList: [] });

  useEffect(() => {
    const load = async () => {
      collection =
        props.id === "primary"
          ? await dispatch(
              fetchPrimaryCollection(props.userId, props.collectionTitle)
            )
          : await dispatch(
              fetchSecondaryCollection(props.userId, props.collectionTitle)
            );
    };
    try {
      load();
    } catch (error) {
      console.log(error);
    }
  }, [props.collectionTitle]);

  useEffect(() => {
    try {
      setState({ sortedList: collection });
    } catch (error) {
      console.log(error);
    }
  }, [collection]);

  const sortList = (list) => {
    setState({
      sortedList: list
        .slice()
        .sort((first, second) => first.order - second.order),
    });

    dispatch(
      reorder(props.userId, props.collectionTitle, state.sortedList, props.id)
    );
  };

  const reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = state.sortedList;
    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1;
      sortList(list);
      return;
    }
    if (destinationIndex === list.length - 1) {
      list[sourceIndex].order = list[list.length - 1].order + 1;
      sortList(list);
      return;
    }
    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order =
        (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
      sortList(list);
      return;
    }
    list[sourceIndex].order =
      (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
    sortList(list);
  };

  const hiddenHandler = (e) => {
    e.preventDefault();
    let toggle = collection.hidden ? false : true;
    dispatch(hiddenCollection(props.userId, props.collectionTitle, toggle));
  };

  if (!state.sortedList) {
    return null;
  } else {
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
                onClick={(e) => hiddenHandler(e)}
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
            userId={props.userId}
            changeHandler={props.changeHandler}
            setSettings={setSettings}
          />
        ) : collection?.length ? (
          <ListManager
            items={state.sortedList}
            direction="horizontal"
            maxItems={props.id === "primary" ? 4 : 2}
            render={(work) => (
              <Image
                cloudName="jeffreywood"
                publicId={work.imgId}
                className="h-32 m-6 hover:cursor-pointer"
                id={props.collectionTitle}
                value={props.id}
                onClick={(e) => props.editHandler(e)}
              />
            )}
            onDragEnd={reorderList}
          />
        ) : (
          "Collection is empty"
        )}
      </div>
    );
  }
}
