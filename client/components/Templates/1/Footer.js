import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  let user = useSelector((state) => state.user);

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
    <div className="bg-stone-100 footer flex-col md:flex-row font-light tracking-wider text-sm">
      <div className="mr-10">
        <ul>
          <li className="uppercase tracking-wider text-lg">{user.siteTitle}</li>
          <li>
            <a href={`/${user.username}`} className="hover:text-zinc-800">
              Work
            </a>
          </li>
          <li>
            <a href={`/${user.username}/about`} className="hover:text-zinc-800">
              About
            </a>
          </li>
          <li>
            <a
              href={`/${user.username}/contact`}
              className="hover:text-zinc-800"
            >
              Contact
            </a>
          </li>
          <li>
            <a href={`/${user.username}/cv`} className="hover:text-zinc-800">
              CV
            </a>
          </li>
          <li>All Work and Images Copyright 2022</li>
        </ul>
      </div>
      <div>
        <ul>
          {address ? <li className="font-medium">{address}</li> : null}
          <li>
            <span className="font-medium mr-2">Email</span>
            <a href={{ mailto: { email } }} className="hover:text-zinc-800">
              {email}
            </a>
          </li>
          {phone ? (
            <li>
              <span className="font-medium mr-2">Tel</span> {phone}
            </li>
          ) : null}
          <li>
            <div className="w-full items-start flex flex-row">
              {instagram ? (
                <a href={instagram} target="_blank">
                  <img className="w-6 mx-1" src="../social/instagram.png" />
                </a>
              ) : null}
              {facebook ? (
                <a href={facebook} target="_blank">
                  <img className="w-6 mx-1" src="../social/facebook.png" />
                </a>
              ) : null}
              {twitter ? (
                <a href={twitter} target="_blank">
                  <img className="w-6 mx-1" src="../social/twitter.png" />
                </a>
              ) : null}
              {email ? (
                <a href={`mailto:${email} `}>
                  <img className="w-6 mx-1" src="../social/email.png" />
                </a>
              ) : null}
              {youtube ? (
                <a href={youtube} target="_blank">
                  <img className="w-6 mx-1" src="../social/youtube.png" />
                </a>
              ) : null}
              {linkedin ? (
                <a href={linkedin} target="_blank">
                  <img className="w-6 mx-1" src="../social/linkedin.png" />
                </a>
              ) : null}
              {etsy ? (
                <a href={etsy} target="_blank">
                  <img className="w-6 mx-1" src="../social/etsy.png" />
                </a>
              ) : null}
              {pinterest ? (
                <a href={pinterest} target="_blank">
                  <img className="w-6 mx-1" src="../social/pinterest.png" />
                </a>
              ) : null}
              {tiktok ? (
                <a href={tiktok} target="_blank">
                  <img className="w-6 mx-1" src="../social/tiktok.png" />
                </a>
              ) : null}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
