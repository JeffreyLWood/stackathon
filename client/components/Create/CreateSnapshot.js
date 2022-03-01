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
import Select from "./Select";
import SnapshotToolbar from "./SnapshotToolbar";

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

  // Load Collection Data
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
  // Reload Collection Data when Settings Toggles
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
  }, [settings]);

  // Drag and Drop Functionality _______________*
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
  // Drag and Drop Functionality End ----------- *

  let [hidden, setHidden] = useState(collection?.hidden);

  const hiddenHandler = (e) => {
    e.preventDefault();
    setHidden(hidden ? false : true);
    dispatch(hiddenCollection(props.userId, props.collectionTitle, hidden));
  };

  if (!state.sortedList) {
    return null;
  } else {
    return (
      <div className="snapshot h-full border-2 border-gray-200 mx-2 p-5 font-light">
        <div className="flex items-center flex-row">
          <Select
            changeHandler={props.changeHandler}
            collectionTitle={props.collectionTitle}
            collections={props.collections}
            id={props.id}
            primary={props.primary}
            secondary={props.secondary}
            settings={settings}
          />
          {props.id === "primary" ? (
            <SnapshotToolbar
              id={props.id}
              settings={settings}
              setSettings={setSettings}
              hiddenHandler={hiddenHandler}
              hidden={hidden}
            />
          ) : null}
        </div>
        {/* If settings, show CollectionSettings, if false show the thumbnails (ListManager) */}
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
