import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Navbar";
import { Login, Signup } from "./AuthForm";
import AuthForm from "./AuthForm";
import Onboard from "./Onboard";
import Footer from "./Site/Footer";
import Welcome from "./Welcome";
import Features from "./Features";
/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <>
      <Navbar />
      <Welcome />
      <Onboard />
      <Features />
      <AuthForm displayName="Sign Up" />
      {/* <Footer /> */}
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
