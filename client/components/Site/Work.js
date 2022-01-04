import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Artwork from "./Artwork";
export const Work = (props) => {
  let user = useSelector((state) => state.auth);
  let worksData = useSelector((state) => state.user.works);

  const dispatch = useDispatch();
  let [works, setWorks] = useState(worksData);

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  return (
    <div>
      <Navbar data={props} user={user} />
      <div className="flex justify-center flex-wrap w-full">
        {works &&
          works.map((work, index) => {
            return <Artwork key={index} data={work} />;
          })}
      </div>
    </div>
  );
};
