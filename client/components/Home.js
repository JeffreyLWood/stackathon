import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Navbar";
import AuthForm from "./AuthForm";
import Onboard from "./Onboard";
import Footer from "./Site/Footer";
import Welcome from "./Welcome";
import Features from "./Features";
import { useState, useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useSelector } from "react-redux";
import HomeFooter from "./HomeFooter";
const scroll = new LocomotiveScroll();
import { useRef } from "react";

import { gsap } from "gsap";
/**
 * COMPONENT
 */
export default function Home(props) {
  // let username = useSelector((state) => state.auth.username);
  let [displayName, setDisplayName] = useState("Sign Up");

  let content = useRef();

  useEffect(() => {
    gsap.fromTo(
      content.current,
      {
        opacity: 0,
      },
      { opacity: 1, duration: 2, ease: "expo" },
      1
    );
  }, []);

  return (
    <section ref={content}>
      <Navbar />
      {/* <Welcome />*/}
      <Onboard />
      {/* <Features /> */}
      <AuthForm displayName={displayName} setDisplayName={setDisplayName} />
      <HomeFooter />
    </section>
  );
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(Home);
