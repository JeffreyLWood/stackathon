import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Artwork from "./Artwork";
import Footer from "./Footer";
import { fetchCollection } from "../../store/user";
export const Work = (props) => {
  //should load data from req.params not from store, for other users to view
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // let [user, setUser] = useState({});
  let collection = useSelector((state) => state.user?.collection);

  useEffect(() => {
    user = dispatch(
      fetchUserData("jeffreywood", props.match.params.collection)
    );
  }, []);

  useEffect(() => {
    collection = dispatch(
      fetchCollection("jeffreywood", props.match.params.collection)
    );
  }, []);

  console.log("props", props);

  return (
    <>
      <Navbar user={user} />
      <div className="flex justify-between flex-wrap w-full h-90vh">
        {collection &&
          collection.map((work, index) => {
            return <Artwork key={index} data={work} user={user} />;
          })}
      </div>

      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
