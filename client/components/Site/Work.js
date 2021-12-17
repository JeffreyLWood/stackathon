import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "cloudinary-react";
export const Work = (props) => {
  let user = useSelector((state) => state.user);
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      user = await dispatch(fetchUserData(props.match.params.username));
    }
    fetchData();
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
