import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Artwork from "./Artwork";
import Footer from "./Footer";
import { fetchCollection } from "../../store/user";
import Description from "./Description";
import { gsap } from "gsap";
import { useRef } from "react";

export const Work = (props) => {
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let [collection, setCollection] = useState({});

  let customDomain = window.location.hostname;

  useEffect(() => {
    async function load() {
      await fetch(`/api/users/custom/${customDomain}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => setUser(await res.json()));
    }
    try {
      // load();
    } catch (error) {
      // setUser(dispatch(fetchUserData(props?.match.params.username)));
    }
  }, []);

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
      return;
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
  }, [user]);

  let works =
    collection?.works &&
    collection?.works.sort(function (a, b) {
      return a.order - b.order;
    });

  let content = useRef();
  const q = gsap.utils.selector(content);
  let tl = new gsap.timeline();
  const fadeOut = () => {
    gsap.to(content.current, { opacity: 0, duration: 1, ease: "expo" });
  };

  useEffect(() => {
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
        fadeOut={fadeOut}
        user={user}
        collection={collection}
        setCollection={setCollection}
      />
      <div
        ref={content}
        className="min-h-screen items-start pt-28 flex flex-col sm:mx-5"
      >
        {collection?.description ? (
          <Description
            title={collection?.title}
            description={collection?.description}
            imgId={works[0]?.imgId}
            workTitle={works[0]?.title}
            workYear={works[0]?.year}
            workHeight={works[0]?.height}
            workWidth={works[0]?.width}
            workDepth={works[0]?.depth}
            data={works}
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
