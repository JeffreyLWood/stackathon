import React from "react";

export default function Footer(props) {
  return (
    <div className="footer flex-row bg-neutral-100 font-light">
      <ul>
        <li>Instagram</li>
        <li>Facebook</li>
        <li>LinkedIn</li>
        <li>Email</li>
      </ul>
      <ul>
        <li className="">{props.user.siteTitle}</li>
        <li>New York City</li>
        <li>All Work and Images Copyright 2022</li>
      </ul>
    </div>
  );
}
