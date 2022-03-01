import React from "react";

export default function SnapshotToolbar(props) {
  return (
    <span className="mx-10 space-x-5 flex flex-row items-end">
      {props.settings ? (
        <span onClick={() => props.setSettings(false)}>
          <img
            src="../../../collection.png"
            className="w-4 hover:cursor-pointer"
          />
        </span>
      ) : (
        <span onClick={() => props.setSettings(true)}>
          <img src="../../../edit.png " className="w-4 hover:cursor-pointer" />
        </span>
      )}

      <img
        onClick={(e) => props.hiddenHandler(e)}
        src={
          props.hidden
            ? "../../../hiddenactive.png"
            : "../../../hiddeninactive.png"
        }
        className="w-6  hover:cursor-pointer"
      />
    </span>
  );
}
