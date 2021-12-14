import React from "react";
import me from "../../store/auth";
import SiteTitle from "./SiteTitle";
import About from "./About";
import CV from "./CV";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export const Create = () => {
  const user = useSelector((state) => state.auth);
  console.log("user", user);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-12 grid-rows-6 h-screen">
      <div className="flex justify-center row-start-1 row-span-6 col-start-1 col-span-2">
        test
      </div>
      <div className="flex row-start-1 flex-col row-span-6 col-start-3 col-span-10">
        <section className="m-5 h-2/6">
          <SiteTitle user={user} />
        </section>
        <section className="m-5 h-2/6">
          <form className="space-x-5">
            <label htmlFor="work">Work</label>
            <input className="border-2" name="work" type="text"></input>
            <button type="submit">Submit</button>
          </form>
        </section>
        <section className="m-5 h-2/6">
          <About user={user} />
        </section>
        <section className="m-5 h-2/6">
          <CV user={user} />
        </section>
        <section className="m-5 h-2/6">
          <Contact user={user} />
        </section>
      </div>
    </div>
  );
};
