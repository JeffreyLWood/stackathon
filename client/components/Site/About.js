import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Footer } from "./Footer";
export const About = (props) => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadUserData() {
      let data = await dispatch(fetchUserData(props.match.params.username));
      return data;
    }
    loadUserData();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div>
        <div className="grid grid-cols-12 grid-rows-6">
          <div className="row-start-3 row-span-6 col-start-3 col-end-10">
            {user.about && user.about.text}
          </div>
        </div>
      </div>
    </>
  );
};
