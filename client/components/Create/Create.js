import React from "react";
import me from "../../store/auth";
import Work from "./Work";
import SiteTitle from "./SiteTitle";
import About from "./About";
import CV from "./CV";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar";
import { Image } from "cloudinary-react";
export const Create = () => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="grid grid-cols-12 grid-rows-6 h-screen">
        <div className="flex justify-end row-start-1 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6">Site Title</section>
        </div>
        <div className="flex row-start-1 flex-col row-span-1 col-start-3 col-span-10">
          <section className="m-5 h-2/6">
            <SiteTitle user={user} />
          </section>
        </div>
        <div className="flex justify-end row-start-2 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6">Work</section>
        </div>
        <div className="flex row-start-2 flex-col row-span-1 col-start-3 col-span-10">
          <section className="m-5 h-2/6">
            <Work />
          </section>
        </div>
        <div className="flex justify-end row-start-3 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6">About</section>
        </div>
        <div className="flex row-start-3 flex-col row-span-1 col-start-3 col-span-10">
          <section className="m-5 h-2/6">
            <About user={user} />
          </section>
        </div>
        <div className="flex justify-end row-start-4 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6">CV</section>
        </div>
        <div className="flex row-start-4 flex-col row-span-1 col-start-3 col-span-10">
          <section className="m-5 h-2/6">
            <CV user={user} />
          </section>
        </div>
        <div className="flex justify-end row-start-5 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6">Contact</section>
        </div>
        <div className="flex row-start-5 flex-col row-span-1 col-start-3 col-span-10">
          <section className="m-5 h-2/6">
            <Contact user={user} />
          </section>
        </div>
      </div>
    </>
  );
};
