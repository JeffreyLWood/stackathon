import React from "react";
import CollectionHidden from "./CollectionHidden";
export default function SnapshotToolbar(props) {
  return (
    <span className="sm:mx-10 sm:space-x-5 mx-auto flex sm:flex-row justify-between items-center">
      {/* View collections Not functional */}
      <span className="flex flex-row py-2">
        <img
          src="../../../collectionactive.png"
          id="Collections"
          onClick={() => props.setShowCollections(true)}
          className="w-6 mx-2 hover:cursor-pointer"
          title="Collections"
        />
        {/* Add a Work */}
        <img
          src="../../../newworkactive.png"
          onClick={(e) => props.addHandler(e)}
          id="Add a Work"
          className="w-6 mx-2 hover:cursor-pointer"
          title="Add a Work"
        />
        {/* Add a Collection */}
        <img
          onClick={(e) => props.addCollection(e)}
          src="../../../newcollectionactive.png"
          id="New Collection"
          className="w-6 mx-2 hover:cursor-pointer"
          title="New Collection"
        />
      </span>
      <span className="flex flex-row space-x-2">
        {props.settings ? (
          <span onClick={() => props.setSettings(false)}>
            <img
              src="../../../collection.png"
              className="w-4 mx-2 hover:cursor-pointer"
              title="Works"
            />
          </span>
        ) : (
          <span onClick={() => props.setSettings(true)}>
            <img
              src="../../../edit.png "
              className="w-4 mx-2 hover:cursor-pointer"
              title="Edit Collection"
            />
          </span>
        )}
        <CollectionHidden
          userId={props.userId}
          collection={props.collectionTitle}
          primary={props.primary}
        />
      </span>
    </span>
  );
}
