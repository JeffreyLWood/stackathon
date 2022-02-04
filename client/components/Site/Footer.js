import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUserData } from "../../store/user";
export default function Footer(props) {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // let [userData, setUser] = useState(user);
  console.log("footer props", props);
  useEffect(() => {
    async function loadUserData() {
      await dispatch(fetchUserData(props.user.userName));
    }
    loadUserData();
  }, []);

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
    <div className="footer flex-row bg-neutral-100 font-light">
      <div>
        <ul className="">
          <li>{user.siteTitle}</li>
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
              <span className="font-medium mr-2">Location</span> {address}{" "}
            </li>
          ) : null}
        </ul>
      </div>
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
            <img src="../social/twitter.png" label="twitter" alt="twitter" />
          </a>
        ) : null}
        {email ? (
          <a href={`mailto:${email} `}>
            <img src="../social/email.png" alt="email" alt="email" />
          </a>
        ) : null}
        {youtube ? (
          <a href={youtube} target="_blank">
            <img src="../social/youtube.png" label="youtube" alt="youtube" />
          </a>
        ) : null}
        {linkedin ? (
          <a href={linkedin} target="_blank">
            <img src="../social/linkedin.png" label="linkedin" alt="linkedin" />
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
      <ul>
        <li>All Work and Images Copyright 2022</li>
      </ul>
    </div>
  );
}
