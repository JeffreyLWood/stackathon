import React from "react";
import { Navbar } from "./Navbar";
import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Artwork from "./Artwork";
import Footer from "./Footer";
import Description from "./Description";
import { gsap } from "gsap";
import { useRef } from "react";
import useQ from "./useQ";
export const Work = (props) => {
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
        user.collections
          .filter((collection) => !collection.hidden)
          .sort(function (a, b) {
            return a.order - b.order;
          });
      user.collections && !paramsCollectionTitle && setCollection(visible[0]);
    }
  });

  let works =
    collection?.works &&
    collection?.works.sort(function (a, b) {
      return a.order - b.order;
    });

  let [q, ref] = useQ();
  let tl = new gsap.timeline();

  const fadeOut = () => {
    gsap.to(q(".stagger"), {
      opacity: 0,
      stagger: 0.1,
      duration: 2,
      ease: "expo",
    });
  };
  const fadeIn = () => {
    gsap.to(ref.current, { opacity: 1, duration: 1, ease: "expo" });
    gsap.set(q(".stagger"), { y: 20 });
  };

  useLayoutEffect(() => {
    fadeIn();
    tl.to(
      q(".stagger"),
      {
        opacity: 1,
        stagger: 0.1,
        duration: 3,
        ease: "expo",
        y: -20,
      },
      2
    );
  });

  return (
    <div>
      <Navbar
        tl={tl}
        fadeOut={fadeOut}
        user={user}
        collection={collection}
        setCollection={setCollection}
      />
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

      <Footer user={user} userName={props.match.params.username} />
    </div>
  );
};
