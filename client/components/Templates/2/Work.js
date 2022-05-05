import React from "react";
// import Navbar from "./Navbar";
import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
// import Artwork from "./Artwork";
// import Footer from "./Footer";
// import Description from "./Description";
import { gsap } from "gsap";
// import useQ from "../../../useQ";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Work({ props }) {
  let user = useSelector((state) => state.user);

  //   let [collection, setCollection] = useState({});

  //   useEffect(() => {
  //     let paramsCollectionTitle =
  //       props.match.params?.collection && props.match.params.collection;
  //     if (paramsCollectionTitle) {
  //       let paramsCollection =
  //         user.collections &&
  //         user.collections.filter(
  //           (collection) => collection.title === paramsCollectionTitle
  //         );
  //       paramsCollection && setCollection(paramsCollection[0]);
  //     } else {
  //       let visible =
  //         user.collections &&
  //         user.collections.filter((collection) => !collection.hidden);

  //       user.collections && !paramsCollectionTitle && setCollection(visible[0]);
  //     }
  //   });

  //   let works = collection?.works;

  return <div>Template 2</div>;
}
