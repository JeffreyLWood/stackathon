import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export const About = (props) => {
  let user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      user = await dispatch(fetchUserData(props.match.params.username));
    }
    fetchData();
  }, []);

  let text = user.about && user.about.text;
  // console.log("text", text);
  return (
    <div>
      <Navbar data={props} user={user} />
      <div className="grid grid-cols-12 grid-rows-6">
        <div className="row-start-3 row-span-6 col-start-3 col-end-10">
          {text}
        </div>
      </div>
    </div>
  );
};
