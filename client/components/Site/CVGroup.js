import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function CVGroup(props) {
  return (
    <>
      <div className="siteTitle mb-5">{props.title}</div>

      <ul className="font-light text-xs tracking-wider flex flex-col sm:text-sm w-full lg:w-4/6">
        {props.data &&
          props.data.map((line, index) => {
            let data = line.split(",");
            return (
              <li className="grid grid-cols-12 mb-5 w-full" key={index}>
                <span id="date" className="col-span-2 text-gray-500">
                  {data[0]}
                </span>
                <div className="col-span-7">
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
                <span id="location" className="col-span-3">
                  {data[3]}
                </span>
                {data[4] ? <span id="description">{data[4]}</span> : null}
              </li>
            );
          })}
      </ul>
    </>
  );
}
