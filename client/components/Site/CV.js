import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
export const CV = (props) => {
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      user = await dispatch(fetchUserData(props.match.params.username));
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="h-90vh">cv here</div>
      <Footer user={user} />
    </>
  );
};
