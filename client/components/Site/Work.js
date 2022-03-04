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

  useEffect(() => {
    user = dispatch(fetchUserData(props?.location.pathname));
  }, []);

  useEffect(() => {
    let visible =
      user.collections &&
      user.collections.filter((collection) => !collection.hidden);

    user.collections && setCollection(visible[0]);
  }, [user]);

  return (
    <>
      <Navbar
        user={user}
        collection={collection}
        setCollection={setCollection}
      />
      <div className="flex justify-between flex-wrap w-full h-90vh">
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

      <Footer user={user} userName={props.match.params.username} />
    </>
  );
};
