import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
export const Contact = (props) => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadUserData() {
      let data = await dispatch(fetchUserData(props.match.params.username));
      return data;
    }
    loadUserData();
  }, []);
  let text = user.contact && user.contact.text;
  let email = user.contact && user.contact.email;
  let socialMedia = user.contact && user.contact.socialMedia;
  let imgId = user.contact && user.contact.imgId;
  return (
    <>
      <Navbar user={user} />
      <div className="font-light h-full m-10 flex flex-col items-start justify-center sm:p-10 sm:flex-row md:h-90vh md:justify-start">
        <div className="w-full flex flex-col mb-5 pr-4 sm:w-2/6">
          <span className="siteTitle mb-5">Get in Touch</span>
          <p>{text}</p>
          <ul className="mt-2 space-y-2">
            <li>
              <a href={{ mailto: { email } }}>{email}</a>
            </li>
            <li>
              <a href={socialMedia}>{socialMedia}</a>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col space-y-2 sm:w-4/6 sm:pr-10 sm:pl-10">
          <form className="contact block">
            <label htmlFor="name">Name: *</label>
            <input required className="w-3/6" name="name" type="text" />
            <label htmlFor="email">Email: *</label>
            <input required className="w-3/6" name="email" type="email" />
            <label htmlFor="subject">Subject: *</label>
            <input required className="w-3/6" name="subject" type="text" />
            <label htmlFor="message">Message: *</label>
            <textarea
              rows="5"
              style={{ resize: "none" }}
              name="message"
              type="text"
              className="w-full"
            />
            <label htmlFor="emailList">Subscribe to Email List:</label>
            <input name="emailList" type="checkbox" />
            <button type="submit" className="pill" value="Submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer user={user} />
    </>
  );
};
