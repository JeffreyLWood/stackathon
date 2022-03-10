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
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
const CollectionList = styled.div`
  background-color: ${(props) =>
    props.isDraggingOver ? "rgb(245 245 245)" : "#fff"};
  padding: 0.5rem;
  transition: background-color 0.2s ease-in;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 1rem;
`;
import CollectionDraggable from "./CollectionDraggable";
export default function CollectionColumn(props) {
  return (
    <div className="border-l-2 border-neutral-100 p-2 m-2 h-36 md:h-96 md:w-3/12">
      <span className="ml-2">{props.category}</span>
      <Droppable droppableId={props.column}>
        {(provided, snapshot) => (
          <CollectionList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.collections &&
              props.collections
                .sort((a, b) => a.order - b.order)
                .map((collection, index) => (
                  <CollectionDraggable
                    key={collection.id}
                    id={collection.id}
                    collectionTitle={collection.title}
                    index={index}
                  />
                ))}

            {provided.placeholder}
          </CollectionList>
        )}
      </Droppable>
    </div>
  );
}
