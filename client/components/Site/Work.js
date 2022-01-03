import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
export const Work = (props) => {
  let user = useSelector((state) => state.auth);
  let worksData = useSelector((state) => state.user.works);

  const dispatch = useDispatch();
  let [works, setWorks] = useState(worksData);

  useEffect(() => {
    user = dispatch(fetchUserData(props.match.params.username));
  }, []);

  console.log("works", works);
  //from tutorial
  // const loadImages = async () => {
  //   try {
  //     const res = await fetch("/api/images");
  //     let data = await res.json();
  //     console.log("data", data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // loadImages();
  return (
    <div>
      <Navbar data={props} user={user} />
      <div>
        {works &&
          works.map((work, index) => {
            <Image
              key={index}
              cloudName="jeffreywood"
              publicId={work.imageId}
            />;
          })}
      </div>
    </div>
  );
};
