import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
export const CV = (props) => {
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      user = await dispatch(fetchUserData(props.match.params.username));
    }
    fetchData();
  }, []);

  let cv = user && user.cv;
  let exhibition = cv && cv.exhibition.split("\n");
  console.log(exhibition);
  return (
    <>
      <Navbar user={user} />
      <div className="h-90vh flex flex-col pt-10 mx-5">
        <div className="siteTitle">Exhibition</div>
        <div className="font-light text-sm tracking-wider">
          <ul>
            {exhibition &&
              exhibition.map((line, index) => {
                let data = line.split(",");
                return (
                  <li className="flex flex-row justify-between" key={index}>
                    <span>{data[0]}</span>
                    <span id="place" className="font-medium">
                      {data[1]}
                    </span>
                    <span id="title" className="italic">
                      {data[2]}
                    </span>
                    <span>{data[3]}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
