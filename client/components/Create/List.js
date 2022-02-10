import React from "react";
import CreateUploader from "./CreateUploader";
import Item from "./Item";
import { Draggable } from "react-beautiful-dnd";
export default function List(props) {
  console.log("list props", props);
  return (
    <div
      ref={props.innerRef}
      className="snapshot border-2 border-gray-300 flex flex-wrap justify-around mx-2 p-1"
    >
      {props.works &&
        props.works.map((work, index) => {
          return (
            <Item
              key={index}
              index={index}
              innerRef={props.innerRef}
              cloudName={props.cloudName}
              publicId={work.imgId}
              clickHandler={props.clickHandler}
            />
          );
        })}

      <CreateUploader
        displayName={props.displayName}
        show={props.show}
        setShow={props.setShow}
        imgId={props.imgId}
        user={props.user}
      />
    </div>
  );
}
