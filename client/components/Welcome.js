import React from "react";
import { useState } from "react";
export default function Welcome() {
  let titles = [
    "painters",
    "sculptors",
    "pastelists",
    "encaustic painters",
    "printmakers",
    "plein air painters",
    "draughstmen",
    "impressionists",
    "surrealists",
    "abstract expressionists",
    "neo-dadaists",
    "neo-expressionists",
    "Neo Rauch",
    "photographers",
    "ceramicists",
    "classical realists",
    "outsider artists",
    "pop-surrealists",
    "neo-impressionists",
    "watercolorists",
    "contemporary realists",
    "illustrators",
  ];
  let [title, setTitle] = useState(titles[0]);

  const changeTitle = () => {
    let random = Math.floor(Math.random() * titles.length);
    // if (typeof titles[random] === "object") {
    //   titles[random].map((title) =>
    //     setTimeout(function () {
    //       setTitle(title);
    //     }, 1500)
    //   );
    // }

    setTimeout(() => {
      setTitle(titles[random]);
    }, 1500);
  };

  changeTitle();

  return (
    <div className="welcome  bg-cyan-900 justify-center">
      <div className="flex space-y-8 flex-col">
        <h2>Show Your Work Online</h2>
        <span className="text-5xl font-bold text-cyan-900">
          Premium Artist Websites
        </span>
        <div className="flex flex-row space-x-2">
          <span className="text-4xl text-white">Perfect for </span>

          <span className="text-4xl text-amber-300">{title}</span>
        </div>
        <img className="h-18 downarrow" src="downarrow.png" />
      </div>
    </div>
  );
}
