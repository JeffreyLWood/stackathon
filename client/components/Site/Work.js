import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
export const Work = (props) => {
  let user = useSelector((state) => state.auth);

  console.log(props);
  const dispatch = useDispatch();
  const [imageIds, setImageIds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      user = await dispatch(fetchUserData(props.match.params.username));
    }
    fetchData();
  }, []);

  console.log("user", user);
  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      let data = await res.json();
      setImageIds(["data"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div>
      <Navbar data={props} user={user} />
      <div>
        {imageIds &&
          imageIds.map((imageId, index) => {
            <Image key={index} cloudName="jeffreywood" publicId={imageId} />;
          })}
      </div>
    </div>
  );
};
