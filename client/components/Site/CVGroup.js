import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function CVGroup(props) {
  return (
    <>
      <div className="pageTitle text-gray-500 mb-6 md:ml-40">{props.title}</div>

      <ul className="font-light text-xs tracking-wider flex flex-col w-full mb-4 sm:text-sm md:ml-40 md:w-5/6">
        {props.data &&
          props.data.map((line, index) => {
            let data = line.split(",");
            return (
              <li className="grid grid-cols-12 grid-rows-2 w-full" key={index}>
                <span
                  id="date"
                  className="col-span-2 row-span-1 row-span-1 text-gray-500"
                >
                  {data[0]}
                </span>
                <div className="col-span-7 row-span-1  mr-2">
                  {
                    <>
                      <span id="place" className="font-medium text-gray-600">
                        {data[1]},
                      </span>
                      <span id="title" className="italic">
                        {data[2]}
                      </span>
                    </>
                  }
                </div>
                <span id="location" className="col-span-3 row-span-1">
                  {data[3]}
                </span>
                {data[4] ? (
                  <span
                    id="link"
                    className="row-start-2 row-span-1 col-start-3 col-span-7 underline"
                  >
                    <a href={data[4]}>{data[4]}</a>
                  </span>
                ) : null}
              </li>
            );
          })}
      </ul>
    </>
  );
}
