import React from "react";
import CollectionHidden from "./CollectionHidden";
export default function SnapshotToolbar(props) {
  return (
    <span className="mx-10 space-x-5 flex flex-row justify-between items-center">
      {/* View collections Not functional */}
      <span className="flex flex-row mr-20">
        <img
          src="../../../collectionactive.png"
          id="Collections"
          onClick={() => props.setShowCollections(true)}
          className="w-6 mx-2"
        />
        {/* Add a Work */}
        <img
          src="../../../newworkactive.png"
          onClick={(e) => props.addHandler(e)}
          id="Add a Work"
          className="w-6 mx-2"
        />
        {/* Add a Collection */}
        <img
          onClick={(e) => props.addCollection(e)}
          src="../../../newcollectionactive.png"
          id="New Collection"
          className="w-6 mx-2"
        />
      </span>
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
