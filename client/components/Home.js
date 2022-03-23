import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Navbar";

import AuthForm from "./AuthForm";
import Onboard from "./Onboard";
import Footer from "./Site/Footer";
import Welcome from "./Welcome";
import Features from "./Features";
import { useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useSelector } from "react-redux";
import HomeFooter from "./HomeFooter";
const scroll = new LocomotiveScroll();
/**
 * COMPONENT
 */
export default function Home(props) {
  // let username = useSelector((state) => state.auth.username);
  let [displayName, setDisplayName] = useState("Sign Up");

  return (
    <section>
      <Navbar />
      {/* <Welcome />*/}
      <Onboard />
      {/* <Features /> */}
      <AuthForm displayName={displayName} setDisplayName={setDisplayName} />
      {/* <HomeFooter /> */}
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
