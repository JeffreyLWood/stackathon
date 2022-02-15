import React from "react";
import { Image } from "cloudinary-react";
import { Draggable } from "react-beautiful-dnd";
export default function Item(props) {
  return (
    // <Draggable
    //   draggableId={props.publicId}
    //   innerRef={props.innerRef}
    //   index={props.index}
    // >
    //   {(provided) => {

    <Image
      cloudName={props.cloudName}
      publicId={props.publicId}
      className="h-26 m-2"
      onClick={(e) => props.clickHandler(e)}
      // {...provided.draggableProps}
      // {...provided.dragHandleProps}
      // innerRef={provided.innerRef}
    />
  );
  // }}
  // </Draggable>
}
