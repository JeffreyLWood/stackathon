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
      <div className="h-90vh flex p-10 justify-center">
        <div>
          <Image cloudName="jeffreywood" publicId={imgId} />
        </div>
        <div>
          <textarea
            className="aboutText"
            type="readonly"
            cols="80"
            style={{ resize: "none" }}
            value={text}
          />
        </div>
      </div>
      <Footer user={user} />
    </>
  );
};
