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

  let header = user.about && user.about.header;
  let jsonHeader = JSON.stringify(header);
  const newHeader =
    header &&
    header.split("--").map((str, idx) =>
      idx === 0 ? (
        <p key={idx} className="italic text-neutral-400">
          {str}
        </p>
      ) : (
        <p key={idx} className="text-right text-sm mt-2  text-neutral-500">
          -{str}
        </p>
      )
    );

  let caption = user.about && user.about.caption;
  let imgId = user.about && user.about.imgId;
  return (
    <>
      <Navbar user={user} />
      <div className="font-light min-h-90vh flex flex-col items-start my-10 sm:mx-10 sm:my-20 md:flex-row md:justify-center">
        <div className="w-full flex justify-center flex-col pb-4 sm:pb-0 sm:w-3/6 sm:h-full">
          <span className="w-full sm:h-96 flex justify-center">
            <figure>
              <Image
                cloudName="jeffreywood"
                publicId={imgId}
                className="flex object-contain sm:max-w-lg aboutImage px-2 sm:px-0 sm:mx-auto"
              />
              <figcaption className="text-sm mt-2 italic text-neutral-400 text-center">
                {caption}
              </figcaption>
            </figure>
          </span>
        </div>

        <div className="w-full h-full flex flex-col px-2 text-sm leading-8 sm:w-3/6">
          {newHeader ? (
            <span className="border-l-2 border-r-2 mb-6 mx-auto tracking-widest w-4/6 sm:w-full px-4 h-full flex flex-col text-lg leading-8">
              {newHeader}
            </span>
          ) : null}
          {newText}
        </div>
      </div>
      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
