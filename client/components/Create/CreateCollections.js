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
export default function CreateCollections(props) {
  let collections = useSelector((state) => state.create.collections);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     collections = dispatch(fetchAllWork(props.userId));
  //   }, []);

  const closeHandler = () => {
    props.setShowCollections(false);
  };

  if (!props.showCollections) {
    return null;
  }

  return (
    <div></div>
    // <div className="modal">
    //   <div className="modal-content">
    //     <div className="modal-collection flex justify-between">
    //       <h2>{props.displayName}</h2>
    //       <h2 onClick={closeHandler}>
    //         <img src="/icons8-close-16.png"></img>
    //       </h2>
    //     </div>
    //     {/* Modal Body */}
    //     <div className="h-full">
    //       <ul>
    //         {collections &&
    //           collections.map((collection, index) => (
    //             <li key={index}>{collection.title}</li>
    //           ))}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
}
