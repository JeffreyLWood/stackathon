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
  fetchCollection,
} from "../../store/create";
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
  let [state, setState] = useState({ sortedList: [] });
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

  if (!state.sortedList) {
    return null;
  } else {
    return (
      <div className="snapshot shadow-xl mx-2 p-2 sm:p-5 font-light">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span>
            <Select
              changeHandler={props.changeHandler}
              collectionTitle={props.collectionTitle}
              collections={props.collections}
              id={props.id}
              primary={props.primary}
              secondary={props.secondary}
              settings={settings}
              userId={props.userId}
            />
          </span>
          {props.id === "primary" ? (
            <span>
              <SnapshotToolbar
                id={props.id}
                settings={settings}
                setSettings={setSettings}
                primary={props.primary}
                userId={props.userId}
                setShowCollections={props.setShowCollections}
                addHandler={props.addHandler}
                addCollection={props.addCollection}
              />
            </span>
          ) : null}
        </div>
        {/* If settings, show CollectionSettings, if false show the thumbnails (ListManager) */}
        {settings ? (
          <CollectionSettings
            collections={props.collections}
            collectionTitle={props.collectionTitle}
            collectionDescription={collection?.description}
            userId={props.userId}
            changeHandler={props.changeHandler}
            setSettings={setSettings}
            setPrimary={props.setPrimary}
          />
        ) : collection?.length ? (
          <div className="w-full h-content flex flex-wrap">
            <ListManager
              items={state.sortedList}
              direction="horizontal"
              maxItems={props.id === "primary" ? 4 : 2}
              render={(work) => (
                <Image
                  cloudName="jeffreywood"
                  publicId={work.imgId}
                  className="h-16 sm:h-24 m-2 md:h-36 md:m-4 hover:cursor-pointer"
                  id={props.collectionTitle}
                  value={props.id}
                  onClick={(e) => props.editHandler(e)}
                />
              )}
              onDragEnd={reorderList}
            />
          </div>
        ) : props.collectionTitle === "Hidden" ? (
          <div className="py-6 italic text-neutral-400">
            Works you have marked as hidden will appear here and not be visible
            on your site
          </div>
        ) : (
          <div className="py-6  flex flex-row">
            <span className="italic text-neutral-400">
              Collection is empty. Click
            </span>
            <span>
              <img
                src="../../../newworkactive.png"
                onClick={(e) => props.addHandler(e)}
                id="Add a Work"
                className="w-6 mx-2 hover:cursor-pointer"
                title="Add a Work"
              />
            </span>
            <span className="italic text-neutral-400"> to add a work.</span>
          </div>
        )}
      </div>
    );
  }
}
