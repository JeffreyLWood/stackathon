import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAboutText } from "../../store/create";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../store/user";
export default function Snapshot(props) {
  const dispatch = useDispatch();

  console.log("snapshot", props.works);

  return (
    <div>
      //add a work modal //snapshot of works on view
      <div className="flex w-1/6 h-1/6 overflow-scroll border-2 border-gray-400">
        test
      </div>
      //snapshot of hidden works
    </div>
  );
}
