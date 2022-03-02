import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Artwork from "./Artwork";
import Footer from "./Footer";
import { fetchCollection } from "../../store/user";
export const Work = (props) => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(props?.location.pathname));
  }, []);

  // let collection = user?.collections[0];

  return (
    <>
      <Navbar user={user} />
      <div className="flex justify-between flex-wrap w-full h-90vh">
        {/* {collection &&
          collection.map((work, index) => {
            return <Artwork key={index} data={work} user={user} />;
          })} */}
      </div>

      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
