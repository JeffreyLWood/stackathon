import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import { Image } from "cloudinary-react";
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

  let text = user.about && user.about.text;

  let imgId = user.about && user.about.imgId;
  return (
    <>
      <Navbar user={user} />
      <div className="h-90vh sm:p-10 m-10 flex flex-wrap justify-center md:justify-start bg-slate-200">
        <div className="h-3/6 sm:w-2/6 w-full bg-red-100 flex justify-center">
          <Image
            cloudName="jeffreywood"
            publicId={imgId}
            className="object-contain my-5 sm:my-0 sm:mx-5"
          />
        </div>
        <div className="w-full h-full sm:w-4/6 bg-green-100">{text}</div>
      </div>
      <Footer user={user} />
    </>
  );
};
