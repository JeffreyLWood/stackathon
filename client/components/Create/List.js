import React from "react";
import CreateUploader from "./CreateUploader";
import Item from "./Item";
import { Draggable } from "react-beautiful-dnd";

export default function List(props) {
  // let collection = props.collection;

  let works;

  // useEffect(() => {
  //   works = dispatch(fetchAllWork(props.user.id);
  // }, []);
  if (!props.collection?.works) {
    return "Loading";
  }

  return (
    <div ref={props.innerRef}>
      <ul className="w-full flex">
        {props.collection
          ? props.collection.map((work, index) => {
              return (
                <li key={index} className="inline-block">
                  <Item
                    index={index}
                    innerRef={props.innerRef}
                    cloudName={props.cloudName}
                    publicId={work.imgId}
                    clickHandler={props.clickHandler}
                  />
                </li>
              );
            })
          : null}
        {/* {props.placeholder} */}
      </ul>

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
