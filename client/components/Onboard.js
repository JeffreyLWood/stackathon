import React from "react";

export default function Onboard() {
  return (
    <section className="container mt-10 flex-col md:flex-row">
      <div className="h-2/6 w-screen z-20 p-4 flex space-y-4 md:justify-center md:w-3/6 md:h-full flex-col">
        <span className="text-4xl">Putting Artists First</span>
        <ul className="text-lg sm:space-y-2">
          <li>Websites Designed Specifically for Artists</li>
          <li>No Advertising</li>
          <li>Custom Domains</li>
          <li>Free to Use</li>
          <li>
            <a href="https://www.selected-work.com/janeisidor" target="_blank">
              <button
                type="button"
                className="pill mr-4 my-4 hover:text-white z-20"
              >
                View Demo Site
              </button>
            </a>
            <a href="#auth">
              <button type="button" className="pillDark my-4 z-20">
                Get Started
              </button>
            </a>
          </li>
        </ul>
      </div>
      <div className="h-3/6 flex flex-row justify-between space-x-4 items-center md:h-full sm:w-3/6">
        <span className="flex  sm:items-center">
          <img
            src="mobile.png"
            className="phoneimg z-10 h-5/6 sm:absolute sm:h-2/6"
          />
        </span>
        <span className=" flex  sm:items-center">
          <img
            src="desktop.png"
            className="desktopimg h-5/6 sm:absolute sm:h-3/6 z-0"
          />
        </span>
      </div>
    </section>
  );
}
