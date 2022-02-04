import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
export const Contact = (props) => {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // let [userData, setUser] = useState(user);

  console.log("contact props", props);
  useEffect(() => {
    async function loadUserData() {
      await dispatch(fetchUserData(props.match.params.username));
    }
    loadUserData();
  }, []);

  let text = user.contact && user.contact.text;
  let email = user.contact && user.contact.email;
  let instagram = user.contact && user.contact.instagram;
  let address = user.contact && user.contact.address;
  let phone = user.contact && user.contact.phone;
  let facebook = user.contact && user.contact.facebook;
  let youtube = user.contact && user.contact.youtube;
  let twitter = user.contact && user.contact.twitter;
  let pinterest = user.contact && user.contact.pinterest;
  let linkedin = user.contact && user.contact.linkedin;
  let etsy = user.contact && user.contact.etsy;
  let tiktok = user.contact && user.contact.tiktok;

  return (
    <>
      <Navbar user={user} />
      <div className="font-light text-sm leading-8 h-full m-10 flex flex-col items-start justify-center sm:px-10 sm:py-5git  sm:flex-row md:h-90vh md:justify-start">
        <div className="w-full flex flex-col mb-5 pr-4 sm:w-2/6">
          <span className="siteTitle mb-5">Get in Touch</span>
          {text ? <p>{text}</p> : null}
          <ul className="mt-2 space-y-2">
            <li>
              <span className="font-medium mr-2">Email</span>
              <a href={{ mailto: { email } }}>{email}</a>
            </li>
            {phone ? (
              <li>
                <span className="font-medium mr-2">Tel</span> {phone}
              </li>
            ) : null}
            {address ? (
              <li>
                <p>
                  <span className="font-medium mr-2">Location</span> {address}{" "}
                </p>
              </li>
            ) : null}
          </ul>
          <div className="pt-4 social flex flex-wrap">
            {instagram ? (
              <a href={instagram} target="_blank">
                <img
                  src="../social/instagram.png"
                  label="instagram"
                  alt="instagrram"
                />
              </a>
            ) : null}
            {facebook ? (
              <a href={facebook} target="_blank">
                <img
                  src="../social/facebook.png"
                  label="facebook"
                  alt="faceboook"
                />
              </a>
            ) : null}
            {twitter ? (
              <a href={twitter} target="_blank">
                <img
                  src="../social/twitter.png"
                  label="twitter"
                  alt="twitter"
                />
              </a>
            ) : null}
            {email ? (
              <a href={`mailto:${email} `}>
                <img src="../social/email.png" alt="email" alt="email" />
              </a>
            ) : null}
            {youtube ? (
              <a href={youtube} target="_blank">
                <img
                  src="../social/youtube.png"
                  label="youtube"
                  alt="youtube"
                />
              </a>
            ) : null}
            {linkedin ? (
              <a href={linkedin} target="_blank">
                <img
                  src="../social/linkedin.png"
                  label="linkedin"
                  alt="linkedin"
                />
              </a>
            ) : null}
            {etsy ? (
              <a href={etsy} target="_blank">
                <img src="../social/etsy.png" alt="etsy" alt="etsy" />
              </a>
            ) : null}
            {pinterest ? (
              <a href={pinterest} target="_blank">
                <img
                  src="../social/pinterest.png"
                  alt="pinterest"
                  label="pinterest"
                />
              </a>
            ) : null}
            {tiktok ? (
              <a href={tiktok} target="_blank">
                <img src="../social/tiktok.png" alt="tiktok" label="tiktok" />
              </a>
            ) : null}
          </div>
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

      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
