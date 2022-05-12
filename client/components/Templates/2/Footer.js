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
  return <div>Footer</div>;
}
