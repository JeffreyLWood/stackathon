import React from "react";
import CollectionHidden from "./CollectionHidden";
export default function SnapshotToolbar(props) {
  return (
    <span className="mx-10 space-x-5 flex flex-row items-center">
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
      <CollectionHidden
        userId={props.userId}
        collection={props.collectionTitle}
        primary={props.primary}
      />
    </span>
  );
}
