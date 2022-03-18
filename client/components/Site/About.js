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
  let json = JSON.stringify(text);
  const newText =
    text &&
    text.split("\n").map((str, idx) => (
      <p key={idx}>
        {str}
        <br />
      </p>
    ));
  let imgId = user.about && user.about.imgId;
  return (
    <>
      <Navbar user={user} />
      <div className="font-light h-full md:h-90vh m-10 flex flex-col items-start justify-center sm:py-10 sm:flex-row md:justify-start">
        <div className="w-full flex justify-center pb-4 sm:pb-0 sm:w-3/6 sm:h-full ">
          <Image
            cloudName="jeffreywood"
            publicId={imgId}
            className="flex w-96"
          />
        </div>
        <div className="w-full h-full flex flex-col text-sm leading-8 sm:w-3/6 sm:pr-10">
          {newText}
        </div>
      </div>
      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
