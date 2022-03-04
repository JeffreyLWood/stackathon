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
import { Draggable } from "react-beautiful-dnd";

export default function CollectionDraggable(props) {
  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white my-2 border-2 text-sm p-1 border-neutral-100 hover:border-indigo-400"
        >
          {props.collectionTitle}
        </div>
      )}
    </Draggable>
  );
}
