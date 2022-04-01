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
        <li className="">
          <a href="#auth">Log In</a>
        </li>

        <li className="">
          <a href="mailto:team@selected-work.com">team@selected-work.com</a>
        </li>
        <li className="">
          <a href="https://www.selected-work.com/janeisidor" target="_blank">
            View Demo Site
          </a>
        </li>
        <li className="">
          <a href="https://github.com/JeffreyLWood/stackathon" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          <span className="text-neutral-500">2022</span>
        </li>
      </ul>
    </section>
  );
}
