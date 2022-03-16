import React from "react";

export default function Onboard() {
  return (
    <section className="container" data-scroll-section>
      <div className="w-3/6 flex h-full justify-center flex-col">
        <span className="text-2xl pb-5">Putting Artists First</span>
        <ul className="space-y-2 text-lg">
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
      <div className="w-3/6 h-full flex flex-row items-center">
        <img src="phonescreenshot.png" className="h-2/6 z-10 phoneimg" />
        <img src="desktopscreenshot.png" className="desktopimg h-3/6" />
      </div>
    </section>
  );
}
