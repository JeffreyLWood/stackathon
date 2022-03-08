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
  reorderWholeCollections,
} from "../../store/create";
import { DragDropContext } from "react-beautiful-dnd";
import CollectionColumn from "./CollectionColumn";

export default function CreateCollections(props) {
  let collections = useSelector((state) => state.create.collections);
  const dispatch = useDispatch();

  let [columns, setColumns] = useState({
    col1: { id: "col1", title: "Primary", collections: [] },
    col2: { id: "col2", title: "Secondary", collections: [] },
  });

  useEffect(() => {
    collections = dispatch(fetchAllWork(props.userId));
  }, []);

  useEffect(() => {
    let primary = [];
    let secondary = [];

    console.log("columns", columns);
    for (let i = 0; i < collections.length; i++) {
      let category = collections[i].category;
      if (collections[i].category === "Secondary") {
        console.log("secondary", secondary);
        secondary.push(collections[i]);
        setColumns({
          ...columns,
          col2: {
            ...columns.col2,
            collections: secondary,
          },
          col1: {
            ...columns.col1,
            collections: primary,
          },
        });
      }
      if (category === "Primary") {
        primary.push(collections[i]);
        setColumns({
          ...columns,
          col2: {
            ...columns.col2,
            collections: secondary,
          },
          col1: {
            ...columns.col1,
            collections: primary,
          },
        });
      }
    }
  }, [collections]);

  const closeHandler = () => {
    props.setShowCollections(false);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    // newCollectionIds.splice(destination.index, 0, Number(draggableId));
    if (start === finish) {
      let newOrder = 0;
      let newCollection = {};
      for (let i = 0; i < start.collections.length; i++) {
        if (collections[i].title === draggableId) {
          newCollection = collections[i];
        }
      }
      if (source.index > destination.index) {
        newOrder = start.collections[destination.index].order - 0.5;
      }
      if (source.index < destination.index) {
        newOrder = start.collections[destination.index].order + 0.5;
      }

      newCollection.order = newOrder;

      const newColumn = {
        ...start,
        collections: start.collections.filter(
          (collection) => collection.title !== newCollection.title
        ),
      };
      newColumn.collections.push(newCollection);
      setColumns({ ...columns, [newColumn.id]: newColumn });
      dispatch(reorderWholeCollections(props.userId, newCollection, false));
    } else {
      let newCollection = {};
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].title === draggableId) {
          newCollection = collections[i];
        }
      }

      const startColumn = {
        ...start,
        collections: start.collections.filter(
          (collection) => collection.title !== newCollection.title
        ),
      };
      const finishColumn = {
        ...finish,
        collections: [...finish.collections, newCollection],
      };

      setColumns({
        [startColumn.id]: startColumn,
        [finishColumn.id]: finishColumn,
      });

      dispatch(reorderWholeCollections(props.userId, newCollection, true));
    }
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
            {/* <CollectionColumn
              category={"Hidden"}
              column="col3"
              collections={columns.col3.collections}
            /> */}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
