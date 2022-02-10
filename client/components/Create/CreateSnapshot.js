import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
import { Image } from "cloudinary-react";
import CreateUploader from "./CreateUploader";
import { fetchAllWork } from "../../store/create";
import { Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";
import Item from "./Item";
export default function CreateSnapshot(props) {
  // still not triggering refresh when a user changes an image of a work or adds a new work
  let user = props.user;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   user = dispatch(fetchUserData(user.username));
  // }, []);

  let [show, setShow] = useState(false);
  let [displayName, setDisplayName] = useState("");
  let [imgId, setImgId] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setDisplayName(e.target.value);
    setShow(true);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setDisplayName("Edit Work");
    let imgId = e.target.src.split("/").slice(-1).join();
    setImgId(imgId);
    setShow(true);
  };

  return (
    <Droppable droppableId={props.id} innerRef={props.innerRef}>
      {(provided) => (
        <List
          id={props.id}
          innerRef={provided.innerRef}
          {...provided.droppableProps}
          works={props.works}
          displayName={props.displayName}
          show={props.show}
          setShow={props.setShow}
          user={props.user}
          innerRef={provided.innerRef}
          cloudName="jeffreywood"
          clickHandler={props.clickHandler}
        >
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}
