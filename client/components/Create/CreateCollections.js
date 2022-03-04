import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrimaryCollection,
  fetchSecondaryCollection,
  updateAboutText,
} from "../../store/create";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import {
  fetchSingleWork,
  fetchCollection,
  fetchAllWork,
} from "../../store/create";
import { DragDropContext } from "react-beautiful-dnd";
import CollectionColumn from "./CollectionColumn";

export default function CreateCollections(props) {
  let collections = useSelector((state) => state.create.collections);
  const dispatch = useDispatch();

  useEffect(() => {
    collections = dispatch(fetchAllWork(props.userId));
  }, []);

  const closeHandler = () => {
    props.setShowCollections(false);
  };

  const onDragEnd = () => {};

  if (!props.showCollections) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-collection flex justify-between">
            <h2>{props.displayName}</h2>
            <h2 onClick={closeHandler}>
              <img src="/icons8-close-16.png"></img>
            </h2>
          </div>
          {/* Modal Body */}
          <div className="min-h-full flex flex-col md:flex-row">
            <div className="w-3/6 min-h-full"></div>
            <CollectionColumn category={"Primary"} collections={collections} />
            <CollectionColumn
              category={"Secondary"}
              collections={collections}
            />
            <CollectionColumn category={"Hidden"} collections={collections} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
