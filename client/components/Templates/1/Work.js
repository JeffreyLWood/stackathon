import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Artwork from "./Artwork";
import Description from "./Description";
import { gsap } from "gsap";
import useQ from "../../../useQ";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Work({ props }) {
  let user = useSelector((state) => state.user);

  let [collection, setCollection] = useState({});

  useEffect(() => {
    let paramsCollectionTitle =
      props.match.params?.collection && props.match.params.collection;
    if (paramsCollectionTitle) {
      let paramsCollection =
        user.collections &&
        user.collections.filter(
          (collection) => collection.title === paramsCollectionTitle
        );
      paramsCollection && setCollection(paramsCollection[0]);
    } else {
      let visible =
        user.collections &&
        user.collections.filter((collection) => !collection.hidden);

      user.collections && !paramsCollectionTitle && setCollection(visible[0]);
    }
  });

  let works = collection?.works;

  let [q, ref] = useQ();

  const images = gsap.utils.toArray(".stagger");
  let delay = 0;
  images.forEach((image) => {
    gsap.to(image, {
      scrollTrigger: image,
      opacity: 1,
      duration: 3,
      ease: "expo",
      y: -20,
      delay: (delay += 0.05),
    });
  });

  const fadeOut = () => {
    gsap.to(ref.current, {
      opacity: 0,
      duration: 1,
      ease: "expo",
    });
  };

  useEffect(() => {
    return () => {
      fadeOut();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-screen items-start pt-28 flex flex-col sm:mx-5"
    >
      {collection?.description ? (
        <Description
          title={collection?.title}
          description={collection?.description}
          data={works[0]}
        />
      ) : null}
      <div className="flex w-full h-full overflow-visible flex-wrap">
        {collection?.works
          ? works
              .filter((work) =>
                collection?.description ? work.imgId !== works[0].imgId : work
              )
              .map((work, index) => {
                return <Artwork key={index} data={work} user={user} />;
              })
          : null}
      </div>
    </div>
  );
}
