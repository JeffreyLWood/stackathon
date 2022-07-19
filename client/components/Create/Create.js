import React from "react";
import me from "../../store/auth";
import Work from "./CreateWork";
import About from "./CreateAbout";
import CV from "./CreateCV";
import Contact from "./CreateContact";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snapshot from "./CreateSnapshot";
import { Image } from "cloudinary-react";
import { fetchUserData } from "../../store/user";

export const Create = (props) => {
  let user = useSelector((state) => state.user);
  let worksData = useSelector((state) => state.user.works);

  const dispatch = useDispatch();

  // user = dispatch(fetchUserData(props.user.username));

  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (error) {
      console.log("create.js line 25", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        {/* <div className="flex my-10 flex-col md:flex-row w-full">
          <section className="m-5 w-1/6 subHeader">Site Title</section>
          <section className="m-5 w-5/6">
            <SiteTitle user={user} />
          </section>
        </div> */}
        <div className="flex my-10 flex-row w-full">
          {/* <section className="m-5 w-1/6 subHeader">Work</section> */}
          <section className="m-5 w-5/6">
            <Work user={user} works={worksData} />
          </section>
        </div>
        <div className="flex my-10 flex-row w-full">
          {/* <section className="m-5 w-1/6 subHeader">About</section> */}
          <section className="m-5 w-5/6">
            <About user={user} works={worksData} />
          </section>
        </div>
        <div className="flex h-90vh my-10 flex-row w-full">
          {/* <section className="m-5 w-1/6 subHeader">CV</section> */}
          <section className="m-5 w-5/6">
            <CV user={user} />
          </section>
        </div>
        <div className="flex my-10 flex-row w-full">
          {/* <section className="m-5 w-1/6 subHeader">Contact</section> */}
          <section className="m-5 w-5/6">
            <Contact user={user} works={worksData} />
          </section>
        </div>
      </div>
    </>
  );
};
