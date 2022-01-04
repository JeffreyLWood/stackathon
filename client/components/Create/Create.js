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
import { fetchUserData } from "../../store/user";
export const Create = () => {
  let user = useSelector((state) => state.auth);
  let worksData = useSelector((state) => state.user.works);

  const dispatch = useDispatch();

  useEffect(() => {
    user = dispatch(fetchUserData(user.username));
  }, []);

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
      <div className="grid grid-cols-12 grid-rows-6 gap-4">
        <div className="flex justify-end row-start-1 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6 subHeader">Site Title</section>
        </div>
        <div className="flex flex-col row-start-1 row-span-1 col-start-4 col-span-9">
          <section className="m-5 h-2/6 subHeader">
            <SiteTitle user={user} />
          </section>
        </div>
        <div className="flex justify-end row-start-2 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6 subHeader">Work</section>
        </div>
        <div className="flex row-start-2 flex-col row-span-1 col-start-4 col-span-9">
          <section className="m-5 h-2/6 subHeader">
            <Work user={user} works={worksData} />
          </section>
        </div>
        <div className="flex justify-end row-start-3 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6 subHeader">About</section>
        </div>
        <div className="flex row-start-3 flex-col row-span-1 col-start-4 col-span-9">
          <section className="m-5 h-2/6 subHeader">
            <About user={user} />
          </section>
        </div>
        <div className="flex justify-end row-start-4 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6 subHeader">CV</section>
        </div>
        <div className="flex row-start-4 flex-col row-span-1 col-start-4 col-span-9">
          <section className="m-5 h-2/6 subHeader">
            <CV user={user} />
          </section>
        </div>
        <div className="flex justify-end row-start-5 row-span-1 col-start-1 col-span-2">
          <section className="m-5 h-2/6 subHeader">Contact</section>
        </div>
        <div className="flex row-start-5 flex-col row-span-1 col-start-4 col-span-9">
          <section className="m-5 h-2/6 subHeader">
            <Contact user={user} />
          </section>
        </div>
      </div>
    </>
  );
};
