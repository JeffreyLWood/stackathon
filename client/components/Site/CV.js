import React from "react";
import { Navbar } from "./Navbar";

import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import CVGroup from "./CVGroup";
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

  let education = cv && cv.education ? cv.education.split("\n") : null;
  let soloExhibition =
    cv && cv.soloExhibition ? cv.soloExhibition.split("\n") : null;
  let groupExhibition =
    cv && cv.groupExhibition ? cv.groupExhibition.split("\n") : null;
  let press = cv && cv.press ? cv.press.split("\n") : null;
  let publications = cv && cv.publications ? cv.publications.split("\n") : null;
  let awards = cv && cv.awards ? cv.awards.split("\n") : null;
  let residencies = cv && cv.residencies ? cv.residencies.split("\n") : null;
  let teaching = cv && cv.teaching ? cv.teaching.split("\n") : null;
  let experience = cv && cv.experience ? cv.experience.split("\n") : null;
  let advocacy = cv && cv.advocacy ? cv.advocacy.split("\n") : null;
  let communityInvolvement =
    cv && cv.communityInvolvement ? cv.communityInvolvement.split("\n") : null;

  return (
    <>
      <Navbar user={user} />
      {/* Container */}
      <div className="h-90vh mx-1 sm:mx-0 w-full flex flex-col justify-center  pt-20 pb-20">
        {education ? <CVGroup title={"Education"} data={education} /> : null}
        {soloExhibition ? (
          <CVGroup title={"Solo Exhibitions"} data={soloExhibition} />
        ) : null}
        {groupExhibition ? (
          <CVGroup
            title={"Selected Group Exhibitions"}
            data={groupExhibition}
          />
        ) : null}
        {press ? <CVGroup title={"Press"} data={press} /> : null}
        {publications ? (
          <CVGroup title={"Publications"} data={publications} />
        ) : null}
        {awards ? <CVGroup title={"Awards"} data={awards} /> : null}
        {residencies ? (
          <CVGroup title={"Residencies"} data={residencies} />
        ) : null}
        {teaching ? <CVGroup title={"Teaching"} data={teaching} /> : null}
        {experience ? (
          <CVGroup title={"Related Experience"} data={experience} />
        ) : null}
        {advocacy ? <CVGroup title={"Advocacy"} data={advocacy} /> : null}
        {communityInvolvement ? (
          <CVGroup
            title={"Community Involvement"}
            data={communityInvolvement}
          />
        ) : null}
      </div>

      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
