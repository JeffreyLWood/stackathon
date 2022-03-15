import React from "react";
import { connect } from "react-redux";
import { Navbar } from "./Navbar";
import { Login, Signup } from "./Authform";

/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <>
      <Navbar />
      <div className="welcome px-80 bg-neutral-100">
        <div className="w-4/6 flex space-y-10 flex-col">
          <h1>Artists' Websites. Simplified.</h1>
          <h2>
            Websites specifically for painters, sculptors and printmakers.
          </h2>
        </div>
      </div>
      <div className="container"></div>
      {/* <Authmodal show={show} setShow={setShow} /> */}
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
