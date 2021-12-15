import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export const Work = (props) => {
  const dispatch = useDispatch();
  let user = {};

  useEffect(() => {
    console.log("props.match.params.username", props.match.params.username);
    user = dispatch(fetchUserData(props.match.params.username));
    console.log(user);
  }, []);

  return (
    <div>
      <Navbar data={props} user={user} />
    </div>
  );
};
