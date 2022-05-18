import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CVGroup from "./CVGroup";
import { gsap } from "gsap";
import useQ from "../../../useQ";
export default function CV(props) {
  let user = useSelector((state) => state.user);
  let cv = user?.cv;
  let [q, ref] = useQ();

  return (
    <div
      ref={ref}
      className="h-80vh w-screen px-2 pt-16 sm:mx-0 w-full flex flex-col md:pt-32 pb-20"
    >
      {cv &&
        cv.map((category) => (
          <CVGroup
            key={category.title}
            title={category.title}
            data={category.data}
          />
        ))}
    </div>
  );
}
