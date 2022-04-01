import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Artwork from "./Artwork";
import Footer from "./Footer";
import { fetchCollection } from "../../store/user";
import Description from "./Description";
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

  return (
    <>
      <Navbar
        user={user}
        collection={collection}
        setCollection={setCollection}
      />
      <div className="min-h-screen w-screen items-start mt-8 flex flex-col sm:mx-5">
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
            data={works[0]}
          />
        ) : null}
        <div className="flex  w-full h-full overflow-visible flex-wrap">
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
    </>
  );
};
