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

  let [columns, setColumns] = useState({
    col1: { id: "col1", title: "Primary", collections: [] },
    col2: { id: "col2", title: "Secondary", collections: [] },
    col3: { id: "col3", title: "Hidden", collections: [] },
  });

  useEffect(() => {
    collections = dispatch(fetchAllWork(props.userId));
  }, []);

  useEffect(() => {
    let primary = [];
    let secondary = [];
    let hidden = [];
    for (let i = 0; i < collections.length; i++) {
      let category = collections[i].category;
      if (category === "Primary") {
        primary.push(collections[i]);
        setColumns({
          ...columns,
          col1: {
            ...columns.col1,
            collections: primary,
          },
        });
      }
    }
    console.log("columns", columns);
  }, [collections]);

  const closeHandler = () => {
    props.setShowCollections(false);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log("result", result);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = columns[source.droppableId];
    // newCollectionIds.splice(destination.index, 0, Number(draggableId));
    let newOrder = 0;
    let newCollection = {};
    for (let i = 0; i < column.collections.length; i++) {
      if (collections[i].title === draggableId) {
        newCollection = collections[i];
      }
    }
    if (source.index > destination.index) {
      newOrder = column.collections[destination.index].order - 1;
    }
    if (source.index < destination.index) {
      newOrder = column.collections[destination.index].order + 1;
    }

    newCollection.order = newOrder;

    const newColumn = {
      ...column,
      collections: column.collections.filter(
        (collection) => collection.title !== newCollection.title
      ),
    };
    newColumn.collections.push(newCollection);
    setColumns({ ...columns, [newColumn.id]: newColumn });
    console.log("columns", columns);
    console.log("newColumn", newColumn);
  };

  if (!props.showCollections) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="modal">
        <div className="modal-content p-2">
          <div className="modal-collection flex justify-between">
            <h2>{props.displayName}</h2>
            <h2 onClick={closeHandler}>
              <img src="/icons8-close-16.png"></img>
            </h2>
          </div>
          {/* Modal Body */}
          <div className="min-h-full flex flex-col md:flex-row">
            <div className="w-3/6 min-h-full"></div>
            <CollectionColumn
              category={"Primary"}
              column="col1"
              collections={columns.col1.collections}
            />
            <CollectionColumn
              category={"Secondary"}
              column="col2"
              collections={columns.col2.collections}
            />
            <CollectionColumn
              category={"Hidden"}
              column="col3"
              collections={columns.col3.collections}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
