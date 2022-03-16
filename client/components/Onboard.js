import React from "react";

export default function Onboard() {
  return (
    <section className="container flex-col md:flex-row" data-scroll-section>
      <div className="h-3/6 flex flex-wrap sm:justify-center sm:w-3/6 sm:h-full sm:flex-col">
        <span className="text-2xl sm:pb-5">Putting Artists First</span>
        <ul className="text-lg sm:space-y-2">
          <li>Custom Templates</li>
          <li>Designed Specifically for Artists</li>
          <li>No Advertising</li>
          <li>Custom Domains</li>
          <li>Free to Use</li>
          <li>
            <button type="button" className="pillDark my-4">
              Get Started
            </button>
          </li>
        </ul>
      </div>
      <div className="h-3/6 flex flex-row justify-between space-x-4 items-start sm:items-center sm:h-full sm:w-3/6">
        <span className="h-full flex items-center">
          <img
            src="phonescreenshot.png"
            className="phoneimg z-10 h-3/6 sm:absolute sm:h-2/6"
          />
        </span>
        <span className="h-full flex items-center">
          <img
            src="desktopscreenshot.png"
            className="desktopimg h-4/6 sm:absolute sm:h-3/6"
          />
        </span>
      </div>
    </section>
  );
}
