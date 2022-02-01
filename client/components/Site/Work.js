import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Artwork from "./Artwork";
import Footer from "./Footer";

export const Work = (props) => {
  //should load data from req.params not from store, for other users to view
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // let [user, setUser] = useState({});

  useEffect(() => {
    async function loadUserData() {
      let data = await dispatch(fetchUserData(props.match.params.username));

      // setUser(data);
      return data;
    }
    loadUserData();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="flex justify-between flex-wrap w-full">
        {user.works &&
          user.works.map((work, index) => {
            return <Artwork key={index} data={work} />;
          })}
      </div>

      <Footer />
    </>
  );
};
