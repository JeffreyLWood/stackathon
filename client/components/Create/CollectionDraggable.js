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
import styled from "styled-components";
const Container = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.isDragging ? "rgb(129 140 248)" : "rgb(245 245 245)"};
`;
export default function CollectionDraggable(props) {
  return (
    <Draggable draggableId={props.collectionTitle} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className="bg-white my-2 px-2 text-sm p-1 "
        >
          {props.collectionTitle}
        </Container>
      )}
    </Draggable>
  );
}
