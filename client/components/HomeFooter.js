import React from "react";

export default function HomeFooter() {
  const instagram = "";
  const email = "";
  const address = "";
  const youtube = "";
  return (
    <section
      className="homeFooter flex-col md:flex-row tracking-wider text-sm p-5"
      data-scroll-section
    >
      <ul className="space-y-4">
        <li className="text-lg ">
          <span className="text-neutral-500">Selected-Work</span>
        </li>
        <li className="">Log In</li>
        <li className="">Contact</li>
        <li className="">team@selected-work.com</li>
        <li className="">
          <a href="https://www.janeisidor.com" target="_blank">
            View Demo Site
          </a>
        </li>
        <li className="">
          <a href="https://github.com/JeffreyLWood/stackathon" target="_blank">
            View on GitHub
          </a>
        </li>
        <li>
          <span className="text-neutral-500">2022</span>
        </li>
      </ul>
    </section>
  );
}
