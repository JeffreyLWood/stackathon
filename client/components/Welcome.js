import React from "react";
import { useState } from "react";
export default function Welcome() {
  let [titles, setTitles] = useState([
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
    // "Neo Rauch",
    "photographers",
    "ceramicists",
    "classical realists",
    "outsider artists",
    "pop-surrealists",
    "neo-impressionists",
    "watercolorists",
    "contemporary realists",
    "illustrators",
  ]);
  let random = Math.floor(Math.random() * titles.length);
  // let [numbers, setNumbers] = useState([])
  // useEffect(()=>{
  //   if(random Math.floor(Math.random() * titles.length));
  // }, [])
  let [title, setTitle] = useState(titles[random]);

  const changeTitle = () => {
    random = Math.floor(Math.random() * titles.length);
    setTimeout(() => {
      setTitle(titles[random]);
    }, 1500);
  };

  changeTitle();

  return (
    <section
      className="welcome  bg-cyan-900 justify-center"
      data-scroll-section
    >
      <div className="flex space-y-8 flex-col">
        <h2>Show Your Work Online</h2>
        <span className="text-5xl font-bold text-cyan-900">
          Premium Artist Websites
        </span>
        <div className="flex flex-row space-x-2">
          <span className="text-2xl sm:text-4xl text-white">Perfect for </span>

          <span className="text-2xl sm:text-4xl text-amber-300">{title}</span>
        </div>
        <img className="h-18 downarrow" src="downarrow.png" />
      </div>
    </section>
  );
}
