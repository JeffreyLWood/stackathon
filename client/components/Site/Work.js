import React from "react";
import { Navbar } from "./Navbar";
import { fetchUserData } from "../../store/user";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Artwork from "./Artwork";
import Footer from "./Footer";
import { fetchCollection } from "../../store/user";
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
  console.log("work", user.collections, collection);
  return (
    <>
      <Navbar
        user={user}
        collection={collection}
        setCollection={setCollection}
      />
      <div className="min-h-screen mt-8 flex justify-center sm:mx-5">
        <div className="flex w-full h-full overflow-visible flex-wrap">
          {collection?.works
            ? collection.works
                .sort(function (a, b) {
                  return a.order - b.order;
                })
                .filter((collection) => !collection.hidden) //?
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
